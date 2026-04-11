import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Code, Layers, ExternalLink, Loader2, BrainCircuit, Lock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch the Learner Task
        const { data: taskData, error: taskError } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
        if (taskError) throw taskError;
        setLearnerTask(taskData);

        // 2. Fetch the Parent Dev Project AND the Senior's Repo
        if (taskData.developer_project_id) {
          const { data: devData } = await supabase.from('developer_projects').select('*').eq('id', taskData.developer_project_id).single();
          if (devData) setDevProject(devData);

          // Find the developer who was ACCEPTED for the senior project to get their repo!
          const { data: seniorApp } = await supabase
            .from('project_applications')
            .select('assigned_repo')
            .eq('project_id', taskData.developer_project_id)
            .eq('status', 'accepted')
            .maybeSingle();
          
          if (seniorApp && seniorApp.assigned_repo) {
            setSeniorRepo(seniorApp.assigned_repo);
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

  if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin"/></div></PageLayout>;

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen py-24 px-4 max-w-6xl mx-auto">
        
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
              
              <div className="pt-6 border-t border-white/10 mt-auto">
                {seniorRepo ? (
                  <button 
                    onClick={() => navigate(`/editor?repo=${encodeURIComponent(seniorRepo)}&readonly=true`)} 
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Code className="w-5 h-5" /> View Senior's Live Code
                  </button>
                ) : (
                  <div className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-sm font-medium flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Senior Developer not assigned yet
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center mt-3">
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
      </div>
    </PageLayout>
  );
};

export default LearnerWorkspace;