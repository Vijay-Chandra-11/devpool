// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Terminal, Brain, Layers, CheckCircle2, Zap, FileText, Users, Loader2, DollarSign, Gift } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';

// // Standard Tech Stack options for easy selection
// const AVAILABLE_TECH = [
//   'React', 'Node.js', 'Python', 'TypeScript', 'Tailwind', 
//   'Supabase', 'PostgreSQL', 'Next.js', 'AWS', 'Docker', 'AI/ML'
// ];

// const PostProject = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [step, setStep] = useState<1 | 2>(1); // 1: Type Selection, 2: Form
//   const [projectType, setProjectType] = useState<'developer' | 'learner' | 'both' | null>(null);

//   // Shared Form State
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');
//   const [task, setTask] = useState('');
//   const [techStack, setTechStack] = useState<string[]>([]);
  
//   // Developer Specific State
//   const [evalMethod, setEvalMethod] = useState<string[]>(['quick']); 

//   // Learner Specific State
//   const [paymentType, setPaymentType] = useState<'free' | 'fees'>('free');
//   const [feeAmount, setFeeAmount] = useState('');

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!session) navigate('/login');
//       setUser(session?.user);
//     });
//   }, [navigate]);

//   // Logic for the strict Evaluation Method buttons (Developer)
//   const handleEvalToggle = (method: string) => {
//     if (method === 'quick') {
//       setEvalMethod(['quick']);
//     } else {
//       let newMethods = evalMethod.filter(m => m !== 'quick'); 
//       if (newMethods.includes(method)) {
//         newMethods = newMethods.filter(m => m !== method);
//       } else {
//         newMethods.push(method);
//       }
//       setEvalMethod(newMethods);
//     }
//   };

//   const toggleTech = (tech: string) => {
//     if (techStack.includes(tech)) {
//       setTechStack(techStack.filter(t => t !== tech));
//     } else {
//       setTechStack([...techStack, tech]);
//     }
//   };

//   const handleConfirm = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;
//     setIsLoading(true);

//     try {
//       if (projectType === 'developer') {
//         const { error } = await supabase
//           .from('developer_projects')
//           .insert({
//             founder_id: user.id,
//             title,
//             summary,
//             task_description: task,
//             tech_stack: techStack,
//             evaluation_method: evalMethod
//           });
//         if (error) throw error;
//       } 
//       else if (projectType === 'learner') {
//         const { error } = await supabase
//           .from('learner_tasks')
//           .insert({
//             user_id: user.id,
//             title,
//             summary,
//             description: task,
//             tech_stack: techStack.join(', '), // Convert array to string for this table
//             payment_type: paymentType,
//             fee_amount: paymentType === 'fees' ? parseFloat(feeAmount) : null
//           });
//         if (error) throw error;
//       }

//       alert("Project posted successfully!");
//       navigate(-1);

//     } catch (err: any) {
//       alert(`Error posting project: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen py-24 px-4 max-w-4xl mx-auto overflow-hidden">
        
//         {/* Universal Back Button */}
//         <button 
//           onClick={() => step === 2 ? setStep(1) : navigate(-1)} 
//           className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> 
//           {step === 2 ? "Back to Project Types" : "Cancel & Go Back"}
//         </button>

//         <AnimatePresence mode="wait">
//           {/* STEP 1: SELECT PROJECT TYPE */}
//           {step === 1 && (
//             <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
//               <h1 className="text-4xl font-display font-bold text-white mb-2">What are you posting?</h1>
//               <p className="text-muted-foreground mb-10">Select the target audience for your new project.</p>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
//                 {/* Developer Option */}
//                 <div 
//                   onClick={() => { setProjectType('developer'); setStep(2); }}
//                   className="glass-card p-6 cursor-pointer border border-white/5 hover:border-primary/50 transition-all group text-center flex flex-col items-center"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.1)]">
//                     <Terminal className="w-8 h-8 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Developer Project</h3>
//                   <p className="text-sm text-muted-foreground">Complex, real-world tasks requiring verified coding experience.</p>
//                 </div>

//                 {/* Learner Option (NOW ACTIVATED) */}
//                 <div 
//                   onClick={() => { setProjectType('learner'); setStep(2); }}
//                   className="glass-card p-6 cursor-pointer border border-white/5 hover:border-secondary/50 transition-all group text-center flex flex-col items-center"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.1)]">
//                     <Brain className="w-8 h-8 text-secondary" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">Learner Task</h3>
//                   <p className="text-sm text-muted-foreground">Good first issues and beginner-friendly learning tasks.</p>
//                 </div>

