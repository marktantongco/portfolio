import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'var(--brutal-void)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dual rings */}
          <div className="relative w-24 h-24 mb-8">
            <div
              className="absolute inset-0 border-4 animate-spin"
              style={{
                borderColor: 'var(--brutal-yellow)',
                borderTopColor: 'transparent',
                animationDuration: '1s',
              }}
            />
            <div
              className="absolute inset-2 border-4 animate-spin"
              style={{
                borderColor: 'var(--brutal-cyan)',
                borderBottomColor: 'transparent',
                animationDuration: '0.7s',
                animationDirection: 'reverse',
              }}
            />
            {/* MT logo */}
            <div
              className="absolute inset-0 flex items-center justify-center font-black text-xl tracking-tighter"
              style={{ color: 'var(--brutal-border)' }}
            >
              MT
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="w-48 h-2 mb-3"
            style={{ background: 'var(--brutal-surface)' }}
          >
            <motion.div
              className="h-full"
              style={{ background: 'var(--brutal-yellow)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--brutal-text-muted)' }}
          >
            INITIALIZING {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
