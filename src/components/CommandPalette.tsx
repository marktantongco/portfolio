import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { navItems } from '@/lib/data';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggle]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const filtered = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Keyboard hint */}
      <button
        onClick={toggle}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wide cursor-pointer"
        style={{
          background: 'var(--brutal-surface)',
          border: 'var(--border-thin)',
          color: 'var(--brutal-text-muted)',
        }}
        aria-label="Open command palette (Ctrl+K)"
      >
        <Search size={14} />
        <span>Ctrl+K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(10,10,10,0.8)' }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="relative w-full max-w-lg mx-4"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thick)',
                boxShadow: 'var(--shadow-brutal-lg)',
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: 'var(--border-thin)' }}
              >
                <Search
                  size={18}
                  style={{ color: 'var(--brutal-text-muted)' }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to section..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--brutal-border)' }}
                  aria-label="Search sections"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 cursor-pointer"
                  style={{ color: 'var(--brutal-text-muted)' }}
                  aria-label="Close command palette"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <ul className="max-h-64 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <li
                    className="px-4 py-3 text-sm"
                    style={{ color: 'var(--brutal-text-muted)' }}
                  >
                    No results found
                  </li>
                )}
                {filtered.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity cursor-pointer"
                      style={{
                        color: 'var(--brutal-border)',
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
