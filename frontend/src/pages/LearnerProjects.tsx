// import PageLayout from '@/components/layout/PageLayout';
// import { Brain, PlusCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const LearnerProjects = () => {
//   const navigate = useNavigate();

//   return (
//     <PageLayout>
//       <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-display font-bold text-white mb-4">Learner Projects</h1>
//             <p className="text-muted-foreground text-lg max-w-2xl">
//               Post beginner-friendly projects and "good first issues" for learners to build their skills.
//             </p>
//           </div>
//           <button onClick={() => navigate('/post-project')}  className="btn-neon flex items-center justify-center gap-2 shrink-0">
//             <PlusCircle className="w-5 h-5" />
//             <span>Post New Project</span>
//           </button>
//         </div>

//         {/* Dummy Empty State */}
//         <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
//           <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
//             <Brain className="w-10 h-10 text-secondary" />
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-2">No Learner Tasks Yet</h2>
//           <p className="text-muted-foreground max-w-md">
//             Help the community grow by posting smaller learning tasks. Applications from eager learners will appear here.
//           </p>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default LearnerProjects;









import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, PlusCircle, Users, Settings, DollarSign, Gift } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const LearnerProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyLearnerTasks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('learner_tasks')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setIsLoading(false);
    };

    fetchMyLearnerTasks();
  }, []);

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">Learner Projects</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Post beginner-friendly projects and "good first issues" for learners to build their skills.
            </p>
          </div>
          <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2 shrink-0">
            <PlusCircle className="w-5 h-5" />
            <span>Post New Project</span>
          </button>
        </div>

        {/* Content States */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <Brain className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Learner Tasks Yet</h2>
            <p className="text-muted-foreground max-w-md">
              Help the community grow by posting smaller learning tasks. Applications from eager learners will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col">
                
                {/* Title & Fee Badge */}
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-xl font-bold text-white line-clamp-1">{project.title}</h3>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1 shrink-0 ${
                    project.payment_type === 'fees' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {project.payment_type === 'fees' ? <DollarSign className="w-3 h-3"/> : <Gift className="w-3 h-3"/>}
                    {project.payment_type === 'fees' ? `Fee: $${project.fee_amount}` : 'Free'}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{project.summary}</p>
                
                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" /> Applicants inside
                  </div>
                  <button 
                    onClick={() => navigate(`/manage-project/${project.id}`)} 
                    className="btn-secondary px-4 py-2 text-sm flex items-center gap-2 border-secondary/50 hover:bg-secondary/10 hover:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Manage
                  </button>
                </div>
                
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default LearnerProjects;