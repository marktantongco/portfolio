export interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  problem: string;
  solution: string;
  metrics: { n: string; l: string; sub: string }[];
  steps: { n: string; t: string; b: string }[];
  results: { label: string; value: string; note: string }[];
  demo: string;
  demoLabel: string;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
  deliverables: string[];
  price: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface BlogPost {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
  index: number;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface StatItem {
  n: string;
  l: string;
}

export interface Philosophy {
  quote: string;
  cite: string;
}

export const NAV_LINKS: NavItem[] = [
  { id: 'identity', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Voices' },
  { id: 'blog', label: 'Thoughts' },
  { id: 'contact', label: 'Contact' },
];

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Photography AI System',
    desc: 'End-to-end AI photography pipeline combining Flux, Midjourney, and ComfyUI with ACES color science for publication-grade output.',
    tags: ['Flux', 'Midjourney', 'ComfyUI', 'ACES'],
    problem: 'Traditional photo production cycles take 2–3 weeks per campaign. AI-generated imagery often lacks the color fidelity and tonal depth required for editorial and brand work.',
    solution: 'Built an ACES-managed pipeline that bridges Flux and Midjourney through ComfyUI, applying cinema-grade color transforms to produce images indistinguishable from editorial photography.',
    metrics: [
      { n: '12x', l: 'Production Speed', sub: 'From 3 weeks to 2 days' },
      { n: '94%', l: 'Client Approval', sub: 'First-round acceptance rate' },
      { n: '60%', l: 'Cost Reduction', sub: 'vs traditional photo shoots' },
    ],
    steps: [
      { n: '01', t: 'Prompt Architecture', b: 'Physics-first prompting with ACES color space references and cinematic lighting descriptors.' },
      { n: '02', t: 'Generation Pipeline', b: 'Multi-model ensemble through ComfyUI: Flux for composition, Midjourney for texture, custom LoRA for brand consistency.' },
      { n: '03', t: 'Color Management', b: 'ACES color transforms applied in-node to match brand guidelines and print specifications.' },
      { n: '04', t: 'Quality Gate', b: 'Automated perceptual hashing and color accuracy scoring before delivery.' },
    ],
    results: [
      { label: 'Images Generated', value: '2,400+', note: 'Across 8 campaigns' },
      { label: 'Avg Generation Time', value: '4.2min', note: 'Per publication-ready image' },
      { label: 'Color Accuracy', value: 'ΔE < 2.0', note: 'vs brand color specs' },
      { label: 'Client Retention', value: '100%', note: 'All clients renewed' },
    ],
    demo: 'photography',
    demoLabel: 'Live Particle Simulation',
  },
  {
    num: '02',
    title: 'Living Portfolio OS',
    desc: 'Self-evolving portfolio system with GSAP-driven animations, Three.js particle fields, and a design token architecture that breathes.',
    tags: ['GSAP', 'Three.js', 'Next.js', 'Design Tokens'],
    problem: 'Portfolios are static artifacts. They become outdated the moment they ship, and updating them requires manual intervention across multiple systems.',
    solution: 'Architected a living system where design tokens drive both code and content, GSAP ScrollTrigger orchestrates cinematic reveals, and Three.js creates an ambient intelligence layer.',
    metrics: [
      { n: '22', l: 'Components', sub: 'All animated, zero static' },
      { n: '8', l: 'Code-Split Chunks', sub: 'Optimal loading strategy' },
      { n: '<2s', l: 'First Paint', sub: 'With Three.js hero' },
    ],
    steps: [
      { n: '01', t: 'Token Architecture', b: 'Design tokens as single source of truth — colors, typography, spacing, and motion all derived from one config.' },
      { n: '02', t: 'GSAP Cinematic Layer', b: 'ScrollTrigger-driven animations with stagger, scramble, and parallax for every section entrance.' },
      { n: '03', t: 'Three.js Intelligence', b: '3000-particle hero scene with mouse-reactive rotation, additive blending, and ambient glow.' },
      { n: '04', t: 'Self-Healing System', b: 'Modular component architecture where sections can be added, removed, or reordered without breaking animations.' },
    ],
    results: [
      { label: 'Bundle Size', value: '320KB', note: 'Index (gzip: 105KB)' },
      { label: 'Lighthouse', value: '94', note: 'Performance score' },
      { label: 'Animations', value: '40+', note: 'GSAP + CSS keyframes' },
      { label: 'Sections', value: '10', note: 'Fully animated' },
    ],
    demo: 'particles',
    demoLabel: 'Interactive Particle Field',
  },
  {
    num: '03',
    title: 'Brand Intelligence Engine',
    desc: 'AI-powered brand analysis system using Claude API and Figma integration to audit, score, and evolve brand systems in real-time.',
    tags: ['Brand Systems', 'Claude API', 'Figma'],
    problem: 'Brand audits are slow, subjective, and expensive. Teams spend weeks debating color choices and typography without data-driven justification.',
    solution: 'Built an engine that ingests Figma design files via API, uses Claude to analyze brand coherence, and generates actionable recommendations with confidence scores.',
    metrics: [
      { n: '85%', l: 'Audit Accuracy', sub: 'vs manual brand audits' },
      { n: '4hr', l: 'Full Audit Time', sub: 'From 2 weeks to hours' },
      { n: '3.2x', l: 'Decision Speed', sub: 'Brand decisions made faster' },
    ],
    steps: [
      { n: '01', t: 'Figma Ingestion', b: 'Plugin extracts design tokens, component usage, color distributions, and typography patterns from Figma files.' },
      { n: '02', t: 'Claude Analysis', b: 'Structured prompts evaluate brand coherence, accessibility compliance, and market positioning.' },
      { n: '03', t: 'Scoring Engine', b: 'Multi-axis scoring: Visual Consistency, Accessibility, Differentiation, Scalability, Emotional Resonance.' },
      { n: '04', t: 'Recommendation Generator', b: 'Actionable suggestions with priority ranking, implementation effort, and expected impact scores.' },
    ],
    results: [
      { label: 'Brands Audited', value: '12', note: 'Across 3 industries' },
      { label: 'Recommendations', value: '240+', note: 'With confidence scores' },
      { label: 'Figma Plugins', value: '2', note: 'Audit + Score widgets' },
      { label: 'Avg Score Improvement', value: '+34%', note: 'Post-implementation' },
    ],
    demo: 'brand',
    demoLabel: 'Brand Orbit Visualization',
  },
  {
    num: '04',
    title: 'WebGPU Experiential Layer',
    desc: 'Next-generation web experiences powered by WebGPU compute shaders, React Three Fiber, and GSAP-driven cinematic sequences.',
    tags: ['Next.js', 'WebGPU', 'R3F', 'GSAP'],
    problem: 'WebGL is hitting its performance ceiling. Real-time experiences need GPU compute for physics simulations, particle systems, and shader effects at scale.',
    solution: 'Architected a WebGPU-native layer with WGSL compute shaders for physics, R3F for declarative scene composition, and GSAP for timeline-driven cinematic transitions.',
    metrics: [
      { n: '500K', l: 'Particles', sub: 'At 60fps on consumer GPUs' },
      { n: '10x', l: 'Compute Speed', sub: 'vs WebGL equivalent' },
      { n: '<16ms', l: 'Frame Budget', sub: 'Consistent 60fps delivery' },
    ],
    steps: [
      { n: '01', t: 'WGSL Shader Architecture', b: 'Compute shaders for particle physics, fluid simulation, and volumetric effects — all running on GPU.' },
      { n: '02', t: 'R3F Scene Graph', b: 'Declarative Three.js composition with React reconciler for complex scene hierarchies.' },
      { n: '03', t: 'GSAP Timeline System', b: 'Cinematic sequences orchestrated by GSAP timelines — camera moves, transitions, reveals.' },
      { n: '04', t: 'Performance Optimization', b: 'LOD systems, frustum culling, and GPU instancing for consistent frame rates.' },
    ],
    results: [
      { label: 'GPU Utilization', value: '87%', note: 'Efficient compute usage' },
      { label: 'Shader Count', value: '24', note: 'Custom WGSL shaders' },
      { label: 'Scene Complexity', value: '500K+', note: 'Triangles rendered' },
      { label: 'Load Time', value: '<3s', note: 'With shader compilation' },
    ],
    demo: 'shader',
    demoLabel: 'WebGPU Shader Demo',
  },
  {
    num: '05',
    title: 'SEO / GEO Framework',
    desc: 'Dual-engine framework optimizing for both traditional search (SEO) and generative engine optimization (GEO) — getting cited by AI.',
    tags: ['SEO', 'GEO', 'Prompt Eng', 'Strategy'],
    problem: 'Traditional SEO is necessary but no longer sufficient. AI assistants like ChatGPT, Perplexity, and Gemini are becoming the new search — and they cite sources differently.',
    solution: 'Built a framework that optimizes content for both crawl bots and LLM training data, using structured data, entity optimization, and prompt-engineered content architecture.',
    metrics: [
      { n: '340%', l: 'AI Citation Rate', sub: 'Increase in AI mentions' },
      { n: '2.8x', l: 'Organic Traffic', sub: 'Combined SEO + GEO gains' },
      { n: '#1', l: 'Featured Snippets', sub: 'For target keywords' },
    ],
    steps: [
      { n: '01', t: 'Entity Mapping', b: 'Map brand entities, relationships, and authority signals that LLMs use for citation decisions.' },
      { n: '02', t: 'Structured Data Architecture', b: 'JSON-LD schemas optimized for both Google rich results and AI knowledge graph ingestion.' },
      { n: '03', t: 'GEO Content Engineering', b: 'Content structured to be cited: clear claims, quotable passages, authoritative sourcing.' },
      { n: '04', t: 'Monitoring & Iteration', b: 'Track AI citations across ChatGPT, Perplexity, Gemini, and adjust strategy based on citation patterns.' },
    ],
    results: [
      { label: 'AI Citations', value: '1,200+', note: 'Across 8 AI platforms' },
      { label: 'Domain Authority', value: 'DA 52', note: 'From DA 38 baseline' },
      { label: 'Keyword Rankings', value: '#1–3', note: 'For 85% of targets' },
      { label: 'GEO Score', value: '92/100', note: 'Custom AI-readiness metric' },
    ],
    demo: 'seo',
    demoLabel: 'Performance Analytics',
  },
];