//                 {/* Both Option (Placeholder for later) */}
//                 <div 
//                   onClick={() => alert("Dual-post module coming soon!")}
//                   className="glass-card p-6 cursor-pointer border border-white/5 hover:border-white/30 transition-all group text-center flex flex-col items-center opacity-60 hover:opacity-100"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                     <Layers className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2 transition-colors">Both</h3>
//                   <p className="text-sm text-muted-foreground">A multi-stage project with tasks for both juniors and seniors.</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* STEP 2: DYNAMIC PROJECT FORM */}
//           {step === 2 && projectType && (
//             <motion.form key="step2" onSubmit={handleConfirm} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              
//               <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
//                 {projectType === 'developer' ? <Terminal className="w-8 h-8 text-primary" /> : <Brain className="w-8 h-8 text-secondary" />}
//                 Post {projectType === 'developer' ? 'Developer Project' : 'Learner Task'}
//               </h1>
//               <p className="text-muted-foreground mb-8">
//                 {projectType === 'developer' ? 'Define the requirements and recruit elite talent.' : 'Help the community grow by posting smaller learning tasks.'}
//               </p>

//               <div className="space-y-6">
                
//                 {/* 1. Title */}
//                 <div className="glass-card p-6">
//                   <label className="block text-sm font-medium text-white mb-2">1. Project Title</label>
//                   <input 
//                     type="text" required value={title} onChange={e => setTitle(e.target.value)}
//                     placeholder={projectType === 'developer' ? "e.g. Build an AI-powered Chatbot Backend" : "e.g. Build a responsive navbar for my portfolio"} 
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
//                   />
//                 </div>

//                 {/* 2. Summary */}
//                 <div className="glass-card p-6">
//                   <label className="block text-sm font-medium text-white mb-2">2. Brief Summary</label>
//                   <p className="text-xs text-muted-foreground mb-3">A short 1-2 sentence hook for the project feed.</p>
//                   <input 
//                     type="text" required value={summary} onChange={e => setSummary(e.target.value)}
//                     placeholder={projectType === 'developer' ? "We need a scalable Node.js backend..." : "Looking for someone to help style my landing page..."} 
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
//                   />
//                 </div>

//                 {/* 3. Task Description */}
//                 <div className="glass-card p-6">
//                   <label className="block text-sm font-medium text-white mb-2">3. Detailed Task Description</label>
//                   <textarea 
//                     required rows={5} value={task} onChange={e => setTask(e.target.value)}
//                     placeholder="Describe exactly what needs to be built, specific milestones, and expected deliverables..." 
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none resize-none"
//                   />
//                 </div>

//                 {/* 4. Tech Stack */}
//                 <div className="glass-card p-6">
//                   <label className="block text-sm font-medium text-white mb-3">4. Tech Stack Needed</label>
//                   <div className="flex flex-wrap gap-2">
//                     {AVAILABLE_TECH.map(tech => (
//                       <button
//                         key={tech} type="button" onClick={() => toggleTech(tech)}
//                         className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
//                           techStack.includes(tech) 
//                           ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(59,130,246,0.15)]' 
//                           : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
//                         }`}
//                       >
//                         {techStack.includes(tech) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
//                         {tech}
//                       </button>
//                     ))}
//                   </div>
//                   {techStack.length === 0 && <p className="text-xs text-red-400 mt-2">Please select at least one technology.</p>}
//                 </div>

//                 {/* 5A. DEVELOPER: Evaluation Method */}
//                 {projectType === 'developer' && (
//                   <div className="glass-card p-6">
//                     <label className="block text-sm font-medium text-white mb-3">5. Recruitment Method</label>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div onClick={() => handleEvalToggle('quick')} className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${evalMethod.includes('quick') ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
//                         <Zap className="w-5 h-5 mt-0.5 shrink-0" />
//                         <div>
//                           <div className="font-bold text-white mb-1">Quick Hire</div>
//                           <div className="text-xs">No extra steps. You review profiles and approve directly.</div>
//                         </div>
//                       </div>
//                       <div onClick={() => handleEvalToggle('test')} className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${evalMethod.includes('test') ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
//                         <FileText className="w-5 h-5 mt-0.5 shrink-0" />
//                         <div>
//                           <div className="font-bold text-white mb-1">Require Test</div>
//                           <div className="text-xs">Applicants must pass a coding challenge first.</div>
//                         </div>
//                       </div>
//                       <div onClick={() => handleEvalToggle('interview')} className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${evalMethod.includes('interview') ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
//                         <Users className="w-5 h-5 mt-0.5 shrink-0" />
//                         <div>
//                           <div className="font-bold text-white mb-1">Interview</div>
//                           <div className="text-xs">Require a 1-on-1 meeting before accepting.</div>
//                         </div>
//                       </div>
//                     </div>
//                     {evalMethod.length === 0 && <p className="text-xs text-red-400 mt-2">Please select an evaluation method.</p>}
//                   </div>
//                 )}

