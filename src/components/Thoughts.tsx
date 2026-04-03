import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';

export default function Thoughts() {
  return (
    <section
      id="thoughts"
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
            // THOUGHTS
          </p>
          <h2
            className="font-black uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--brutal-border)',
            }}
          >
            WRITINGS
          </h2>
          <p
            className="text-base max-w-2xl mb-16"
            style={{ color: 'var(--brutal-text-muted)', lineHeight: 1.7 }}
          >
            Thoughts on design, development, and the intersection of technology
            and creativity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className="brutal-card p-6 flex flex-col cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.enter, delay: i * STAGGER.items, ease: EASE_SPRING }}
            >
              {/* Category accent bar */}
              <div
                className="w-full h-1 mb-4"
                style={{ background: post.accent }}
              />

              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                  style={{
                    background: post.accent,
                    color: 'var(--brutal-void)',
                  }}
                >
                  {post.category}
                </span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: 'var(--brutal-text-muted)' }}
                >
                  {post.date}
                </span>
              </div>

              <h3
                className="font-bold text-base tracking-tight uppercase mb-3 group-hover:translate-x-1 transition-transform"
                style={{ color: 'var(--brutal-border)' }}
              >
                {post.title}
              </h3>

              <p
                className="text-xs leading-relaxed mb-4 flex-1"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div
                  className="flex items-center gap-1.5 text-[10px]"
                  style={{ color: 'var(--brutal-text-muted)' }}
                >
                  <Clock size={12} />
                  {post.readTime}
                </div>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: post.accent }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
