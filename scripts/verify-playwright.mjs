import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { PNG } from 'pngjs'

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173/'
const outputDir = 'test-results'

mkdirSync(outputDir, { recursive: true })

const browser = await chromium.launch({
  executablePath: edgePath,
  headless: true,
  args: ['--enable-webgl', '--ignore-gpu-blocklist', '--use-angle=swiftshader'],
})

const results = []

function analyzePng(buffer) {
  const png = PNG.sync.read(buffer)
  let alphaPixels = 0
  let colorfulPixels = 0
  let minLuma = 765
  let maxLuma = 0

  for (let index = 0; index < png.data.length; index += 4) {
    const r = png.data[index]
    const g = png.data[index + 1]
    const b = png.data[index + 2]
    const a = png.data[index + 3]
    const luma = r + g + b

    if (a > 0) alphaPixels += 1
    if (Math.abs(r - b) > 14 || Math.abs(g - b) > 14 || Math.abs(r - g) > 14) colorfulPixels += 1
    minLuma = Math.min(minLuma, luma)
    maxLuma = Math.max(maxLuma, luma)
  }

  return {
    width: png.width,
    height: png.height,
    alphaPixels,
    colorfulPixels,
    lumaRange: maxLuma - minLuma,
  }
}

for (const profile of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
]) {
  const browserLogs = []
  const page = await browser.newPage({
    viewport: { width: profile.width, height: profile.height },
    isMobile: Boolean(profile.isMobile),
    deviceScaleFactor: profile.isMobile ? 2 : 1,
  })
  page.on('console', (message) => browserLogs.push(`${message.type()}: ${message.text()}`))
  page.on('pageerror', (error) => browserLogs.push(`pageerror: ${error.message}`))

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 20000 })
  await page.waitForSelector('canvas', { timeout: 15000 })
  await page.waitForTimeout(1800)

  const canvasBox = await page.locator('canvas').first().boundingBox()
  if (!canvasBox) {
    throw new Error(`${profile.name}: Three canvas was missing\n${browserLogs.join('\n')}`)
  }
  const cropX = Math.max(0, Math.floor(canvasBox.x + canvasBox.width * 0.08))
  const cropY = Math.max(0, Math.floor(canvasBox.y + canvasBox.height * 0.12))
  const cropWidth = Math.max(1, Math.min(Math.ceil(canvasBox.width * 0.84), profile.width - cropX))
  const cropHeight = Math.max(1, Math.min(Math.ceil(canvasBox.height * 0.66), profile.height - cropY))
  const canvasScreenshotPath = `${outputDir}/canvas-${profile.name}.png`
  const canvasBuffer = await page.screenshot({
    path: canvasScreenshotPath,
    clip: { x: cropX, y: cropY, width: cropWidth, height: cropHeight },
  })
  const canvas = {
    present: Boolean(canvasBox),
    elementWidth: Math.round(canvasBox?.width ?? 0),
    elementHeight: Math.round(canvasBox?.height ?? 0),
    screenshotPath: canvasScreenshotPath,
    ...analyzePng(canvasBuffer),
  }

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  const sections = await page.evaluate(() =>
    ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'].map((id) => {
      const element = document.getElementById(id)
      return {
        id,
        present: Boolean(element),
        height: element ? Math.round(element.scrollHeight) : 0,
      }
    }),
  )
  const screenshotPath = `${outputDir}/portfolio-${profile.name}.png`
  await page.screenshot({ path: screenshotPath, fullPage: false })

  if (!canvas.present || canvas.width < 220 || canvas.height < 220) {
    throw new Error(`${profile.name}: Three canvas was missing or undersized: ${JSON.stringify(canvas)}\n${browserLogs.join('\n')}`)
  }

  if (canvas.alphaPixels < 4500 || canvas.colorfulPixels < 900 || canvas.lumaRange < 55) {
    throw new Error(`${profile.name}: Three canvas looked blank: ${JSON.stringify(canvas)}\n${browserLogs.join('\n')}`)
  }

  if (horizontalOverflow > 6) {
    throw new Error(`${profile.name}: page has ${horizontalOverflow}px horizontal overflow\n${browserLogs.join('\n')}`)
  }

  const collapsedSection = sections.find((section) => !section.present || section.height < 180)
  if (collapsedSection) {
    throw new Error(`${profile.name}: section check failed ${JSON.stringify(collapsedSection)}\n${browserLogs.join('\n')}`)
  }

  results.push({
    viewport: profile.name,
    screenshotPath,
    canvas,
    sections,
    horizontalOverflow,
  })

  await page.close()
}

await browser.close()

writeFileSync(`${outputDir}/portfolio-verification.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
