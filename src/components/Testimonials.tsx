import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.test-heading', {
        scrollTrigger: { trigger: '.test-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.test-card', {
        scrollTrigger: { trigger: '.test-grid', start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="testimonials" ref={sectionRef}>
      <p className="s-label">004 — Testimonials</p>
      <h2 className="test-heading">Voices</h2>

      <div className="test-grid">
        {TESTIMONIALS.map((t, i) => (
          <div className="test-card" key={i}>
            <div className="test-quote">{t.quote}</div>
            <div className="test-author">{t.author}</div>
            <div className="test-role">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
