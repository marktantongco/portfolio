import { motion } from 'framer-motion';
import { Code2, Palette, Cpu, Rocket } from 'lucide-react';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';

const capabilities = [
  {
    icon: Code2,
    title: 'ENGINEERING',
    description:
      'Building performant, scalable web applications with modern frameworks and clean architecture.',
    accent: 'var(--brutal-cyan)',
  },
  {
    icon: Palette,
    title: 'DESIGN',
    description:
      'Crafting visual experiences that balance aesthetics with usability through systematic design thinking.',
    accent: 'var(--brutal-magenta)',
  },
  {
    icon: Cpu,
    title: 'CREATIVE TECH',
    description:
      'Pushing boundaries with WebGL, generative art, and experimental interfaces that inspire.',
    accent: 'var(--brutal-yellow)',
  },
  {
    icon: Rocket,
    title: 'STRATEGY',
    description:
      'Aligning technology decisions with business goals to deliver measurable impact and growth.',
    accent: 'var(--brutal-green)',
  },
];

export default function Identity() {
  return (
    <section
      id="identification"
      className="py-24 md:py-32 lg:py-40 px-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: DURATION.enter, ease: EASE_SPRING }}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--brutal-yellow)' }}
          >
            // IDENTIFICATION
          </p>
          <h2
            className="font-black uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--brutal-border)',
            }}
          >
            WHO I AM
          </h2>
          <p
            className="text-base max-w-2xl mb-16"
            style={{ color: 'var(--brutal-text-muted)', lineHeight: 1.7 }}
          >
            I&apos;m Mark Anthony Tantongco — a creative developer who bridges
            the gap between design and engineering. I build digital experiences
            that are bold, performant, and unapologetically different.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="brutal-card p-6 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: DURATION.enter, delay: i * STAGGER.items, ease: EASE_SPRING }}
            >
              <div
                className="flex items-center gap-3 mb-4"
                style={{ borderBottom: `2px solid ${cap.accent}`, paddingBottom: 12 }}
              >
                <cap.icon size={24} style={{ color: cap.accent }} />
                <h3
                  className="font-bold text-sm tracking-[0.1em] uppercase"
                  style={{ color: cap.accent }}
                >
                  {cap.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
