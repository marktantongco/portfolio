import { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import Skills from './Skills';
import InteractiveDemos from './InteractiveDemos';
import FeaturedProjects from './FeaturedProjects';
import CodeShowcase from './CodeShowcase';
import LiveMetrics from './LiveMetrics';
import Timeline from './Timeline';
import { type Project } from '@/lib/data';

const tabs = [
  { id: 'skills', label: 'SKILLS', accent: 'var(--brutal-lime)' },
  { id: 'demos', label: 'DEMOS', accent: 'var(--brutal-cyan)' },
  { id: 'projects', label: 'PROJECTS', accent: 'var(--brutal-magenta)' },
  { id: 'code', label: 'CODE', accent: 'var(--brutal-cyan)' },
  { id: 'metrics', label: 'METRICS', accent: 'var(--brutal-green)' },
  { id: 'timeline', label: 'JOURNEY', accent: 'var(--brutal-yellow)' },
];

interface ProofProps {
  onOpenModal: (project: Project) => void;
}

export default function Proof({ onOpenModal }: ProofProps) {
  const [activeTab, setActiveTab] = useState('skills');
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // GSAP tab content cross-fade on tab switch
  useGSAP(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, { scope: sectionRef, dependencies: [activeTab] });

  // GSAP active indicator slides to active tab
  const updateIndicator = useCallback((tabId: string) => {
    const tabEl = document.querySelector(`[data-tab="${tabId}"]`) as HTMLElement | null;
    if (indicatorRef.current && tabEl) {
      gsap.to(indicatorRef.current, {
        x: tabEl.offsetLeft,
        width: tabEl.offsetWidth,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

  // Initialize indicator position
  useEffect(() => {
    updateIndicator(activeTab);
  }, [activeTab, updateIndicator]);

  return (
    <section id="proof" ref={sectionRef} className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab navigation */}
        <div className="relative flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 label-text transition-all duration-150 min-h-[44px] interactive-press relative z-10"
              style={{
                color: activeTab === tab.id ? 'var(--brutal-void)' : 'var(--brutal-text-muted)',
                border: 'var(--border-thin)',
                fontWeight: 700,
                background: activeTab === tab.id ? tab.accent : 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
          {/* GSAP sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-0 h-full pointer-events-none"
            style={{
              background: 'var(--brutal-yellow)',
              opacity: 0.15,
              zIndex: 0,
              borderRadius: 0,
            }}
          />
        </div>

        {/* Tab content with GSAP cross-fade */}
        <div ref={contentRef} key={activeTab}>
          {activeTab === 'skills' && <Skills />}
          {activeTab === 'demos' && <InteractiveDemos />}
          {activeTab === 'projects' && <FeaturedProjects onOpenModal={onOpenModal} />}
          {activeTab === 'code' && <CodeShowcase />}
          {activeTab === 'metrics' && <LiveMetrics />}
          {activeTab === 'timeline' && <Timeline />}
        </div>
      </div>
    </section>
  );
}
