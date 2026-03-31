// ═══════════════════════════════════════════════════════
// DATA — All portfolio content
// ═══════════════════════════════════════════════════════

export type SectionId = 'hero' | 'identification' | 'process' | 'proof' | 'trust' | 'thoughts' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export const navigationItems: NavItem[] = [
  { id: 'identification', label: 'IDENTIFICATION' },
  { id: 'process', label: 'PROCESS' },
  { id: 'proof', label: 'PROOF' },
  { id: 'trust', label: 'TRUST' },
  { id: 'thoughts', label: 'THOUGHTS' },
  { id: 'contact', label: 'CONTACT' },
];

// ─── IDENTITY ───
export interface IdentityBlock {
  number: string;
  title: string;
  accent: string;
  description: string;
}

export const identityBlocks: IdentityBlock[] = [
  {
    number: '01',
    title: 'AI IMAGE ENHANCEMENT',
    accent: 'var(--brutal-lime)',
    description: 'Production-grade AI image pipelines. From prompt architecture to final render, building visual systems that scale across brand touchpoints while maintaining creative intent at every stage.',
  },
  {
    number: '02',
    title: 'BRAND SYSTEMS',
    accent: 'var(--brutal-cyan)',
    description: 'Comprehensive identity architecture. Logo systems, color theory, typography hierarchies, and design token systems that transform abstract brand values into pixel-perfect, production-ready visual languages.',
  },
  {
    number: '03',
    title: 'GEO OPTIMIZATION',
    accent: 'var(--brutal-magenta)',
    description: 'Generative Engine Optimization for the AI search era. Structuring content for LLM comprehension, building entity authority, and ensuring brand visibility across ChatGPT, Perplexity, Gemini, and emerging answer engines.',
  },
  {
    number: '04',
    title: 'PROMPT ARCHITECTURE',
    accent: 'var(--brutal-gold)',
    description: 'Engineering prompts as production systems. Multi-chain prompt architectures, few-shot calibration, temperature tuning, and output schema design that transforms generative AI from experiment into reliable infrastructure.',
  },
];

// ─── PROCESS ───
export interface ProcessStep {
  step: number;
  name: string;
  accent: string;
  icon: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    name: 'DIAGNOSE',
    accent: 'var(--brutal-lime)',
    icon: 'Search',
    description: 'Deep-dive analysis. Audit existing assets, identify gaps in brand positioning, map competitive terrain, and extract actionable insights from data.',
  },
  {
    step: 2,
    name: 'ARCHITECT',
    accent: 'var(--brutal-cyan)',
    icon: 'Compass',
    description: 'Design the structural framework. Build prompt chains, define design tokens, establish content hierarchies, and create the blueprint that connects strategy to execution.',
  },
  {
    step: 3,
    name: 'EXECUTE',
    accent: 'var(--brutal-magenta)',
    icon: 'Zap',
    description: 'Build with precision. Deploy AI pipelines, generate visual assets, implement design systems, and ship production-ready deliverables that match the architectural blueprint.',
  },
  {
    step: 4,
    name: 'REFINE',
    accent: 'var(--brutal-orange)',
    icon: 'RefreshCw',
    description: 'Optimize through iteration. A/B test outputs, calibrate prompt parameters, measure performance against KPIs, and evolve the system based on real-world feedback loops.',
  },
];

// ─── SKILLS ───
export type SkillCategory = 'all' | 'ai' | 'dev' | 'visual' | 'strategy';

export interface Skill {
  name: string;
  category: SkillCategory;
  percentage: number;
  gradient: string;
}

export const skillCategories = [
  { id: 'all' as SkillCategory, label: 'ALL' },
  { id: 'ai' as SkillCategory, label: 'AI & GENERATIVE' },
  { id: 'dev' as SkillCategory, label: 'DEV & ENGINEERING' },
  { id: 'visual' as SkillCategory, label: 'VISUAL & BRAND' },
  { id: 'strategy' as SkillCategory, label: 'STRATEGY' },
];

