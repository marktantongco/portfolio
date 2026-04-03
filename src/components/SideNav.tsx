import { useActiveSection } from '@/hooks/useActiveSection';
import { sectionIds } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function SideNav() {
  const active = useActiveSection();

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sectionIds.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="block transition-all duration-150"
          aria-label={`Go to ${id} section`}
          aria-current={active === id ? 'true' : undefined}
        >
          <div
            className={cn(
              'w-3 h-3 transition-all duration-150',
              active === id
                ? 'scale-150'
                : 'opacity-30 hover:opacity-60'
            )}
            style={{
              background:
                active === id ? 'var(--brutal-yellow)' : 'var(--brutal-border)',
              border:
                active === id ? 'none' : '2px solid var(--brutal-border)',
            }}
          />
        </a>
      ))}
    </nav>
  );
}
