import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SERVICES } from '@/lib/data';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-heading', {
        scrollTrigger: { trigger: '.services-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.service-card', {
        scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="services" ref={sectionRef}>
      <div className="services-hdr">
        <h2 className="services-heading">Services</h2>
        <p className="services-sub">
          End-to-end creative technology solutions — from strategy to deployment.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div className="service-card" key={i}>
            <span className="service-icon">{s.icon}</span>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-deliverables">
              {s.deliverables.map((d, j) => (
                <span className="service-item" key={j}>{d}</span>
              ))}
            </div>
            <div className="service-price">Starting at {s.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
