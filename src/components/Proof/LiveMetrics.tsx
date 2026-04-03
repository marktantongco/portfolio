import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_SPRING, DURATION } from '@/lib/motion';

interface MetricCardProps {
  label: string;
  value: number;
  suffix: string;
  accent: string;
}

function MetricCard({ label, value, suffix, accent }: MetricCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(value / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(current);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="brutal-card p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.enter, ease: EASE_SPRING }}
    >
      <div
        className="text-4xl md:text-5xl font-black font-mono mb-2"
        style={{ color: accent }}
      >
        {count.toLocaleString()}
        <span className="text-2xl">{suffix}</span>
      </div>
      <p
        className="text-xs font-semibold tracking-[0.1em] uppercase"
        style={{ color: 'var(--brutal-text-muted)' }}
      >
        {label}
      </p>
    </motion.div>
  );
}

const metrics: MetricCardProps[] = [
  { label: 'Projects Shipped', value: 47, suffix: '+', accent: 'var(--brutal-yellow)' },
  { label: 'Lines of Code', value: 250, suffix: 'K+', accent: 'var(--brutal-cyan)' },
  { label: 'Happy Clients', value: 32, suffix: '+', accent: 'var(--brutal-green)' },
  { label: 'Years Experience', value: 6, suffix: '+', accent: 'var(--brutal-magenta)' },
];

export default function LiveMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
}
