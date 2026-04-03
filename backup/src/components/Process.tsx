import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Zap, RefreshCw } from 'lucide-react';
import { processSteps } from '@/lib/data';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Search, Compass, Zap, RefreshCw,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--brutal-text-muted) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundOpacity: 0.05,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="section-h2 mb-4"
            style={{ color: 'var(--brutal-border)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE SCAFFOLD METHOD
          </motion.h2>
          <motion.p
            className="label-text"
            style={{ color: 'var(--brutal-text-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A physics-first approach to creative problem-solving.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.name}
                variants={itemVariants}
                className="relative p-6"
                style={{
                  background: 'var(--brutal-surface)',
                  border: 'var(--border-thick)',
                  boxShadow: 'var(--shadow-brutal)',
                }}
              >
                {/* Accent bar */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: step.accent }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                />

                {/* Step number + diamond indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 flex-shrink-0"
                    style={{
                      background: step.accent,
                      transform: 'rotate(45deg)',
                    }}
                  />
                  <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
                    STEP {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <Icon size={28} style={{ color: step.accent }} />
                </div>

                {/* Title */}
                <h3 className="subheading-h3 mb-3" style={{ color: 'var(--brutal-border)' }}>
                  {step.name}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--brutal-text-muted)' }}>
                  {step.description}
                </p>

                {/* Dashed connector (desktop only) */}
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6"
                    style={{ borderTop: '2px dashed var(--brutal-border)', opacity: 0.3 }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
