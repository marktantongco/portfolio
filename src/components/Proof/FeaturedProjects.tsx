import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';
import { SkeletonCard } from '../Skeleton';

const ProjectModal = lazy(() => import('../ProjectModal'));

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="brutal-card cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.enter, delay: i * STAGGER.items, ease: EASE_SPRING }}
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            aria-label={`View ${project.title} case study`}
          >
            {/* Gradient mockup */}
            <div
              className="w-full h-40 flex items-center justify-center relative overflow-hidden"
              style={{ background: project.gradient }}
            >
              <span
                className="font-black text-2xl tracking-tight uppercase opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ color: 'var(--brutal-void)' }}
              >
                {project.title}
              </span>
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: 'var(--brutal-void)', opacity: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                  style={{ color: 'var(--brutal-yellow)' }}
                >
                  {project.category}
                </span>
                <ArrowUpRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--brutal-text-muted)' }}
                />
              </div>
              <h3
                className="font-black text-lg tracking-tight uppercase mb-2"
                style={{ color: 'var(--brutal-border)' }}
              >
                {project.title}
              </h3>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono"
                    style={{
                      background: 'var(--brutal-void)',
                      color: 'var(--brutal-text-muted)',
                      border: '1px solid var(--brutal-text-muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project modal — lazy loaded */}
      <Suspense fallback={<SkeletonCard />}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </Suspense>
    </div>
  );
}
