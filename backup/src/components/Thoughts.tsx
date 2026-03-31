import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Thoughts() {
  return (
    <section id="thoughts" className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-h2 mb-4" style={{ color: 'var(--brutal-border)' }}>
            THOUGHTS & PROCESS
          </h2>
          <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
            Process writeups, technical deep-dives, and strategic frameworks.
          </p>
        </motion.div>

        {/* Blog cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {blogPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '10px 10px 0px var(--brutal-yellow)' }}
              className="block p-6"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thick)',
                boxShadow: 'var(--shadow-brutal)',
              }}
              aria-label={`Read: ${post.title}`}
            >
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  className="inline-block w-2 h-2"
                  style={{ background: post.categoryAccent }}
                  whileHover={{ scale: 1.5 }}
                />
                <span className="heading-h4 text-xs" style={{ color: post.categoryAccent }}>
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="subheading-h3 mb-3" style={{ color: 'var(--brutal-border)' }}>
                {post.title}
              </h3>

              {/* Summary */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{
                  color: 'var(--brutal-text-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.summary}
              </p>

              {/* Read link */}
              <span
                className="flex items-center gap-1.5 label-text"
                style={{ color: 'var(--brutal-yellow)' }}
              >
                READ ARTICLE <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
