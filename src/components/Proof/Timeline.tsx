import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { timeline } from '@/lib/data';

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Vertical connecting line grows on scroll
    gsap.fromTo('.timeline-line',
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    );

    // Timeline entries fade in one at a time on scroll
    gsap.utils.toArray<HTMLElement>('.timeline-entry').forEach((entry) => {
      gsap.from(entry, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Active timeline dots pulse
    gsap.utils.toArray<HTMLElement>('.timeline-dot-active').forEach((dot) => {
      gsap.to(dot, {
        scale: 1.3,
        opacity: 0.6,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative pl-8 md:pl-12">
      {/* Vertical connecting line */}
      <div
        className="timeline-line absolute left-3 md:left-5 top-0 bottom-0 w-0.5"
        style={{ background: 'var(--brutal-border)', opacity: 0.3 }}
        aria-hidden="true"
      />

      <div className="space-y-6">
        {timeline.map((entry) => (
          <div key={entry.year} className="timeline-entry relative">
            {/* Dot on timeline */}
            <div
              className={`absolute -left-5 md:-left-7 top-4 w-4 h-4 ${entry.isActive ? 'timeline-dot-active' : ''}`}
              style={{
                background: entry.isActive ? 'var(--brutal-yellow)' : 'var(--brutal-surface)',
                border: entry.isActive ? '2px solid var(--brutal-yellow)' : '2px solid var(--brutal-border)',
              }}
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
          </div>
        ))}
      </div>
    </div>
  );
}
