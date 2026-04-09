// // import { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Clock, Users, Briefcase, Sparkles, X, CheckCircle2, Zap, DollarSign, Loader2 } from 'lucide-react';
// // import { useMode } from '@/context/ModeContext';
// // import { supabase } from '@/lib/supabase';

// // interface ProjectCardProps {
// //   project: any; 
// //   index: number;
// // }

// // export const ProjectCard = ({ project, index }: ProjectCardProps) => {
// //   const { mode } = useMode();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [hasApplied, setHasApplied] = useState(false);
// //   const [isApplying, setIsApplying] = useState(false);
  
// //   // Two-step process for paid learner tasks
// //   const [showPayment, setShowPayment] = useState(false);

// //   const difficultyColor: Record<string, string> = {
// //     Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
// //     Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
// //     Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
// //   };

// //   const typeColor: Record<string, string> = {
// //     Paid: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
// //     Learning: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
// //     'Open Source': 'text-neon-pink bg-neon-pink/10 border-neon-pink/20',
// //     'Quick Hire': 'text-green-400 bg-green-500/10 border-green-500/20',
// //     Standard: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
// //   };

// //   const handleApplyClick = () => {
// //     // If it's a learner task and requires a fee, intercept the apply button
// //     if (mode === 'learner' && project.paymentType === 'fees' && !showPayment) {
// //       setShowPayment(true);
// //     } else {
// //       executeApplication();
// //     }
// //   };

// //   const executeApplication = async () => {
// //     setIsApplying(true);
// //     const { data: { session } } = await supabase.auth.getSession();
// //     if (!session?.user) {
// //       alert("Please log in to apply!");
// //       setIsApplying(false);
// //       return;
// //     }

// //     try {
// //       const { error } = await supabase.from('project_applications').insert({
// //         project_id: project.id,
// //         applicant_id: session.user.id,
// //         applicant_name: session.user.user_metadata?.full_name || 'Anonymous Developer',
// //         applicant_github: session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name || null,
// //         // Automatically set to 'paid' if it's a learner mode task so the founder sees it
// //         status: mode === 'learner' ? 'paid' : 'pending'
// //       });

// //       if (error) {
// //         if (error.code === '23505') throw new Error("You have already applied to this project!");
// //         throw error;
// //       }

// //       setHasApplied(true);
// //       setTimeout(() => { setIsModalOpen(false); }, 2000); // Close modal automatically
      
// //     } catch (err: any) {
// //       alert(err.message);
// //     } finally {
// //       setIsApplying(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, delay: index * 0.1 }}
// //       >
// //         <motion.div
// //           whileHover={{ y: -8, scale: 1.01 }}
// //           transition={{ type: 'spring', stiffness: 300, damping: 20 }}
// //           onClick={() => { setIsModalOpen(true); setShowPayment(false); }}
// //           className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden"
// //         >
// //           {project.featured && (
// //             <div className="absolute top-4 right-4 z-10">
// //               <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-semibold text-primary-foreground">
// //                 <Sparkles className="w-3 h-3" /> Featured
// //               </div>
// //             </div>
// //           )}

// //           {/* Header */}
// //           <div className="flex items-start gap-3 mb-4 pr-20">
// //             <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-sm font-bold">
// //               {project.founder?.avatar || 'F'}
// //             </div>
// //             <div className="flex-1 min-w-0">
// //               <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
// //                 {project.title}
// //               </h3>
// //               <p className="text-sm text-muted-foreground">{project.founder?.name || 'Founder'}</p>
// //             </div>
// //           </div>

// //           <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
// //             {project.description}
// //           </p>

// //           <div className="flex flex-wrap gap-1.5 mb-4">
// //             {project.techStack.slice(0, 4).map((tech: string) => (
// //               <span key={tech} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground">
// //                 {tech}
// //               </span>
// //             ))}
// //             {project.techStack.length > 4 && (
// //               <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-muted-foreground">
// //                 +{project.techStack.length - 4}
// //               </span>
// //             )}
// //           </div>

