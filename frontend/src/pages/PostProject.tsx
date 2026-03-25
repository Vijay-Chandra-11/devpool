import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Brain, Layers, CheckCircle2, Zap, FileText, Users, Loader2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

// Standard Tech Stack options for easy selection
const AVAILABLE_TECH = [
  'React', 'Node.js', 'Python', 'TypeScript', 'Tailwind', 
  'Supabase', 'PostgreSQL', 'Next.js', 'AWS', 'Docker', 'AI/ML'
];

const PostProject = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // 1: Type Selection, 2: Dev Form (Learner/Both coming later)
  const [projectType, setProjectType] = useState<'developer' | 'learner' | 'both' | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [task, setTask] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [evalMethod, setEvalMethod] = useState<string[]>(['quick']); // Default to quick

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
      setUser(session?.user);
    });
  }, [navigate]);

  // Logic for the strict Evaluation Method buttons
  const handleEvalToggle = (method: string) => {
    if (method === 'quick') {
      setEvalMethod(['quick']); // Quick overrides everything else
    } else {
      let newMethods = evalMethod.filter(m => m !== 'quick'); // Remove quick if selecting test/interview
      if (newMethods.includes(method)) {
        newMethods = newMethods.filter(m => m !== method); // Deselect
      } else {
        newMethods.push(method); // Select
      }
      setEvalMethod(newMethods);
    }
  };

  const toggleTech = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter(t => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('developer_projects')
        .insert({
          founder_id: user.id,
          title,
          summary,
          task_description: task,
          tech_stack: techStack,
          evaluation_method: evalMethod
        });

      if (error) throw error;

      // Success! Native browser alert (you can swap this for a toast later)
      alert("Project posted successfully!");
      
      // Navigate back to the page the user came from
      navigate(-1);

    } catch (err: any) {
      alert(`Error posting project: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen py-24 px-4 max-w-4xl mx-auto">
        
        {/* Universal Back Button */}
        <button 
          onClick={() => step === 2 ? setStep(1) : navigate(-1)} 
          className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> 
          {step === 2 ? "Back to Project Types" : "Cancel & Go Back"}
        </button>

        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT PROJECT TYPE */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h1 className="text-4xl font-display font-bold text-white mb-2">What are you posting?</h1>
              <p className="text-muted-foreground mb-10">Select the target audience for your new project.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Developer Option */}
                <div 
                  onClick={() => { setProjectType('developer'); setStep(2); }}
                  className="glass-card p-6 cursor-pointer hover:border-primary/50 transition-all group text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Terminal className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Developer Project</h3>
                  <p className="text-sm text-muted-foreground">Complex, real-world tasks requiring verified coding experience.</p>
                </div>

                {/* Learner Option (Placeholder for later) */}
                <div 
                  onClick={() => alert("Learner projects module coming soon!")}
                  className="glass-card p-6 cursor-pointer hover:border-secondary/50 transition-all group text-center flex flex-col items-center opacity-70"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Brain className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Learner Task</h3>
                  <p className="text-sm text-muted-foreground">Good first issues and beginner-friendly learning tasks.</p>
                </div>

                {/* Both Option (Placeholder for later) */}
                <div 
                  onClick={() => alert("Dual-post module coming soon!")}
                  className="glass-card p-6 cursor-pointer hover:border-white/30 transition-all group text-center flex flex-col items-center opacity-70"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Both</h3>
                  <p className="text-sm text-muted-foreground">A multi-stage project with tasks for both juniors and seniors.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DEVELOPER PROJECT FORM */}
          {step === 2 && projectType === 'developer' && (
            <motion.form key="step2" onSubmit={handleConfirm} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-primary" /> Post Developer Project
              </h1>
              <p className="text-muted-foreground mb-8">Define the requirements and recruit elite talent.</p>

              <div className="space-y-6">
                
                {/* 1. Title */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-2">1. Project Title</label>
                  <input 
                    type="text" required value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Build an AI-powered Chatbot Backend" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                  />
                </div>

                {/* 2. Summary */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-2">2. Brief Summary</label>
                  <p className="text-xs text-muted-foreground mb-3">A short 1-2 sentence hook for the project feed.</p>
                  <input 
                    type="text" required value={summary} onChange={e => setSummary(e.target.value)}
                    placeholder="We need a scalable Node.js backend to support 10k concurrent users." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                  />
                </div>

                {/* 3. Task Description */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-2">3. Detailed Task Description</label>
                  <textarea 
                    required rows={5} value={task} onChange={e => setTask(e.target.value)}
                    placeholder="Describe exactly what needs to be built, specific milestones, and expected deliverables..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none resize-none"
                  />
                </div>

                {/* 4. Tech Stack */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-3">4. Tech Stack Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TECH.map(tech => (
                      <button
                        key={tech} type="button" onClick={() => toggleTech(tech)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                          techStack.includes(tech) 
                          ? 'bg-primary/20 border-primary text-primary' 
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                        }`}
                      >
                        {techStack.includes(tech) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                        {tech}
                      </button>
                    ))}
                  </div>
                  {techStack.length === 0 && <p className="text-xs text-red-400 mt-2">Please select at least one technology.</p>}
                </div>

                {/* 5. Evaluation Method */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-3">5. Recruitment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Quick */}
                    <div 
                      onClick={() => handleEvalToggle('quick')}
                      className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${evalMethod.includes('quick') ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                    >
                      <Zap className="w-5 h-5 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-white mb-1">Quick Hire</div>
                        <div className="text-xs">No extra steps. You review profiles and approve directly.</div>
                      </div>
                    </div>

                    {/* Test */}
                    <div 
                      onClick={() => handleEvalToggle('test')}
                      className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${evalMethod.includes('test') ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                    >
                      <FileText className="w-5 h-5 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-white mb-1">Require Test</div>
                        <div className="text-xs">Applicants must pass a coding challenge first.</div>
                      </div>
                    </div>

                    {/* Interview */}
                    <div 
                      onClick={() => handleEvalToggle('interview')}
                      className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${evalMethod.includes('interview') ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                    >
                      <Users className="w-5 h-5 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-white mb-1">Interview</div>
                        <div className="text-xs">Require a 1-on-1 meeting before accepting.</div>
                      </div>
                    </div>
                  </div>
                  {evalMethod.length === 0 && <p className="text-xs text-red-400 mt-2">Please select an evaluation method.</p>}
                </div>

                {/* 6. Confirm Button */}
                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isLoading || techStack.length === 0 || evalMethod.length === 0}
                    className="btn-neon px-8 py-3 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                    Confirm & Post Project
                  </button>
                </div>

              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default PostProject;