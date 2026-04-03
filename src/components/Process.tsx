import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';

const steps = [
  {
    number: '01',
    title: 'DISCOVER',
    description:
      'Deep-dive into the problem space. Research users, audit existing systems, and define clear success metrics before writing a single line of code.',
    accent: 'var(--brutal-cyan)',
  },
  {
    number: '02',
    title: 'DESIGN',
    description:
      'Translate insights into wireframes, prototypes, and design systems. Every pixel is intentional, every interaction is choreographed.',
    accent: 'var(--brutal-yellow)',
  },
  {
    number: '03',
    title: 'DEVELOP',
    description:
      'Build with precision. Clean architecture, performant code, and relentless attention to detail. Ship fast without cutting corners.',
    accent: 'var(--brutal-magenta)',
  },
  {
    number: '04',
    title: 'DEPLOY',
    description:
      'Launch, measure, and iterate. Continuous monitoring, A/B testing, and data-driven optimization ensure lasting impact.',
    accent: 'var(--brutal-green)',
  },
];

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-70px 0px -40px 0px' });

  return (
    <section
      id="process"
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
            // PROCESS
          </p>
          <h2
            className="font-black uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--brutal-border)',
            }}
          >
            THE SCAFFOLD METHOD
          </h2>
          <p
            className="text-base max-w-2xl mb-16"
            style={{ color: 'var(--brutal-text-muted)', lineHeight: 1.7 }}
          >
            A systematic approach to building digital products that are
            structurally sound and visually striking.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Vertical line — replaces GSAP ScrollTrigger */}
          <motion.div
            className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-0.5 origin-top"
            style={{ background: 'var(--brutal-yellow)' }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: EASE_SPRING }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex gap-6 md:gap-8 items-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: DURATION.enter, delay: i * STAGGER.items, ease: EASE_SPRING }}
              >
                {/* Number circle */}
                <div
                  className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-black text-sm md:text-base"
                  style={{
                    background: step.accent,
                    color: 'var(--brutal-void)',
                    border: 'var(--border-thick)',
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="brutal-card p-6 flex-1">
                  <h3
                    className="font-bold text-sm md:text-base tracking-[0.1em] uppercase mb-3"
                    style={{ color: step.accent }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--brutal-text-muted)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
