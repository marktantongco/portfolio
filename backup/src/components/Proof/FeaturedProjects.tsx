import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/lib/social-icons';
import { projects, type Project } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface FeaturedProjectsProps {
  onOpenModal: (project: Project) => void;
}

export default function FeaturedProjects({ onOpenModal }: FeaturedProjectsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {projects.map((project) => (
        <motion.article
          key={project.id}
          variants={cardVariants}
          whileHover={{ y: -4, boxShadow: '10px 10px 0px var(--brutal-yellow)' }}
          className="p-6 cursor-pointer"
          style={{
            background: 'var(--brutal-surface)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-brutal)',
          }}
          onClick={() => onOpenModal(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onOpenModal(project); }}
          aria-label={`View case study for ${project.name}`}
        >
          {/* Project name */}
          <h3 className="subheading-h3 mb-2" style={{ color: 'var(--brutal-border)' }}>
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-sm mb-4" style={{ color: 'var(--brutal-text-muted)' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Action buttons */}
          <div className="flex gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold"
              style={{ background: 'var(--brutal-yellow)', color: 'var(--brutal-void)', border: 'var(--border-thin)' }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.name} project`}
            >
              <ExternalLink size={14} /> View Project
            </a>
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold"
              style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.name} source code`}
            >
              <GithubIcon size={14} /> Source
            </a>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