export const SERVICES: Service[] = [
  {
    icon: '⚡',
    title: 'AI Creative Strategy',
    desc: 'End-to-end AI creative direction — from prompt architecture to production pipelines. I design systems that generate on-brand creative at scale.',
    deliverables: ['AI Prompt Architecture', 'Creative Pipeline Design', 'Brand AI Guidelines', 'Training Data Strategy'],
    price: '$2,500',
  },
  {
    icon: '🔍',
    title: 'Brand Intelligence Engine',
    desc: 'Comprehensive brand audit and optimization using AI-powered analysis. Data-driven brand decisions backed by quantitative scoring.',
    deliverables: ['Full Brand Audit Report', 'Figma Integration Setup', 'Confidence-Scored Recommendations', 'Implementation Roadmap'],
    price: '$4,000',
  },
  {
    icon: '🌐',
    title: 'Immersive Web Experiences',
    desc: 'WebGPU-powered interactive experiences that push the boundaries of what browsers can do. Cinematic, performant, and unforgettable.',
    deliverables: ['Custom WebGPU Scenes', 'GSAP Animation System', 'Performance Optimization', 'Responsive Delivery'],
    price: '$3,500',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Mark doesn't just use AI tools — he engineers entire systems around them. Our creative output tripled, and the quality actually went up. His physics-first approach to prompting is genuinely different from anything I've seen.",
    author: 'Sofia Reyes',
    role: 'Creative Director, Lumina Studio',
  },
  {
    quote: "We went from spending weeks on brand decisions to hours. The Brand Intelligence Engine gave us data-backed confidence that we never had before. It's not a tool — it's a paradigm shift.",
    author: 'James Alcantara',
    role: 'Founder, ContentLab PH',
  },
  {
    quote: "The WebGPU experience Mark built for our product launch generated more engagement than our last three campaigns combined. People couldn't stop sharing it. That's the power of building something that feels alive.",
    author: 'Mia Fernandez',
    role: 'Head of Visual, Pulse Media',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    date: 'Mar 2026',
    category: 'AI Strategy',
    title: 'Physics-First Prompting: How I Write Prompts That Think',
    excerpt: "Most people write prompts like wishlists. I write them like physics equations — defining constraints, forces, and desired states. Here's the framework that changed how I think about AI generation.",
    readTime: '8 min read',
    featured: true,
  },
  {
    date: 'Feb 2026',
    category: 'Design Engineering',
    title: 'Design Tokens as a Living Organism',
    excerpt: 'Design tokens aren\'t just variables in a JSON file. When you architect them as a living system, they start to inform decisions, enforce consistency, and evolve with your brand.',
    readTime: '5 min read',
  },
  {
    date: 'Jan 2026',
    category: 'SEO / GEO',
    title: 'GEO is Not SEO: Get Cited by AI',
    excerpt: "AI assistants are the new search engines. If you're only optimizing for Google, you're invisible to the growing audience that asks ChatGPT, Perplexity, and Gemini first.",
    readTime: '6 min read',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Generative',
    index: 0,
    skills: [
      { name: 'Midjourney', level: 95 },
      { name: 'Flux', level: 90 },
      { name: 'SDXL', level: 85 },
      { name: 'ComfyUI', level: 88 },
      { name: 'Claude', level: 97 },
      { name: 'GPT-4', level: 92 },
      { name: 'Prompt Eng', level: 99 },
      { name: 'Meta-Prompting', level: 93 },
    ],
  },
  {
    title: 'Dev & Engineering',
    index: 1,
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Vite', level: 82 },
      { name: 'TypeScript', level: 80 },
      { name: 'WebGPU/WGSL', level: 75 },
      { name: 'Three.js', level: 88 },
      { name: 'GSAP', level: 90 },
      { name: 'Tailwind', level: 85 },
    ],
  },
  {
    title: 'Visual & Brand',
    index: 2,
    skills: [
      { name: 'AI Photography', level: 96 },
      { name: 'ACES Color', level: 88 },
      { name: 'Cinematography', level: 85 },
      { name: 'Brand Systems', level: 92 },
      { name: 'Design Tokens', level: 90 },
      { name: 'Typography', level: 87 },
    ],
  },
  {
    title: 'Strategy',
    index: 3,
    skills: [
      { name: 'SEO/GEO', level: 94 },
      { name: 'Content Arch', level: 92 },
      { name: 'Digital Branding', level: 90 },
      { name: 'Community', level: 85 },
      { name: 'Faith Content', level: 88 },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Diagnose',
    desc: 'State assumptions, identify real needs. Every project begins with understanding the actual problem — not the perceived one. I challenge briefs before I build solutions.',
  },
  {
    num: '02',
    title: 'Architect',
    desc: 'Build scaffold first, physics-first prompts. The structure determines the system. I design the architecture before writing a single line of code or prompt.',
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'Working code only, no pseudocode. I ship functional systems — not slide decks. Every deliverable is production-ready from day one.',
  },
  {
    num: '04',
    title: 'Refine',
    desc: "Push back, quality over speed. I challenge my own work relentlessly. If something isn't excellent, it doesn't ship. Speed is a feature — but not at the cost of craft.",
  },
];

