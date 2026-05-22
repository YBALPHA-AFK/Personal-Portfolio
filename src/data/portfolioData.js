import {
  Award,
  Briefcase,
  Building2,
  GraduationCap,
  Trophy,
  Star,
  Sparkles,
  Target,
  Users,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  BookOpen,
  Medal,
} from 'lucide-react'

export const profile = {
  name: 'Suhaan Meerapatel',
  initials: 'SM',
  role: 'DECA VP of Finance',
  subRole: 'WFHS ’29 · 3DE Leadership Academy',
  location: 'Atlanta Metropolitan Area',
  email: 'suhaan.meerapatel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/suhaanmeerapatel',
  taglines: [
    'Student leader with a drive for business.',
    'DECA VP of Finance. Strategy. Execution.',
    'Building Marketing Plans & Driven Goals.',
    'Ambition. Discipline. Performance.',
  ],
  summary:
    'I’m a driven and competitive student leader with a passion for business, strategy, and growth. As a DECA officer, I focus on leadership development, marketing strategy, and creating opportunities that help students think bigger and execute smarter. I’m especially interested in business innovation, event marketing, and competitive strategy — from building marketing plans and SMART goals, to preparing for high-level competitions and organizing initiatives that engage students.',
  summaryHighlight: [
    'business innovation',
    'event marketing',
    'competitive strategy',
    'leadership development',
  ],
  values: ['Efficiency', 'Clear Communication', 'Results'],
  stats: [
    { label: 'Years in DECA', value: '4+' },
    { label: 'Leadership Roles', value: '5' },
    { label: 'State / Regional Awards', value: '4' },
    { label: 'Class of', value: '2029' },
  ],
}

export const skills = [
  { name: 'AI Automation', icon: Sparkles },
  { name: 'Artificial Intelligence (AI)', icon: Sparkles },
  { name: 'Prompt Engineering', icon: Target },
  { name: 'Marketing Strategy', icon: Megaphone },
  { name: 'Leadership Development', icon: Users },
  { name: 'Event Marketing', icon: Star },
  { name: 'Competitive Strategy', icon: Trophy },
  { name: 'Public Relations', icon: Megaphone },
  { name: 'Financial Literacy', icon: TrendingUp },
  { name: 'SMART Goal Setting', icon: Target },
  { name: 'Team Management', icon: Users },
  { name: 'Content Creation', icon: BookOpen },
]

export const languages = [
  { name: 'English', level: 'Native or Bilingual' },
  { name: 'Spanish', level: 'Limited Working Proficiency' },
]

