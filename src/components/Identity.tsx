import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { identityBlocks } from '@/lib/data';

export default function Identity() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Cards stagger in from bottom with rotation on scroll
    gsap.utils.toArray<HTMLElement>('.identity-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        rotation: i % 2 === 0 ? -3 : 3,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });

      // Bottom accent bar expands from center on scroll
      const bar = card.querySelector('.identity-accent-bar');
      if (bar) {
        gsap.from(bar, {
          scaleX: 0,
          duration: 0.6,
          delay: i * 0.1 + 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });
  }, { scope: sectionRef });

  // GSAP hover micro-interaction
  const handleCardEnter = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      scale: 1.02,
      y: -8,
      boxShadow: '10px 10px 0px var(--brutal-yellow)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleCardLeave = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      scale: 1,
      y: 0,
      boxShadow: '6px 6px 0px var(--brutal-yellow)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section id="identification" ref={sectionRef} className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {identityBlocks.map((block) => (
            <div
              key={block.title}
              className="identity-card p-6 md:p-8 relative overflow-hidden cursor-default"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thick)',
                boxShadow: 'var(--shadow-brutal)',
              }}
              onMouseEnter={(e) => handleCardEnter(e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
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
                className="identity-accent-bar absolute bottom-0 left-0 h-1 w-full"
                style={{
                  background: block.accent,
                  transformOrigin: 'center',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
