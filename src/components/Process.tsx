import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { Search, Compass, Zap, RefreshCw } from 'lucide-react';
import { processSteps } from '@/lib/data';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Search, Compass, Zap, RefreshCw,
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header animations
    gsap.from('.process-header-h2', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-header-h2',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.process-header-p', {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.process-header-p',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Each step card slides in from alternating left/right
    gsap.utils.toArray<HTMLElement>('.process-step').forEach((step, i) => {
      gsap.from(step, {
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Step number scales up on entry
      const numEl = step.querySelector('.process-step-num');
      if (numEl) {
        gsap.from(numEl, {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Accent bar expands from 0 width on scroll
      const barEl = step.querySelector('.process-accent-bar');
      if (barEl) {
        gsap.from(barEl, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--brutal-text-muted) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="process-header-h2 section-h2 mb-4"
            style={{ color: 'var(--brutal-border)' }}
          >
            THE SCAFFOLD METHOD
          </h2>
          <p
            className="process-header-p label-text"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            A physics-first approach to creative problem-solving.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <div
                key={step.name}
                className="process-step relative p-6"
                style={{
                  background: 'var(--brutal-surface)',
                  border: 'var(--border-thick)',
                  boxShadow: 'var(--shadow-brutal)',
                  '--process-accent': step.accent,
                } as React.CSSProperties}
              >
                {/* Accent bar */}
                <div
                  className="process-accent-bar absolute top-0 left-0 w-full h-1"
                  style={{ background: step.accent, transformOrigin: 'left center' }}
                />

                {/* Step number + diamond indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="process-step-num w-4 h-4 flex-shrink-0"
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
                  <Icon size={28} className="[color:var(--process-accent)]" />
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
