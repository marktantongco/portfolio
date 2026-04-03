import { useState, lazy, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { SkeletonGrid } from '../Skeleton';

const Skills = lazy(() => import('./Skills'));
const InteractiveDemos = lazy(() => import('./InteractiveDemos'));
const FeaturedProjects = lazy(() => import('./FeaturedProjects'));
const CodeShowcase = lazy(() => import('./CodeShowcase'));
const LiveMetrics = lazy(() => import('./LiveMetrics'));
const Timeline = lazy(() => import('./Timeline'));

const tabs = [
  { id: 'skills', label: 'SKILLS' },
  { id: 'demos', label: 'DEMO LAB' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'code', label: 'CODE' },
  { id: 'metrics', label: 'METRICS' },
  { id: 'timeline', label: 'TIMELINE' },
];

export default function Proof() {
  const [activeTab, setActiveTab] = useState('skills');

  const renderContent = () => {
    switch (activeTab) {
      case 'skills':
        return <Skills />;
      case 'demos':
        return <InteractiveDemos />;
      case 'projects':
        return <FeaturedProjects />;
      case 'code':
        return <CodeShowcase />;
      case 'metrics':
        return <LiveMetrics />;
      case 'timeline':
        return <Timeline />;
      default:
        return <Skills />;
    }
  };

  return (
    <section
      id="proof"
      className="py-24 md:py-32 lg:py-40 px-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--brutal-yellow)' }}
          >
            // PROOF
          </p>
          <h2
            className="font-black uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--brutal-border)',
            }}
          >
            CAPABILITIES
          </h2>
          <p
            className="text-base max-w-2xl"
            style={{ color: 'var(--brutal-text-muted)', lineHeight: 1.7 }}
          >
            Evidence of craft. Every skill sharpened, every project shipped,
            every line of code with purpose.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          style={{ borderBottom: 'var(--border-thin)', paddingBottom: 12 }}
          role="tablist"
          aria-label="Proof categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase cursor-pointer transition-all duration-150 min-h-[44px] inline-flex items-center interactive-press'
              )}
              style={{
                background:
                  activeTab === tab.id
                    ? 'var(--brutal-yellow)'
                    : 'transparent',
                color:
                  activeTab === tab.id
                    ? 'var(--brutal-void)'
                    : 'var(--brutal-border)',
                border: 'var(--border-thin)',
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div role="tabpanel" id={`panel-${activeTab}`}>
          <Suspense fallback={<SkeletonGrid count={4} />}>
            {renderContent()}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
