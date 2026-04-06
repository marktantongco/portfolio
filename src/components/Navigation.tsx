import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';

interface Props {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navigation({ activeSection, scrollToSection }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  // Auto-hide on scroll down / show on scroll up
  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 100) {
        // scrolling down
        navRef.current?.classList.add('nav-hidden');
      } else {
        navRef.current?.classList.remove('nav-hidden');
      }
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile drawer: lock body scroll when open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    scrollToSection(id);
  };

  return (
    <>
      <nav ref={navRef}>
        <a className="nav-logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('identity'); }}>
          MAT
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                className={activeSection === link.id ? 'active' : ''}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="ti m">☀</span>
            <span className="ti s">☾</span>
          </button>
          <a
            className="nav-cta"
            href={`#contact`}
            onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}
          >
            Hire Me
          </a>
          <button
            className={`mob-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`mob-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                className={activeSection === link.id ? 'active' : ''}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
