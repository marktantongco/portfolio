import { motion } from 'framer-motion';
import { identityBlocks } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Identity() {
  return (
    <section id="identification" className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {identityBlocks.map((block) => (
            <motion.div
              key={block.title}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '10px 10px 0px var(--brutal-yellow)' }}
              className="p-6 md:p-8 relative overflow-hidden group cursor-default"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thick)',
                boxShadow: 'var(--shadow-brutal)',
              }}
            >
              {/* Number */}
              <span className="label-text mb-2 block" style={{ color: 'var(--brutal-text-muted)' }}>
                {block.number}
              </span>

              {/* Title */}
              <h3 className="subheading-h3 mb-3" style={{ color: 'var(--brutal-border)' }}>
                {block.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--brutal-text-muted)' }}>
                {block.description}
              </p>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{
                  width: '50%',
                  background: block.accent,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
