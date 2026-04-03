import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';

export default function Trust() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % testimonials.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section
      id="trust"
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
            // TRUST
          </p>
          <h2
            className="font-black uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--brutal-border)',
            }}
          >
            WHAT THEY SAY
          </h2>
          <p
            className="text-base max-w-2xl mb-16"
            style={{ color: 'var(--brutal-text-muted)', lineHeight: 1.7 }}
          >
            Real feedback from real collaborators. Words that keep me pushing
            forward.
          </p>
        </motion.div>

        {/* Testimonial cards - 4 cards on desktop, 1 at a time */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="brutal-card p-5 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.enter, delay: i * STAGGER.items, ease: EASE_SPRING }}
                style={{
                  borderLeft:
                    current === i
                      ? `4px solid ${t.accent}`
                      : 'var(--border-thick)',
                }}
              >
                <Quote
                  size={20}
                  className="mb-3 opacity-30"
                  style={{ color: t.accent }}
                />
                <p
                  className="text-xs leading-relaxed mb-4 italic"
                  style={{ color: 'var(--brutal-text-muted)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto">
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--brutal-border)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[10px] font-semibold tracking-wide uppercase"
                    style={{ color: t.accent }}
                  >
                    {t.role}, {t.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-3 h-3 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-all duration-150 interactive-press"
                style={{
                  background:
                    current === i ? 'var(--brutal-yellow)' : 'transparent',
                  border:
                    current === i
                      ? '2px solid var(--brutal-yellow)'
                      : '2px solid var(--brutal-text-muted)',
                }}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav arrows */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={prev}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-all duration-150 hover:translate-y-[2px] interactive-press"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-all duration-150 hover:translate-y-[2px] interactive-press"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
