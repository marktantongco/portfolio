import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import { GithubIcon } from '@/lib/social-icons';
import { type Project } from '@/lib/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Focus trap & body scroll lock
  useEffect(() => {
    if (!project) return;

    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    // Focus the modal
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    };
  }, [project]);

  // Close on Esc
  useEffect(() => {
    if (!project) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose]);

  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(4px)', zIndex: 70 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.name}`}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl max-h-[85vh] overflow-y-auto"
          style={{
            background: 'var(--brutal-surface)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-brutal-lg)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2"
            style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}
            aria-label="Close case study"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="p-6 pb-0">
            <h2 className="section-h2 mb-3" style={{ color: 'var(--brutal-border)' }}>
              {project.name}
            </h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="label-text px-2 py-0.5"
                  style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-text-muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>2024 — Present</span>
          </div>

          {/* Mockup / Hero image area */}
          <div
            className="mx-6 my-6 h-48 flex items-center justify-center"
            style={{ background: cs.mockupGradient, border: 'var(--border-thin)' }}
            role="img"
            aria-label={`${project.name} project mockup`}
          >
            <span className="display-h1" style={{ color: 'rgba(10,10,10,0.3)' }}>{project.name}</span>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Overview */}
            <div>
              <h3 className="subheading-h3 mb-2" style={{ color: 'var(--brutal-border)' }}>OVERVIEW</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--brutal-text-muted)' }}>
                {cs.expandedDescription}
              </p>
            </div>

            {/* Role & Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4" style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}>
                <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>MY ROLE</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--brutal-border)' }}>{cs.role}</span>
              </div>
              <div className="p-4" style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)' }}>
                <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>TECH STACK</span>
                <div className="flex flex-wrap gap-1">
                  {cs.stack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5" style={{ background: 'var(--brutal-surface)', color: 'var(--brutal-border)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div>
              <h3 className="subheading-h3 mb-3" style={{ color: 'var(--brutal-border)' }}>KEY RESULTS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cs.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4"
                    style={{ background: 'var(--brutal-void)', border: '2px solid', borderColor: metric.accent, borderTop: `4px solid ${metric.accent}` }}
                  >
                    <span className="text-2xl font-black block" style={{ color: metric.accent }}>
                      {metric.value}
                    </span>
                    <span className="label-text block mt-1" style={{ color: 'var(--brutal-text-muted)' }}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Highlights */}
            <div>
              <h3 className="subheading-h3 mb-2" style={{ color: 'var(--brutal-border)' }}>PROCESS HIGHLIGHTS</h3>
              <ul className="space-y-2">
                {cs.processHighlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--brutal-text-muted)' }}>
                    <ChevronRight size={14} style={{ color: 'var(--brutal-yellow)', flexShrink: 0, marginTop: 2 }} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA row */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center gap-2 text-xs"
                aria-label={`View ${project.name} live`}
              >
                <ExternalLink size={14} /> View Live
              </a>
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold"
                style={{ background: 'var(--brutal-void)', border: 'var(--border-thick)', color: 'var(--brutal-border)' }}
                aria-label={`View ${project.name} source code`}
              >
                <GithubIcon size={14} /> View Source
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
