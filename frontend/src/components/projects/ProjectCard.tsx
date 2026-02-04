import { motion } from 'framer-motion';
import { Clock, Users, Briefcase, Sparkles } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const difficultyColor = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
    Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  const typeColor = {
    Paid: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
    Learning: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
    'Open Source': 'text-neon-pink bg-neon-pink/10 border-neon-pink/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden"
      >
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-semibold text-primary-foreground">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-sm font-bold">
            {project.founder.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">{project.founder.name}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded-md border ${difficultyColor[project.difficulty]}`}>
            {project.difficulty}
          </span>
          <span className={`px-2 py-1 text-xs rounded-md border ${typeColor[project.type]}`}>
            {project.type}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{project.timeline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{project.applicants} applied</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{project.spotsLeft} spots</span>
          </div>
        </div>

        {/* Budget */}
        {project.budget && (
          <div className="mt-3 text-center py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <span className="text-sm font-medium gradient-text">{project.budget}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