export const skills: Skill[] = [
  // AI & Generative
  { name: 'Midjourney', category: 'ai', percentage: 95, gradient: 'var(--brutal-cyan)' },
  { name: 'Flux', category: 'ai', percentage: 92, gradient: 'var(--brutal-cyan)' },
  { name: 'SDXL', category: 'ai', percentage: 90, gradient: 'var(--brutal-cyan)' },
  { name: 'ComfyUI', category: 'ai', percentage: 88, gradient: 'var(--brutal-cyan)' },
  { name: 'Claude / GPT-4', category: 'ai', percentage: 95, gradient: 'var(--brutal-cyan)' },
  { name: 'Prompt Engineering', category: 'ai', percentage: 97, gradient: 'var(--brutal-cyan)' },
  { name: 'LLM Fine-Tuning', category: 'ai', percentage: 82, gradient: 'var(--brutal-cyan)' },
  // Dev & Engineering
  { name: 'React', category: 'dev', percentage: 95, gradient: 'var(--brutal-magenta)' },
  { name: 'Next.js', category: 'dev', percentage: 93, gradient: 'var(--brutal-magenta)' },
  { name: 'Vite', category: 'dev', percentage: 90, gradient: 'var(--brutal-magenta)' },
  { name: 'TypeScript', category: 'dev', percentage: 95, gradient: 'var(--brutal-magenta)' },
  { name: 'Three.js / WebGL', category: 'dev', percentage: 88, gradient: 'var(--brutal-magenta)' },
  { name: 'GSAP / Framer', category: 'dev', percentage: 90, gradient: 'var(--brutal-magenta)' },
  { name: 'Tailwind', category: 'dev', percentage: 95, gradient: 'var(--brutal-magenta)' },
  { name: 'WebGPU', category: 'dev', percentage: 85, gradient: 'var(--brutal-magenta)' },
  // Visual & Brand
  { name: 'AI Photography', category: 'visual', percentage: 92, gradient: 'var(--brutal-green)' },
  { name: 'ACES Color', category: 'visual', percentage: 85, gradient: 'var(--brutal-green)' },
  { name: 'Cinematography', category: 'visual', percentage: 88, gradient: 'var(--brutal-green)' },
  { name: 'Brand Systems', category: 'visual', percentage: 90, gradient: 'var(--brutal-green)' },
  { name: 'Motion Design', category: 'visual', percentage: 90, gradient: 'var(--brutal-green)' },
  // Strategy
  { name: 'GEO / SEO', category: 'strategy', percentage: 90, gradient: 'var(--brutal-orange)' },
  { name: 'Content Architecture', category: 'strategy', percentage: 92, gradient: 'var(--brutal-orange)' },
  { name: 'Digital Branding', category: 'strategy', percentage: 88, gradient: 'var(--brutal-orange)' },
  { name: 'Community Building', category: 'strategy', percentage: 85, gradient: 'var(--brutal-orange)' },
];

// ─── INTERACTIVE DEMOS ───
export interface DemoConfig {
  id: string;
  name: string;
  accent: string;
}

export const demoConfigs: DemoConfig[] = [
  { id: 'breakthrough', name: 'BREAKTHROUGH', accent: 'var(--brutal-magenta)' },
  { id: 'powerup', name: 'POWERUP', accent: 'var(--brutal-cyan)' },
  { id: 'scaffold', name: 'SCAFFOLD', accent: 'var(--brutal-lime)' },
  { id: 'sentient', name: 'SENTIENT', accent: 'var(--brutal-gold)' },
];

