import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'var(--brutal-void)', zIndex: 100 }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* MT Logo */}
      <motion.h1
        className="display-h1 mb-4"
        style={{ color: 'var(--brutal-yellow)' }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        MT
      </motion.h1>

      {/* Label */}
      <p className="label-text mb-8" style={{ color: 'var(--brutal-text-muted)' }}>
        INITIALIZING SYSTEMS
      </p>

      {/* Dual counter-rotating rings */}
      <div className="relative w-24 h-24 mb-8">
        <div
          className="absolute inset-0"
          style={{
            border: '3px solid var(--brutal-yellow)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin-slow 2s linear infinite',
          }}
        />
        <div
          className="absolute inset-3"
          style={{
            border: '3px solid var(--brutal-magenta)',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin-reverse 1.5s linear infinite',
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 overflow-hidden" style={{ background: 'var(--brutal-surface)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, var(--brutal-yellow), var(--brutal-cyan))' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </div>

      {/* Scan lines */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full"
          style={{
            background: 'var(--brutal-yellow)',
            opacity: 0.1,
            top: `${33 + i * 33}%`,
          }}
          animate={{ x: ['-100%', '100vw'] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
        />
      ))}
    </div>
  );
}
