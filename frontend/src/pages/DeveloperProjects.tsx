// // import PageLayout from '@/components/layout/PageLayout';
// // import { FolderKanban, PlusCircle } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';

// // const DeveloperProjects = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <PageLayout>
// //       <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
// //         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
// //           <div>
// //             <h1 className="text-4xl font-display font-bold text-white mb-4">Developer Projects</h1>
// //             <p className="text-muted-foreground text-lg max-w-2xl">
// //               Post and manage complex, real-world projects meant for verified developers.
// //             </p>
// //           </div>
// //           <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2 shrink-0">
// //             <PlusCircle className="w-5 h-5" />
// //             <span>Post New Project</span>
// //           </button>
// //         </div>

// //         {/* Dummy Empty State */}
// //         <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
// //           <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
// //             <FolderKanban className="w-10 h-10 text-primary" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-white mb-2">No Developer Projects Yet</h2>
// //           <p className="text-muted-foreground max-w-md">
// //             When you post projects specifically for experienced developers, they will appear here. You will be able to review applications and GitHub Trust Scores.
// //           </p>
// //         </div>
// //       </div>
// //     </PageLayout>
// //   );
// // };

// // export default DeveloperProjects;





// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FolderKanban, PlusCircle, Users, Settings } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';
// import { motion } from 'framer-motion';

// const DeveloperProjects = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyProjects = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) return;

//       const { data } = await supabase
//         .from('developer_projects')
//         .select('*')
//         .eq('founder_id', session.user.id)
//         .order('created_at', { ascending: false });

//       if (data) setProjects(data);
//       setIsLoading(false);
//     };

//     fetchMyProjects();
//   }, []);

//   return (
//     <PageLayout>
//       <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-display font-bold text-white mb-4">Developer Projects</h1>
//             <p className="text-muted-foreground text-lg max-w-2xl">
//               Post and manage complex, real-world projects meant for verified developers.
//             </p>
//           </div>
//           <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2 shrink-0">
//             <PlusCircle className="w-5 h-5" />
//             <span>Post New Project</span>
//           </button>
//         </div>

//         {isLoading ? (
//           <div className="text-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
//         ) : projects.length === 0 ? (
//           <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
//             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
//               <FolderKanban className="w-10 h-10 text-primary" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-2">No Developer Projects Yet</h2>
//             <p className="text-muted-foreground max-w-md">When you post projects specifically for experienced developers, they will appear here.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {projects.map((project) => (
//               <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-xl font-bold text-white line-clamp-1">{project.title}</h3>
//                   <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${project.status === 'open' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
//                     {project.status}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{project.summary}</p>
                
//                 <div className="pt-4 border-t border-white/10 flex justify-between items-center">
//                   <div className="text-xs text-muted-foreground flex items-center gap-1">
//                     <Users className="w-4 h-4" /> Applicants inside
//                   </div>
//                   <button onClick={() => navigate(`/manage-project/${project.id}`)} className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
//                     <Settings className="w-4 h-4" /> Manage
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

// export default DeveloperProjects;






import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, PlusCircle, Users, Settings } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const DeveloperProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 1. Fetch all developer projects
      const { data: devProjects } = await supabase
        .from('developer_projects')
        .select('*')
        .eq('founder_id', session.user.id)
        .order('created_at', { ascending: false });

      // 2. Fetch dual-track links to filter out "Both" projects
      const { data: dualTasks } = await supabase
        .from('learner_tasks')
        .select('developer_project_id')
        .eq('user_id', session.user.id)
        .not('developer_project_id', 'is', null);

      if (devProjects) {
        if (dualTasks && dualTasks.length > 0) {
          // Exclude any developer project that is linked to a learner task
          const dualIds = new Set(dualTasks.map(t => t.developer_project_id));
          const pureDevProjects = devProjects.filter(p => !dualIds.has(p.id));
          setProjects(pureDevProjects);
        } else {
          setProjects(devProjects);
        }
      }
      setIsLoading(false);
    };

    fetchMyProjects();
  }, []);

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">Developer Projects</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Post and manage complex, real-world projects meant for verified developers.
            </p>
          </div>
          <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2 shrink-0">
            <PlusCircle className="w-5 h-5" />
            <span>Post New Project</span>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : projects.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <FolderKanban className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Independent Developer Projects Yet</h2>
            <p className="text-muted-foreground max-w-md">When you post projects specifically for experienced developers, they will appear here. Note: Dual-Track projects appear in the Dual Projects tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white line-clamp-1">{project.title}</h3>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${project.status === 'open' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{project.summary}</p>
                
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" /> Applicants inside
                  </div>
                  <button onClick={() => navigate(`/manage-project/${project.id}`)} className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
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

export default DeveloperProjects;