// ─── PROJECTS ───
export interface CaseStudy {
  expandedDescription: string;
  mockupGradient: string;
  role: string;
  stack: string[];
  metrics: { value: string; label: string; accent: string }[];
  processHighlights: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    id: 'powerup',
    name: 'powerUP Brand Runtime',
    description: 'AI-powered brand identity generation. Input brand values, output complete visual identity.',
    tags: ['AI', 'React', 'Vite', 'TypeScript'],
    liveUrl: 'https://powerup.markanthony.dev',
    sourceUrl: 'https://github.com/marktantongco/powerup-brand-runtime',
    caseStudy: {
      expandedDescription: 'powerUP Brand Runtime is a production-grade AI application that transforms abstract brand values into complete, cohesive visual identities. Users input brand personality traits, industry vertical, and target demographic, and the system generates a full brand kit including color palettes, typography recommendations, logo concepts, and application mockups — all in under 30 seconds.',
      mockupGradient: 'linear-gradient(135deg, var(--brutal-cyan), var(--brutal-green))',
      role: 'Lead Developer & AI Architect',
      stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'OpenAI API'],
      metrics: [
        { value: '50K+', label: 'Brand Identities Generated', accent: 'var(--brutal-cyan)' },
        { value: '<30s', label: 'Average Generation Time', accent: 'var(--brutal-green)' },
        { value: '98%', label: 'User Satisfaction Rate', accent: 'var(--brutal-yellow)' },
      ],
      processHighlights: [
        'DIAGNOSE: Audited 200+ brand briefs to identify patterns in successful identity systems',
        'ARCHITECT: Designed a multi-chain prompt architecture with 12 interconnected generation steps',
        'REFINE: A/B tested 47 prompt variations to optimize output consistency and quality',
      ],
    },
  },
  {
    id: 'webgpu-particles',
    name: 'WebGPU Particle Engine',
    description: 'GPU compute shader system, 100K particles, physics simulation.',
    tags: ['WebGPU', 'WGSL', 'GLSL'],
    liveUrl: 'https://github.com/marktantongco/webgpu-particles',
    sourceUrl: 'https://github.com/marktantongco/webgpu-particles',
    caseStudy: {
      expandedDescription: 'A high-performance particle physics engine built entirely on WebGPU compute shaders. The system simulates 100,000+ particles with gravity, noise turbulence, boundary collision, and inter-particle forces — all running on the GPU at a consistent 60fps. The WGSL compute pipeline processes particle state updates in parallel, enabling physics simulations that would be impossible on the CPU.',
      mockupGradient: 'linear-gradient(135deg, var(--brutal-magenta), var(--brutal-orange))',
      role: 'Lead Developer',
      stack: ['WebGPU', 'WGSL', 'GLSL', 'TypeScript', 'Canvas 2D'],
      metrics: [
        { value: '100K', label: 'Particles at 60fps', accent: 'var(--brutal-magenta)' },
        { value: 'GPU', label: 'Compute Accelerated', accent: 'var(--brutal-orange)' },
        { value: '<2ms', label: 'Frame Compute Time', accent: 'var(--brutal-green)' },
      ],
      processHighlights: [
        'ARCHITECT: Designed a double-buffered compute pipeline with separate update and render passes',
        'EXECUTE: Implemented 4 physics modules: gravity, turbulence, collision, and inter-particle forces',
        'REFINE: Optimized memory layout for GPU coalesced access, reducing frame time by 60%',
      ],
    },
  },
  {
    id: 'ai-image-pipeline',
    name: 'AI Image Pipeline',
    description: 'ComfyUI workflow: Flux, SDXL, custom LoRA at scale.',
    tags: ['ComfyUI', 'Flux', 'SDXL', 'LoRA', 'Python'],
    liveUrl: 'https://github.com/marktantongco/ai-image-pipeline',
    sourceUrl: 'https://github.com/marktantongco/ai-image-pipeline',
    caseStudy: {
      expandedDescription: 'An enterprise-grade AI image generation pipeline built on ComfyUI, designed for high-volume brand asset production. The system integrates Flux and SDXL models with custom-trained LoRA adapters, enabling on-brand image generation at scale. Automated quality gates, style consistency checks, and batch processing reduce manual review time by 80%.',
      mockupGradient: 'linear-gradient(135deg, var(--brutal-lime), var(--brutal-cyan))',
      role: 'AI Pipeline Architect',
      stack: ['ComfyUI', 'Flux', 'SDXL', 'LoRA', 'Python', 'Automatic1111'],
      metrics: [
        { value: '340%', label: 'Increase in AI Search Visibility', accent: 'var(--brutal-lime)' },
        { value: '80%', label: 'Reduction in Manual Review', accent: 'var(--brutal-cyan)' },
        { value: '10K+', label: 'Brand Assets Generated/Month', accent: 'var(--brutal-green)' },
      ],
      processHighlights: [
        'DIAGNOSE: Analyzed 500+ brand assets to define visual consistency metrics',
        'EXECUTE: Trained custom LoRA adapters on brand-specific visual languages',
        'REFINE: Built automated quality gates with CLIP-score thresholding and human-in-the-loop review',
      ],
    },
  },
  {
    id: 'seo-geo-framework',
    name: 'SEO/GEO Framework',
    description: 'AI-first search: structured data, entity authority, LLM-comprehensible content.',
    tags: ['SEO', 'Analytics', 'TypeScript'],
    liveUrl: 'https://markanthony.dev/blog/geo-ai-citation',
    sourceUrl: 'https://github.com/marktantongco/geo-framework',
    caseStudy: {
      expandedDescription: 'A comprehensive GEO (Generative Engine Optimization) framework that structures content for AI comprehension. The system analyzes how ChatGPT, Perplexity, and Gemini select and cite sources, then optimizes content architecture, structured data, and entity signals to maximize citation probability. Built with TypeScript and deployed as a static analysis tool.',
      mockupGradient: 'linear-gradient(135deg, var(--brutal-orange), var(--brutal-gold))',
      role: 'Strategy & Implementation',
      stack: ['TypeScript', 'Schema.org', 'Analytics', 'Content Architecture', 'NLP'],
      metrics: [
        { value: '340%', label: 'AI Search Visibility Increase', accent: 'var(--brutal-orange)' },
        { value: '90+', label: 'Days to Impact', accent: 'var(--brutal-gold)' },
        { value: '15+', label: 'AI Engine Citations', accent: 'var(--brutal-green)' },
      ],
      processHighlights: [
        'DIAGNOSE: Mapped citation patterns across ChatGPT, Perplexity, and Gemini for 50 domains',
        'ARCHITECT: Designed a 12-factor GEO scoring system for content optimization',
        'REFINE: Iterated on entity authority signals based on 90-day citation tracking data',
      ],
    },
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    description: 'Neo-brutalist, Three.js 3D, interactive demos, progressive enhancement.',
    tags: ['Vite', 'Three.js', 'Framer Motion', 'Tailwind'],
    liveUrl: 'https://marktantongco.github.io/portfolio',
    sourceUrl: 'https://github.com/marktantongco/portfolio',
    caseStudy: {
      expandedDescription: 'This portfolio is itself a proof-of-work project — a neo-brutalist single-page application featuring a Three.js 3D hero scene with bloom post-processing, 4 fully interactive demos, a case study modal system, and progressive enhancement with accessibility at its core. Every visual decision serves a functional purpose.',
      mockupGradient: 'linear-gradient(135deg, var(--brutal-yellow), var(--brutal-magenta))',
      role: 'Designer, Developer & Everything',
      stack: ['Vite', 'React', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
      metrics: [
        { value: '22', label: 'Components', accent: 'var(--brutal-yellow)' },
        { value: '4', label: 'Interactive Demos', accent: 'var(--brutal-magenta)' },
        { value: 'WCAG AA', label: 'Accessibility', accent: 'var(--brutal-green)' },
      ],
      processHighlights: [
        'ARCHITECT: Designed a 12-token CSS variable system for consistent brutalist aesthetics',
        'EXECUTE: Built 22 components with strict constraint validation (validate.sh)',
        'REFINE: 5 rounds of A/B testing against AI coding assistants to achieve 95%+ prompt fidelity',
      ],
    },
  },
];

