import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/lib/data';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';
import { EASE_SPRING, EASE_EXIT, DURATION, STAGGER } from '@/lib/motion';
import CommandPalette from './CommandPalette';

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  // Auto-hide on scroll down
  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 100);
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[60] transition-transform duration-300"
        style={{
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: 'var(--border-thin)',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-black text-lg tracking-tighter"
            style={{ color: 'var(--brutal-border)' }}
          >
            MT<span style={{ color: 'var(--brutal-yellow)' }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase transition-all duration-150 min-h-[44px] inline-flex items-center'
                )}
                style={{
                  color:
                    active === item.id
                      ? 'var(--brutal-yellow)'
                      : 'var(--brutal-text-muted)',
                  background:
                    active === item.id ? 'var(--brutal-surface)' : 'transparent',
                  border:
                    active === item.id ? '2px solid var(--brutal-yellow)' : '2px solid transparent',
                }}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <CommandPalette />

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer interactive-press"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{ color: 'var(--brutal-border)' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] pt-16 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.exit, ease: EASE_EXIT }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(10,10,10,0.95)' }}
            />
            <motion.nav
              className="relative flex flex-col items-center justify-center h-full gap-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ duration: DURATION.exit, ease: EASE_EXIT }}
              aria-label="Mobile navigation"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-black tracking-[0.1em] uppercase min-h-[44px] inline-flex items-center"
                  style={{
                    color:
                      active === item.id
                        ? 'var(--brutal-yellow)'
                        : 'var(--brutal-border)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * STAGGER.items }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
