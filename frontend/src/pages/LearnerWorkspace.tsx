// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft, Code, Layers, ExternalLink, Loader2, BrainCircuit, Lock } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';

// const LearnerWorkspace = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Grab the learner's assigned repo from the URL
//   const queryParams = new URLSearchParams(location.search);
//   const learnerRepo = queryParams.get('repo');

//   const [learnerTask, setLearnerTask] = useState<any>(null);
//   const [devProject, setDevProject] = useState<any>(null);
//   const [seniorRepo, setSeniorRepo] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchWorkspaceData = async () => {
//       setIsLoading(true);
//       try {
//         // 1. Fetch the Learner Task
//         const { data: taskData, error: taskError } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
//         if (taskError) throw taskError;
//         setLearnerTask(taskData);

//         // 2. Fetch the Parent Dev Project AND the Senior's Repo
//         if (taskData.developer_project_id) {
//           const { data: devData } = await supabase.from('developer_projects').select('*').eq('id', taskData.developer_project_id).single();
//           if (devData) setDevProject(devData);

//           // Find the developer who was ACCEPTED for the senior project to get their repo!
//           const { data: seniorApp } = await supabase
//             .from('project_applications')
//             .select('assigned_repo')
//             .eq('project_id', taskData.developer_project_id)
//             .eq('status', 'accepted')
//             .maybeSingle();
          
//           if (seniorApp && seniorApp.assigned_repo) {
//             setSeniorRepo(seniorApp.assigned_repo);
//           }
//         }
//       } catch (err) {
//         console.error("Error loading workspace:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     if (id) fetchWorkspaceData();
//   }, [id]);

//   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin"/></div></PageLayout>;

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen py-24 px-4 max-w-6xl mx-auto">
        
//         <div className="flex justify-between items-center mb-8">
//           <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white transition-colors">
//             <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
//           </button>
//         </div>

//         <h1 className="text-3xl font-display font-bold text-white mb-8 flex items-center gap-3">
//           <BrainCircuit className="w-8 h-8 text-secondary" /> Learner Workspace
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
//           {/* PANEL 1: SHADOW LEARN (SENIOR DEV VIEW) */}
//           {devProject ? (
//             <div className="glass-card p-8 border-primary/30 flex flex-col h-full relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
//               <div className="flex items-center gap-2 mb-4 text-primary font-bold">
//                 <Layers className="w-5 h-5" /> Part 1: Shadow Learn (Senior Code)
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-2">{devProject.title}</h2>
//               <p className="text-muted-foreground whitespace-pre-wrap mb-6 flex-grow">{devProject.task_description}</p>
              
//               <div className="pt-6 border-t border-white/10 mt-auto">
//                 {seniorRepo ? (
//                   <button 
//                     onClick={() => navigate(`/editor?repo=${encodeURIComponent(seniorRepo)}&readonly=true`)} 
//                     className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center gap-2 transition-colors"
//                   >
//                     <Code className="w-5 h-5" /> View Senior's Live Code
//                   </button>
//                 ) : (
//                   <div className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-sm font-medium flex items-center justify-center gap-2">
//                     <Lock className="w-4 h-4" /> Senior Developer not assigned yet
//                   </div>
//                 )}
//                 <p className="text-xs text-muted-foreground text-center mt-3">
//                   * Read-only mode. You are not a collaborator on this repository and cannot push changes.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="glass-card p-8 flex flex-col justify-center items-center text-center h-full border-dashed border-2 border-white/10">
//               <Layers className="w-12 h-12 text-muted-foreground mb-4" />
//               <h3 className="text-xl font-bold text-white mb-2">No Shadow Learning</h3>
//               <p className="text-muted-foreground">This is an independent learner task.</p>
//             </div>
//           )}

//           {/* PANEL 2: LEARNER TASK */}
//           <div className="glass-card p-8 border-secondary/30 flex flex-col h-full relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
//             <div className="flex items-center gap-2 mb-4 text-secondary font-bold">
//               <Code className="w-5 h-5" /> Part 2: Your Assigned Task
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-2">{learnerTask.title}</h2>
//             <p className="text-muted-foreground whitespace-pre-wrap mb-6 flex-grow">{learnerTask.description}</p>
            
