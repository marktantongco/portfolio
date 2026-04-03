import { motion } from 'framer-motion';
import { navigationItems, type SectionId } from '@/lib/data';

interface SideNavProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

export default function SideNav({ activeSection, scrollToSection }: SideNavProps) {
  const sectionNames: Record<string, string> = {
    hero: 'Hero',
    identification: 'Identification',
    process: 'The Scaffold Method',
    proof: 'Proof',
    trust: 'Testimonials',
    thoughts: 'Thoughts & Process',
    contact: 'Start the Conversation',
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3"
      style={{ zIndex: 40 }}
      aria-label="Section navigation"
    >
      {navigationItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <div key={item.id} className="relative group">
            <button
              onClick={() => scrollToSection(item.id)}
              className="block w-3 h-3 transition-all duration-150"
              style={{
                backgroundColor: isActive ? 'var(--brutal-yellow)' : 'rgba(102,102,102,0.3)',
                transform: isActive ? 'scale(1.4)' : 'scale(1)',
                boxShadow: isActive ? '0 0 12px var(--brutal-yellow)' : 'none',
              }}
              aria-label={`Go to ${sectionNames[item.id] || item.label}`}
            />
            {/* Tooltip */}
            <span
              className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-xs font-semibold uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: 'var(--brutal-surface)',
                border: 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
            >
              {sectionNames[item.id] || item.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
