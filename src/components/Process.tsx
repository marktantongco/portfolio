import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PROCESS_STEPS } from '@/lib/data';

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.proc-heading', {
        scrollTrigger: { trigger: '.proc-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.proc-step', {
        scrollTrigger: { trigger: '.proc-timeline', start: 'top 85%' },
        opacity: 0, x: -30, duration: 0.7, stagger: 0.2, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef}>
      <div className="proc-top">
        <div>
          <p className="s-label">003 — Methodology</p>
          <h2 className="proc-heading">Process</h2>
        </div>
        <p className="proc-intro">
          Every project follows a disciplined methodology. No shortcuts, no skipping steps.
          The process is the product — and I treat it with the same rigor as the final deliverable.
        </p>
      </div>

      <div className="proc-timeline">
        {PROCESS_STEPS.map((step, i) => (
          <div className="proc-step" key={i}>
            <span className="proc-step-num">{step.num}</span>
            <div className="proc-step-body">
              <h3 className="step-t">{step.title}</h3>
              <p className="step-b">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