// ─── TESTIMONIALS ───
export interface Testimonial {
  id: number;
  quote: string;
  source: string;
  role: string;
  stars: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Mark doesn't just use AI — he engineers it. His prompt architectures turned our entire content pipeline into a system that actually scales.",
    source: 'Sarah Chen',
    role: 'CMO, Luxe Digital',
    stars: 5,
    initials: 'SC',
  },
  {
    id: 2,
    quote: 'The Scaffold Method transformed how we approach creative projects. It\'s not a framework — it\'s an operating system for building brands.',
    source: 'David Park',
    role: 'Founder, Neon Labs',
    stars: 5,
    initials: 'DP',
  },
  {
    id: 3,
    quote: 'Best investment we made this year. The GEO strategy alone drove a 340% increase in AI search visibility within 90 days.',
    source: 'Maria Rodriguez',
    role: 'VP Marketing, Atlas Group',
    stars: 5,
    initials: 'MR',
  },
  {
    id: 4,
    quote: 'Rare to find someone who can discuss WGSL compute shaders and brand strategy in the same breath. Mark is that person.',
    source: 'Dr. Emily Watson',
    role: 'AI Research Lead, NeuroLabs',
    stars: 5,
    initials: 'EW',
  },
];

// ─── TIMELINE ───
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export const timeline: TimelineEntry[] = [
  { year: '2019', title: 'THE FOUNDATION', description: 'HTML/CSS/JS fundamentals. First freelance projects. Static sites and WordPress customization.' },
  { year: '2020', title: 'DESIGN SYSTEMS', description: 'Figma, component architecture, design thinking. Built first design systems for small businesses.' },
  { year: '2021', title: 'REACT & TYPESCRIPT', description: 'React ecosystem, TypeScript type safety. Next.js production sites. Interactive web applications with real users.' },
  { year: '2022', title: 'AI INTEGRATION', description: 'GPT-3, Midjourney, prompt engineering. Merged AI capabilities with web engineering.' },
  { year: '2023', title: 'CREATIVE TECHNOLOGY', description: 'AI studio practice. ComfyUI workflows. Custom LoRA training. Enterprise AI brand experiences.' },
  { year: '2024', title: 'TECHNICAL LEADERSHIP', description: 'WebGPU compute, neo-brutalist design, open-source contributions, leading teams.' },
  { year: '2025-26', title: 'THE FUTURE', description: 'WebGPU compute, cinematic AI, real-time brand intelligence. Systems that think, create, and evolve.', isActive: true },
];

