import { motion } from 'framer-motion';
import { timeline } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Timeline() {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Vertical connecting line */}
      <div
        className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5"
        style={{ background: 'var(--brutal-border)', opacity: 0.3 }}
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-6"
      >
        {timeline.map((entry) => (
          <motion.div
            key={entry.year}
            variants={itemVariants}
            className="relative"
            whileHover={{ boxShadow: 'var(--shadow-brutal)' }}
          >
            {/* Dot on timeline */}
            <motion.div
              className="absolute -left-5 md:-left-7 top-4 w-4 h-4"
              style={{
                background: entry.isActive ? 'var(--brutal-yellow)' : 'var(--brutal-surface)',
                border: entry.isActive ? '2px solid var(--brutal-yellow)' : '2px solid var(--brutal-border)',
              }}
              animate={entry.isActive ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Card */}
            <div
              className="ml-4 md:ml-8 p-6"
              style={{
                background: 'var(--brutal-surface)',
                border: entry.isActive ? '2px solid var(--brutal-yellow)' : 'var(--border-thin)',
                boxShadow: entry.isActive ? '0 0 20px rgba(255,234,0,0.2)' : 'none',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="label-text" style={{ color: entry.isActive ? 'var(--brutal-yellow)' : 'var(--brutal-text-muted)' }}>
                  {entry.year}
                </span>
                {entry.isActive && (
                  <span className="label-text px-2 py-0.5" style={{ background: 'var(--brutal-yellow)', color: 'var(--brutal-void)' }}>
                    CURRENT
                  </span>
                )}
              </div>
              <h3 className="subheading-h3 mb-2" style={{ color: 'var(--brutal-border)' }}>
                {entry.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--brutal-text-muted)' }}>
                {entry.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
