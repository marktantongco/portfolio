import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { liveMetrics } from '@/lib/data';

export default function LiveMetrics() {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-6">
        <motion.span
          className="inline-block w-2 h-2"
          style={{ background: 'var(--brutal-green)' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="label-text" style={{ color: 'var(--brutal-green)' }}>LIVE</span>
        <span className="label-text ml-2" style={{ color: 'var(--brutal-text-muted)' }}>WebGPU Accelerated</span>
        <span className="label-text ml-auto" style={{ color: 'var(--brutal-text-muted)' }}>
          Updated {timestamp.toLocaleTimeString()}
        </span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {liveMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric }: { metric: typeof liveMetrics[0] }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) => v.toFixed(1));

  useEffect(() => {
    spring.set(metric.value);
  }, [metric.value, spring]);

  return (
    <motion.div
      className="p-6"
      style={{ background: 'var(--brutal-surface)', border: 'var(--border-thick)', boxShadow: 'var(--shadow-brutal)' }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true }}
    >
      <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>{metric.label}</span>
      <div className="flex items-baseline gap-2">
        <motion.span
          className="text-3xl font-black"
          style={{ color: metric.color }}
        >
          <motion.span>{display}</motion.span>
        </motion.span>
        <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>{metric.unit}</span>
      </div>
      {/* Visual bar */}
      <div className="mt-3 h-1" style={{ background: 'var(--brutal-void)' }}>
        <motion.div
          className="h-full"
          style={{ background: metric.color }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${(metric.value / 100) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </motion.div>
  );
}
