import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useThreeScene } from '@/hooks/useThreeScene';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';
import HeroSkeleton from './HeroSkeleton';

// Kinetic typography — taglines that cycle with spring overshoot
const taglines = [
  'Building at the intersection of AI and design.',
  'Forging brands with prompt engineering.',
  'Cinematic vision meets raw code.',
];

// Marquee keywords — real skills, not tech buzzwords
const marqueeKeywords = [
  'AI Image Generation', 'Prompt Engineering', 'Digital Branding', 'WebGPU',
  'React', 'Next.js', 'Midjourney', 'Flux', 'SDXL', 'ComfyUI',
  'Brand Strategy', 'Cinematic Vision', 'Prompt Architecture', 'Design Systems',
  'GEO Optimization',
];

// Entry animation variants — every element in Hero uses these
const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: STAGGER.items, delayChildren: STAGGER.delayChildren } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        duration: DURATION.enter,
        ease: EASE_SPRING,
      },
    },
  },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Three.js scene — separated hook for clean lifecycle
  useThreeScene(canvasRef);

  // Kinetic typewriter — 80ms type, 40ms delete, 2s pause, spring overshoot on new word
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(taglines[0]);
      return;
    }

    const current = taglines[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      }
    }

    return () => { if (timeout) clearTimeout(timeout); };
  }, [displayText, isDeleting, taglineIndex, prefersReducedMotion]);

  // Reduced motion: static content, no canvas
  if (prefersReducedMotion) {
    return (
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroSkeleton />
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js canvas — decorative layer behind content */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, touchAction: 'pan-y' }}
        aria-hidden="true"
      />

      {/* Scanlines — subtle horizontal lines for texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              background: 'var(--brutal-yellow)',
              opacity: 0.03,
              top: `${33 + i * 33}%`,
              animation: `scan-line ${4 + i}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Corner brackets — decorative frame */}
      {[
        { top: '1.5rem', left: '1.5rem', borderTop: '2px solid var(--brutal-yellow)', borderLeft: '2px solid var(--brutal-yellow)', borderRight: 'none', borderBottom: 'none' },
        { top: '1.5rem', right: '1.5rem', borderTop: '2px solid var(--brutal-yellow)', borderRight: '2px solid var(--brutal-yellow)', borderLeft: 'none', borderBottom: 'none' },
        { bottom: '1.5rem', left: '1.5rem', borderBottom: '2px solid var(--brutal-yellow)', borderLeft: '2px solid var(--brutal-yellow)', borderRight: 'none', borderTop: 'none' },
        { bottom: '1.5rem', right: '1.5rem', borderBottom: '2px solid var(--brutal-yellow)', borderRight: '2px solid var(--brutal-yellow)', borderLeft: 'none', borderTop: 'none' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-10 h-10" style={{ ...pos, zIndex: 10 }} aria-hidden="true">
          <div style={{ background: 'var(--brutal-yellow)', animation: `bracket-pulse 3s ease-in-out infinite ${i * 0.5}s`, opacity: 0.5 }} />
        </div>
      ))}

      {/* Text overlay — pointer-events:none so scroll still works through hero */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none">
        {/* Headline: name */}
        <motion.h1
          className="display-h1 mb-4"
          style={{ color: 'var(--brutal-border)' }}
          variants={heroVariants.item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          MARK ANTHONY
          <br />
          <span style={{ color: 'var(--brutal-yellow)' }}>TANTONGCO</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="label-text mb-8"
          style={{ color: 'var(--brutal-yellow)' }}
          variants={heroVariants.item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          AI Creative Strategist · Prompt Architect · Cinematic Vision
        </motion.p>

        {/* Current Focus — purposeful content block, not decoration */}
        <motion.div
          className="inline-block p-4 mb-8 text-left"
          style={{
            background: 'var(--brutal-surface)',
            border: 'var(--border-thin)',
          }}
          variants={heroVariants.item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>
            CURRENT FOCUS
          </span>
          {[
            { color: 'var(--brutal-green)', text: 'Deepening AI image enhancement workflows' },
            { color: 'var(--brutal-cyan)', text: 'Building powerUP Brand Runtime' },
            { color: 'var(--brutal-magenta)', text: 'Refining SEO/GEO optimization frameworks' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm mb-1 last:mb-0">
              <span className="w-2 h-2 inline-block flex-shrink-0" style={{ background: item.color }} />
              <span style={{ color: 'var(--brutal-border)' }}>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Kinetic typewriter */}
        <motion.div
          className="mb-10 h-8 flex items-center justify-center"
          variants={heroVariants.item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-base md:text-lg font-light italic" style={{ color: 'var(--brutal-text-muted)' }}>
            {displayText}
            <span
              className="inline-block w-0.5 h-4 ml-0.5 align-middle"
              style={{
                background: 'var(--brutal-cyan)',
                animation: 'pulse-dot 1s step-end infinite',
              }}
            />
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={heroVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href="#identification"
            className="brutal-btn interactive-press"
          >
            EXPLORE WORK
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-xs font-bold uppercase tracking-wide transition-all duration-150 min-h-[44px] inline-flex items-center interactive-press"
            style={{
              background: 'transparent',
              color: 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            GET IN TOUCH
          </a>
        </motion.div>

        {/* Scroll indicator — only visible initially, fades out on scroll */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-8"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: 10 }}
          transition={{ duration: DURATION.enter, delay: 1.5 }}
        >
          <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>SCROLL</span>
          <ChevronDown size={20} style={{ color: 'var(--brutal-text-muted)' }} />
        </motion.div>
      </div>

      {/* Marquee ticker — branded keyword strip */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
        style={{ borderTop: 'var(--border-thin)', background: 'var(--brutal-void)' }}
        aria-hidden="true"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 25s linear infinite' }}
        >
          {[...marqueeKeywords, ...marqueeKeywords].map((keyword, i) => (
            <span
              key={i}
              className="label-text mx-4"
              style={{ opacity: i % 3 === 0 ? 0.6 : 0.25, color: 'var(--brutal-text-muted)' }}
            >
              {keyword}
              <span style={{ color: 'var(--brutal-yellow)' }}> ◆ </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
