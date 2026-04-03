import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { commandPaletteItems, type SectionId } from '@/lib/data';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scrollToSection: (id: SectionId) => void;
  activeSection: SectionId;
}

export default function CommandPalette({ isOpen, setIsOpen, scrollToSection, activeSection }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commandPaletteItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: typeof commandPaletteItems[0]) => {
    if (item.action === 'scroll' && item.section) {
      scrollToSection(item.section);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener');
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 59 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-lg p-0"
            style={{ zIndex: 60, background: 'var(--brutal-surface)', border: 'var(--border-thick)', boxShadow: 'var(--shadow-brutal-lg)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: 'var(--border-thin)' }}>
              <Search size={18} style={{ color: 'var(--brutal-text-muted)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Jump to section or action..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--brutal-border)' }}
                aria-label="Search"
              />
              <kbd className="label-text px-2 py-0.5" style={{ background: 'var(--brutal-void)', color: 'var(--brutal-text-muted)', border: 'var(--border-thin)' }}>ESC</kbd>
            </div>

            {/* Results */}
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.map((item, i) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors"
                    style={{
                      background: i === selectedIndex ? 'var(--brutal-void)' : 'transparent',
                      color: i === selectedIndex ? 'var(--brutal-yellow)' : 'var(--brutal-border)',
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span className="label-text" style={{ color: 'var(--brutal-text-muted)', minWidth: 24 }}>
                      {item.action === 'external' ? '↗' : '→'}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm" style={{ color: 'var(--brutal-text-muted)' }}>
                  No results found.
                </li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
