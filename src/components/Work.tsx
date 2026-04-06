import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PROJECTS, type Project } from '@/lib/data';

interface Props {
  onOpenModal: (index: number) => void;
}

export default function Work({ onOpenModal }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.work-heading', {
        scrollTrigger: { trigger: '.work-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.proj-card', {
        scrollTrigger: { trigger: '.proj-grid', start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -dy * 8,
      rotateY: dx * 8,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  return (
    <section id="work" ref={sectionRef}>
      <div className="work-hdr">
        <h2 className="work-heading">Selected Projects</h2>
        <span className="work-meta">05 Case Studies</span>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <div
            className="proj-card gsap-card"
            key={i}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <span className="proj-num">{p.num}</span>
            <h3 className="proj-title">{p.title}</h3>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-tags">
              {p.tags.map((tag, j) => (
                <span className="p-tag" key={j}>{tag}</span>
              ))}
            </div>
            <button
              className="proj-preview-btn"
              onClick={(e) => { e.stopPropagation(); onOpenModal(i); }}
            >
              Case Study ↗
            </button>
            <span className="proj-arrow">↗</span>
          </div>
        ))}

        {/* Next card */}
        <div className="proj-card proj-next">
          <span className="proj-next-label">Next →</span>
          <a href={`#contact`}>Let's Collaborate</a>
        </div>
      </div>
    </section>
  );
}