// //           <div className="flex flex-wrap gap-2 mb-4">
// //             <span className={`px-2 py-1 text-xs rounded-md border ${difficultyColor[project.difficulty] || difficultyColor['Beginner']}`}>
// //               {project.difficulty}
// //             </span>
// //             <span className={`px-2 py-1 text-xs rounded-md border ${typeColor[project.type] || typeColor['Standard']}`}>
// //               {project.type}
// //             </span>
// //             {project.type === 'Quick Hire' && (
// //               <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20">
// //                 <Zap className="w-3 h-3" /> Quick
// //               </span>
// //             )}
// //           </div>

// //           <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground gap-y-2">
// //              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>{project.timeline}</span></div>
// //              <div className="text-primary font-semibold hover:text-white transition-colors">View Details &rarr;</div>
// //           </div>

// //           {/* Budget / Fee Badge */}
// //           {mode === 'learner' && project.paymentType === 'fees' ? (
// //              <div className="mt-4 text-center py-2 rounded-lg border bg-green-500/10 border-green-500/30 text-green-400 text-sm font-bold flex justify-center items-center gap-1">
// //                <DollarSign className="w-4 h-4"/> Fee: ${project.feeAmount}
// //              </div>
// //           ) : mode === 'developer' && project.budget ? (
// //              <div className="mt-4 text-center py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
// //                <span className="text-sm font-medium gradient-text">{project.budget}</span>
// //              </div>
// //           ) : null}
// //         </motion.div>
// //       </motion.div>

// //       {/* --- MODAL --- */}
// //       <AnimatePresence>
// //         {isModalOpen && (
// //           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
// //             <motion.div 
// //               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //               onClick={() => setIsModalOpen(false)}
// //               className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
// //             />
            
// //             <motion.div 
// //               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
// //               animate={{ opacity: 1, scale: 1, y: 0 }} 
// //               exit={{ opacity: 0, scale: 0.95, y: 20 }}
// //               className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 z-10 bg-[#0f172a]"
// //             >
// //               <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors">
// //                 <X className="w-5 h-5" />
// //               </button>

// //               <div className="mb-6">
// //                 <div className="flex items-center gap-3 mb-6">
// //                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-white font-bold">
// //                     {project.founder?.avatar || 'F'}
// //                   </div>
// //                   <div>
// //                     <div className="text-xs text-muted-foreground">Posted by</div>
// //                     <div className="text-sm font-bold text-white">{project.founder?.name || 'Founder'}</div>
// //                   </div>
// //                 </div>
                
// //                 <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 pr-8">
// //                   {project.title}
// //                 </h2>

// //                 <div className="flex flex-wrap gap-2 mb-8">
// //                   <span className={`px-3 py-1 text-xs font-bold rounded-full border ${difficultyColor[project.difficulty] || difficultyColor['Beginner']}`}>
// //                     {project.difficulty}
// //                   </span>
// //                   <span className={`px-3 py-1 text-xs font-bold rounded-full border ${typeColor[project.type] || typeColor['Standard']}`}>
// //                     {project.type}
// //                   </span>
// //                   {project.budget && (
// //                     <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full">
// //                       {project.budget}
// //                     </span>
// //                   )}
// //                 </div>

// //                 <div className="space-y-8">
// //                   <div>
// //                     <h4 className="text-lg font-bold text-white mb-2">Project Overview</h4>
// //                     <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
// //                       {project.description}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <h4 className="text-lg font-bold text-white mb-3">Required Tech Stack</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {project.techStack.map((tech: string) => (
// //                         <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg">
// //                           {tech}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
                  
