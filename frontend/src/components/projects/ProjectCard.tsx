// import { motion } from 'framer-motion';
// import { Clock, Users, Briefcase, Sparkles } from 'lucide-react';
// import { Project } from '@/data/projects';

// interface ProjectCardProps {
//   project: Project;
//   index: number;
// }

// export const ProjectCard = ({ project, index }: ProjectCardProps) => {
//   const difficultyColor = {
//     Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
//     Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
//     Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
//   };

//   const typeColor = {
//     Paid: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
//     Learning: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
//     'Open Source': 'text-neon-pink bg-neon-pink/10 border-neon-pink/20',
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//     >
//       <motion.div
//         whileHover={{ y: -8, scale: 1.01 }}
//         transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//         className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden"
//       >
//         {/* Featured badge */}
//         {project.featured && (
//           <div className="absolute top-4 right-4">
//             <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-semibold text-primary-foreground">
//               <Sparkles className="w-3 h-3" />
//               Featured
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex items-start gap-3 mb-4">
//           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-sm font-bold">
//             {project.founder.avatar}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
//               {project.title}
//             </h3>
//             <p className="text-sm text-muted-foreground">{project.founder.name}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
//           {project.description}
//         </p>

//         {/* Tech Stack */}
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {project.techStack.slice(0, 4).map((tech) => (
//             <span
//               key={tech}
//               className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground"
//             >
//               {tech}
//             </span>
//           ))}
//           {project.techStack.length > 4 && (
//             <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-muted-foreground">
//               +{project.techStack.length - 4}
//             </span>
//           )}
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           <span className={`px-2 py-1 text-xs rounded-md border ${difficultyColor[project.difficulty]}`}>
//             {project.difficulty}
//           </span>
//           <span className={`px-2 py-1 text-xs rounded-md border ${typeColor[project.type]}`}>
//             {project.type}
//           </span>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground">
//           <div className="flex items-center gap-1">
//             <Clock className="w-3.5 h-3.5" />
//             <span>{project.timeline}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Users className="w-3.5 h-3.5" />
//             <span>{project.applicants} applied</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Briefcase className="w-3.5 h-3.5" />
//             <span>{project.spotsLeft} spots</span>
//           </div>
//         </div>

//         {/* Budget */}
//         {project.budget && (
//           <div className="mt-3 text-center py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
//             <span className="text-sm font-medium gradient-text">{project.budget}</span>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ProjectCard;





import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Briefcase, Sparkles, X, CheckCircle2, Zap } from 'lucide-react';
import { Project } from '@/data/projects';
import { useMode } from '@/context/ModeContext';
import { supabase } from '@/lib/supabase'; // Make sure this path is correct!

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { mode } = useMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const difficultyColor: Record<string, string> = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
    Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  const typeColor: Record<string, string> = {
    Paid: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
    Learning: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
    'Open Source': 'text-neon-pink bg-neon-pink/10 border-neon-pink/20',
    'Quick Hire': 'text-green-400 bg-green-500/10 border-green-500/20',
    Standard: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };

  const handleApply = async () => {
    // 1. Get the current user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      alert("Please log in to apply!");
      return;
    }

    try {
      // 2. Insert the application into Supabase
      const { error } = await supabase.from('project_applications').insert({
        project_id: project.id,
        applicant_id: session.user.id,
        applicant_name: session.user.user_metadata?.full_name || 'Anonymous Developer',
        applicant_github: session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name || null,
        status: 'pending'
      });

      if (error) {
        if (error.code === '23505') throw new Error("You have already applied to this project!");
        throw error;
      }

      setHasApplied(true);
      setTimeout(() => { setIsModalOpen(false); }, 2000); // Close modal after 2 seconds
      
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => setIsModalOpen(true)}
          className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden"
        >
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-semibold text-primary-foreground">
                <Sparkles className="w-3 h-3" />
                Featured
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-start gap-3 mb-4 pr-20">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-sm font-bold">
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
              <span key={tech} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground">
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
            <span className={`px-2 py-1 text-xs rounded-md border ${difficultyColor[project.difficulty] || difficultyColor['Beginner']}`}>
              {project.difficulty}
            </span>
            <span className={`px-2 py-1 text-xs rounded-md border ${typeColor[project.type] || typeColor['Standard']}`}>
              {project.type}
            </span>
            {project.type === 'Quick Hire' && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20">
                <Zap className="w-3 h-3" /> Quick
              </span>
            )}
          </div>

          {/* Footer - DYNAMIC BASED ON MODE */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground gap-y-2">
            {mode === 'learner' ? (
              <>
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>{project.timeline}</span></div>
                <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /><span>{project.applicants} applied</span></div>
                <div className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /><span>{project.spotsLeft} spots</span></div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>Posted recently</span></div>
                <div className="text-primary font-semibold hover:text-white transition-colors">View Details &rarr;</div>
              </>
            )}
          </div>

          {/* Budget */}
          {project.budget && (
            <div className="mt-4 text-center py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <span className="text-sm font-medium gradient-text">{project.budget}</span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* --- THE POP-UP MODAL DETAILS VIEW --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 z-10 bg-[#0f172a]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-white font-bold">
                    {project.founder.avatar}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Posted by</div>
                    <div className="text-sm font-bold text-white">{project.founder.name}</div>
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 pr-8">
                  {project.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${difficultyColor[project.difficulty] || difficultyColor['Beginner']}`}>
                    {project.difficulty}
                  </span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${typeColor[project.type] || typeColor['Standard']}`}>
                    {project.type}
                  </span>
                  {project.budget && (
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full">
                      {project.budget}
                    </span>
                  )}
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Project Overview</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Required Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {mode === 'learner' && (
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{project.timeline}</div>
                        <div className="text-xs text-muted-foreground uppercase mt-1">Timeline</div>
                      </div>
                      <div className="text-center border-x border-white/10">
                        <div className="text-2xl font-bold text-white">{project.applicants}</div>
                        <div className="text-xs text-muted-foreground uppercase mt-1">Applicants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{project.spotsLeft}</div>
                        <div className="text-xs text-muted-foreground uppercase mt-1">Spots Left</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button 
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    hasApplied 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed' 
                      : 'bg-primary text-white hover:scale-105 hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  }`}
                >
                  {hasApplied ? (
                    <><CheckCircle2 className="w-5 h-5" /> Application Sent!</>
                  ) : (
                    'Apply for Project'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;