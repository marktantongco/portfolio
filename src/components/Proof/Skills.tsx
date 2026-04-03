import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories, type SkillCategory } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const barVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (pct: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  }),
};

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');

  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter((s) => s.category === activeFilter);

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className="px-3 py-1.5 label-text transition-all duration-150 min-h-[44px]"
            style={{
              background: activeFilter === cat.id ? 'var(--brutal-lime)' : 'transparent',
              color: activeFilter === cat.id ? 'var(--brutal-void)' : 'var(--brutal-text-muted)',
              border: 'var(--border-thin)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((skill) => (
            <motion.div key={skill.name} variants={barVariants} custom={skill.percentage}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--brutal-border)' }}>
                  {skill.name}
                </span>
                <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
                  {skill.percentage}%
                </span>
              </div>
              <div className="h-3 relative" style={{ background: 'var(--brutal-void)' }}>
                <motion.div
                  className="h-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.gradient}, var(--brutal-green))`,
                    boxShadow: `0 0 10px ${skill.gradient}40`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