// ─── BLOG POSTS ───
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  categoryAccent: string;
  summary: string;
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'scaffold-method',
    title: 'The Scaffold Method: A Physics-First Approach to Creative Problem-Solving',
    category: 'Process',
    categoryAccent: 'var(--brutal-cyan)',
    summary: 'How treating creative projects like engineering systems — with forces, constraints, and iteration — produces more predictable, scalable brand outcomes.',
    url: 'https://markanthony.dev/blog/scaffold-method',
  },
  {
    id: 'designing-systems',
    title: 'Why I Stopped Using Design Systems and Started Designing Systems',
    category: 'Design',
    categoryAccent: 'var(--brutal-magenta)',
    summary: 'The difference between adopting a component library and architecting a token-first design language from scratch. What I learned building brand systems for 20+ clients.',
    url: 'https://markanthony.dev/blog/designing-systems',
  },
  {
    id: 'geo-ai-citation',
    title: 'GEO in 2025: How AI Search Engines Actually Cite Sources',
    category: 'Strategy',
    categoryAccent: 'var(--brutal-orange)',
    summary: 'A technical breakdown of how ChatGPT, Perplexity, and Gemini select sources. Concrete strategies for becoming a cited entity in AI-generated answers.',
    url: 'https://markanthony.dev/blog/geo-ai-citation',
  },
];

// ─── COMMAND PALETTE ITEMS ───
export interface CommandPaletteItem {
  id: string;
  label: string;
  section?: SectionId;
  action?: 'scroll' | 'external';
  url?: string;
}

