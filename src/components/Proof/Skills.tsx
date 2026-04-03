import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';
import { EASE_SPRING, DURATION } from '@/lib/motion';

const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

export default function Skills() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      filter === 'All' ? skills : skills.filter((s) => s.category === filter),
    [filter]
  );

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold tracking-wide uppercase cursor-pointer transition-all duration-150 min-h-[44px] inline-flex items-center interactive-press'
            )}
            style={{
              background:
                filter === cat ? 'var(--brutal-yellow)' : 'transparent',
              color: filter === cat ? 'var(--brutal-void)' : 'var(--brutal-border)',
              border: 'var(--border-thin)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DURATION.enter, delay: i * 0.03, ease: EASE_SPRING }}
            layout
          >
            <div className="flex justify-between items-center mb-1.5">
              <span
                className="text-sm font-semibold"
                style={{ color: 'var(--brutal-border)' }}
              >
                {skill.name}
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {skill.percentage}%
              </span>
            </div>
            <div
              className="h-3 w-full"
              style={{ background: 'var(--brutal-surface)' }}
            >
              <motion.div
                className="h-full"
                style={{ background: skill.gradient }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 0.8, delay: i * 0.03, ease: EASE_SPRING }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