//                 {/* 5B. LEARNER: Task Compensation */}
//                 {projectType === 'learner' && (
//                   <div className="glass-card p-6">
//                     <label className="block text-sm font-medium text-white mb-3">5. Task Compensation</label>
//                     <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//                       <button 
//                         type="button" onClick={() => { setPaymentType('free'); setFeeAmount(''); }}
//                         className={`flex-1 p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto ${paymentType === 'free' ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'}`}
//                       >
//                         <Gift className="w-5 h-5" /> <span className="font-bold">Free</span>
//                       </button>
//                       <button 
//                         type="button" onClick={() => setPaymentType('fees')}
//                         className={`flex-1 p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto ${paymentType === 'fees' ? 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'}`}
//                       >
//                         <DollarSign className="w-5 h-5" /> <span className="font-bold">Paid Task</span>
//                       </button>
//                       <AnimatePresence>
//                         {paymentType === 'fees' && (
//                           <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="relative overflow-hidden w-full sm:w-auto shrink-0">
//                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><span className="text-green-500 font-bold">$</span></div>
//                             <input 
//                               required type="number" min="1" placeholder="Amount" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)}
//                               className="w-full sm:w-32 bg-black/40 border border-green-500/30 rounded-xl py-4 pl-8 pr-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
//                             />
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </div>
//                 )}

//                 {/* 6. Confirm Button */}
//                 <div className="pt-6 border-t border-white/10 flex justify-end">
//                   <button 
//                     type="submit" 
//                     disabled={isLoading || techStack.length === 0 || (projectType === 'developer' && evalMethod.length === 0) || (projectType === 'learner' && paymentType === 'fees' && !feeAmount)}
//                     className="btn-neon px-8 py-3 flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
//                     Confirm & Post Project
//                   </button>
//                 </div>

//               </div>
//             </motion.form>
//           )}
//         </AnimatePresence>
//       </div>
//     </PageLayout>
//   );
// };

// export default PostProject;






import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Brain, Layers, CheckCircle2, Zap, FileText, Users, Loader2, DollarSign, Gift, Plus, Trash2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

// Standard Tech Stack options for easy selection
const AVAILABLE_TECH = [
  'React', 'Node.js', 'Python', 'TypeScript', 'Tailwind', 
  'Supabase', 'PostgreSQL', 'Next.js', 'AWS', 'Docker', 'AI/ML'
];

// --- NEW: Interface for Test Questions ---
interface Question {
  question_text: string;
  options: string[];
  correct_answer: number;
  time_limit_minutes: number;
}