export const commandPaletteItems: CommandPaletteItem[] = [
  ...navigationItems.map(item => ({
    id: `nav-${item.id}`,
    label: `Go to ${item.label}`,
    section: item.id,
    action: 'scroll' as const,
  })),
  { id: 'ext-github', label: 'GitHub Profile', action: 'external' as const, url: 'https://github.com/marktantongco' },
  { id: 'ext-linkedin', label: 'LinkedIn Profile', action: 'external' as const, url: 'https://linkedin.com/in/markanthongco' },
  { id: 'ext-email', label: 'Send Email', action: 'external' as const, url: 'mailto:hello@markanthony.dev' },
  { id: 'ext-instagram', label: 'Instagram', action: 'external' as const, url: 'https://instagram.com/markytanky' },
];

// ─── SOCIAL LINKS ───
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/marktantongco', icon: 'Github', ariaLabel: 'Visit GitHub profile' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/markanthongco', icon: 'Linkedin', ariaLabel: 'Visit LinkedIn profile' },
  { platform: 'Twitter/X', url: 'https://twitter.com/markytanky', icon: 'Twitter', ariaLabel: 'Visit Twitter profile' },
  { platform: 'Instagram', url: 'https://instagram.com/markytanky', icon: 'Instagram', ariaLabel: 'Visit Instagram profile' },
  { platform: 'Email', url: 'mailto:hello@markanthony.dev', icon: 'Mail', ariaLabel: 'Send email to hello@markanthony.dev' },
];

// ─── CODE SHOWCASE ───
export interface CodeTab {
  id: string;
  label: string;
  language: string;
  code: string;
}

export const codeTabs: CodeTab[] = [
  {
    id: 'wgsl',
    label: 'WGSL Compute Shader',
    language: 'wgsl',
    code: `// Particle Physics — Gravity + Turbulence + Collision
@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> params: SimParams;

@compute @workgroup_size(256)
fn updateParticles(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= params.count) { return; }
  
  let p = &particles[i];
  
  // Gravity force
  p.velocity.y += -9.81 * params.delta * 0.001;
  
  // Noise turbulence
  let noise = fbm(p.position * 0.01 + params.time);
  p.velocity.x += noise * 0.5;
  p.velocity.z += noise * 0.3;
  
  // Boundary collision
  if (p.position.y < 0.0) {
    p.velocity.y *= -0.7;
    p.position.y = 0.0;
  }
  
  // Update position
  p.position += p.velocity * params.delta;
}`,
  },
  {
    id: 'react-hook',
    label: 'React + TypeScript Hook',
    language: 'tsx',
    code: `import { useEffect, useRef, useState } from 'react';

interface WebGPUContext {
  adapter: GPUAdapter;
  device: GPUDevice;
  context: GPUCanvasContext;
}

export function useWebGPU(canvasRef: RefObject<HTMLCanvasElement>) {
  const [context, setContext] = useState<WebGPUContext | null>(null);
  const fallbackRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    async function init() {
      if (!navigator.gpu) {
        fallbackRef.current = canvasRef.current?.getContext('2d') ?? null;
        return;
      }
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) return;
      const device = await adapter.requestDevice();
      const ctx = canvasRef.current?.getContext('webgpu');
      if (!ctx) return;
      const format = navigator.gpu.getPreferredCanvasFormat();
      ctx.configure({ device, format, alphaMode: 'premultiplied' });
      setContext({ adapter, device, context: ctx });
    }
    init();
  }, []);

  return { context, fallback: fallbackRef };
}`,
  },
  {
    id: 'gsap-scroll',
    label: 'GSAP Scroll Animation',
    language: 'js',
    code: `import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Batch reveal for timeline entries
const entries = gsap.utils.toArray<HTMLElement>('.timeline-entry');

ScrollTrigger.batch(entries, {
  onEnter: (batch) => {
    gsap.fromTo(batch, 
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
    );
  },
  start: 'top 80%',
  once: true,
});

// Parallax for hero section
gsap.to('.hero-content', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});`,
  },
];

// ─── METRICS ───
export interface Metric {
  label: string;
  value: number;
  unit: string;
  color: string;
}