//             <div className="pt-6 border-t border-white/10 mt-auto">
//               <button 
//                 onClick={() => navigate(`/editor?repo=${encodeURIComponent(learnerRepo || '')}&projectId=${id}`)}
//                 className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
//               >
//                 <ExternalLink className="w-5 h-5" /> Work on Your Task
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default LearnerWorkspace;




import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Code, Layers, ExternalLink, Loader2, BrainCircuit, Lock, PlayCircle, XCircle, Video, Calendar } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const LearnerWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Grab the learner's assigned repo from the URL
  const queryParams = new URLSearchParams(location.search);
  const learnerRepo = queryParams.get('repo');

  const [learnerTask, setLearnerTask] = useState<any>(null);
  const [devProject, setDevProject] = useState<any>(null);
  const [seniorRepo, setSeniorRepo] = useState<string | null>(null);
  const [seniorDeveloperId, setSeniorDeveloperId] = useState<string | null>(null); // --- NEW: Track the senior dev's ID ---
  const [isLoading, setIsLoading] = useState(true);

  // --- NEW: VIDEO EXPLANATIONS STATE ---
  const [explanationsModalOpen, setExplanationsModalOpen] = useState(false);
  const [explanationsData, setExplanationsData] = useState<any[]>([]);
  const [isLoadingExplanations, setIsLoadingExplanations] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState<any>(null);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch the Learner Task
        const { data: taskData, error: taskError } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
        if (taskError) throw taskError;
        setLearnerTask(taskData);

        // 2. Fetch the Parent Dev Project AND the Senior's Repo & ID
        if (taskData.developer_project_id) {
          const { data: devData } = await supabase.from('developer_projects').select('*').eq('id', taskData.developer_project_id).single();
          if (devData) setDevProject(devData);

          // Find the developer who was ACCEPTED for the senior project to get their repo & ID
          const { data: seniorApp } = await supabase
            .from('project_applications')
            .select('assigned_repo, applicant_id')
            .eq('project_id', taskData.developer_project_id)
            .eq('status', 'accepted')
            .maybeSingle();
          
          if (seniorApp) {
            if (seniorApp.assigned_repo) setSeniorRepo(seniorApp.assigned_repo);
            if (seniorApp.applicant_id) setSeniorDeveloperId(seniorApp.applicant_id); // Save ID for fetching videos
          }
        }
      } catch (err) {
        console.error("Error loading workspace:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) fetchWorkspaceData();
  }, [id]);

  // --- NEW: FETCH EXPLANATION VIDEOS ---
  const handleViewExplanations = async () => {
    if (!seniorDeveloperId || !devProject?.id) return;
    
    setIsLoadingExplanations(true);
    setExplanationsModalOpen(true);
    setActiveExplanation(null); // Reset to gallery view
    try {
      const { data, error } = await supabase
        .from('project_explanations')
        .select('*')
        .eq('project_id', devProject.id)
        .eq('developer_id', seniorDeveloperId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setExplanationsData(data || []);
    } catch (err) {
      console.error("Error fetching explanations:", err);
      alert("Failed to load explanations.");
    } finally {
      setIsLoadingExplanations(false);
    }
  };

  if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin"/></div></PageLayout>;

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen py-24 px-4 max-w-6xl mx-auto relative">
        
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
          </button>
        </div>

        <h1 className="text-3xl font-display font-bold text-white mb-8 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-secondary" /> Learner Workspace
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PANEL 1: SHADOW LEARN (SENIOR DEV VIEW) */}
          {devProject ? (
            <div className="glass-card p-8 border-primary/30 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <Layers className="w-5 h-5" /> Part 1: Shadow Learn (Senior Code)
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{devProject.title}</h2>
              <p className="text-muted-foreground whitespace-pre-wrap mb-6 flex-grow">{devProject.task_description}</p>
              
              <div className="pt-6 border-t border-white/10 mt-auto flex flex-col gap-3">
                {seniorRepo ? (
                  <>
                    <button 
                      onClick={() => navigate(`/editor?repo=${encodeURIComponent(seniorRepo)}&readonly=true`)} 
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Code className="w-5 h-5" /> View Senior's Live Code
                    </button>

                    {/* --- NEW: VIEW EXPLANATIONS BUTTON --- */}
                    <button 
                      onClick={handleViewExplanations}
                      className="w-full py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <PlayCircle className="w-5 h-5" /> View Explanations
                    </button>
                  </>
                ) : (
                  <div className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-sm font-medium flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Senior Developer not assigned yet
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center mt-2">
                  * Read-only mode. You are not a collaborator on this repository and cannot push changes.
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 flex flex-col justify-center items-center text-center h-full border-dashed border-2 border-white/10">
              <Layers className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Shadow Learning</h3>
              <p className="text-muted-foreground">This is an independent learner task.</p>
            </div>
          )}

          {/* PANEL 2: LEARNER TASK */}
          <div className="glass-card p-8 border-secondary/30 flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
            <div className="flex items-center gap-2 mb-4 text-secondary font-bold">
              <Code className="w-5 h-5" /> Part 2: Your Assigned Task
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{learnerTask.title}</h2>
            <p className="text-muted-foreground whitespace-pre-wrap mb-6 flex-grow">{learnerTask.description}</p>
            
            <div className="pt-6 border-t border-white/10 mt-auto">
              <button 
                onClick={() => navigate(`/editor?repo=${encodeURIComponent(learnerRepo || '')}&projectId=${id}`)}
                className="w-full py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <ExternalLink className="w-5 h-5" /> Work on Your Task
              </button>
            </div>
          </div>

        </div>

        {/* --- NEW: EXPLANATIONS MODAL UI (GALLERY + PLAYER) --- */}
        <AnimatePresence>
          {explanationsModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExplanationsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl glass border border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4 shrink-0">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <PlayCircle className="w-6 h-6 text-purple-400" /> Senior's Explanations
                  </h3>
                  <button onClick={() => setExplanationsModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {isLoadingExplanations ? (
                    <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                      <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
                      <p>Loading videos...</p>
                    </div>
                  ) : explanationsData.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-xl">
                      <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>The senior developer hasn't uploaded any explanation videos yet.</p>
                    </div>
                  ) : activeExplanation ? (
                    // --- FULL SCREEN VIDEO PLAYER MODE ---
                    <div className="flex flex-col h-full animate-in fade-in zoom-in duration-300">
                      <button 
                        onClick={() => setActiveExplanation(null)} 
                        className="flex items-center text-purple-400 hover:text-purple-300 mb-4 font-bold text-sm w-fit bg-purple-500/10 px-4 py-2 rounded-lg"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to all explanations
                      </button>
                      <div className="mb-4 bg-black/40 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Commit Message</p>
                        <p className="text-white font-mono text-sm">{activeExplanation.commit_message}</p>
                      </div>
                      <div className="w-full bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl flex-1 min-h-[300px] relative">
                        <video 
                          src={activeExplanation.video_url} 
                          controls 
                          autoPlay 
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    // --- GALLERY GRID MODE ---
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {explanationsData.map((expl: any) => (
                        <div 
                          key={expl.id} 
                          onClick={() => setActiveExplanation(expl)}
                          className="group cursor-pointer bg-black/40 border border-white/10 hover:border-purple-500/50 rounded-xl p-5 transition-all hover:bg-black/60 flex flex-col"
                        >
                          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-6 h-6 text-purple-400" />
                          </div>
                          <p className="text-white font-bold mb-2 line-clamp-2 flex-1">{expl.commit_message}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2 pt-3 border-t border-white/10">
                            <Calendar className="w-3 h-3" /> {new Date(expl.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageLayout>
  );
};

export default LearnerWorkspace;