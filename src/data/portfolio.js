
import {
  FaBootstrap,
  FaCss3Alt,
  FaEnvelope,
  FaGithub,
  FaGitAlt,
  FaHtml5,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'

import {
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMapPin,
  FiPhone,
  FiServer,
  FiZap,
} from 'react-icons/fi'

import {
  SiExpress,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiPostman,
  SiRender,
  SiTailwindcss,
} from 'react-icons/si'

export const profile = {
  name: 'Dhruv Pathak',
  role: 'Full Stack Web Developer',
  subtitle: 'Building scalable MERN stack applications with AI-powered development tools.',
  phone: '9724441255',
  email: 'dhruvapathak767@gmail.com',
  location: 'India',
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const socialLinks = [
  {
    label: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/DhruvPathak767',
  },
  {
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/dhruv-pathak-a3041a317/',
  },
  {
    label: 'Email',
    icon: FaEnvelope,
    href: `mailto:${profile.email}`,
  },
]

export const heroActions = [
  { label: 'View Projects', href: '#projects', variant: 'primary' },
  {
    label: 'Download Resume',
    href: '/dhruv-pathak-resume.jpeg',
    variant: 'secondary',
    download: true,
  },
  { label: 'Contact Me', href: '#contact', variant: 'ghost' },
]

export const aboutHighlights = [
  'I specialize in MERN stack development and modern web technologies',
  'I use AI-assisted development tools to improve productivity and rapid prototyping',
  'I enjoy building scalable and user-centric full stack applications',
  'I continuously improve my frontend and backend engineering skills',
  'I actively participate in hackathons and collaborative development environments',
  'I focus on clean UI/UX and modern responsive design systems',
  'I love experimenting with AI-powered development workflows and emerging technologies',
]

export const stats = [
  {
    label: 'Projects Built',
    value: '3',
    detail: 'featured builds and upcoming SaaS work',
  },
  {
    label: 'Hackathons Participated',
    value: 'Multiple',
    detail: 'innovation sprints and team builds',
  },
  {
    label: 'Technologies Used',
    value: '25+',
    detail: 'across frontend, backend, database, AI, and development tools',
  },
  {
    label: 'Years Learning Development',
    value: '2023-Present',
    detail: 'continuous full stack growth',
  },
]

export const skills = [
  {
    category: 'Frontend',
    icon: FiLayers,
    accent: '#3b82f6',
    skills: [
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Bootstrap', icon: FaBootstrap },
      { name: 'React.js', icon: FaReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer },
     
    ],
  },
  {
    category: 'Backend',
    icon: FiServer,
    accent: '#8b5cf6',
    skills: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'REST APIs', icon: FiZap },
      { name: 'Python', icon: FiCode },
      { name: 'Java', icon: FiCode },
       { name: 'PHP', icon: FiCode },
    ],
  },
  {
    category: 'Database',
    icon: FiDatabase,
    accent: '#22d3ee',
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: FiDatabase },
    ],
  },
  {
    category: 'AI Tools',
    icon: FiCpu,
    accent: '#a78bfa',
    skills: [
      { name: 'GitHub Copilot', icon: FiCpu },
      { name: 'Cursor', icon: FiCode },
      { name: 'OpenAI API (Basics)', icon: FiCpu },
      { name: 'Antigravity AI', icon: FiCpu },
      { name: 'Google Stitch', icon: FiCpu },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: FiCloud,
    accent: '#38bdf8',
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub },
      { name: 'VS Code', icon: FiCode },
      { name: 'Postman', icon: SiPostman },
      { name: 'Render', icon: SiRender },
      { name: 'Pandas', icon: FiCode },
    ],
  },
]

export const experiences = [
  {
    role: 'Hackathon Participant',
    duration: '01/2023 – 12/2025',
    description: [
      'Participated in multiple hackathons building innovative MERN stack solutions',
      'Applied AI tools to improve development efficiency and rapid prototyping',
      'Collaborated in agile environments under tight deadlines',
    ],
  },
  {
    role: 'Backend Developer Team Member',
    organization: 'Code Vimarsh',
    location: 'Vadodara, India',
    duration: '01/2026 – Present',
    description: [
      'Developed backend systems using Node.js and Express.js',
      'Worked with cross-functional teams on full stack projects',
      'Used AI tools like GitHub Copilot and Cursor to accelerate development',
      'Contributed to scalable coding projects for Code Vimarsh',
    ],
  },
]

export const education = [
  {
    degree: 'B.E. in Computer Science & Engineering',
    institute: 'Maharaja Sayajirao University (MSU)',
    duration: '07/2023 – 06/2027',
    details: [
      'Pursuing undergraduate degree focused on software engineering and development',
      'Strong understanding of algorithms, data structures, and software engineering principles',
      'Achieved top academic performance in programming and technical subjects',
    ],
  },
  {
    degree: 'Diploma in Computer Engineering',
    institute: 'Maharaja Sayajirao University (MSU)',
    duration: '07/2022 – 06/2025',
    details: [
      'Graduated with 84.50% marks',
      'Built strong foundations in full stack development',
      'Learned embedded systems, digital logic design, and microprocessor architecture',
    ],
  },
  {
    degree: 'SSC (10th Standard)',
    institute: 'Ambe School',
    duration: '04/2010 – 03/2022',
    details: ['Achieved 98.66 percentile in secondary school certification'],
  },
]

export const projects = [
  {
    title: 'HOPEBACK – Donation Management System',
    image: '/previews/hopeback-preview.png',
    github: 'https://github.com/DhruvilTech/Hopebank',
    stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Responsive UI',
      'Authentication System',
      'Backend Integration',
    ],
    description:
      'Built a full-stack donation management system with authentication and backend integration.',
    details: [
      'Used AI tools like GitHub Copilot and Cursor',
      'Focused on clean development workflow',
      'Implemented backend services and data flow management',
      'Created responsive frontend interfaces',
      'Integrated authentication and scalable backend architecture',
    ],
  },
  {
    title: 'Code Vimarsh Website',
    image: '/previews/code-vimarsh-preview.png',
    live: 'http://code-vimarsh.onrender.com',
    github: 'https://github.com/DhruvPathak767/codeVimarshWebsiteOfficial123',
    stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Responsive UI',
      'Modern Web Architecture',
      'AI-assisted Workflow Optimization',
      'Authentication System',
      'Backend Integration',
    ],
    description:
      'Developed the official coding club website with user-focused design and scalable architecture.',
    details: [
      'Built full stack features using MERN technologies',
      'Created responsive UI and scalable backend architecture',
      'Improved development workflow using AI-assisted tools',
      'Implemented backend integration and authentication systems',
      'Focused on modern responsive user experience',
    ],
  },
  {
    title: 'Upcoming AI-powered SaaS Projects',
    image: '/previews/ai-saas-preview.png',
    stack: ['AI-powered SaaS', 'Upcoming'],
    description: 'A visually attractive placeholder card for upcoming AI-powered SaaS projects.',
    details: [],
    upcoming: true,
  },
]

export const certifications = [
  {
    title: 'Ingenious Hackathon 7.0',
    issuer: 'Ahmedabad University',
    date: '03/2026',
  },
  {
    title: 'Indigenous Hackathon',
    issuer: 'Navrachna University',
    date: '10/2025',
  },
  {
    title: 'HACKaMINeD Hackathon 2026',
    issuer: 'Nirma University Baroda',
    date: '03/2026',
  },
]

export const contactCards = [
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone}`,
    icon: FiPhone,
  },
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: FaEnvelope,
  },
  {
    label: 'Location',
    value: profile.location,
    icon: FiMapPin,
  },
]

