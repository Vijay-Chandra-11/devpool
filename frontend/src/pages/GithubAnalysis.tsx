import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Github, RefreshCw, ArrowLeft, ShieldCheck, 
  Brain, Lightbulb, Code, Users, FolderKanban, 
  Tag, Rocket, Medal, AlertCircle, BarChart3
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

const GithubAnalysis = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [githubUsername, setGithubUsername] = useState<string>('');
  
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // --- REPLACE THIS WITH YOUR DEPLOYED CLOUDFLARE WORKER URL ---
  // If running locally via `wrangler dev`, it is usually http://127.0.0.1:8787
  // const WORKER_API_URL = "/analyzer-api"; 
  const WORKER_API_URL = import.meta.env.VITE_GITHUB_WORKER_URL; 

  // 1. Check Auth & Load
  useEffect(() => {
    const initPage = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return navigate('/login');
      
      setUser(session.user);
      const username = session.user.user_metadata?.user_name || session.user.user_metadata?.preferred_username;
      
      if (!username) {
        setError("No GitHub account linked to this profile.");
        setIsLoading(false);
        return;
      }
      
      setGithubUsername(username);
      await fetchFromSupabase(session.user.id, username);
    };
    initPage();
  }, [navigate]);

  // 2. Try Supabase Cache First
  const fetchFromSupabase = async (userId: string, username: string) => {
    setIsLoading(true);
    setError(null);

    const { data } = await supabase
      .from('github_analysis')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (data && data.analysis_data) {
      setAnalysisData(data.analysis_data);
      setLastUpdated(new Date(data.updated_at).toLocaleString());
      setIsLoading(false);
    } else {
      await triggerWorkerAnalysis(userId, username);
    }
  };

  // 3. Call Cloudflare Worker & Save to Supabase
  const triggerWorkerAnalysis = async (userId: string, username: string) => {
    setIsRefreshing(true);
    setError(null);

    try {
      const response = await fetch(`${WORKER_API_URL}?username=${encodeURIComponent(username)}`);
      const resultData = await response.json();

      if (!response.ok) throw new Error(resultData.error || "Worker analysis failed.");
      
      // Upsert into Supabase Database
      const { error: dbError } = await supabase
        .from('github_analysis')
        .upsert({ 
          user_id: userId, 
          github_username: username, 
          analysis_data: resultData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (dbError) throw dbError;

      setAnalysisData(resultData);
      setLastUpdated(new Date().toLocaleString());

    } catch (err: any) {
      setError(err.message || "Failed to analyze GitHub profile.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // UI Helpers
  const handleGoBack = () => {
    if (user?.user_metadata?.role === 'founder' || user?.user_metadata?.role === 'pending_founder') {
      navigate('/founder-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  if (isLoading && !isRefreshing) {
    return (
      <PageLayout showFooter={false}>
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
          <p className="text-muted-foreground animate-pulse font-display text-lg">Analyzing profile...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <button onClick={handleGoBack} className="flex items-center text-muted-foreground hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
              <Github className="w-8 h-8 text-primary" />
              AI Trust Engine Analysis
            </h1>
            <p className="text-muted-foreground mt-1">
              Analyzing <strong className="text-white">@{githubUsername}</strong>
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button 
              onClick={() => triggerWorkerAnalysis(user.id, githubUsername)}
              disabled={isRefreshing}
              className="btn-neon flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Re-analyzing...' : 'Refresh Data'}
            </button>
            {lastUpdated && <span className="text-xs text-muted-foreground mt-2">Last updated: {lastUpdated}</span>}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Grid */}
        {analysisData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Column: Stats & Trust Score */}
            <div className="space-y-6">
              {/* Trust Score */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
                <div className="text-5xl font-display font-bold text-white mb-2">
                  {analysisData.score || 0}<span className="text-2xl text-muted-foreground">/100</span>
                </div>
                {analysisData.developer_type && (
                  <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2">
                    <Code className="w-4 h-4 inline mr-1" /> {analysisData.developer_type}
                  </span>
                )}
              </motion.div>

              {/* Tag / Personality */}
              {analysisData.tag && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 border-secondary/30">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-secondary" /> AI Profile Tag
                  </h3>
                  <p className="text-secondary font-bold mb-1">{analysisData.tag.tag_name}</p>
                  <p className="text-sm text-muted-foreground">{analysisData.tag.description}</p>
                </motion.div>
              )}

              {/* Hard Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div>
                  <p className="text-2xl font-bold text-white">{analysisData.public_repo_count || 0}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div>
                  <p className="text-2xl font-bold text-white">{analysisData.followers || 0}</p>
                </div>
              </motion.div>
            </div>

            {/* Middle & Right Column: AI Text Analysis */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Detailed Analysis */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
                <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" /> Deep AI Analysis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {analysisData.detailed_analysis}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Improvements */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas
                  </h3>
                  <ul className="space-y-2">
                    {(analysisData.improvement_areas || []).map((item: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Diagnostics */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics
                  </h3>
                  <ul className="space-y-2">
                    {(analysisData.diagnostics || []).map((item: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-neon-pink mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Bottom Row: Project Ideas & Badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="md:col-span-3 glass-card p-6">
              <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" /> AI Suggested Project Ideas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysisData.project_ideas && Object.values(analysisData.project_ideas).map((idea: any, idx: number) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-colors">
                    <h4 className="font-bold text-white mb-2">{idea.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(idea.tech_stack || idea['tech stack'] || []).slice(0,3).map((tech: string, i: number) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-md">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dynamic Graph Section (Straight from your worker.js HTML logic) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="md:col-span-3 glass-card p-6">
               <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" /> GitHub Activity Graphs
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <img src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&theme=dark&show_icons=true&hide_border=true`} alt="Stats" className="w-full rounded-xl" />
                <img src={`https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&theme=dark&layout=compact&hide_border=true`} alt="Languages" className="w-full rounded-xl" />
                <img src={`https://streak-stats.demolab.com?user=${githubUsername}&theme=dark&hide_border=true&mode=daily`} alt="Daily Streak" className="w-full rounded-xl" />
                <img src={`https://streak-stats.demolab.com?user=${githubUsername}&theme=dark&hide_border=true&mode=weekly`} alt="Weekly Streak" className="w-full rounded-xl" />
                <img src={`https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=dark&no-frame=true&row=1&column=7`} alt="Trophies" className="w-full rounded-xl lg:col-span-2" />
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default GithubAnalysis;