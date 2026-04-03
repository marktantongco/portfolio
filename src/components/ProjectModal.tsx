import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/lib/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Focus trap
      const modal = document.getElementById('project-modal');
      if (modal) {
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length) focusable[0].focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            id="project-modal"
            className="relative w-full max-w-3xl mx-4 my-8 md:my-16"
            style={{
              background: 'var(--brutal-surface)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-brutal-lg)',
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 cursor-pointer"
              style={{
                background: 'var(--brutal-void)',
                color: 'var(--brutal-border)',
                border: 'var(--border-thin)',
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="p-6 md:p-8" style={{ borderBottom: 'var(--border-thin)' }}>
              <span
                className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                style={{ color: 'var(--brutal-yellow)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-black text-2xl md:text-3xl tracking-tight uppercase mt-2"
                style={{ color: 'var(--brutal-border)' }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mt-2"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {project.tagline}
              </p>
            </div>

            {/* Mockup */}
            <div
              className="w-full h-48 md:h-64 flex items-center justify-center"
              style={{ background: project.gradient }}
            >
              <span
                className="font-black text-4xl md:text-5xl tracking-tight uppercase opacity-20"
                style={{ color: 'var(--brutal-void)' }}
              >
                {project.title}
              </span>
            </div>

            {/* Overview */}
            <div className="p-6 md:p-8">
              <h4
                className="font-bold text-xs tracking-[0.15em] uppercase mb-3"
                style={{ color: 'var(--brutal-yellow)' }}
              >
                Overview
              </h4>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {project.caseStudy.overview}
              </p>

              {/* Role & Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4
                    className="font-bold text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ color: 'var(--brutal-cyan)' }}
                  >
                    Role
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--brutal-border)' }}
                  >
                    {project.caseStudy.role}
                  </p>
                </div>
                <div>
                  <h4
                    className="font-bold text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ color: 'var(--brutal-magenta)' }}
                  >
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.caseStudy.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono"
                        style={{
                          background: 'var(--brutal-void)',
                          color: 'var(--brutal-text-muted)',
                          border: '1px solid var(--brutal-text-muted)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {project.caseStudy.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 text-center"
                    style={{
                      background: 'var(--brutal-void)',
                      border: 'var(--border-thin)',
                    }}
                  >
                    <div
                      className="text-xl font-black font-mono"
                      style={{ color: 'var(--brutal-yellow)' }}
                    >
                      {m.value}
                    </div>
                    <div
                      className="text-[10px] font-semibold tracking-wide uppercase mt-1"
                      style={{ color: 'var(--brutal-text-muted)' }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Process highlights */}
              <h4
                className="font-bold text-xs tracking-[0.15em] uppercase mb-3"
                style={{ color: 'var(--brutal-green)' }}
              >
                Process Highlights
              </h4>
              <div className="space-y-2 mb-8">
                {project.caseStudy.process.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[10px] font-black"
                      style={{
                        background: 'var(--brutal-yellow)',
                        color: 'var(--brutal-void)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-sm pt-0.5"
                      style={{ color: 'var(--brutal-text-muted)' }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wide uppercase cursor-pointer transition-all duration-150 hover:translate-y-[2px]"
                  style={{
                    background: 'var(--brutal-yellow)',
                    color: 'var(--brutal-void)',
                    border: 'var(--border-thick)',
                  }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wide uppercase cursor-pointer transition-all duration-150 hover:translate-y-[2px]"
                  style={{
                    background: 'transparent',
                    color: 'var(--brutal-border)',
                    border: 'var(--border-thin)',
                  }}
                >
                  <Code2 size={14} />
                  Source Code
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