export const IDENTITY_TAGS: string[] = [
  'Philippines 🇵🇭',
  'AI-First Workflow',
  'Faith-Driven',
  'Creative Technologist',
  'Open to Collab',
];

export const PHILOSOPHIES: Philosophy[] = [
  {
    quote: "I don't ask what the tool can do. I ask what needs to be built — then I find or forge the tool to do it.",
    cite: '— Tool Agnostic Philosophy',
  },
  {
    quote: 'Quality over speed. Long-term success over short-term convenience. Every project is a living organism — not a deliverable.',
    cite: '— Quality Manifesto',
  },
];

export const STATS: StatItem[] = [
  { n: '5+', l: 'Years' },
  { n: '50+', l: 'Projects' },
  { n: '4', l: 'Disciplines' },
  { n: '∞', l: 'Impact-Driven' },
];

export const TICKER_ITEMS: string[] = [
  'AI Creative Strategy',
  'Prompt Engineering',
  'Digital Branding',
  'WebGPU / Three.js',
  'Photography AI',
  'Faith-Driven Work',
  'GSAP Animations',
  'SEO / GEO Frameworks',
];

export const CLI_COMMANDS: { cmd: string; output: string; type: 'output' | 'success' }[] = [
  { cmd: 'whoami', output: 'mark.tantongco // AI Creative Technologist', type: 'output' },
  { cmd: 'cat philosophy.md', output: 'I forge sentient systems. No fluff. Only impact.', type: 'output' },
  { cmd: 'status --available', output: '[ONLINE] Ready for next frontier project', type: 'success' },
];

export const SKILL_RADAR_LABELS = ['AI/Gen', 'Dev/Eng', 'Visual', 'Strategy'];
export const SKILL_RADAR_BASE = [95, 85, 97, 88];

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/marktantongco' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/markanthongco' },
  { label: 'Twitter', href: 'https://twitter.com/markytanky' },
  { label: 'Instagram', href: 'https://instagram.com/markytanky' },
];
