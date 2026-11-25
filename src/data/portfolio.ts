/**
 * Central portfolio configuration.
 * Update links, projects, resume, and optional Formspree ID here.
 */

export const profile = {
  name: 'Vishnu K',
  logo: 'VK.',
  initials: 'VK',
  title:
    'AI Developer | Full-Stack Developer | Electronics & Communication Engineering Student',
  roles: ['AI Developer', 'Full-Stack Developer', 'ECE Student'] as const,
  heroGreeting: "HELLO, I'M VISHNU K",
  heroHeadline: ['Turning Ideas', 'Into Intelligent', 'Experiences.'],
  heroSupport: 'AI Developer. Full-Stack Engineer. Technology Enthusiast.',
  heroDescription:
    'I build intelligent applications, modern digital experiences, and technology-driven solutions that connect software and the real world.',
  introduction:
    "I'm Vishnu K, an aspiring AI and Full-Stack Developer with a passion for building intelligent applications, modern web experiences, and innovative technology solutions. I enjoy combining artificial intelligence, software engineering, and electronics to turn creative ideas into practical products.",
  aboutHeading: 'More Than Just Code.',
  aboutBody:
    "I'm an Electronics and Communication Engineering student interested in artificial intelligence, full-stack development, and emerging technologies. I enjoy experimenting with new tools, developing practical projects, and continuously improving my technical abilities.",
  status: 'Available for opportunities',
  education: {
    degree: 'Electronics and Communication Engineering',
    college: 'VSB Engineering College',
    duration: '2024–2028',
    cgpa: '7.75',
  },
  /** Generated from the information supplied for this portfolio. */
  resumeUrl: '/Vishnu_K_Resume.pdf',
  availabilityNote: 'Open to internships, collaborations, and ambitious ideas.',
  focusTags: ['AI systems', 'Web products', 'Embedded technology'],
  heroMeta: [
    { label: 'Focus', value: 'AI + Full-Stack' },
    { label: 'Base', value: 'ECE, 2024–2028' },
    { label: 'Status', value: 'Building' },
  ],
} as const

export const social = {
  email: 'vishnu18042007@gmail.com',
  github: 'https://github.com/Vishnu12233',
  linkedin: 'https://www.linkedin.com/in/vishnu-vishnu-48a1a9332/',
  instagram: '',
} as const

export const contactConfig = {
  formspreeId: (import.meta.env.VITE_FORMSPREE_ID as string | undefined) ?? '',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const

export const aboutFocus = [
  {
    title: 'Artificial Intelligence',
    description:
      'Explore intelligent applications, AI-powered systems, machine learning, and LLM integration.',
    accent: 'purple' as const,
  },
  {
    title: 'Full-Stack Development',
    description:
      'Build responsive, modern, and scalable web applications using modern frontend and backend technologies.',
    accent: 'blue' as const,
  },
  {
    title: 'Embedded Technologies',
    description:
      'Explore IoT, electronics, sensors, microcontrollers, and intelligent hardware systems.',
    accent: 'cyan' as const,
  },
]

export const skillCategories = [
  {
    id: 'programming',
    title: 'Programming',
    skills: ['Python', 'Java', 'C', 'JavaScript'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'React', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['FastAPI', 'PostgreSQL', 'Supabase'],
  },
  {
    id: 'ai',
    title: 'AI & Technologies',
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'LLM Integration',
      'Computer Vision',
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
] as const

export type ProjectCategory = 'ai' | 'web' | 'iot'

export type Project = {
  id: string
  title: string
  fullName?: string
  description: string
  technologies: string[]
  categories: ProjectCategory[]
  visual: 'analyzer' | 'niecp' | 'health' | 'solar'
  gradient: string
  links: {
    live?: string
    github?: string
  }
}

export const projects: Project[] = [
  {
    id: 'ai-skill-gap',
    title: 'AI Skill Gap Analyzer',
    description:
      'An AI-powered career guidance platform that analyzes student skills, identifies skill gaps, and generates personalized career roadmaps.',
    technologies: ['React', 'AI', 'FastAPI', 'Supabase'],
    categories: ['ai', 'web'],
    visual: 'analyzer',
    gradient: 'from-violet-100 via-fuchsia-50 to-cyan-100',
    links: {},
  },
  {
    id: 'niecp-ai',
    title: 'NIECP-AI',
    fullName: 'National Industrial Ease & Compliance Platform – AI',
    description:
      'An intelligent platform designed to simplify industrial approval workflows, regulatory compliance, approval discovery, dependency graphs, and documentation management.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AI'],
    categories: ['ai', 'web'],
    visual: 'niecp',
    gradient: 'from-blue-100 via-indigo-50 to-violet-100',
    links: {},
  },
  {
    id: 'health-guard',
    title: 'Health Guard AI',
    description:
      'An AI-powered healthcare concept focused on intelligent health monitoring and predictive assistance.',
    technologies: ['Python', 'AI', 'Web Development'],
    categories: ['ai', 'web'],
    visual: 'health',
    gradient: 'from-emerald-100 via-teal-50 to-cyan-100',
    links: {},
  },
  {
    id: 'solar-tracking',
    title: 'Dual-Axis Solar Tracking System',
    description:
      'An Arduino-based solar tracking system that automatically adjusts the direction of a solar panel using four LDR sensors and servo motors.',
    technologies: [
      'Arduino Uno',
      'Embedded C',
      'LDR Sensors',
      'Servo Motors',
      'IoT',
    ],
    categories: ['iot'],
    visual: 'solar',
    gradient: 'from-amber-100 via-orange-50 to-violet-100',
    links: {},
  },
]

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'web', label: 'Web Development' },
  { id: 'iot', label: 'IoT & Embedded' },
] as const

export const timeline = {
  education: [
    {
      id: 'ece',
      title: 'Electronics and Communication Engineering',
      organization: 'VSB Engineering College',
      period: '2024–2028',
      detail: 'CGPA: 7.75',
    },
  ],
  certifications: [] as Array<{
    id: string
    title: string
    organization: string
    period: string
    detail?: string
  }>,
  workshops: [] as Array<{
    id: string
    title: string
    organization: string
    period: string
    detail?: string
  }>,
  internships: [] as Array<{
    id: string
    title: string
    organization: string
    period: string
    detail?: string
  }>,
  achievements: [] as Array<{
    id: string
    title: string
    organization: string
    period: string
    detail?: string
  }>,
}

export const services = [
  {
    title: 'AI Application Development',
    description:
      'Develop intelligent applications using AI APIs, LLMs, and modern AI technologies.',
    accent: 'purple' as const,
  },
  {
    title: 'Full-Stack Web Development',
    description:
      'Develop modern websites, dashboards, and scalable web applications.',
    accent: 'blue' as const,
  },
  {
    title: 'AI Integration & Automation',
    description:
      'Integrate AI-powered functionality into existing applications and workflows.',
    accent: 'cyan' as const,
  },
]
