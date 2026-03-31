import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skills from './Skills';
import InteractiveDemos from './InteractiveDemos';
import FeaturedProjects from './FeaturedProjects';
import CodeShowcase from './CodeShowcase';
import LiveMetrics from './LiveMetrics';
import Timeline from './Timeline';
import { type Project, type CaseStudy } from '@/lib/data';

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

  return (
    <section id="proof" className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 label-text transition-all duration-150 min-h-[44px]"
              style={{
                background: activeTab === tab.id ? tab.accent : 'transparent',
                color: activeTab === tab.id ? 'var(--brutal-void)' : 'var(--brutal-text-muted)',
                border: 'var(--border-thin)',
                fontWeight: 700,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'skills' && <Skills />}
            {activeTab === 'demos' && <InteractiveDemos />}
            {activeTab === 'projects' && <FeaturedProjects onOpenModal={onOpenModal} />}
            {activeTab === 'code' && <CodeShowcase />}
            {activeTab === 'metrics' && <LiveMetrics />}
            {activeTab === 'timeline' && <Timeline />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
