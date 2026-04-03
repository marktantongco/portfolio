import { motion } from 'framer-motion';

interface SkeletonSectionProps {
  rows?: number;
}

export default function SkeletonSection({ rows = 4 }: SkeletonSectionProps) {
  return (
    <div
      className="max-w-7xl mx-auto px-6 py-16 md:py-24"
      aria-hidden="true"
      role="presentation"
    >
      <div className="skeleton skeleton-heading" style={{ marginBottom: '2rem', width: '50%' }} />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="skeleton skeleton-text" style={{ width: `${70 + (i * 7) % 30}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton skeleton-card" style={{ border: 'var(--border-thin)', padding: '1.5rem' }} aria-hidden="true" role="presentation" />
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      aria-hidden="true"
      role="presentation"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonInline({ width = '100%' }: { width?: string }) {
  return (
    <div className="skeleton skeleton-text" style={{ width, display: 'inline-block' }} aria-hidden="true" />
  );
}
