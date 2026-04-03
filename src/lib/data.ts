export interface Skill {
  name: string;
  category: string;
  percentage: number;
  gradient: string;
}

export interface Project {
  id: number;
  title: string;
  tagline: string;
  category: string;
  tags: string[];
  gradient: string;
  caseStudy: {
    overview: string;
    role: string;
    stack: string[];
    metrics: { label: string; value: string }[];
    process: string[];
  };
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  accent: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  accent: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  accent: string;
}

export const skills: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', percentage: 95, gradient: 'var(--brutal-cyan)' },
  { name: 'TypeScript', category: 'Frontend', percentage: 92, gradient: 'var(--brutal-cyan)' },
  { name: 'Three.js / WebGL', category: 'Frontend', percentage: 88, gradient: 'var(--brutal-cyan)' },
  { name: 'Framer Motion', category: 'Frontend', percentage: 90, gradient: 'var(--brutal-cyan)' },
  { name: 'Tailwind CSS', category: 'Frontend', percentage: 96, gradient: 'var(--brutal-cyan)' },
  { name: 'GSAP', category: 'Frontend', percentage: 85, gradient: 'var(--brutal-cyan)' },
  { name: 'Node.js', category: 'Backend', percentage: 88, gradient: 'var(--brutal-green)' },
  { name: 'Python', category: 'Backend', percentage: 82, gradient: 'var(--brutal-green)' },
  { name: 'PostgreSQL', category: 'Backend', percentage: 85, gradient: 'var(--brutal-green)' },
  { name: 'GraphQL', category: 'Backend', percentage: 80, gradient: 'var(--brutal-green)' },
  { name: 'REST APIs', category: 'Backend', percentage: 93, gradient: 'var(--brutal-green)' },
  { name: 'Docker', category: 'Backend', percentage: 78, gradient: 'var(--brutal-green)' },
  { name: 'UI/UX Design', category: 'Design', percentage: 90, gradient: 'var(--brutal-magenta)' },
  { name: 'Figma', category: 'Design', percentage: 92, gradient: 'var(--brutal-magenta)' },
  { name: 'Design Systems', category: 'Design', percentage: 88, gradient: 'var(--brutal-magenta)' },
  { name: 'Motion Design', category: 'Design', percentage: 85, gradient: 'var(--brutal-magenta)' },
  { name: 'Typography', category: 'Design', percentage: 87, gradient: 'var(--brutal-magenta)' },
  { name: 'Git / GitHub', category: 'Tools', percentage: 94, gradient: 'var(--brutal-orange)' },
  { name: 'CI/CD', category: 'Tools', percentage: 82, gradient: 'var(--brutal-orange)' },
  { name: 'AWS / Vercel', category: 'Tools', percentage: 80, gradient: 'var(--brutal-orange)' },
  { name: 'Linux', category: 'Tools', percentage: 85, gradient: 'var(--brutal-orange)' },
  { name: 'Agile / Scrum', category: 'Tools', percentage: 88, gradient: 'var(--brutal-orange)' },
  { name: 'Performance Optimization', category: 'Tools', percentage: 86, gradient: 'var(--brutal-orange)' },
  { name: 'Accessibility', category: 'Tools', percentage: 84, gradient: 'var(--brutal-orange)' },
  { name: 'Creative Coding', category: 'Creative', percentage: 90, gradient: 'var(--brutal-yellow)' },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'NEURAL CANVAS',
    tagline: 'AI-powered generative art platform with real-time WebGL rendering',
    category: 'Web App',
    tags: ['React', 'Three.js', 'Python', 'TensorFlow'],
    gradient: 'linear-gradient(135deg, var(--brutal-cyan), var(--brutal-magenta))',
    caseStudy: {
      overview: 'Neural Canvas is a generative art platform that combines machine learning with real-time WebGL rendering. Users can create unique artworks by tweaking neural network parameters and see results rendered instantly in 3D space.',
      role: 'Lead Developer & Creative Technologist',
      stack: ['React', 'Three.js', 'TensorFlow.js', 'Node.js', 'PostgreSQL', 'WebGL'],
      metrics: [
        { label: 'Users', value: '12K+' },
        { label: 'Art Generated', value: '85K+' },
        { label: 'Performance', value: '60fps' },
      ],
      process: ['Research & concept validation', 'Neural network architecture design', 'Real-time rendering pipeline', 'User testing & optimization'],
    },
  },
  {
    id: 2,
    title: 'PULSE DASHBOARD',
    tagline: 'Real-time analytics dashboard with brutalist design principles',
    category: 'Dashboard',
    tags: ['Next.js', 'D3.js', 'WebSocket', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, var(--brutal-yellow), var(--brutal-orange))',
    caseStudy: {
      overview: 'Pulse Dashboard reimagines analytics through a neo-brutalist lens. Real-time data streams are visualized through bold, high-contrast charts that prioritize clarity and impact over decorative elements.',
      role: 'Full-Stack Developer',
      stack: ['Next.js', 'D3.js', 'WebSocket', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
      metrics: [
        { label: 'Data Points', value: '2M+/day' },
        { label: 'Latency', value: '<50ms' },
        { label: 'Uptime', value: '99.9%' },
      ],
      process: ['Data architecture planning', 'Real-time streaming setup', 'Visualization prototyping', 'Performance optimization'],
    },
  },
  {
    id: 3,
    title: 'SYNTH VOICE',
    tagline: 'Voice-controlled music synthesizer with Web Audio API',
    category: 'Creative Tool',
    tags: ['React', 'Web Audio', 'GSAP', 'Canvas'],
    gradient: 'linear-gradient(135deg, var(--brutal-green), var(--brutal-cyan))',
    caseStudy: {
      overview: 'Synth Voice is an experimental music tool that uses voice input to control synthesis parameters. Users can sing, hum, or speak to manipulate sound waves in real-time, creating unique audio experiences.',
      role: 'Creative Developer & Sound Designer',
      stack: ['React', 'Web Audio API', 'GSAP', 'Canvas API', 'TypeScript'],
      metrics: [
        { label: 'Voices Processed', value: '45K+' },
        { label: 'Sound Patches', value: '200+' },
        { label: 'Avg Session', value: '8min' },
      ],
      process: ['Audio engine development', 'Voice recognition integration', 'UI/UX design for musicians', 'Cross-browser testing'],
    },
  },
  {
    id: 4,
    title: 'GRID LOCK',
    tagline: 'Collaborative design system with version control for teams',
    category: 'Design Tool',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    gradient: 'linear-gradient(135deg, var(--brutal-magenta), var(--brutal-red))',
    caseStudy: {
      overview: 'Grid Lock is a collaborative design system manager that brings version control principles to UI component libraries. Teams can track changes, resolve conflicts, and maintain design consistency at scale.',
      role: 'Lead Frontend Engineer',
      stack: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Docker', 'GitHub API'],
      metrics: [
        { label: 'Teams', value: '150+' },
        { label: 'Components', value: '5K+' },
        { label: 'Conflicts Resolved', value: '12K+' },
      ],
      process: ['Architecture & API design', 'Conflict resolution algorithm', 'Real-time collaboration', 'Enterprise scaling'],
    },
  },
  {
    id: 5,
    title: 'VOID MARKET',
    tagline: 'Dark-themed NFT marketplace with immersive 3D galleries',
    category: 'Web3',
    tags: ['Next.js', 'Three.js', 'Solidity', 'IPFS'],
    gradient: 'linear-gradient(135deg, var(--brutal-orange), var(--brutal-red))',
    caseStudy: {
      overview: 'Void Market is a curated NFT marketplace featuring immersive 3D gallery experiences. Collectors can browse art in virtual spaces, with each gallery uniquely generated based on the collection theme.',
      role: 'Creative Technologist & 3D Developer',
      stack: ['Next.js', 'Three.js', 'Solidity', 'IPFS', 'Ethers.js', 'Tailwind CSS'],
      metrics: [
        { label: 'Volume', value: '$2.1M' },
        { label: 'Galleries', value: '340+' },
        { label: 'Artists', value: '89' },
      ],
      process: ['Smart contract development', '3D gallery system', 'IPFS integration', 'Security auditing'],
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'NexGen Labs',
    quote: "Mark doesn't just write code — he architects experiences. His ability to blend technical precision with creative vision is genuinely rare. Our platform's engagement doubled after his redesign.",
    accent: 'var(--brutal-cyan)',
  },
  {
    name: 'Marcus Rivera',
    role: 'Product Director',
    company: 'Orbit Studios',
    quote: 'Working with Mark was transformative. He brought a level of craft and attention to detail that elevated our entire product. The Three.js integrations he built are still the most impressive features we ship.',
    accent: 'var(--brutal-yellow)',
  },
  {
    name: 'Elena Vasquez',
    role: 'Design Lead',
    company: 'Forma Collective',
    quote: "Mark bridges the gap between design and engineering like no one else I've worked with. He understands design intent instinctively and translates it into pixel-perfect, performant implementations.",
    accent: 'var(--brutal-magenta)',
  },
  {
    name: 'James Okafor',
    role: 'Founder',
    company: 'Darkmode Dev',
    quote: "Mark's work on our dashboard was phenomenal. He took our vague brief and turned it into something that our users genuinely love. Performance, accessibility, aesthetics — all nailed.",
    accent: 'var(--brutal-green)',
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: '2019',
    title: 'First Line of Code',
    description: 'Started learning HTML, CSS, and JavaScript. Built first portfolio with raw HTML files and fell in love with the web.',
    accent: 'var(--brutal-cyan)',
  },
  {
    year: '2020',
    title: 'React & Design Systems',
    description: 'Dove deep into React ecosystem. Built component libraries and discovered the power of systematic design thinking.',
    accent: 'var(--brutal-green)',
  },
  {
    year: '2021',
    title: 'Creative Coding & Three.js',
    description: 'Explored the intersection of art and code. Started creating WebGL experiments and generative art projects.',
    accent: 'var(--brutal-yellow)',
  },
  {
    year: '2022',
    title: 'First Professional Role',
    description: 'Joined a startup as frontend developer. Shipped production applications serving thousands of users daily.',
    accent: 'var(--brutal-orange)',
  },
  {
    year: '2023',
    title: 'Full-Stack & Leadership',
    description: 'Expanded to full-stack development. Led a team of 5 developers on enterprise design system projects.',
    accent: 'var(--brutal-magenta)',
  },
  {
    year: '2024',
    title: 'Senior Creative Developer',
    description: 'Specialized in creative development and immersive web experiences. Worked with international clients on high-profile projects.',
    accent: 'var(--brutal-red)',
  },
  {
    year: '2025-2026',
    title: 'Building the Future',
    description: 'Pushing boundaries with AI-integrated creative tools, real-time 3D experiences, and open-source contributions to the developer community.',
    accent: 'var(--brutal-cyan)',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Brutalist Renaissance in Web Design',
    excerpt: 'Why raw, honest interfaces are making a comeback — and how to embrace the aesthetic without sacrificing usability.',
    category: 'Design',
    date: '2025-12-15',
    readTime: '6 min read',
    accent: 'var(--brutal-yellow)',
  },
  {
    id: 2,
    title: 'Mastering Three.js: From Zero to 60fps',
    excerpt: 'A practical guide to building performant 3D web experiences, covering particle systems, post-processing, and optimization.',
    category: 'Development',
    date: '2025-11-28',
    readTime: '12 min read',
    accent: 'var(--brutal-cyan)',
  },
  {
    id: 3,
    title: 'Design Engineering: The Missing Discipline',
    excerpt: 'Bridging the gap between design and engineering requires a new mindset. Here is how to cultivate design engineering culture.',
    category: 'Thought Leadership',
    date: '2025-10-05',
    readTime: '8 min read',
    accent: 'var(--brutal-magenta)',
  },
];

export const navItems = [
  { label: 'IDENTIFICATION', id: 'identification' },
  { label: 'PROCESS', id: 'process' },
  { label: 'PROOF', id: 'proof' },
  { label: 'TRUST', id: 'trust' },
  { label: 'THOUGHTS', id: 'thoughts' },
  { label: 'CONTACT', id: 'contact' },
];

export const sectionIds = [
  'hero',
  'identification',
  'process',
  'proof',
  'trust',
  'thoughts',
  'contact',
];
