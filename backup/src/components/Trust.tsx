import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Trust() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section id="trust" className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.h2
          className="section-h2 text-center mb-16"
          style={{ color: 'var(--brutal-border)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          WHAT CLIENTS SAY
        </motion.h2>

        {/* Carousel */}
        <div
          className="relative p-8 md:p-12"
          style={{
            background: 'var(--brutal-surface)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-brutal-lg)',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote icon */}
              <Quote size={32} style={{ color: 'var(--brutal-yellow)', marginBottom: '1rem' }} />

              {/* Quote text */}
              <p className="text-lg md:text-xl italic leading-relaxed mb-6" style={{ color: 'var(--brutal-border)' }}>
                "{testimonial.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--brutal-orange)" style={{ color: 'var(--brutal-orange)' }} />
                ))}
              </div>

              {/* Source */}
              <div className="flex items-center gap-3">
                {/* Gradient initials avatar */}
                <div
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, var(--brutal-yellow), var(--brutal-cyan))',
                    color: 'var(--brutal-void)',
                  }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="subheading-h3 text-sm" style={{ color: 'var(--brutal-border)' }}>
                    {testimonial.source}
                  </h3>
                  <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="w-8 h-2 transition-all duration-150"
                style={{
                  background: i === current ? 'var(--brutal-yellow)' : 'var(--brutal-text-muted)',
                  opacity: i === current ? 1 : 0.4,
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