export const experience = [
  {
    org: 'DECA Inc.',
    role: 'VP of Finance',
    period: 'May 2026 — Present',
    duration: '1 month',
    location: 'Cumming, GA',
    icon: TrendingUp,
    badge: 'Current',
    points: [
      'Lead chapter financial strategy, budgeting, and fundraising oversight.',
      'Coordinate financial reporting and goal tracking with the officer team.',
    ],
    color: 'from-cyan-glow to-cyan-soft',
  },
  {
    org: 'DECA Inc.',
    role: 'Underclassmen Representative',
    period: 'Aug 2025 — May 2026',
    duration: '10 months',
    location: 'Cumming, GA',
    icon: Users,
    points: [
      'Top 10 in Finance Cluster Exam at Georgia DECA’s Fall Leadership Development Conference.',
      'Top 20 in Personal Financial Literacy at Georgia DECA’s State Leadership Development Conference.',
    ],
    color: 'from-cyan-glow to-blue-400',
  },
  {
    org: 'DECA Inc.',
    role: 'Vice President',
    period: 'Dec 2024 — Aug 2025',
    duration: '9 months',
    location: 'Cumming, GA',
    icon: ShieldCheck,
    points: [
      'Organized State Career Development Conference logistics and student delegations.',
      'Administered new protocols regarding officer attendance and accountability.',
      'Helped establish the 2025–2026 officer team and transition plan.',
    ],
    color: 'from-blue-400 to-cyan-glow',
  },
  {
    org: 'DECA Inc.',
    role: 'VP of Public Relations',
    period: 'May 2024 — Dec 2024',
    duration: '8 months',
    location: 'Cumming, GA',
    icon: Megaphone,
    points: [
      'Directed school store operations — inventory, pricing, and member shifts.',
      'Developed a volunteer system for VCMS DECA members.',
    ],
    color: 'from-cyan-soft to-cyan-glow',
  },
  {
    org: 'DECA Inc.',
    role: 'Member & Competitor',
    period: 'Aug 2022 — May 2024',
    duration: '1 yr 10 mo',
    location: 'Cumming, GA',
    icon: Briefcase,
    points: [
      'Member of Vickery Creek Middle School DECA chapter.',
      'Member of Marketing & Finance Committee.',
      'State-level competitor.',
    ],
    color: 'from-cyan-glow to-cyan-deep',
  },
  {
    org: 'Future Business Leaders of America (FBLA)',
    role: 'Member & Competitor',
    period: 'Aug 2025 — Present',
    duration: '10 months',
    location: 'Cumming, GA',
    icon: Award,
    points: [
      'Top 10 Introduction to Business Procedures in Region (State Qualifier).',
      'December WFHS FBLA Member of the Month ’25–’26.',
    ],
    color: 'from-cyan-glow to-purple-400',
  },
  {
    org: 'World Champion Taekwondo',
    role: 'Instructor',
    period: 'Sep 2025 — Present',
    duration: '9 months',
    location: 'Cumming, GA',
    icon: Star,
    points: [
      'Instruct students in technique, discipline, and goal-setting.',
      'Build leadership skills through teaching and mentorship.',
    ],
    color: 'from-cyan-soft to-blue-400',
  },
  {
    org: 'West Forsyth High School (Georgia)',
    role: 'Student Government Member',
    period: 'Feb 2026 — Present',
    duration: '4 months',
    location: 'Cumming, GA',
    icon: Users,
    points: [
      'Represent the student body in school-wide initiatives and events.',
    ],
    color: 'from-cyan-glow to-cyan-soft',
  },
]

export const education = [
  {
    school: 'West Forsyth High School (Georgia)',
    program: 'Business Administration, Management & Operations',
    period: 'Aug 2025 — May 2029',
    icon: GraduationCap,
  },
  {
    school: '3DE Leadership Academy',
    program: 'Business',
    period: 'Aug 2025 — May 2029',
    icon: Building2,
  },
  {
    school: 'Vickery Creek Middle School',
    program: 'Middle School',
    period: 'Aug 2022 — May 2025',
    icon: BookOpen,
  },
]

export const honors = [
  {
    title: 'Top 10 in Finance Cluster Exam',
    detail: 'Georgia DECA’s Fall Leadership Development Conference',
    icon: Trophy,
  },
  {
    title: 'Top 20 in Personal Financial Literacy',
    detail: 'Georgia DECA’s State Leadership Development Conference',
    icon: Medal,
  },
  {
    title: 'Top 10 Introduction to Business Procedures',
    detail: 'In Region — State Qualifier (FBLA)',
    icon: Trophy,
  },
  {
    title: 'WFHS FBLA Member of the Month',
    detail: 'December 2025–26 cohort recognition',
    icon: Star,
  },
]

export const certifications = [
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic Academy',
    icon: Sparkles,
    image: '/certificates/ai-fluency.jpg',
  },
  {
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic Academy',
    icon: Sparkles,
    image: '/certificates/claude-cowork.jpg',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic Academy',
    icon: Sparkles,
    image: '/certificates/claude-code-in-action.jpg',
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic Academy',
    icon: Sparkles,
    image: '/certificates/claude-101.jpg',
  },
]

export const navLinks = [
  { to: '/', label: 'About' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
]
