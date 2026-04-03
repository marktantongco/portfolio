import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { Menu, X } from 'lucide-react';
import { navigationItems, type SectionId } from '@/lib/data';

interface NavigationProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // GSAP auto-hide with ScrollTrigger
  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const scrollY = self.scroll();
        if (scrollY > lastScrollY.current && scrollY > 100) {
          if (!hidden) {
            setHidden(true);
            gsap.to(navRef.current, {
              y: -64,
              duration: 0.3,
              ease: 'power2.inOut',
            });
          }
        } else {
          if (hidden) {
            setHidden(false);
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.3,
              ease: 'power2.inOut',
            });
          }
        }
        lastScrollY.current = scrollY;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === undefined) t.kill();
      });
    };
  }, { scope: navRef });

  // GSAP mobile menu slide
  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current && mobileLinksRef.current) {
      gsap.set(mobileMenuRef.current, { display: 'flex' });
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(mobileLinksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.06 }
      );
    } else if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, { display: 'none' });
          }
        },
      });
    }
  }, [mobileOpen]);

  const handleNav = (id: SectionId) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 50,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: 'var(--border-thin)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="text-xl font-black uppercase tracking-tight"
          style={{ color: 'var(--brutal-yellow)' }}
        >
          MT.
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="label-text transition-colors relative pb-1"
              style={{
                color: activeSection === item.id ? 'var(--brutal-yellow)' : 'var(--brutal-text-muted)',
                borderBottom: activeSection === item.id ? '2px solid var(--brutal-yellow)' : '2px solid transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNav('contact')}
            className="hidden sm:block brutal-btn text-xs px-4 py-2 min-h-[44px] interactive-press"
            aria-label="Go to contact section"
          >
            LET&apos;S TALK
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 top-16 flex flex-col items-center justify-center"
        style={{ background: 'var(--brutal-void)', display: 'none' }}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center gap-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="section-h2"
              style={{ color: activeSection === item.id ? 'var(--brutal-yellow)' : 'var(--brutal-border)' }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="brutal-btn text-sm px-6 py-3 mt-4 min-h-[44px] interactive-press"
          >
            LET&apos;S TALK
          </button>
        </div>
      </div>
    </header>
  );
}
