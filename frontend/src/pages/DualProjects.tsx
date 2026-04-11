// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Layers, Settings, Loader2, Users, FolderKanban } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';
// import { motion } from 'framer-motion';

// const DualProjects = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDualProjects = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) return;

//       // Fetch all learner tasks that have a linked developer project
//       const { data, error } = await supabase
//         .from('learner_tasks')
//         .select('*, developer_projects(*)')
//         .eq('user_id', session.user.id)
//         .not('developer_project_id', 'is', null)
//         .order('created_at', { ascending: false });

//       if (!error && data) {
//         setProjects(data);
//       }
//       setIsLoading(false);
//     };

//     fetchDualProjects();
//   }, []);

//   return (
//     <PageLayout>
//       <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-display font-bold text-white mb-4 flex items-center gap-3">
//               <Layers className="w-10 h-10 text-neon-cyan" /> Dual-Track Projects
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-2xl">
//               Manage projects that are simultaneously hiring a Senior Developer and a Junior Learner for Shadow Learning.
//             </p>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="text-center py-20">
//             <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
//           </div>
//         ) : projects.length === 0 ? (
//           <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
//             <div className="w-20 h-20 bg-neon-cyan/10 rounded-full flex items-center justify-center mb-6">
//               <Layers className="w-10 h-10 text-neon-cyan" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-2">No Dual-Track Projects Yet</h2>
//             <p className="text-muted-foreground max-w-md mb-6">
//               When you post a project and select "Both", it will appear here so you can manage both applicants in one place!
//             </p>
//             <button onClick={() => navigate('/post-project')} className="btn-neon px-6 py-2 text-sm">Post a Dual-Track Project</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {projects.map((task) => (
//               <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col relative overflow-hidden border-neon-cyan/30">
//                 <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan"></div>
                
//                 <div className="flex items-center gap-2 mb-2 text-xs font-bold text-neon-cyan uppercase tracking-wider">
//                   <FolderKanban className="w-3 h-3" /> Senior Dev: {task.developer_projects?.title || 'Unknown Project'}
//                 </div>

//                 <h3 className="text-xl font-bold text-white mb-2 pl-2 border-l border-white/10">{task.title}</h3>
                
//                 <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">{task.summary}</p>
                
//                 <div className="pt-4 border-t border-white/10 flex justify-between items-center">
//                   <div className="text-xs text-muted-foreground flex items-center gap-1">
//                     <Users className="w-4 h-4" /> Manage both roles
//                   </div>
//                   <button 
//                     onClick={() => navigate(`/manage-project/${task.developer_project_id}`)} 
//                     className="btn-neon px-4 py-2 text-sm flex items-center gap-2 transition-colors"
//                   >
//                     <Settings className="w-4 h-4" /> Manage Applicants
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </PageLayout>
//   );
// };

// export default DualProjects;







import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Settings, PlusCircle, Users } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const DualProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDualProjects = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch all learner tasks that have a linked developer project
      const { data, error } = await supabase
        .from('learner_tasks')
        .select('*, developer_projects(*)')
        .eq('user_id', session.user.id)
        .not('developer_project_id', 'is', null)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setIsLoading(false);
    };

    fetchDualProjects();
  }, []);

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header matching Developer/Learner Projects */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">Dual-Track Projects</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Manage projects that are simultaneously hiring a Senior Developer and a Junior Learner.
            </p>
          </div>
          <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2 shrink-0">
            <PlusCircle className="w-5 h-5" />
            <span>Post New Project</span>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Layers className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Dual-Track Projects Yet</h2>
            <p className="text-muted-foreground max-w-md">
              When you post a project and select "Both", it will appear here so you can manage both applicants in one place.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((task) => (
              <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col">
                
                {/* Standardized Card Header */}
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white line-clamp-1">
                      {task.developer_projects?.title || task.title}
                    </h3>
                    {/* Shadow Learning Badge under title */}
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white uppercase mt-2 bg-white/10 px-2 py-0.5 rounded-full w-fit border border-white/20">
                      <Layers className="w-3 h-3" /> Shadow Learning Linked
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded shrink-0 ${
                    (task.developer_projects?.status === 'open' || task.status === 'open') 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {task.developer_projects?.status || task.status || 'open'}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow mt-2">
                  {task.developer_projects?.summary || task.summary}
                </p>
                
                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" /> Manage both roles
                  </div>
                  <button 
                    onClick={() => navigate(`/manage-project/${task.developer_project_id}`)} 
                    className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
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

export default DualProjects;