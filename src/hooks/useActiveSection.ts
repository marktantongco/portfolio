import { useState, useEffect, useCallback } from 'react';
import type { SectionId } from '@/lib/data';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  useEffect(() => {
    const sectionIds: SectionId[] = ['hero', 'identification', 'process', 'proof', 'trust', 'thoughts', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { activeSection, setActiveSection, scrollToSection } as const;
}

export type { SectionId };
