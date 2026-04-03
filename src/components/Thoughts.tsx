import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export default function Thoughts() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header scroll animation
    gsap.from('.thoughts-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.thoughts-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Cards stagger in with rotation on scroll
    gsap.utils.toArray<HTMLElement>('.thoughts-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        rotation: i % 2 === 0 ? 2 : -2,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  // GSAP hover: category dot pulses
  const handleDotEnter = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { scale: 1.8, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
  }, []);

  const handleDotLeave = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' });
  }, []);

  // GSAP hover: read arrow slides right
  const handleReadEnter = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { x: 6, duration: 0.3, ease: 'power2.out' });
  }, []);

  const handleReadLeave = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { x: 0, duration: 0.3, ease: 'power2.out' });
  }, []);

  // GSAP hover: card lift
  const handleCardEnter = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      y: -6,
      boxShadow: '10px 10px 0px var(--brutal-yellow)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleCardLeave = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      y: 0,
      boxShadow: '6px 6px 0px var(--brutal-yellow)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section id="thoughts" ref={sectionRef} className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="thoughts-header text-center mb-16">
          <h2 className="section-h2 mb-4" style={{ color: 'var(--brutal-border)' }}>
            THOUGHTS & PROCESS
          </h2>
          <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
            Process writeups, technical deep-dives, and strategic frameworks.
          </p>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="thoughts-card block p-6"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thick)',
                boxShadow: 'var(--shadow-brutal)',
              }}
              aria-label={`Read: ${post.title}`}
              onMouseEnter={(e) => handleCardEnter(e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
            >
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="thoughts-dot inline-block w-2 h-2"
                  style={{ background: post.categoryAccent }}
                  onMouseEnter={(e) => handleDotEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleDotLeave(e.currentTarget)}
                />
                <span className="heading-h4 text-xs" style={{ color: post.categoryAccent }}>
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="subheading-h3 mb-3" style={{ color: 'var(--brutal-border)' }}>
                {post.title}
              </h3>

              {/* Summary */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{
                  color: 'var(--brutal-text-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.summary}
              </p>

              {/* Read link */}
              <span
                className="thoughts-read flex items-center gap-1.5 label-text"
                style={{ color: 'var(--brutal-yellow)' }}
                onMouseEnter={(e) => handleReadEnter(e.currentTarget)}
                onMouseLeave={(e) => handleReadLeave(e.currentTarget)}
              >
                READ ARTICLE <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
