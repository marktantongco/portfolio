import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useThreeScene } from '@/hooks/useThreeScene';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import HeroSkeleton from './HeroSkeleton';

const taglines = [
  'Building at the intersection of AI and design.',
  'Forging brands with prompt engineering.',
  'Cinematic vision meets raw code.',
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Three.js scene
  useThreeScene(canvasRef);

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(taglines[0]);
      return;
    }

    const current = taglines[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    } else {
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayText(current.substring(0, displayText.length - 1));
        } else {
          setDisplayText(current.substring(0, displayText.length + 1));
        }
      }, isDeleting ? 30 : 60);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex, prefersReducedMotion]);

  // If reduced motion, show skeleton
  if (prefersReducedMotion) {
    return <HeroSkeleton />;
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, touchAction: 'pan-y' }}
        aria-hidden="true"
      />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute h-px w-full"
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

      {/* Text overlay */}
      <div className="relative z-10 text-center px-6 pointer-events-none">
        {/* Name */}
        <motion.h1
          className="display-h1 mb-4"
          style={{ color: 'var(--brutal-border)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MARK ANTHONY<br />TANTONGCO
        </motion.h1>

        {/* Headline */}
        <motion.p
          className="label-text mb-8"
          style={{ color: 'var(--brutal-yellow)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI Creative Strategist | Prompt Architect | Cinematic Vision
        </motion.p>

        {/* Current Focus block */}
        <motion.div
          className="inline-block p-4 mb-8 text-left"
          style={{ background: 'var(--brutal-surface)', border: 'var(--border-thin)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>CURRENT FOCUS</span>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 inline-block" style={{ background: 'var(--brutal-green)' }} />
              <span style={{ color: 'var(--brutal-border)' }}>Deepening AI image enhancement workflows</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 inline-block" style={{ background: 'var(--brutal-cyan)' }} />
              <span style={{ color: 'var(--brutal-border)' }}>Building powerUP Brand Runtime</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 inline-block" style={{ background: 'var(--brutal-magenta)' }} />
              <span style={{ color: 'var(--brutal-border)' }}>Refining SEO/GEO optimization frameworks</span>
            </div>
          </div>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-lg md:text-2xl font-light italic" style={{ color: 'var(--brutal-text-muted)' }}>
            {displayText}
            <span className="inline-block w-0.5 h-5 ml-1" style={{ background: 'var(--brutal-yellow)', animation: 'pulse-dot 1s ease-in-out infinite' }} />
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
        >
          <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>SCROLL</span>
          <ChevronDown size={20} style={{ color: 'var(--brutal-text-muted)' }} />
        </motion.div>
      </div>

      {/* Corner brackets */}
      {[
        { top: '1rem', left: '1rem', borderRight: 'none', borderBottom: 'none' },
        { top: '1rem', right: '1rem', borderLeft: 'none', borderBottom: 'none' },
        { bottom: '1rem', left: '1rem', borderRight: 'none', borderTop: 'none' },
        { bottom: '1rem', right: '1rem', borderLeft: 'none', borderTop: 'none' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="fixed w-8 h-8 pointer-events-none"
          style={{
            ...pos,
            zIndex: 10,
            border: '2px solid var(--brutal-yellow)',
            animation: 'bracket-pulse 3s ease-in-out infinite',
            animationDelay: `${i * 0.5}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Marquee ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
        style={{
          background: 'var(--brutal-void)',
          borderTop: 'var(--border-thin)',
          borderBottom: 'var(--border-thin)',
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {[0, 1].map((dup) => (
            <span key={dup} className="label-text mx-4" style={{ color: 'var(--brutal-text-muted)' }}>
              AI Image Generation · Prompt Engineering · Digital Branding · WebGPU · React · Next.js · Midjourney · Flux · SDXL · ComfyUI · Brand Strategy · Cinematic Vision · Prompt Architecture · Design Systems · GEO Optimization &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
