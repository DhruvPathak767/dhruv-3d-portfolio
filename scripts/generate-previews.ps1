Add-Type -AssemblyName System.Drawing

$outputDir = Join-Path $PSScriptRoot '..\public\previews'
New-Item -ItemType Directory -Force $outputDir | Out-Null

function New-RoundedPath {
  param(
    [System.Drawing.RectangleF]$Rect,
    [float]$Radius
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $Radius * 2
  $arc = [System.Drawing.RectangleF]::new($Rect.X, $Rect.Y, $diameter, $diameter)
  $path.AddArc($arc, 180, 90)
  $arc.X = $Rect.Right - $diameter
  $path.AddArc($arc, 270, 90)
  $arc.Y = $Rect.Bottom - $diameter
  $path.AddArc($arc, 0, 90)
  $arc.X = $Rect.X
  $path.AddArc($arc, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-RoundedRect {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Brush]$Brush,
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = New-RoundedPath ([System.Drawing.RectangleF]::new($X, $Y, $Width, $Height)) $Radius
  $Graphics.FillPath($Brush, $path)
  $path.Dispose()
}

function Draw-RoundedRect {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Pen]$Pen,
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = New-RoundedPath ([System.Drawing.RectangleF]::new($X, $Y, $Width, $Height)) $Radius
  $Graphics.DrawPath($Pen, $path)
  $path.Dispose()
}

function New-PreviewImage {
  param(
    [string]$FileName,
    [string]$Title,
    [string]$Subtitle,
    [string]$Badge,
    [string[]]$Lines,
    [string]$AccentA,
    [string]$AccentB
  )

  $width = 960
  $height = 600
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  $rect = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
  $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, ([System.Drawing.ColorTranslator]::FromHtml('#050816')), ([System.Drawing.ColorTranslator]::FromHtml('#0f172a')), 38
  $graphics.FillRectangle($background, $rect)

  $accentBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ([System.Drawing.Rectangle]::new(0, 0, $width, $height)), ([System.Drawing.ColorTranslator]::FromHtml($AccentA)), ([System.Drawing.ColorTranslator]::FromHtml($AccentB)), 15
  $accentBrush.WrapMode = [System.Drawing.Drawing2D.WrapMode]::TileFlipXY
  $overlay = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(42, [System.Drawing.ColorTranslator]::FromHtml($AccentA)))
  $graphics.FillPolygon($overlay, @(
    [System.Drawing.Point]::new(646, 0),
    [System.Drawing.Point]::new(960, 0),
    [System.Drawing.Point]::new(960, 218),
    [System.Drawing.Point]::new(734, 230)
  ))
  $overlay.Color = [System.Drawing.Color]::FromArgb(34, [System.Drawing.ColorTranslator]::FromHtml($AccentB))
  $graphics.FillPolygon($overlay, @(
    [System.Drawing.Point]::new(0, 362),
    [System.Drawing.Point]::new(236, 318),
    [System.Drawing.Point]::new(346, 600),
    [System.Drawing.Point]::new(0, 600)
  ))

  $gridPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(24, 148, 163, 184)), 1
  for ($x = 0; $x -le $width; $x += 48) {
    $graphics.DrawLine($gridPen, $x, 0, $x, $height)
  }
  for ($y = 0; $y -le $height; $y += 48) {
    $graphics.DrawLine($gridPen, 0, $y, $width, $y)
  }

  $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(218, 15, 23, 42))
  $softPanelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(172, 2, 6, 23))
  $borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(118, [System.Drawing.ColorTranslator]::FromHtml($AccentA))), 2
  Fill-RoundedRect $graphics $panelBrush 72 78 816 444 18
  Draw-RoundedRect $graphics $borderPen 72 78 816 444 18

  $titleFont = New-Object System.Drawing.Font 'Segoe UI', 34, ([System.Drawing.FontStyle]::Bold)
  $subtitleFont = New-Object System.Drawing.Font 'Segoe UI', 17, ([System.Drawing.FontStyle]::Regular)
  $badgeFont = New-Object System.Drawing.Font 'Segoe UI', 13, ([System.Drawing.FontStyle]::Bold)
  $monoFont = New-Object System.Drawing.Font 'Consolas', 15, ([System.Drawing.FontStyle]::Regular)
  $smallFont = New-Object System.Drawing.Font 'Segoe UI', 12, ([System.Drawing.FontStyle]::Bold)
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#ffffff'))
  $muted = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#94a3b8'))
  $cyan = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#a5f3fc'))

  Fill-RoundedRect $graphics $accentBrush 104 112 172 36 18
  $graphics.DrawString($Badge, $badgeFont, $white, 125, 120)
  $graphics.DrawString($Title, $titleFont, $white, 104, 172)
  $graphics.DrawString($Subtitle, $subtitleFont, $muted, 108, 222)

  Fill-RoundedRect $graphics $softPanelBrush 104 292 350 154 14
  Draw-RoundedRect $graphics $borderPen 104 292 350 154 14
  $lineY = 318
  foreach ($line in $Lines) {
    $graphics.DrawString($line, $monoFont, $cyan, 126, $lineY)
    $lineY += 34
  }

  Fill-RoundedRect $graphics $softPanelBrush 510 142 286 250 14
  Draw-RoundedRect $graphics $borderPen 510 142 286 250 14
  for ($i = 0; $i -lt 5; $i++) {
    $barBrush = if ($i % 2 -eq 0) { $accentBrush } else { New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(82, 148, 163, 184)) }
    Fill-RoundedRect $graphics $barBrush 546 (184 + ($i * 34)) (190 + ($i * 14)) 10 5
  }

  Fill-RoundedRect $graphics $accentBrush 604 432 160 44 22
  $graphics.DrawString('LIVE PREVIEW', $smallFont, $white, 632, 446)

  $output = Join-Path $outputDir $FileName
  $bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
  $background.Dispose()
  $accentBrush.Dispose()
  $overlay.Dispose()
  $gridPen.Dispose()
  $panelBrush.Dispose()
  $softPanelBrush.Dispose()
  $borderPen.Dispose()
  $titleFont.Dispose()
  $subtitleFont.Dispose()
  $badgeFont.Dispose()
  $monoFont.Dispose()
  $smallFont.Dispose()
  $white.Dispose()
  $muted.Dispose()
  $cyan.Dispose()
}

New-PreviewImage `
  -FileName 'hopeback-preview.png' `
  -Title 'HOPEBACK' `
  -Subtitle 'Donation Management System' `
  -Badge 'FULL STACK' `
  -Lines @('auth.verify(user)', 'donations.route()', 'backend.sync()') `
  -AccentA '#3b82f6' `
  -AccentB '#8b5cf6'

New-PreviewImage `
  -FileName 'code-vimarsh-preview.png' `
  -Title 'Code Vimarsh' `
  -Subtitle 'Official coding club website' `
  -Badge 'WEB ARCH' `
  -Lines @('club.portal()', 'responsive.ui()', 'render.deploy()') `
  -AccentA '#22d3ee' `
  -AccentB '#3b82f6'

New-PreviewImage `
  -FileName 'ai-saas-preview.png' `
  -Title 'AI SaaS' `
  -Subtitle 'Upcoming AI-powered SaaS projects' `
  -Badge 'UPCOMING' `
  -Lines @('ai.workflow()', 'product.loop()', 'scale.ready()') `
  -AccentA '#8b5cf6' `
  -AccentB '#22d3ee'