const PostProject = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // 1: Type Selection, 2: Form
  const [projectType, setProjectType] = useState<'developer' | 'learner' | 'both' | null>(null);

  // Shared Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [task, setTask] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  
  // Developer Specific State
  const [evalMethod, setEvalMethod] = useState<string[]>(['quick']); 

  // --- NEW: Test Builder State ---
  const [questions, setQuestions] = useState<Question[]>([
    { question_text: '', options: ['', '', '', ''], correct_answer: 0, time_limit_minutes: 2 }
  ]);

  // Learner Specific State
  const [paymentType, setPaymentType] = useState<'free' | 'fees'>('free');
  const [feeAmount, setFeeAmount] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
      setUser(session?.user);
    });
  }, [navigate]);

  // Logic for the strict Evaluation Method buttons (Developer)
  const handleEvalToggle = (method: string) => {
    if (method === 'quick') {
      setEvalMethod(['quick']);
    } else {
      let newMethods = evalMethod.filter(m => m !== 'quick'); 
      if (newMethods.includes(method)) {
        newMethods = newMethods.filter(m => m !== method);
      } else {
        newMethods.push(method);
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

  // --- NEW: Question Builder Functions ---
  const addQuestion = () => {
    setQuestions([...questions, { question_text: '', options: ['', '', '', ''], correct_answer: 0, time_limit_minutes: 2 }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };
  // ---------------------------------------

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    try {
      if (projectType === 'developer') {
        // --- UPDATED: Insert project and get ID, then insert questions ---
        const { data: projectData, error: projectError } = await supabase
          .from('developer_projects')
          .insert({
            founder_id: user.id,
            title,
            summary,
            task_description: task,
            tech_stack: techStack,
            evaluation_method: evalMethod
          })
          .select() // Required to get the inserted project's ID
          .single();

        if (projectError) throw projectError;

        // If "Require Test" is selected, insert the questions into project_tests
        if (evalMethod.includes('test') && questions.length > 0) {
          const testInserts = questions.map(q => ({
            project_id: projectData.id,
            question_text: q.question_text,
            options: q.options,
            correct_answer: q.correct_answer,
            time_limit_minutes: q.time_limit_minutes
          }));

          const { error: testError } = await supabase.from('project_tests').insert(testInserts);
          if (testError) throw testError;
        }
      } 
      else if (projectType === 'learner') {
        const { error } = await supabase
          .from('learner_tasks')
          .insert({
            user_id: user.id,
            title,
            summary,
            description: task,
            tech_stack: techStack.join(', '), // Convert array to string for this table
            payment_type: paymentType,
            fee_amount: paymentType === 'fees' ? parseFloat(feeAmount) : null
          });
        if (error) throw error;
      }

      alert("Project posted successfully!");
      navigate(-1);

    } catch (err: any) {
      alert(`Error posting project: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen py-24 px-4 max-w-4xl mx-auto overflow-hidden">
        
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
                  className="glass-card p-6 cursor-pointer border border-white/5 hover:border-primary/50 transition-all group text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <Terminal className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Developer Project</h3>
                  <p className="text-sm text-muted-foreground">Complex, real-world tasks requiring verified coding experience.</p>
                </div>

                {/* Learner Option */}
                <div 
                  onClick={() => { setProjectType('learner'); setStep(2); }}
                  className="glass-card p-6 cursor-pointer border border-white/5 hover:border-secondary/50 transition-all group text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <Brain className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">Learner Task</h3>
                  <p className="text-sm text-muted-foreground">Good first issues and beginner-friendly learning tasks.</p>
                </div>

                {/* Both Option */}
                <div 
                  onClick={() => alert("Dual-post module coming soon!")}
                  className="glass-card p-6 cursor-pointer border border-white/5 hover:border-white/30 transition-all group text-center flex flex-col items-center opacity-60 hover:opacity-100"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors">Both</h3>
                  <p className="text-sm text-muted-foreground">A multi-stage project with tasks for both juniors and seniors.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DYNAMIC PROJECT FORM */}
          {step === 2 && projectType && (
            <motion.form key="step2" onSubmit={handleConfirm} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              
              <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                {projectType === 'developer' ? <Terminal className="w-8 h-8 text-primary" /> : <Brain className="w-8 h-8 text-secondary" />}
                Post {projectType === 'developer' ? 'Developer Project' : 'Learner Task'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {projectType === 'developer' ? 'Define the requirements and recruit elite talent.' : 'Help the community grow by posting smaller learning tasks.'}
              </p>

              <div className="space-y-6">
                
                {/* 1. Title */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-2">1. Project Title</label>
                  <input 
                    type="text" required value={title} onChange={e => setTitle(e.target.value)}
                    placeholder={projectType === 'developer' ? "e.g. Build an AI-powered Chatbot Backend" : "e.g. Build a responsive navbar for my portfolio"} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                  />
                </div>

                {/* 2. Summary */}
                <div className="glass-card p-6">
                  <label className="block text-sm font-medium text-white mb-2">2. Brief Summary</label>
                  <p className="text-xs text-muted-foreground mb-3">A short 1-2 sentence hook for the project feed.</p>
                  <input 
                    type="text" required value={summary} onChange={e => setSummary(e.target.value)}
                    placeholder={projectType === 'developer' ? "We need a scalable Node.js backend..." : "Looking for someone to help style my landing page..."} 
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
                          ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(59,130,246,0.15)]' 
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

                {/* 5A. DEVELOPER: Evaluation Method */}
                {projectType === 'developer' && (
                  <div className="glass-card p-6">
                    <label className="block text-sm font-medium text-white mb-3">5. Recruitment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div onClick={() => handleEvalToggle('quick')} className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${evalMethod.includes('quick') ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
                        <Zap className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold text-white mb-1">Quick Hire</div>
                          <div className="text-xs">No extra steps. You review profiles and approve directly.</div>
                        </div>
                      </div>
                      <div onClick={() => handleEvalToggle('test')} className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${evalMethod.includes('test') ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
                        <FileText className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold text-white mb-1">Require Test</div>
                          <div className="text-xs">Applicants must pass a coding challenge first.</div>
                        </div>
                      </div>
                      <div onClick={() => handleEvalToggle('interview')} className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${evalMethod.includes('interview') ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
                        <Users className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold text-white mb-1">Interview</div>
                          <div className="text-xs">Require a 1-on-1 meeting before accepting.</div>
                        </div>
                      </div>
                    </div>
                    {evalMethod.length === 0 && <p className="text-xs text-red-400 mt-2">Please select an evaluation method.</p>}
                  </div>
                )}

                {/* --- NEW: DYNAMIC TEST BUILDER UI --- */}
                {projectType === 'developer' && evalMethod.includes('test') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6 border-primary/30">
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-lg font-bold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> Screening Test Builder</label>
                    </div>
                    
                    <div className="space-y-6">
                      {questions.map((q, qIndex) => (
                        <div key={qIndex} className="p-4 bg-black/40 border border-white/10 rounded-xl relative">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-primary">Question {qIndex + 1}</span>
                            {questions.length > 1 && (
                              <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-400 hover:text-red-300 p-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <input 
                            required type="text" 
                            placeholder="Enter your question here..." 
                            value={q.question_text} 
                            onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)} 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white mb-4 outline-none focus:border-primary/50" 
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {q.options.map((opt, optIndex) => (
                              <div key={optIndex} className={`flex items-center gap-3 p-2 rounded-lg border ${q.correct_answer === optIndex ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>
                                <input 
                                  type="radio" 
                                  name={`correct-${qIndex}`} 
                                  checked={q.correct_answer === optIndex} 
                                  onChange={() => updateQuestion(qIndex, 'correct_answer', optIndex)} 
                                  className="w-4 h-4 accent-green-500" 
                                />
                                <input 
                                  required type="text" 
                                  placeholder={`Option ${optIndex + 1}`} 
                                  value={opt} 
                                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)} 
                                  className="bg-transparent border-none text-sm text-white w-full outline-none" 
                                />
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                            <span className="text-sm text-muted-foreground">Time Limit:</span>
                            <input 
                              type="number" min="1" 
                              value={q.time_limit_minutes} 
                              onChange={(e) => updateQuestion(qIndex, 'time_limit_minutes', parseInt(e.target.value) || 1)} 
                              className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-center text-white text-sm outline-none" 
                            />
                            <span className="text-sm text-muted-foreground">minutes</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      type="button" 
                      onClick={addQuestion} 
                      className="w-full mt-4 py-3 border border-dashed border-white/20 rounded-xl text-muted-foreground hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Another Question
                    </button>
                  </motion.div>
                )}

                {/* 5B. LEARNER: Task Compensation */}
                {projectType === 'learner' && (
                  <div className="glass-card p-6">
                    <label className="block text-sm font-medium text-white mb-3">5. Task Compensation</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <button 
                        type="button" onClick={() => { setPaymentType('free'); setFeeAmount(''); }}
                        className={`flex-1 p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto ${paymentType === 'free' ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'}`}
                      >
                        <Gift className="w-5 h-5" /> <span className="font-bold">Free</span>
                      </button>
                      <button 
                        type="button" onClick={() => setPaymentType('fees')}
                        className={`flex-1 p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto ${paymentType === 'fees' ? 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'}`}
                      >
                        <DollarSign className="w-5 h-5" /> <span className="font-bold">Paid Task</span>
                      </button>
                      <AnimatePresence>
                        {paymentType === 'fees' && (
                          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 'auto', opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="relative overflow-hidden w-full sm:w-auto shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><span className="text-green-500 font-bold">$</span></div>
                            <input 
                              required type="number" min="1" placeholder="Amount" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)}
                              className="w-full sm:w-32 bg-black/40 border border-green-500/30 rounded-xl py-4 pl-8 pr-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* 6. Confirm Button */}
                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isLoading || techStack.length === 0 || (projectType === 'developer' && evalMethod.length === 0) || (projectType === 'learner' && paymentType === 'fees' && !feeAmount)}
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