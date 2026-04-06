import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
        }
      );
    }, footerRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer ref={footerRef}>
        <div className="footer-brand">
          <span className="footer-logo">MAT</span>
          <p className="footer-tagline">
            AI Creative Technologist building at the intersection of bleeding-edge AI, cinematic design, and strategic brand systems.
          </p>
        </div>

        <div>
          <div className="footer-nav-title">Navigation</div>
          <ul className="footer-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-nav-title">Connect</div>
          <div className="footer-social">
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="footer-status">
          <span className="footer-status-dot" />
          System Online
        </span>
        <span>© {new Date().getFullYear()} Mark Anthony Tantongco</span>
        <span>Built with React, Three.js, GSAP & Chart.js</span>
      </div>
    </>
  );
}
