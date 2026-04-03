import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { skills, skillCategories, type SkillCategory } from '@/lib/data';

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');
  const barsRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter((s) => s.category === activeFilter);

  // GSAP bar fill animation when filter changes or on scroll
  useGSAP(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.querySelectorAll<HTMLElement>('.skill-bar-fill');
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width') || '0%';
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: barsRef, dependencies: [activeFilter] });

  // Stagger bars in
  useEffect(() => {
    if (!barsRef.current) return;
    const items = barsRef.current.querySelectorAll<HTMLElement>('.skill-bar-item');
    gsap.fromTo(items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );
  }, [activeFilter]);

  return (
    <div ref={barsRef}>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className="px-3 py-1.5 label-text transition-all duration-150 min-h-[44px] interactive-press"
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
      <div className="space-y-4">
        {filtered.map((skill) => (
          <div key={`${activeFilter}-${skill.name}`} className="skill-bar-item">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold" style={{ color: 'var(--brutal-border)' }}>
                {skill.name}
              </span>
              <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
                {skill.percentage}%
              </span>
            </div>
            <div className="h-3 relative" style={{ background: 'var(--brutal-void)' }}>
              <div
                className="skill-bar-fill h-full"
                data-width={`${skill.percentage}%`}
                style={{
                  background: `linear-gradient(90deg, ${skill.gradient}, var(--brutal-green))`,
                  boxShadow: `0 0 10px ${skill.gradient}40`,
                  width: `${skill.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