export const liveMetrics: Metric[] = [
  { label: 'Processing Speed', value: 2.3, unit: 'seconds', color: 'var(--brutal-cyan)' },
  { label: 'Output Quality', value: 94.7, unit: '%', color: 'var(--brutal-green)' },
  { label: 'Token Efficiency', value: 1.2, unit: 'tokens/op', color: 'var(--brutal-magenta)' },
  { label: 'Consistency Score', value: 98.1, unit: '%', color: 'var(--brutal-gold)' },
];

// ─── CINEMATIC MODES (BREAKTHROUGH demo) ───
export interface CinematicMode {
  id: string;
  name: string;
  gradient: string;
  specs: { label: string; value: string }[];
}

export const cinematicModes: CinematicMode[] = [
  {
    id: 'aces-filmic',
    name: 'ACES Filmic',
    gradient: 'linear-gradient(90deg, #1a0a2e, #2d1b69, #e8475f, #ff8c42, #ffd700)',
    specs: [
      { label: 'Lifted Blacks', value: '0.2' },
      { label: 'Contrast Ratio', value: '1.4:1' },
      { label: 'Color Temp', value: '5600K' },
      { label: 'Saturation', value: '85%' },
    ],
  },
  {
    id: 'neo-noir',
    name: 'Neo-Noir',
    gradient: 'linear-gradient(90deg, #000000, #1a1a2e, #16213e, #0f3460, #533483)',
    specs: [
      { label: 'Lifted Blacks', value: '0.05' },
      { label: 'Contrast Ratio', value: '2.1:1' },
      { label: 'Color Temp', value: '4200K' },
      { label: 'Saturation', value: '40%' },
    ],
  },
  {
    id: 'chromatic-pop',
    name: 'Chromatic Pop',
    gradient: 'linear-gradient(90deg, #ff006e, #fb5607, #ffbe0b, #06d6a0, #118ab2)',
    specs: [
      { label: 'Lifted Blacks', value: '0.3' },
      { label: 'Contrast Ratio', value: '1.2:1' },
      { label: 'Color Temp', value: '6500K' },
      { label: 'Saturation', value: '130%' },
    ],
  },
  {
    id: 'bleach-bypass',
    name: 'Bleach Bypass',
    gradient: 'linear-gradient(90deg, #2c2c2c, #4a4a4a, #8a8a8a, #c0c0c0, #e8e8e8)',
    specs: [
      { label: 'Lifted Blacks', value: '0.08' },
      { label: 'Contrast Ratio', value: '2.8:1' },
      { label: 'Color Temp', value: '5000K' },
      { label: 'Saturation', value: '25%' },
    ],
  },
];

// ─── PROMPT TEMPLATES (POWERUP demo) ───
export interface PromptTemplate {
  id: string;
  label: string;
  template: string;
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'brand-voice',
    label: 'Brand Voice',
    template: 'Define a brand voice for [COMPANY] in the [INDUSTRY] sector. The tone should be [ADJECTIVE] yet [ADJECTIVE], targeting [AUDIENCE]. Include 3 example social media posts, a mission statement, and 5 key messaging pillars.',
  },
  {
    id: 'product-shot',
    label: 'Product Shot',
    template: 'Generate a cinematic product photography prompt for [PRODUCT]. Style: [STYLE]. Lighting: [LIGHTING]. Environment: [ENVIRONMENT]. Camera angle: [ANGLE]. Include specific material textures, reflections, and atmospheric effects.',
  },
  {
    id: 'social-post',
    label: 'Social Post',
    template: 'Create a viral social media post for [PLATFORM] about [TOPIC]. Hook: [HOOK]. CTA: [CTA]. Include 3 hashtag groups, 2 alternative headlines, and an engagement prediction rationale.',
  },
  {
    id: 'code-review',
    label: 'Code Review',
    template: 'Review this [LANGUAGE] code for: 1) Performance bottlenecks, 2) Security vulnerabilities, 3) Code maintainability, 4) Best practice compliance. Provide specific line-by-line feedback with refactored examples and severity ratings (Critical/Warning/Info).',
  },
];