// //                   {/* Dynamic Metrics */}
// //                   {/* <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
// //                     <div className="text-center">
// //                       <div className="text-2xl font-bold text-white">{project.timeline}</div>
// //                       <div className="text-xs text-muted-foreground uppercase mt-1">Timeline</div>
// //                     </div>
// //                     <div className="text-center border-x border-white/10">
// //                       <div className="text-2xl font-bold text-white">{project.applicants}</div>
// //                       <div className="text-xs text-muted-foreground uppercase mt-1">Applicants</div>
// //                     </div>
// //                     <div className="text-center">
// //                       <div className="text-2xl font-bold text-white">{project.spotsLeft}</div>
// //                       <div className="text-xs text-muted-foreground uppercase mt-1">Spots Left</div>
// //                     </div>
// //                   </div> */}
// //                 </div>
// //               </div>

// //               {/* DYNAMIC APPLICATION / PAYMENT FOOTER */}
// //               <AnimatePresence mode="wait">
// //                 {showPayment ? (
// //                   <motion.div key="payment" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 pt-6 border-t border-white/10">
// //                     <p className="text-muted-foreground mb-4 text-sm">
// //                       This is a premium learning task. A one-time fee is required to access the codebase and receive founder feedback.
// //                     </p>
// //                     <div className="bg-black/40 p-4 rounded-xl mb-6 flex justify-between items-center border border-white/5">
// //                       <span className="text-white font-medium flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400"/> Total Fee</span>
// //                       <span className="text-3xl font-bold text-green-400">${project.feeAmount}</span>
// //                     </div>
// //                     <div className="flex gap-4">
// //                       <button onClick={() => setShowPayment(false)} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
// //                         Cancel
// //                       </button>
// //                       <button 
// //                         onClick={executeApplication}
// //                         disabled={isApplying}
// //                         className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
// //                       >
// //                         {isApplying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay & Submit Application"}
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 ) : (
// //                   <motion.div key="apply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 pt-6 border-t border-white/10 flex justify-end">
// //                     <button 
// //                       onClick={handleApplyClick}
// //                       disabled={hasApplied}
// //                       className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
// //                         hasApplied 
// //                           ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed' 
// //                           : 'bg-primary text-white hover:scale-105 hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
// //                       }`}
// //                     >
// //                       {hasApplied ? <><CheckCircle2 className="w-5 h-5" /> Application Sent!</> : 'Apply for Project'}
// //                     </button>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>

// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // export default ProjectCard;




// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Clock, Users, Briefcase, Sparkles, X, CheckCircle2, Zap, DollarSign, Loader2, FileText, Timer } from 'lucide-react';
// import { useMode } from '@/context/ModeContext';
// import { supabase } from '@/lib/supabase';

// interface ProjectCardProps {
//   project: any; 
//   index: number;
// }

// export const ProjectCard = ({ project, index }: ProjectCardProps) => {
//   const { mode } = useMode();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [hasApplied, setHasApplied] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
  
//   // Two-step process for paid learner tasks
//   const [showPayment, setShowPayment] = useState(false);

//   // --- NEW: TEST ENGINE STATE ---
//   const [testQuestions, setTestQuestions] = useState<any[]>([]);
//   const [isTestActive, setIsTestActive] = useState(false);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState(0); // in seconds

//   const difficultyColor: Record<string, string> = {
//     Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
//     Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
//     Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
//   };

//   const typeColor: Record<string, string> = {
//     Paid: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
//     Learning: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
//     'Open Source': 'text-neon-pink bg-neon-pink/10 border-neon-pink/20',
//     'Quick Hire': 'text-green-400 bg-green-500/10 border-green-500/20',
//     Standard: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
//   };

//   // --- NEW: Timer Effect ---
//   useEffect(() => {
//     let timer: any;
//     if (isTestActive && timeLeft > 0) {
//       timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     } else if (isTestActive && timeLeft === 0) {
//       handleNextQuestion(); // Auto-advance if time runs out
//     }
//     return () => clearInterval(timer);
//   }, [isTestActive, timeLeft]);

//   const handleApplyClick = async () => {
//     // If it's a learner task and requires a fee, intercept the apply button
//     if (mode === 'learner' && project.paymentType === 'fees' && !showPayment) {
//       setShowPayment(true);
//       return;
//     }

//     setIsApplying(true);

//     // --- NEW: Check if project requires a test ---
//     if (project.evaluation_method?.includes('test')) {
//       const { data } = await supabase.from('project_tests').select('*').eq('project_id', project.id);
      
//       if (data && data.length > 0) {
//         setTestQuestions(data);
//         setAnswers(new Array(data.length).fill(-1)); // Initialize empty answers
//         setTimeLeft(data[0].time_limit_minutes * 60); // Set timer for Q1
//         setIsTestActive(true); // Launch test UI
//         setIsApplying(false);
//         return; // Pause the application flow here!
//       }
//     }

//     // If no test is required, proceed normally
//     executeApplication(null);
//   };

//   // --- NEW: Handle Test Progression ---
//   const handleNextQuestion = () => {
//     if (currentQ < testQuestions.length - 1) {
//       setCurrentQ(prev => prev + 1);
//       setTimeLeft(testQuestions[currentQ + 1].time_limit_minutes * 60);
//     } else {
//       // Calculate Final Score when test finishes
//       const finalScore = answers.reduce((acc, ans, idx) => acc + (ans === testQuestions[idx].correct_answer ? 1 : 0), 0);
//       setIsTestActive(false);
//       executeApplication(finalScore);
//     }
//   };

//   // --- UPDATED: Application Execution ---
//   const executeApplication = async (score: number | null) => {
//     setIsApplying(true);
//     const { data: { session } } = await supabase.auth.getSession();
//     if (!session?.user) {
//       alert("Please log in to apply!");
//       setIsApplying(false);
//       return;
//     }

//     try {
//       const { error } = await supabase.from('project_applications').insert({
//         project_id: project.id,
//         applicant_id: session.user.id,
//         applicant_name: session.user.user_metadata?.full_name || 'Anonymous Developer',
//         applicant_github: session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name || null,
//         status: mode === 'learner' ? 'paid' : 'pending',
//         test_score: score // Save the calculated test score here!
//       });

//       if (error) {
//         if (error.code === '23505') throw new Error("You have already applied to this project!");
//         throw error;
//       }

//       setHasApplied(true);
//       setTimeout(() => { setIsModalOpen(false); }, 2000); // Close modal automatically
      
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const formatTime = (sec: number) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//       >
//         <motion.div
//           whileHover={{ y: -8, scale: 1.01 }}
//           transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//           onClick={() => { setIsModalOpen(true); setShowPayment(false); }}
//           className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden"
//         >
//           {project.featured && (
//             <div className="absolute top-4 right-4 z-10">
//               <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-semibold text-primary-foreground">
//                 <Sparkles className="w-3 h-3" /> Featured
//               </div>
//             </div>
//           )}

//           {/* Header */}
//           <div className="flex items-start gap-3 mb-4 pr-20">
//             <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-sm font-bold">
//               {project.founder?.avatar || 'F'}
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
//                 {project.title}
//               </h3>
//               <p className="text-sm text-muted-foreground">{project.founder?.name || 'Founder'}</p>
//             </div>
//           </div>

//           <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
//             {project.description || project.summary}
//           </p>

//           <div className="flex flex-wrap gap-1.5 mb-4">
//             {project.techStack?.slice(0, 4).map((tech: string) => (
//               <span key={tech} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground">
//                 {tech}
//               </span>
//             ))}
//             {project.techStack?.length > 4 && (
//               <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-muted-foreground">
//                 +{project.techStack.length - 4}
//               </span>
//             )}
//           </div>

//           <div className="flex flex-wrap gap-2 mb-4">
//             <span className={`px-2 py-1 text-xs rounded-md border ${difficultyColor[project.difficulty] || difficultyColor['Beginner']}`}>
//               {project.difficulty || 'Intermediate'}
//             </span>
//             <span className={`px-2 py-1 text-xs rounded-md border ${typeColor[project.type] || typeColor['Standard']}`}>
//               {project.type || 'Standard'}
//             </span>
            
//             {/* Show Test Badge if required */}
//             {project.evaluation_method?.includes('test') && (
//               <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20">
//                 <FileText className="w-3 h-3" /> Test Req
//               </span>
//             )}
            
//             {project.evaluation_method?.includes('quick') && (
//               <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20">
//                 <Zap className="w-3 h-3" /> Quick
//               </span>
//             )}
//           </div>

//           <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground gap-y-2">
//              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>Posted recently</span></div>
//              <div className="text-primary font-semibold hover:text-white transition-colors">View Details &rarr;</div>
//           </div>

//           {/* Budget / Fee Badge */}
//           {mode === 'learner' && project.paymentType === 'fees' ? (
//              <div className="mt-4 text-center py-2 rounded-lg border bg-green-500/10 border-green-500/30 text-green-400 text-sm font-bold flex justify-center items-center gap-1">
//                <DollarSign className="w-4 h-4"/> Fee: ${project.feeAmount}
//              </div>
//           ) : mode === 'developer' && project.budget ? (
//              <div className="mt-4 text-center py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
//                <span className="text-sm font-medium gradient-text">{project.budget}</span>
//              </div>
//           ) : null}
//         </motion.div>
//       </motion.div>

//       {/* --- MODAL --- */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => { if(!isTestActive) setIsModalOpen(false) }}
//               className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
//             />
            
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
//               animate={{ opacity: 1, scale: 1, y: 0 }} 
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 z-10 bg-[#0f172a]"
//             >
//               {!isTestActive && (
//                 <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors">
//                   <X className="w-5 h-5" />
//                 </button>
//               )}

//               {/* --- NEW: OVERRIDE MODAL WITH TEST UI IF ACTIVE --- */}
//               {isTestActive ? (
//                 <div>
//                   <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
//                     <h2 className="text-xl font-bold text-white flex items-center gap-2"><FileText className="text-primary" /> Technical Assessment</h2>
//                     <div className={`px-4 py-2 rounded-xl font-mono font-bold flex items-center gap-2 ${timeLeft < 30 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/10 text-white'}`}>
//                       <Timer className="w-4 h-4"/> {formatTime(timeLeft)}
//                     </div>
//                   </div>
                  
//                   <div className="mb-8">
//                     <div className="text-sm text-primary font-bold mb-2">Question {currentQ + 1} of {testQuestions.length}</div>
//                     <h3 className="text-2xl font-medium text-white leading-relaxed">{testQuestions[currentQ].question_text}</h3>
//                   </div>

//                   <div className="grid grid-cols-1 gap-3 mb-8">
//                     {testQuestions[currentQ].options.map((opt: string, idx: number) => (
//                       <button 
//                         key={idx} onClick={() => { const newAns = [...answers]; newAns[currentQ] = idx; setAnswers(newAns); }}
//                         className={`w-full text-left p-4 rounded-xl border transition-all ${answers[currentQ] === idx ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentQ] === idx ? 'border-primary bg-primary' : 'border-gray-500'}`}>
//                             {answers[currentQ] === idx && <div className="w-2 h-2 rounded-full bg-white"/>}
//                           </div>
//                           {opt}
//                         </div>
//                       </button>
//                     ))}
//                   </div>

//                   <div className="flex justify-end pt-4 border-t border-white/10">
//                     <button onClick={handleNextQuestion} disabled={answers[currentQ] === -1} className="btn-neon px-8 py-3 disabled:opacity-50">
//                       {currentQ === testQuestions.length - 1 ? 'Submit Test & Apply' : 'Next Question'}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 /* --- STANDARD MODAL DETAILS --- */
//                 <>
//                   <div className="mb-6">
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-white font-bold">
//                         {project.founder?.avatar || 'F'}
//                       </div>
//                       <div>
//                         <div className="text-xs text-muted-foreground">Posted by</div>
//                         <div className="text-sm font-bold text-white">{project.founder?.name || 'Founder'}</div>
//                       </div>
//                     </div>
                    
//                     <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 pr-8">
//                       {project.title}
//                     </h2>

//                     <div className="flex flex-wrap gap-2 mb-8">
//                       <span className={`px-3 py-1 text-xs font-bold rounded-full border ${difficultyColor[project.difficulty] || difficultyColor['Beginner']}`}>
//                         {project.difficulty || 'Intermediate'}
//                       </span>
//                       <span className={`px-3 py-1 text-xs font-bold rounded-full border ${typeColor[project.type] || typeColor['Standard']}`}>
//                         {project.type || 'Standard'}
//                       </span>
//                     </div>

//                     <div className="space-y-8">
//                       <div>
//                         <h4 className="text-lg font-bold text-white mb-2">Project Overview</h4>
//                         <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                           {project.task_description || project.description || project.summary}
//                         </p>
//                       </div>

//                       <div>
//                         <h4 className="text-lg font-bold text-white mb-3">Required Tech Stack</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {(Array.isArray(project.techStack) ? project.techStack : project.tech_stack?.split(',') || []).map((tech: string) => (
//                             <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg">
//                               {tech.trim()}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* DYNAMIC APPLICATION / PAYMENT FOOTER */}
//                   <AnimatePresence mode="wait">
//                     {showPayment ? (
//                       <motion.div key="payment" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 pt-6 border-t border-white/10">
//                         <p className="text-muted-foreground mb-4 text-sm">
//                           This is a premium learning task. A one-time fee is required to access the codebase and receive founder feedback.
//                         </p>
//                         <div className="bg-black/40 p-4 rounded-xl mb-6 flex justify-between items-center border border-white/5">
//                           <span className="text-white font-medium flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400"/> Total Fee</span>
//                           <span className="text-3xl font-bold text-green-400">${project.feeAmount}</span>
//                         </div>
//                         <div className="flex gap-4">
//                           <button onClick={() => setShowPayment(false)} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
//                             Cancel
//                           </button>
//                           <button 
//                             onClick={() => executeApplication(null)}
//                             disabled={isApplying}
//                             className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
//                           >
//                             {isApplying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay & Submit Application"}
//                           </button>
//                         </div>
//                       </motion.div>
//                     ) : (
//                       <motion.div key="apply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 pt-6 border-t border-white/10 flex justify-end">
//                         <button 
//                           onClick={handleApplyClick}
//                           disabled={hasApplied || isApplying}
//                           className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
//                             hasApplied 
//                               ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed' 
//                               : 'bg-primary text-white hover:scale-105 hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
//                           }`}
//                         >
//                           {isApplying ? (
//                             <Loader2 className="w-5 h-5 animate-spin" />
//                           ) : hasApplied ? (
//                             <><CheckCircle2 className="w-5 h-5" /> Application Sent!</>
//                           ) : project.evaluation_method?.includes('test') ? (
//                             'Start Test & Apply'
//                           ) : (
//                             'Apply for Project'
//                           )}
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </>
//               )}

//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ProjectCard;





import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Briefcase, Sparkles, X, CheckCircle2, Zap, DollarSign, Loader2, FileText, Timer, AlertTriangle } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { supabase } from '@/lib/supabase';

interface ProjectCardProps {
  project: any; 
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { mode } = useMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  
  const [showPayment, setShowPayment] = useState(false);

  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [showTestReady, setShowTestReady] = useState(false); 
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // --- NEW: Bulletproof Helper to check for test requirement ---
  const checkIfTestRequired = () => {
    const methods = project.evaluation_method || project.evaluationMethod;
    if (!methods) return false;
    if (typeof methods === 'string') return methods.includes('test');
    if (Array.isArray(methods)) return methods.includes('test');
    // If it's a JSON object
    try {
      const parsed = JSON.parse(methods);
      if (Array.isArray(parsed)) return parsed.includes('test');
    } catch(e) {}
    return false;
  };

  const isTestRequired = checkIfTestRequired();

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

  useEffect(() => {
    let timer: any;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isTestActive && timeLeft === 0) {
      handleNextQuestion(); 
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const handleApplyClick = async () => {
    if (mode === 'learner' && project.paymentType === 'fees' && !showPayment) {
      setShowPayment(true);
      return;
    }

    setIsApplying(true);

    if (isTestRequired) {
      console.log("Test is required. Fetching questions for project ID:", project.id);
      
      const { data, error } = await supabase.from('project_tests').select('*').eq('project_id', project.id);
      
      if (error) {
        console.error("Supabase Error fetching tests:", error);
        alert(`Database Error: ${error.message}`);
        setIsApplying(false);
        return;
      }

      console.log("Fetched questions:", data);

      if (!data || data.length === 0) {
         alert("WARNING: The founder selected 'Require Test' but did not save any questions. You will be allowed to apply normally.");
         executeApplication(null);
         return;
      }

      if (data && data.length > 0) {
        setTestQuestions(data);
        setAnswers(new Array(data.length).fill(-1)); 
        setTimeLeft(data[0].time_limit_minutes * 60); 
        setIsApplying(false);
        setShowTestReady(true); 
        return; 
      }
    } else {
        console.log("No test required based on evaluation methods.");
    }

    executeApplication(null);
  };

  const startTest = () => {
    setShowTestReady(false);
    setIsTestActive(true);
  };

  const handleNextQuestion = () => {
    if (currentQ < testQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setTimeLeft(testQuestions[currentQ + 1].time_limit_minutes * 60);
    } else {
      const finalScore = answers.reduce((acc, ans, idx) => acc + (ans === testQuestions[idx].correct_answer ? 1 : 0), 0);
      setIsTestActive(false);
      executeApplication(finalScore);
    }
  };

  const executeApplication = async (score: number | null) => {
    setIsApplying(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      alert("Please log in to apply!");
      setIsApplying(false);
      return;
    }

    try {
      const { error } = await supabase.from('project_applications').insert({
        project_id: project.id,
        applicant_id: session.user.id,
        applicant_name: session.user.user_metadata?.full_name || 'Anonymous Developer',
        applicant_github: session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name || null,
        status: mode === 'learner' ? 'paid' : 'pending',
        test_score: score 
      });

      if (error) {
        if (error.code === '23505') throw new Error("You have already applied to this project!");
        throw error;
      }

      setHasApplied(true);
      setTimeout(() => { setIsModalOpen(false); }, 2000); 
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsApplying(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
        <motion.div whileHover={{ y: -8, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} onClick={() => { setIsModalOpen(true); setShowPayment(false); }} className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden">
          
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-semibold text-primary-foreground">
                <Sparkles className="w-3 h-3" /> Featured
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 mb-4 pr-20">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-sm font-bold">
              {project.founder?.avatar || 'F'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.founder?.name || 'Founder'}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{project.description || project.summary || project.task_description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {(Array.isArray(project.techStack) ? project.techStack : project.tech_stack?.split(',') || []).slice(0, 4).map((tech: string, i: number) => (
              <span key={i} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground">{tech.trim()}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2 py-1 text-xs rounded-md border ${difficultyColor[project.difficulty] || difficultyColor['Intermediate']}`}>{project.difficulty || 'Intermediate'}</span>
            <span className={`px-2 py-1 text-xs rounded-md border ${typeColor[project.type] || typeColor['Standard']}`}>{project.type || 'Standard'}</span>
            
            {isTestRequired && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileText className="w-3 h-3" /> Test Req
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 text-xs text-muted-foreground gap-y-2">
             <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /><span>Posted recently</span></div>
             <div className="text-primary font-semibold hover:text-white transition-colors">View Details &rarr;</div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { if(!isTestActive && !showTestReady) setIsModalOpen(false) }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 z-10 bg-[#0f172a]"
            >
              {!isTestActive && !showTestReady && (
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* 1. ACTIVE TEST UI */}
              {isTestActive ? (
                <div>
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><FileText className="text-primary" /> Technical Assessment</h2>
                    <div className={`px-4 py-2 rounded-xl font-mono font-bold flex items-center gap-2 ${timeLeft < 30 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/10 text-white'}`}>
                      <Timer className="w-4 h-4"/> {formatTime(timeLeft)}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-sm text-primary font-bold mb-2">Question {currentQ + 1} of {testQuestions.length}</div>
                    <h3 className="text-2xl font-medium text-white leading-relaxed">{testQuestions[currentQ].question_text}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {testQuestions[currentQ].options.map((opt: string, idx: number) => (
                      <button 
                        key={idx} onClick={() => { const newAns = [...answers]; newAns[currentQ] = idx; setAnswers(newAns); }}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${answers[currentQ] === idx ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentQ] === idx ? 'border-primary bg-primary' : 'border-gray-500'}`}>
                            {answers[currentQ] === idx && <div className="w-2 h-2 rounded-full bg-white"/>}
                          </div>
                          {opt}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button onClick={handleNextQuestion} disabled={answers[currentQ] === -1} className="btn-neon px-8 py-3 disabled:opacity-50">
                      {currentQ === testQuestions.length - 1 ? 'Submit Test & Apply' : 'Next Question'}
                    </button>
                  </div>
                </div>

              // 2. ARE YOU READY PROMPT UI
              ) : showTestReady ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Technical Assessment Required</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    The founder requires all applicants to complete a short multiple-choice screening test. 
                    Once you start, a timer will begin and you cannot pause it. 
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-sm mx-auto mb-8 flex justify-around">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Questions</div>
                      <div className="font-bold text-white text-xl">{testQuestions.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">First Q Time</div>
                      <div className="font-bold text-white text-xl">{testQuestions[0]?.time_limit_minutes} min</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => setShowTestReady(false)} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                      Cancel Application
                    </button>
                    <button onClick={startTest} className="btn-neon px-8 py-3 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" /> I'm Ready, Start Timer
                    </button>
                  </div>
                </div>

              // 3. STANDARD PROJECT DETAILS UI
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-white font-bold">
                        {project.founder?.avatar || 'F'}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Posted by</div>
                        <div className="text-sm font-bold text-white">{project.founder?.name || 'Founder'}</div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 pr-8">
                      {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${difficultyColor[project.difficulty] || difficultyColor['Intermediate']}`}>
                        {project.difficulty || 'Intermediate'}
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${typeColor[project.type] || typeColor['Standard']}`}>
                        {project.type || 'Standard'}
                      </span>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Project Overview</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {project.task_description || project.description || project.summary}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white mb-3">Required Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(project.techStack) ? project.techStack : project.tech_stack?.split(',') || []).map((tech: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {showPayment ? (
                      <motion.div key="payment" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-muted-foreground mb-4 text-sm">
                          This is a premium learning task. A one-time fee is required to access the codebase and receive founder feedback.
                        </p>
                        <div className="bg-black/40 p-4 rounded-xl mb-6 flex justify-between items-center border border-white/5">
                          <span className="text-white font-medium flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400"/> Total Fee</span>
                          <span className="text-3xl font-bold text-green-400">${project.feeAmount}</span>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => setShowPayment(false)} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                            Cancel
                          </button>
                          <button 
                            onClick={() => executeApplication(null)}
                            disabled={isApplying}
                            className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                          >
                            {isApplying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay & Submit Application"}
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="apply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                        <button 
                          onClick={handleApplyClick}
                          disabled={hasApplied || isApplying}
                          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                            hasApplied 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed' 
                              : 'bg-primary text-white hover:scale-105 hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          }`}
                        >
                          {isApplying ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : hasApplied ? (
                            <><CheckCircle2 className="w-5 h-5" /> Application Sent!</>
                          ) : isTestRequired ? (
                            'Apply (Requires Test)'
                          ) : (
                            'Apply for Project'
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;