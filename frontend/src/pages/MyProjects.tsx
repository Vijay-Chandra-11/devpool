import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle2, XCircle, Code, Terminal, Brain, Trash2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { useMode } from '@/context/ModeContext';

const MyProjects = () => {
  const navigate = useNavigate();
  const { mode } = useMode();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyApplications = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsLoading(false);
        return;
      }

      if (mode === 'developer') {
        // Fetch applications AND the joined project details from Supabase
        const { data, error } = await supabase
          .from('project_applications')
          .select(`
            *,
            project:developer_projects (*)
          `)
          .eq('applicant_id', session.user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setApplications(data);
        }
      } else {
        // Mock Learner Applications (Since Learner DB is still in Flask backend)
        setApplications([]);
      }
      
      setIsLoading(false);
    };

    fetchMyApplications();
  }, [mode]);

  // NEW FUNCTION: Dismiss/Delete Rejected Application
  const handleDismissRejected = async (appId: string) => {
    // 1. Delete from Supabase Database
    const { error } = await supabase
      .from('project_applications')
      .delete()
      .eq('id', appId);

    if (error) {
      alert("Failed to remove the application.");
      console.error(error);
      return;
    }

    // 2. Remove instantly from UI State
    setApplications(applications.filter(app => app.id !== appId));
  };

  return (
    <PageLayout>
      <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${mode === 'developer' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
            {mode === 'developer' ? <Terminal className="w-8 h-8" /> : <Brain className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">My {mode === 'developer' ? 'Developer' : 'Learner'} Projects</h1>
            <p className="text-muted-foreground">Track your applications and start coding accepted projects.</p>
          </div>
        </div>

        {/* Loading / Empty States */}
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : applications.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">No applications yet</h3>
            <p>You haven't applied to any {mode} projects. Go to Explore Projects to find your first task!</p>
            <button onClick={() => navigate('/projects')} className="mt-6 btn-secondary px-6 py-2">Explore Projects</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app, index) => (
              <motion.div 
                key={app.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors relative ${app.status === 'rejected' ? 'border-red-500/20 bg-red-500/5' : 'hover:border-white/20'}`}
              >
                
                {/* Project Info */}
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-bold ${app.status === 'rejected' ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {app.project?.title || 'Unknown Project'}
                    </h3>
                    
                    {/* Status Badge */}
                    {app.status === 'pending' && <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Pending Review</span>}
                    {app.status === 'accepted' && <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Accepted</span>}
                    {app.status === 'rejected' && <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold uppercase rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>}
                  </div>
                  
                  <p className={`text-sm line-clamp-2 max-w-2xl mb-4 ${app.status === 'rejected' ? 'text-gray-500' : 'text-muted-foreground'}`}>
                    {app.project?.summary}
                  </p>
                  
                  {app.assigned_repo && app.status === 'accepted' && (
                    <div className="text-xs text-primary bg-primary/10 inline-block px-3 py-1.5 rounded-lg border border-primary/20">
                      <strong>Assigned Repo:</strong> {app.assigned_repo}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="shrink-0 flex flex-col md:flex-row items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-end">
                  
                  {app.status === 'accepted' && app.assigned_repo && (
                    <button 
                      onClick={() => navigate(`/editor?repo=${encodeURIComponent(app.assigned_repo)}&projectId=${app.project_id}`)}
                      className="btn-neon px-6 py-2.5 flex items-center gap-2 w-full md:w-auto justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                      <Code className="w-4 h-4" /> Work on Project
                    </button>
                  )}

                  {app.status === 'pending' && (
                    <button 
                      onClick={() => navigate('/projects')}
                      className="btn-secondary px-6 py-2 w-full md:w-auto"
                    >
                      View Original Post
                    </button>
                  )}

                  {app.status === 'rejected' && (
                    <button 
                      onClick={() => handleDismissRejected(app.id)}
                      className="w-full md:w-auto px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-colors flex items-center justify-center gap-2 font-bold text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Dismiss
                    </button>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyProjects;