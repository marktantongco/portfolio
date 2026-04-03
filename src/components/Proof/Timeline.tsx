import { motion } from 'framer-motion';
import { timeline } from '@/lib/data';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5"
        style={{ background: 'var(--brutal-yellow)' }}
      />

      <div className="space-y-8">
        {timeline.map((entry, i) => (
          <motion.div
            key={entry.year}
            className="flex gap-6 md:gap-8 items-start relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: DURATION.enter, delay: i * STAGGER.items, ease: EASE_SPRING }}
          >
            {/* Dot */}
            <div
              className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center font-black text-xs relative z-10"
              style={{
                background: entry.accent,
                color: 'var(--brutal-void)',
                border: 'var(--border-thick)',
              }}
            >
              {entry.year.slice(-2)}
            </div>

            {/* Content */}
            <div className="brutal-card p-5 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4
                  className="font-bold text-sm tracking-wide uppercase"
                  style={{ color: entry.accent }}
                >
                  {entry.title}
                </h4>
                <span
                  className="text-[10px] font-mono px-2 py-0.5"
                  style={{
                    background: 'var(--brutal-void)',
                    color: 'var(--brutal-text-muted)',
                  }}
                >
                  {entry.year}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {entry.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
