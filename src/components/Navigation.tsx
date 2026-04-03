import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationItems, type SectionId } from '@/lib/data';

interface NavigationProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleNav = (id: SectionId) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header
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
            className="hidden sm:block brutal-btn text-xs px-4 py-2"
            aria-label="Go to contact section"
          >
            LET'S TALK
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-16 flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--brutal-void)' }}
          >
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
              className="brutal-btn text-sm px-6 py-3 mt-4"
            >
              LET'S TALK
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-hide animation */}
      <motion.div
        animate={{ y: hidden ? -64 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', borderBottom: 'var(--border-thin)' }}
        aria-hidden="true"
      />
    </header>
  );
}
