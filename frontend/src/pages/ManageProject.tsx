// // // import { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { 
// // //   ArrowLeft, CheckCircle2, XCircle, Github, Lock, Loader2, Eye,
// // //   ShieldCheck, Brain, Lightbulb, Code, Users, FolderKanban, Tag, Rocket, BarChart3, DollarSign, Gift, Video, Calendar, Trophy
// // // } from 'lucide-react';
// // // import PageLayout from '@/components/layout/PageLayout';
// // // import { supabase } from '@/lib/supabase';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { JitsiMeeting } from '@jitsi/react-sdk';

// // // const ManageProject = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [project, setProject] = useState<any>(null);
  
// // //   const [linkedLearnerProject, setLinkedLearnerProject] = useState<any>(null);
  
// // //   const [projectType, setProjectType] = useState<'developer' | 'learner' | null>(null); 
// // //   const [devApplications, setDevApplications] = useState<any[]>([]);
// // //   const [learnerApplications, setLearnerApplications] = useState<any[]>([]);
// // //   const [viewMode, setViewMode] = useState<'developer' | 'learner'>('developer');
// // //   const [hasLinkedLearnerTask, setHasLinkedLearnerTask] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   const [founderRepos, setFounderRepos] = useState<any[]>([]);
// // //   const [isFetchingRepos, setIsFetchingRepos] = useState(false);

// // //   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
// // //   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
// // //   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
// // //   const [repoInput, setRepoInput] = useState('');
// // //   const [interviewDate, setInterviewDate] = useState('');

// // //   const [activeVideoRoom, setActiveVideoRoom] = useState<string | null>(null);
// // //   const [activeVideoAppId, setActiveVideoAppId] = useState<string | null>(null);
// // //   const [founderName, setFounderName] = useState('Founder');

// // //   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
// // //   const [selectedProfile, setSelectedProfile] = useState<any>(null);
// // //   const [selectedGithubUsername, setSelectedGithubUsername] = useState<string>('');
// // //   const [isFetchingProfile, setIsFetchingProfile] = useState(false);

// // //   useEffect(() => {
// // //     const fetchDetails = async () => {
// // //       setIsLoading(true);
      
// // //       let { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();

// // //       if (projData) {
// // //         setProject(projData);
// // //         setProjectType('developer');
// // //         setViewMode('developer');

// // //         const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// // //         if (appData) setDevApplications(appData.sort((a, b) => (b.test_score || -1) - (a.test_score || -1)));

// // //         const { data: linkedTask } = await supabase.from('learner_tasks').select('*').eq('developer_project_id', id).maybeSingle();
// // //         if (linkedTask) {
// // //           setHasLinkedLearnerTask(true);
// // //           setLinkedLearnerProject(linkedTask); 
// // //           const { data: lAppData } = await supabase.from('project_applications').select('*').eq('project_id', linkedTask.id).order('created_at', { ascending: false });
// // //           if (lAppData) setLearnerApplications(lAppData);
// // //         }
// // //       } else {
// // //         const { data: learnerData } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
// // //         if (learnerData) {
// // //           setProject(learnerData);
// // //           setProjectType('learner');
// // //           setViewMode('learner');
// // //           const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// // //           if (appData) setLearnerApplications(appData);
// // //         }
// // //       }

// // //       const { data: { session } } = await supabase.auth.getSession();
// // //       if (session) {
// // //         setFounderName(session.user.user_metadata?.full_name || 'Founder');
// // //         const ghUsername = session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name;
// // //         if (ghUsername) {
// // //           setIsFetchingRepos(true);
// // //           try {
// // //             const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
// // //             if (res.ok) setFounderRepos(await res.json());
// // //           } catch (err) {} finally { setIsFetchingRepos(false); }
// // //         }
// // //       }
// // //       setIsLoading(false);
// // //     };
    
// // //     if (id) fetchDetails();
// // //   }, [id]);

// // //   const activeApplications = viewMode === 'developer' ? devApplications : learnerApplications;
// // //   const updateActiveApplications = (updater: (apps: any[]) => any[]) => {
// // //     if (viewMode === 'developer') setDevApplications(updater(devApplications));
// // //     else setLearnerApplications(updater(learnerApplications));
// // //   };

// // //   const handleReject = async (appId: string) => {
// // //     const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
// // //     if (!error) updateActiveApplications(apps => apps.filter(app => app.id !== appId));
// // //   };

// // //   const openAcceptModal = (appId: string) => { setSelectedApplicant(appId); setRepoInput(''); setIsAcceptModalOpen(true); };
// // //   const openScheduleModal = (appId: string) => { setSelectedApplicant(appId); setInterviewDate(''); setIsScheduleModalOpen(true); };

// // //   const confirmSchedule = async () => {
// // //     if (!selectedApplicant || !interviewDate) return alert("Please select a date and time!");
// // //     const uniqueRoomId = `DevPool-Interview-${selectedApplicant}-${Date.now()}`;
// // //     const { error } = await supabase.from('project_applications').update({ interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId }).eq('id', selectedApplicant);
// // //     if (!error) {
// // //       updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId } : app));
// // //       setIsScheduleModalOpen(false); setSelectedApplicant(null);
// // //     } else { alert("Failed to schedule interview."); }
// // //   };

// // //   const handleEndInterview = async () => {
// // //     if (!activeVideoAppId) return;
// // //     const { error } = await supabase.from('project_applications').update({ interview_completed: true }).eq('id', activeVideoAppId);
// // //     if (!error) {
// // //       updateActiveApplications(apps => apps.map(app => app.id === activeVideoAppId ? { ...app, interview_completed: true } : app));
// // //       setActiveVideoRoom(null); setActiveVideoAppId(null);
// // //     } else { alert("Failed to end interview gracefully."); }
// // //   };

// // //   const openProfileModal = async (githubUsername: string) => {
// // //     if (!githubUsername) return alert("This applicant hasn't linked a GitHub account.");
// // //     setSelectedGithubUsername(githubUsername); 
// // //     setIsProfileModalOpen(true); 
// // //     setIsFetchingProfile(true); 
// // //     setSelectedProfile(null);
    
// // //     try {
// // //         const { data, error } = await supabase.from('github_analysis').select('*').ilike('github_username', githubUsername).maybeSingle();
        
// // //         if (data && data.analysis_data) {
// // //            setSelectedProfile(data.analysis_data);
// // //            setIsFetchingProfile(false);
// // //            return;
// // //         }

// // //         console.log("No analysis found in DB. Triggering AI Analysis Worker...");
// // //         const WORKER_URL = import.meta.env.VITE_GITHUB_WORKER_URL || "https://git.0xcloud.workers.dev/api"; 
        
// // //         const response = await fetch(`${WORKER_URL}?username=${encodeURIComponent(githubUsername)}`);
        
// // //         if (!response.ok) throw new Error("Worker failed to generate analysis");
        
// // //         const workerData = await response.json();
// // //         setSelectedProfile(workerData);

// // //     } catch (err) { 
// // //         console.error("Profile Analysis Error:", err);
// // //         setSelectedProfile({ error: true }); 
// // //     } finally { 
// // //         setIsFetchingProfile(false); 
// // //     }
// // //   };

// // //   const confirmAccept = async () => {
// // //     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
// // //     setIsLoading(true);
// // //     const applicant = activeApplications.find(a => a.id === selectedApplicant);
// // //     const applicantGithub = applicant?.applicant_github;

// // //     if (!applicantGithub) { alert("This applicant does not have a GitHub username."); setIsLoading(false); return; }

// // //     const { data: { session } } = await supabase.auth.getSession();
// // //     const founderToken = session?.user?.user_metadata?.github_token || session?.provider_token;

// // //     if (founderToken) {
// // //         try {
// // //             const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
// // //             const res = await fetch(`${backendUrl}/api/github/invite`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${founderToken}` }, body: JSON.stringify({ repo: repoInput, developer_github: applicantGithub }) });
// // //             if (!res.ok) throw new Error((await res.json()).error);
// // //         } catch (err: any) { alert(`Failed to send GitHub invite: ${err.message}`); setIsLoading(false); return; }
// // //     }

// // //     const { error } = await supabase.from('project_applications').update({ status: 'accepted', assigned_repo: repoInput }).eq('id', selectedApplicant);
// // //     if (!error) {
// // //       updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app));
// // //       setIsAcceptModalOpen(false); setSelectedApplicant(null);
// // //     }
// // //     setIsLoading(false);
// // //   };

// // //   const closeProject = async () => {
// // //     if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
// // //     const tableName = projectType === 'developer' ? 'developer_projects' : 'learner_tasks';
// // //     const { error } = await supabase.from(tableName).update({ status: 'closed' }).eq('id', id);
// // //     if (!error) setProject({ ...project, status: 'closed' });
// // //   };

// // //   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin"/></div></PageLayout>;
// // //   if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white font-bold text-2xl">Project not found.</div></PageLayout>;

// // //   const displayProject = viewMode === 'developer' ? project : (linkedLearnerProject || project);

// // //   return (
// // //     <PageLayout showFooter={false}>
// // //       <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto relative">
        
// // //         {/* ACTIVE VIDEO ROOM OVERLAY */}
// // //         {activeVideoRoom && (
// // //           <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col">
// // //             <div className="p-4 flex justify-between items-center bg-[#0f172a] border-b border-white/10">
// // //               <h2 className="text-white font-bold flex items-center gap-2"><Video className="w-5 h-5 text-green-400"/> DevPool Live Interview</h2>
// // //               <button onClick={handleEndInterview} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">End Interview & Make Decision</button>
// // //             </div>
// // //             <div className="flex-1 bg-black">
// // //               <JitsiMeeting domain="meet.jit.si" roomName={activeVideoRoom} configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false }} interfaceConfigOverwrite={{ DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }} userInfo={{ displayName: founderName } as any} getIFrameRef={(iframeRef: HTMLDivElement) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }} />
// // //             </div>
// // //           </div>
// // //         )}

// // //         <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard</button>

// // //         <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
// // //           <div className="flex justify-between items-start mb-4">
// // //             <div>
// // //               <div className="flex items-center gap-3 mb-2">
// // //                 <h1 className="text-3xl font-display font-bold text-white">{displayProject.title}</h1>
// // //                 {viewMode === 'learner' && (
// // //                   <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full flex items-center gap-1 ${displayProject.payment_type === 'fees' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
// // //                     {displayProject.payment_type === 'fees' ? <><DollarSign className="w-3 h-3"/> Fee: ${displayProject.fee_amount}</> : <><Gift className="w-3 h-3"/> Free Volunteer</>}
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>
// // //             {displayProject.status === 'open' || !displayProject.status ? (
// // //               <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold"><Lock className="w-4 h-4" /> Close Project</button>
// // //             ) : (
// // //               <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4" /> Project Closed</span>
// // //             )}
// // //           </div>
// // //           <div className="mt-6 pt-6 border-t border-white/10">
// // //             <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
// // //             <p className="text-muted-foreground whitespace-pre-wrap">{displayProject.task_description || displayProject.description}</p>
// // //           </div>
// // //         </div>

// // //         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
// // //           <h2 className="text-2xl font-bold text-white">
// // //             Applicants ({activeApplications.length})
// // //           </h2>
          
// // //           {hasLinkedLearnerTask && (
// // //             <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
// // //               <button onClick={() => setViewMode('developer')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'developer' ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
// // //                 Senior Developers ({devApplications.length})
// // //               </button>
// // //               <button onClick={() => setViewMode('learner')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'learner' ? 'bg-secondary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
// // //                 Junior Learners ({learnerApplications.length})
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
        
// // //         {activeApplications.length === 0 ? (
// // //           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">No {viewMode}s have applied to this project yet.</div>
// // //         ) : (
// // //           <div className="space-y-4">
// // //             {activeApplications.map((app) => {
// // //               let requiresInterview = false;
              
// // //               if (viewMode === 'developer') {
// // //                 requiresInterview = project.evaluation_method?.includes('interview');
// // //               } else if (viewMode === 'learner') {
// // //                 requiresInterview = linkedLearnerProject?.evaluation_method?.includes('interview') || false; 
// // //               }

// // //               const hasInterviewScheduled = !!app.interview_time;
// // //               const isInterviewCompleted = !!app.interview_completed;
              
// // //               return (
// // //                 <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">{app.applicant_name.charAt(0)}</div>
// // //                     <div>
// // //                       <h3 className="text-lg font-bold text-white flex items-center gap-2">
// // //                         {app.applicant_name}
// // //                         {app.test_score !== null && app.test_score !== undefined && (
// // //                           <span className="bg-primary/20 text-primary text-[11px] font-bold uppercase px-2 py-0.5 rounded border border-primary/30 flex items-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.2)]"><Trophy className="w-3 h-3" /> Score: {app.test_score}</span>
// // //                         )}
// // //                         {app.status === 'paid' && <span className="bg-green-500/20 text-green-400 text-[10px] uppercase px-2 py-0.5 rounded border border-green-500/30">Paid Premium</span>}
// // //                         {isInterviewCompleted && <span className="bg-purple-500/20 text-purple-400 text-[10px] uppercase px-2 py-0.5 rounded border border-purple-500/30">Interviewed</span>}
// // //                       </h3>
// // //                       {app.applicant_github && <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"><Github className="w-3 h-3" /> @{app.applicant_github}</a>}
// // //                       {hasInterviewScheduled && !isInterviewCompleted && app.status !== 'accepted' && <div className="text-sm text-yellow-400 mt-2 flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20"><Calendar className="w-4 h-4" /> Interview: {new Date(app.interview_time).toLocaleString()}</div>}
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
// // //                     {(app.status === 'pending' || app.status === 'paid') ? (
// // //                       <>
// // //                         <button onClick={() => openProfileModal(app.applicant_github)} className="px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold flex items-center border border-blue-500/20"><Eye className="w-4 h-4 mr-1"/> View</button>
                        
// // //                         {/* --- THE FIX: Payment bypasses Interview & Reject --- */}
// // //                         {app.status === 'paid' ? (
// // //                           <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
// // //                         ) : requiresInterview && !hasInterviewScheduled ? (
// // //                           <button onClick={() => openScheduleModal(app.id)} className="px-3 py-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 rounded-lg text-sm font-bold flex items-center border border-purple-500/20"><Calendar className="w-4 h-4 mr-1"/> Schedule</button>
// // //                         ) : requiresInterview && hasInterviewScheduled && !isInterviewCompleted ? (
// // //                           <button onClick={() => { setActiveVideoRoom(app.meet_room_id); setActiveVideoAppId(app.id); }} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold flex items-center shadow-[0_0_15px_rgba(34,197,94,0.4)]"><Video className="w-4 h-4 mr-1"/> Join Call</button>
// // //                         ) : (
// // //                           <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
// // //                         )}
                        
// // //                         {/* Only show reject button if they haven't paid */}
// // //                         {app.status !== 'paid' && (
// // //                           <button onClick={() => { if (confirm("Reject this applicant?")) handleReject(app.id); }} className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold flex items-center border border-red-500/20"><XCircle className="w-4 h-4 mr-1"/> Reject</button>
// // //                         )}
// // //                       </>
// // //                     ) : (
// // //                       <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>{app.status}</span>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}

// // //         {/* SCHEDULE INTERVIEW MODAL */}
// // //         <AnimatePresence>
// // //           {isScheduleModalOpen && (
// // //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsScheduleModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// // //               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
// // //                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Calendar className="text-purple-400"/> Schedule Interview</h3>
// // //                 <div className="mb-8"><input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none" /></div>
// // //                 <div className="flex gap-3"><button onClick={() => setIsScheduleModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white">Cancel</button><button onClick={confirmSchedule} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold"><CheckCircle2 className="inline w-4 h-4 mr-1" /> Save Schedule</button></div>
// // //               </motion.div>
// // //             </div>
// // //           )}
// // //         </AnimatePresence>

// // //         {/* ASSIGN REPO MODAL */}
// // //         <AnimatePresence>
// // //           {isAcceptModalOpen && (
// // //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// // //               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
// // //                 <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
// // //                 <div className="mb-4">
// // //                   {isFetchingRepos ? <div className="text-muted-foreground"><Loader2 className="w-4 animate-spin inline"/> Fetching...</div> : (
// // //                     <select value={repoInput} onChange={(e) => setRepoInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
// // //                       <option value="" className="bg-[#0f172a] text-white">-- Choose a repo --</option>
// // //                       {founderRepos.map(repo => <option key={repo.id} value={repo.full_name} className="bg-[#0f172a] text-white">{repo.name}</option>)}
// // //                     </select>
// // //                   )}
// // //                 </div>
// // //                 <input type="text" value={repoInput} onChange={(e) => setRepoInput(e.target.value)} placeholder="Or type manually..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-8" />
// // //                 <div className="flex gap-3"><button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white">Cancel</button><button onClick={confirmAccept} className="flex-1 btn-neon rounded-xl"><CheckCircle2 className="inline w-4 mr-1" /> Confirm Hire</button></div>
// // //               </motion.div>
// // //             </div>
// // //           )}
// // //         </AnimatePresence>

// // //         {/* PROFILE MODAL  */}
// // //         <AnimatePresence>
// // //           {isProfileModalOpen && (
// // //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProfileModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// // //               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto">
// // //                 <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
// // //                   <h3 className="text-2xl font-bold text-white flex items-center gap-2">
// // //                     <Github className="w-6 h-6 text-primary" /> AI Trust Engine Analysis
// // //                   </h3>
// // //                   <button onClick={() => setIsProfileModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
// // //                     <XCircle className="w-6 h-6" />
// // //                   </button>
// // //                 </div>
// // //                 {isFetchingProfile ? (
// // //                   <div className="py-20 flex flex-col items-center justify-center text-muted-foreground"><Loader2 className="w-10 h-10 animate-spin text-primary mb-4" /><p>Fetching Data from GitHub & Analyzing...</p></div>
// // //                 ) : selectedProfile && !selectedProfile.error ? (
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                     <div className="space-y-6">
// // //                       <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
// // //                         <ShieldCheck className="w-12 h-12 text-primary mb-4" />
// // //                         <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
// // //                         <div className="text-5xl font-display font-bold text-white mb-2">{selectedProfile.score || 0}<span className="text-2xl text-muted-foreground">/100</span></div>
// // //                         {selectedProfile.developer_type && <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2"><Code className="w-4 h-4 inline mr-1" /> {selectedProfile.developer_type}</span>}
// // //                       </div>
// // //                       {selectedProfile.tag && (
// // //                         <div className="glass-card p-6 border-secondary/30">
// // //                           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Tag className="w-5 h-5 text-secondary" /> AI Profile Tag</h3>
// // //                           <p className="text-secondary font-bold mb-1">{selectedProfile.tag.tag_name}</p>
// // //                           <p className="text-sm text-muted-foreground">{selectedProfile.tag.description}</p>
// // //                         </div>
// // //                       )}
// // //                       <div className="glass-card p-6 grid grid-cols-2 gap-4">
// // //                         <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div><p className="text-2xl font-bold text-white">{selectedProfile.public_repo_count || 0}</p></div>
// // //                         <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div><p className="text-2xl font-bold text-white">{selectedProfile.followers || 0}</p></div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="md:col-span-2 space-y-6">
// // //                       <div className="glass-card p-6">
// // //                         <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> Deep AI Analysis</h3>
// // //                         <p className="text-muted-foreground leading-relaxed">{selectedProfile.detailed_analysis}</p>
// // //                       </div>
// // //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                         <div className="glass-card p-6">
// // //                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas</h3>
// // //                           <ul className="space-y-2">{(selectedProfile.improvement_areas || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">•</span> {item}</li>)}</ul>
// // //                         </div>
// // //                         <div className="glass-card p-6">
// // //                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics</h3>
// // //                           <ul className="space-y-2">{(selectedProfile.diagnostics || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-neon-pink mt-1">•</span> {item}</li>)}</ul>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="md:col-span-3 glass-card p-6">
// // //                       <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2"><Rocket className="w-6 h-6 text-primary" /> Suggested Projects</h3>
// // //                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                         {selectedProfile.project_ideas && Object.values(selectedProfile.project_ideas).map((idea: any, idx: number) => (
// // //                           <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5"><h4 className="font-bold text-white mb-2">{idea.title}</h4><p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p></div>
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="py-10 text-center"><div className="text-red-400 font-bold mb-2">Analysis Failed</div><p className="text-muted-foreground text-sm">Engine could not analyze this user.</p></div>
// // //                 )}
// // //               </motion.div>
// // //             </div>
// // //           )}
// // //         </AnimatePresence>

// // //       </div>
// // //     </PageLayout>
// // //   );
// // // };

// // // export default ManageProject;









// // import { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { 
// //   ArrowLeft, CheckCircle2, XCircle, Github, Lock, Loader2, Eye,
// //   ShieldCheck, Brain, Lightbulb, Code, Users, FolderKanban, Tag, Rocket, BarChart3, DollarSign, Gift, Video, Calendar, Trophy
// // } from 'lucide-react';
// // import PageLayout from '@/components/layout/PageLayout';
// // import { supabase } from '@/lib/supabase';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { JitsiMeeting } from '@jitsi/react-sdk';

// // const ManageProject = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [project, setProject] = useState<any>(null);
  
// //   const [linkedLearnerProject, setLinkedLearnerProject] = useState<any>(null);
  
// //   const [projectType, setProjectType] = useState<'developer' | 'learner' | null>(null); 
// //   const [devApplications, setDevApplications] = useState<any[]>([]);
// //   const [learnerApplications, setLearnerApplications] = useState<any[]>([]);
// //   const [viewMode, setViewMode] = useState<'developer' | 'learner'>('developer');
// //   const [hasLinkedLearnerTask, setHasLinkedLearnerTask] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const [founderRepos, setFounderRepos] = useState<any[]>([]);
// //   const [isFetchingRepos, setIsFetchingRepos] = useState(false);

// //   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
// //   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
// //   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
// //   const [repoInput, setRepoInput] = useState('');
// //   const [interviewDate, setInterviewDate] = useState('');

// //   const [activeVideoRoom, setActiveVideoRoom] = useState<string | null>(null);
// //   const [activeVideoAppId, setActiveVideoAppId] = useState<string | null>(null);
// //   const [founderName, setFounderName] = useState('Founder');

// //   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
// //   const [selectedProfile, setSelectedProfile] = useState<any>(null);
// //   const [selectedGithubUsername, setSelectedGithubUsername] = useState<string>('');
// //   const [isFetchingProfile, setIsFetchingProfile] = useState(false);

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       setIsLoading(true);
      
// //       let { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();

// //       if (projData) {
// //         setProject(projData);
// //         setProjectType('developer');
// //         setViewMode('developer');

// //         const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// //         if (appData) setDevApplications(appData.sort((a, b) => (b.test_score || -1) - (a.test_score || -1)));

// //         const { data: linkedTask } = await supabase.from('learner_tasks').select('*').eq('developer_project_id', id).maybeSingle();
// //         if (linkedTask) {
// //           setHasLinkedLearnerTask(true);
// //           setLinkedLearnerProject(linkedTask); 
// //           const { data: lAppData } = await supabase.from('project_applications').select('*').eq('project_id', linkedTask.id).order('created_at', { ascending: false });
// //           if (lAppData) setLearnerApplications(lAppData);
// //         }
// //       } else {
// //         const { data: learnerData } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
// //         if (learnerData) {
// //           setProject(learnerData);
// //           setProjectType('learner');
// //           setViewMode('learner');
// //           const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// //           if (appData) setLearnerApplications(appData);
// //         }
// //       }

// //       const { data: { session } } = await supabase.auth.getSession();
// //       if (session) {
// //         setFounderName(session.user.user_metadata?.full_name || 'Founder');
// //         const ghUsername = session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name;
// //         if (ghUsername) {
// //           setIsFetchingRepos(true);
// //           try {
// //             const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
// //             if (res.ok) setFounderRepos(await res.json());
// //           } catch (err) {} finally { setIsFetchingRepos(false); }
// //         }
// //       }
// //       setIsLoading(false);
// //     };
    
// //     if (id) fetchDetails();
// //   }, [id]);

// //   const activeApplications = viewMode === 'developer' ? devApplications : learnerApplications;
// //   const updateActiveApplications = (updater: (apps: any[]) => any[]) => {
// //     if (viewMode === 'developer') setDevApplications(updater(devApplications));
// //     else setLearnerApplications(updater(learnerApplications));
// //   };

// //   const handleReject = async (appId: string) => {
// //     const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
// //     if (!error) updateActiveApplications(apps => apps.filter(app => app.id !== appId));
// //   };

// //   const openAcceptModal = (appId: string) => { setSelectedApplicant(appId); setRepoInput(''); setIsAcceptModalOpen(true); };
// //   const openScheduleModal = (appId: string) => { setSelectedApplicant(appId); setInterviewDate(''); setIsScheduleModalOpen(true); };

// //   const confirmSchedule = async () => {
// //     if (!selectedApplicant || !interviewDate) return alert("Please select a date and time!");
// //     const uniqueRoomId = `DevPool-Interview-${selectedApplicant}-${Date.now()}`;
// //     const { error } = await supabase.from('project_applications').update({ interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId }).eq('id', selectedApplicant);
// //     if (!error) {
// //       updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId } : app));
// //       setIsScheduleModalOpen(false); setSelectedApplicant(null);
// //     } else { alert("Failed to schedule interview."); }
// //   };

// //   const handleEndInterview = async () => {
// //     if (!activeVideoAppId) return;
// //     const { error } = await supabase.from('project_applications').update({ interview_completed: true }).eq('id', activeVideoAppId);
// //     if (!error) {
// //       updateActiveApplications(apps => apps.map(app => app.id === activeVideoAppId ? { ...app, interview_completed: true } : app));
// //       setActiveVideoRoom(null); setActiveVideoAppId(null);
// //     } else { alert("Failed to end interview gracefully."); }
// //   };

// //   const openProfileModal = async (githubUsername: string) => {
// //     if (!githubUsername) return alert("This applicant hasn't linked a GitHub account.");
// //     setSelectedGithubUsername(githubUsername); 
// //     setIsProfileModalOpen(true); 
// //     setIsFetchingProfile(true); 
// //     setSelectedProfile(null);
    
// //     try {
// //         const { data, error } = await supabase.from('github_analysis').select('*').ilike('github_username', githubUsername).maybeSingle();
        
// //         if (data && data.analysis_data) {
// //            setSelectedProfile(data.analysis_data);
// //            setIsFetchingProfile(false);
// //            return;
// //         }

// //         console.log("No analysis found in DB. Triggering AI Analysis Worker...");
// //         const WORKER_URL = import.meta.env.VITE_GITHUB_WORKER_URL || "https://git.0xcloud.workers.dev/api"; 
        
// //         const response = await fetch(`${WORKER_URL}?username=${encodeURIComponent(githubUsername)}`);
        
// //         if (!response.ok) throw new Error("Worker failed to generate analysis");
        
// //         const workerData = await response.json();
// //         setSelectedProfile(workerData);

// //     } catch (err) { 
// //         console.error("Profile Analysis Error:", err);
// //         setSelectedProfile({ error: true }); 
// //     } finally { 
// //         setIsFetchingProfile(false); 
// //     }
// //   };

// //   const confirmAccept = async () => {
// //     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
// //     setIsLoading(true);
// //     const applicant = activeApplications.find(a => a.id === selectedApplicant);
// //     const applicantGithub = applicant?.applicant_github;

// //     if (!applicantGithub) { alert("This applicant does not have a GitHub username."); setIsLoading(false); return; }

// //     const { data: { session } } = await supabase.auth.getSession();
// //     const founderToken = session?.user?.user_metadata?.github_token || session?.provider_token;

// //     if (founderToken) {
// //         try {
// //             const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
// //             const res = await fetch(`${backendUrl}/api/github/invite`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${founderToken}` }, body: JSON.stringify({ repo: repoInput, developer_github: applicantGithub }) });
// //             if (!res.ok) throw new Error((await res.json()).error);
// //         } catch (err: any) { alert(`Failed to send GitHub invite: ${err.message}`); setIsLoading(false); return; }
// //     }

// //     const { error } = await supabase.from('project_applications').update({ status: 'accepted', assigned_repo: repoInput }).eq('id', selectedApplicant);
// //     if (!error) {
// //       updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app));
// //       setIsAcceptModalOpen(false); setSelectedApplicant(null);
// //     }
// //     setIsLoading(false);
// //   };

// //   const closeProject = async () => {
// //     if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
// //     const tableName = projectType === 'developer' ? 'developer_projects' : 'learner_tasks';
// //     const { error } = await supabase.from(tableName).update({ status: 'closed' }).eq('id', id);
// //     if (!error) setProject({ ...project, status: 'closed' });
// //   };

// //   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin"/></div></PageLayout>;
// //   if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white font-bold text-2xl">Project not found.</div></PageLayout>;

// //   const displayProject = viewMode === 'developer' ? project : (linkedLearnerProject || project);

// //   return (
// //     <PageLayout showFooter={false}>
// //       <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto relative">
        
// //         {/* ACTIVE VIDEO ROOM OVERLAY */}
// //         {activeVideoRoom && (
// //           <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col">
// //             <div className="p-4 flex justify-between items-center bg-[#0f172a] border-b border-white/10">
// //               <h2 className="text-white font-bold flex items-center gap-2"><Video className="w-5 h-5 text-green-400"/> DevPool Live Interview</h2>
// //               <button onClick={handleEndInterview} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">End Interview & Make Decision</button>
// //             </div>
// //             <div className="flex-1 bg-black">
// //               <JitsiMeeting domain="meet.jit.si" roomName={activeVideoRoom} configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false }} interfaceConfigOverwrite={{ DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }} userInfo={{ displayName: founderName } as any} getIFrameRef={(iframeRef: HTMLDivElement) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }} />
// //             </div>
// //           </div>
// //         )}

// //         <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard</button>

// //         <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
// //           <div className="flex justify-between items-start mb-4">
// //             <div>
// //               <div className="flex items-center gap-3 mb-2">
// //                 <h1 className="text-3xl font-display font-bold text-white">{displayProject.title}</h1>
// //                 {viewMode === 'learner' && (
// //                   <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full flex items-center gap-1 ${displayProject.payment_type === 'fees' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
// //                     {displayProject.payment_type === 'fees' ? <><DollarSign className="w-3 h-3"/> Fee: ${displayProject.fee_amount}</> : <><Gift className="w-3 h-3"/> Free Volunteer</>}
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //             {displayProject.status === 'open' || !displayProject.status ? (
// //               <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold"><Lock className="w-4 h-4" /> Close Project</button>
// //             ) : (
// //               <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4" /> Project Closed</span>
// //             )}
// //           </div>
// //           <div className="mt-6 pt-6 border-t border-white/10">
// //             <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
// //             <p className="text-muted-foreground whitespace-pre-wrap">{displayProject.task_description || displayProject.description}</p>
// //           </div>
// //         </div>

// //         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
// //           <h2 className="text-2xl font-bold text-white">
// //             Applicants ({activeApplications.length})
// //           </h2>
          
// //           {hasLinkedLearnerTask && (
// //             <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
// //               <button onClick={() => setViewMode('developer')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'developer' ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
// //                 Senior Developers ({devApplications.length})
// //               </button>
// //               <button onClick={() => setViewMode('learner')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'learner' ? 'bg-secondary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
// //                 Junior Learners ({learnerApplications.length})
// //               </button>
// //             </div>
// //           )}
// //         </div>
        
// //         {activeApplications.length === 0 ? (
// //           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">No {viewMode}s have applied to this project yet.</div>
// //         ) : (
// //           <div className="space-y-4">
// //             {activeApplications.map((app) => {
// //               let requiresInterview = false;
              
// //               if (viewMode === 'developer') {
// //                 requiresInterview = project.evaluation_method?.includes('interview');
// //               } else if (viewMode === 'learner') {
// //                 requiresInterview = linkedLearnerProject?.evaluation_method?.includes('interview') || false; 
// //               }

// //               const hasInterviewScheduled = !!app.interview_time;
// //               const isInterviewCompleted = !!app.interview_completed;
              
// //               return (
// //                 <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">{app.applicant_name.charAt(0)}</div>
// //                     <div>
// //                       <h3 className="text-lg font-bold text-white flex items-center gap-2">
// //                         {app.applicant_name}
// //                         {app.test_score !== null && app.test_score !== undefined && (
// //                           <span className="bg-primary/20 text-primary text-[11px] font-bold uppercase px-2 py-0.5 rounded border border-primary/30 flex items-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.2)]"><Trophy className="w-3 h-3" /> Score: {app.test_score}</span>
// //                         )}
// //                         {app.status === 'paid' && <span className="bg-green-500/20 text-green-400 text-[10px] uppercase px-2 py-0.5 rounded border border-green-500/30">Paid Premium</span>}
// //                         {isInterviewCompleted && <span className="bg-purple-500/20 text-purple-400 text-[10px] uppercase px-2 py-0.5 rounded border border-purple-500/30">Interviewed</span>}
// //                       </h3>
// //                       {app.applicant_github && <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"><Github className="w-3 h-3" /> @{app.applicant_github}</a>}
// //                       {hasInterviewScheduled && !isInterviewCompleted && app.status !== 'accepted' && <div className="text-sm text-yellow-400 mt-2 flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20"><Calendar className="w-4 h-4" /> Interview: {new Date(app.interview_time).toLocaleString()}</div>}
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
// //                     {(app.status === 'pending' || app.status === 'paid') ? (
// //                       <>
// //                         <button onClick={() => openProfileModal(app.applicant_github)} className="px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold flex items-center border border-blue-500/20"><Eye className="w-4 h-4 mr-1"/> View</button>
                        
// //                         {app.status === 'paid' ? (
// //                           <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
// //                         ) : requiresInterview && !hasInterviewScheduled ? (
// //                           <button onClick={() => openScheduleModal(app.id)} className="px-3 py-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 rounded-lg text-sm font-bold flex items-center border border-purple-500/20"><Calendar className="w-4 h-4 mr-1"/> Schedule</button>
// //                         ) : requiresInterview && hasInterviewScheduled && !isInterviewCompleted ? (
// //                           <button onClick={() => { setActiveVideoRoom(app.meet_room_id); setActiveVideoAppId(app.id); }} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold flex items-center shadow-[0_0_15px_rgba(34,197,94,0.4)]"><Video className="w-4 h-4 mr-1"/> Join Call</button>
// //                         ) : (
// //                           <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
// //                         )}
                        
// //                         {app.status !== 'paid' && (
// //                           <button onClick={() => { if (confirm("Reject this applicant?")) handleReject(app.id); }} className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold flex items-center border border-red-500/20"><XCircle className="w-4 h-4 mr-1"/> Reject</button>
// //                         )}
// //                       </>
// //                     ) : (
// //                       <>
// //                         {/* --- THE FIX: NEW BUTTON FOR FOUNDERS TO VIEW ACCEPTED CODE --- */}
// //                         {app.status === 'accepted' && app.assigned_repo && (
// //                           <button 
// //                             onClick={() => navigate(`/editor?repo=${encodeURIComponent(app.assigned_repo)}&projectId=${app.project_id}&founder=true`)}
// //                             className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors mr-2"
// //                           >
// //                             <Code className="w-4 h-4" /> View Live Code
// //                           </button>
// //                         )}
// //                         <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
// //                           {app.status}
// //                         </span>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}

// //         {/* SCHEDULE INTERVIEW MODAL */}
// //         <AnimatePresence>
// //           {isScheduleModalOpen && (
// //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsScheduleModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// //               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
// //                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Calendar className="text-purple-400"/> Schedule Interview</h3>
// //                 <div className="mb-8"><input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none" /></div>
// //                 <div className="flex gap-3"><button onClick={() => setIsScheduleModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white">Cancel</button><button onClick={confirmSchedule} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold"><CheckCircle2 className="inline w-4 h-4 mr-1" /> Save Schedule</button></div>
// //               </motion.div>
// //             </div>
// //           )}
// //         </AnimatePresence>

// //         {/* ASSIGN REPO MODAL */}
// //         <AnimatePresence>
// //           {isAcceptModalOpen && (
// //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// //               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
// //                 <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
// //                 <div className="mb-4">
// //                   {isFetchingRepos ? <div className="text-muted-foreground"><Loader2 className="w-4 animate-spin inline"/> Fetching...</div> : (
// //                     <select value={repoInput} onChange={(e) => setRepoInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
// //                       <option value="" className="bg-[#0f172a] text-white">-- Choose a repo --</option>
// //                       {founderRepos.map(repo => <option key={repo.id} value={repo.full_name} className="bg-[#0f172a] text-white">{repo.name}</option>)}
// //                     </select>
// //                   )}
// //                 </div>
// //                 <input type="text" value={repoInput} onChange={(e) => setRepoInput(e.target.value)} placeholder="Or type manually..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-8" />
// //                 <div className="flex gap-3"><button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white">Cancel</button><button onClick={confirmAccept} className="flex-1 btn-neon rounded-xl"><CheckCircle2 className="inline w-4 mr-1" /> Confirm Hire</button></div>
// //               </motion.div>
// //             </div>
// //           )}
// //         </AnimatePresence>

// //         {/* PROFILE MODAL  */}
// //         <AnimatePresence>
// //           {isProfileModalOpen && (
// //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProfileModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// //               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto">
// //                 <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
// //                   <h3 className="text-2xl font-bold text-white flex items-center gap-2">
// //                     <Github className="w-6 h-6 text-primary" /> AI Trust Engine Analysis
// //                   </h3>
// //                   <button onClick={() => setIsProfileModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
// //                     <XCircle className="w-6 h-6" />
// //                   </button>
// //                 </div>
// //                 {isFetchingProfile ? (
// //                   <div className="py-20 flex flex-col items-center justify-center text-muted-foreground"><Loader2 className="w-10 h-10 animate-spin text-primary mb-4" /><p>Fetching Data from GitHub & Analyzing...</p></div>
// //                 ) : selectedProfile && !selectedProfile.error ? (
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                     <div className="space-y-6">
// //                       <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
// //                         <ShieldCheck className="w-12 h-12 text-primary mb-4" />
// //                         <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
// //                         <div className="text-5xl font-display font-bold text-white mb-2">{selectedProfile.score || 0}<span className="text-2xl text-muted-foreground">/100</span></div>
// //                         {selectedProfile.developer_type && <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2"><Code className="w-4 h-4 inline mr-1" /> {selectedProfile.developer_type}</span>}
// //                       </div>
// //                       {selectedProfile.tag && (
// //                         <div className="glass-card p-6 border-secondary/30">
// //                           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Tag className="w-5 h-5 text-secondary" /> AI Profile Tag</h3>
// //                           <p className="text-secondary font-bold mb-1">{selectedProfile.tag.tag_name}</p>
// //                           <p className="text-sm text-muted-foreground">{selectedProfile.tag.description}</p>
// //                         </div>
// //                       )}
// //                       <div className="glass-card p-6 grid grid-cols-2 gap-4">
// //                         <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div><p className="text-2xl font-bold text-white">{selectedProfile.public_repo_count || 0}</p></div>
// //                         <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div><p className="text-2xl font-bold text-white">{selectedProfile.followers || 0}</p></div>
// //                       </div>
// //                     </div>
// //                     <div className="md:col-span-2 space-y-6">
// //                       <div className="glass-card p-6">
// //                         <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> Deep AI Analysis</h3>
// //                         <p className="text-muted-foreground leading-relaxed">{selectedProfile.detailed_analysis}</p>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div className="glass-card p-6">
// //                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas</h3>
// //                           <ul className="space-y-2">{(selectedProfile.improvement_areas || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">•</span> {item}</li>)}</ul>
// //                         </div>
// //                         <div className="glass-card p-6">
// //                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics</h3>
// //                           <ul className="space-y-2">{(selectedProfile.diagnostics || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-neon-pink mt-1">•</span> {item}</li>)}</ul>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="md:col-span-3 glass-card p-6">
// //                       <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2"><Rocket className="w-6 h-6 text-primary" /> Suggested Projects</h3>
// //                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                         {selectedProfile.project_ideas && Object.values(selectedProfile.project_ideas).map((idea: any, idx: number) => (
// //                           <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5"><h4 className="font-bold text-white mb-2">{idea.title}</h4><p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p></div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="py-10 text-center"><div className="text-red-400 font-bold mb-2">Analysis Failed</div><p className="text-muted-foreground text-sm">Engine could not analyze this user.</p></div>
// //                 )}
// //               </motion.div>
// //             </div>
// //           )}
// //         </AnimatePresence>

// //       </div>
// //     </PageLayout>
// //   );
// // };

// // export default ManageProject;




// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   ArrowLeft, CheckCircle2, XCircle, Github, Lock, Loader2, Eye,
//   ShieldCheck, Brain, Lightbulb, Code, Users, FolderKanban, Tag, Rocket, BarChart3, DollarSign, Gift, Video, Calendar, Trophy, PlayCircle
// } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';
// import { motion, AnimatePresence } from 'framer-motion';
// import { JitsiMeeting } from '@jitsi/react-sdk';

// const ManageProject = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState<any>(null);
  
//   const [linkedLearnerProject, setLinkedLearnerProject] = useState<any>(null);
  
//   const [projectType, setProjectType] = useState<'developer' | 'learner' | null>(null); 
//   const [devApplications, setDevApplications] = useState<any[]>([]);
//   const [learnerApplications, setLearnerApplications] = useState<any[]>([]);
//   const [viewMode, setViewMode] = useState<'developer' | 'learner'>('developer');
//   const [hasLinkedLearnerTask, setHasLinkedLearnerTask] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const [founderRepos, setFounderRepos] = useState<any[]>([]);
//   const [isFetchingRepos, setIsFetchingRepos] = useState(false);

//   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
//   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
//   const [repoInput, setRepoInput] = useState('');
//   const [interviewDate, setInterviewDate] = useState('');

//   const [activeVideoRoom, setActiveVideoRoom] = useState<string | null>(null);
//   const [activeVideoAppId, setActiveVideoAppId] = useState<string | null>(null);
//   const [founderName, setFounderName] = useState('Founder');

//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState<any>(null);
//   const [selectedGithubUsername, setSelectedGithubUsername] = useState<string>('');
//   const [isFetchingProfile, setIsFetchingProfile] = useState(false);

//   // --- NEW: VIDEO EXPLANATIONS STATE ---
//   const [explanationsModalOpen, setExplanationsModalOpen] = useState(false);
//   const [explanationsData, setExplanationsData] = useState<any[]>([]);
//   const [isLoadingExplanations, setIsLoadingExplanations] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setIsLoading(true);
      
//       let { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();

//       if (projData) {
//         setProject(projData);
//         setProjectType('developer');
//         setViewMode('developer');

//         const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
//         if (appData) setDevApplications(appData.sort((a, b) => (b.test_score || -1) - (a.test_score || -1)));

//         const { data: linkedTask } = await supabase.from('learner_tasks').select('*').eq('developer_project_id', id).maybeSingle();
//         if (linkedTask) {
//           setHasLinkedLearnerTask(true);
//           setLinkedLearnerProject(linkedTask); 
//           const { data: lAppData } = await supabase.from('project_applications').select('*').eq('project_id', linkedTask.id).order('created_at', { ascending: false });
//           if (lAppData) setLearnerApplications(lAppData);
//         }
//       } else {
//         const { data: learnerData } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
//         if (learnerData) {
//           setProject(learnerData);
//           setProjectType('learner');
//           setViewMode('learner');
//           const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
//           if (appData) setLearnerApplications(appData);
//         }
//       }

//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//         setFounderName(session.user.user_metadata?.full_name || 'Founder');
//         const ghUsername = session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name;
//         if (ghUsername) {
//           setIsFetchingRepos(true);
//           try {
//             const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
//             if (res.ok) setFounderRepos(await res.json());
//           } catch (err) {} finally { setIsFetchingRepos(false); }
//         }
//       }
//       setIsLoading(false);
//     };
    
//     if (id) fetchDetails();
//   }, [id]);

//   const activeApplications = viewMode === 'developer' ? devApplications : learnerApplications;
//   const updateActiveApplications = (updater: (apps: any[]) => any[]) => {
//     if (viewMode === 'developer') setDevApplications(updater(devApplications));
//     else setLearnerApplications(updater(learnerApplications));
//   };

//   const handleReject = async (appId: string) => {
//     const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
//     if (!error) updateActiveApplications(apps => apps.filter(app => app.id !== appId));
//   };

//   const openAcceptModal = (appId: string) => { setSelectedApplicant(appId); setRepoInput(''); setIsAcceptModalOpen(true); };
//   const openScheduleModal = (appId: string) => { setSelectedApplicant(appId); setInterviewDate(''); setIsScheduleModalOpen(true); };

//   const confirmSchedule = async () => {
//     if (!selectedApplicant || !interviewDate) return alert("Please select a date and time!");
//     const uniqueRoomId = `DevPool-Interview-${selectedApplicant}-${Date.now()}`;
//     const { error } = await supabase.from('project_applications').update({ interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId }).eq('id', selectedApplicant);
//     if (!error) {
//       updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId } : app));
//       setIsScheduleModalOpen(false); setSelectedApplicant(null);
//     } else { alert("Failed to schedule interview."); }
//   };

//   const handleEndInterview = async () => {
//     if (!activeVideoAppId) return;
//     const { error } = await supabase.from('project_applications').update({ interview_completed: true }).eq('id', activeVideoAppId);
//     if (!error) {
//       updateActiveApplications(apps => apps.map(app => app.id === activeVideoAppId ? { ...app, interview_completed: true } : app));
//       setActiveVideoRoom(null); setActiveVideoAppId(null);
//     } else { alert("Failed to end interview gracefully."); }
//   };

//   const openProfileModal = async (githubUsername: string) => {
//     if (!githubUsername) return alert("This applicant hasn't linked a GitHub account.");
//     setSelectedGithubUsername(githubUsername); 
//     setIsProfileModalOpen(true); 
//     setIsFetchingProfile(true); 
//     setSelectedProfile(null);
    
//     try {
//         const { data, error } = await supabase.from('github_analysis').select('*').ilike('github_username', githubUsername).maybeSingle();
        
//         if (data && data.analysis_data) {
//            setSelectedProfile(data.analysis_data);
//            setIsFetchingProfile(false);
//            return;
//         }

//         console.log("No analysis found in DB. Triggering AI Analysis Worker...");
//         const WORKER_URL = import.meta.env.VITE_GITHUB_WORKER_URL || "https://git.0xcloud.workers.dev/api"; 
        
//         const response = await fetch(`${WORKER_URL}?username=${encodeURIComponent(githubUsername)}`);
        
//         if (!response.ok) throw new Error("Worker failed to generate analysis");
        
//         const workerData = await response.json();
//         setSelectedProfile(workerData);

//     } catch (err) { 
//         console.error("Profile Analysis Error:", err);
//         setSelectedProfile({ error: true }); 
//     } finally { 
//         setIsFetchingProfile(false); 
//     }
//   };

//   const confirmAccept = async () => {
//     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
//     setIsLoading(true);
//     const applicant = activeApplications.find(a => a.id === selectedApplicant);
//     const applicantGithub = applicant?.applicant_github;

//     if (!applicantGithub) { alert("This applicant does not have a GitHub username."); setIsLoading(false); return; }

//     const { data: { session } } = await supabase.auth.getSession();
//     const founderToken = session?.user?.user_metadata?.github_token || session?.provider_token;

//     if (founderToken) {
//         try {
//             const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
//             const res = await fetch(`${backendUrl}/api/github/invite`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${founderToken}` }, body: JSON.stringify({ repo: repoInput, developer_github: applicantGithub }) });
//             if (!res.ok) throw new Error((await res.json()).error);
//         } catch (err: any) { alert(`Failed to send GitHub invite: ${err.message}`); setIsLoading(false); return; }
//     }

//     const { error } = await supabase.from('project_applications').update({ status: 'accepted', assigned_repo: repoInput }).eq('id', selectedApplicant);
//     if (!error) {
//       updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app));
//       setIsAcceptModalOpen(false); setSelectedApplicant(null);
//     }
//     setIsLoading(false);
//   };

//   const closeProject = async () => {
//     if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
//     const tableName = projectType === 'developer' ? 'developer_projects' : 'learner_tasks';
//     const { error } = await supabase.from(tableName).update({ status: 'closed' }).eq('id', id);
//     if (!error) setProject({ ...project, status: 'closed' });
//   };

//   // --- NEW: FETCH EXPLANATION VIDEOS ---
//   const handleViewExplanations = async (developerId: string) => {
//     setIsLoadingExplanations(true);
//     setExplanationsModalOpen(true);
//     try {
//       const { data, error } = await supabase
//         .from('project_explanations')
//         .select('*')
//         .eq('project_id', id)
//         .eq('developer_id', developerId)
//         .order('created_at', { ascending: false });
        
//       if (error) throw error;
//       setExplanationsData(data || []);
//     } catch (err) {
//       console.error("Error fetching explanations:", err);
//       alert("Failed to load explanations.");
//     } finally {
//       setIsLoadingExplanations(false);
//     }
//   };

//   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin"/></div></PageLayout>;
//   if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white font-bold text-2xl">Project not found.</div></PageLayout>;

//   const displayProject = viewMode === 'developer' ? project : (linkedLearnerProject || project);

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto relative">
        
//         {/* ACTIVE VIDEO ROOM OVERLAY */}
//         {activeVideoRoom && (
//           <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col">
//             <div className="p-4 flex justify-between items-center bg-[#0f172a] border-b border-white/10">
//               <h2 className="text-white font-bold flex items-center gap-2"><Video className="w-5 h-5 text-green-400"/> DevPool Live Interview</h2>
//               <button onClick={handleEndInterview} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">End Interview & Make Decision</button>
//             </div>
//             <div className="flex-1 bg-black">
//               <JitsiMeeting domain="meet.jit.si" roomName={activeVideoRoom} configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false }} interfaceConfigOverwrite={{ DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }} userInfo={{ displayName: founderName } as any} getIFrameRef={(iframeRef: HTMLDivElement) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }} />
//             </div>
//           </div>
//         )}

//         <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard</button>

//         <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <h1 className="text-3xl font-display font-bold text-white">{displayProject.title}</h1>
//                 {viewMode === 'learner' && (
//                   <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full flex items-center gap-1 ${displayProject.payment_type === 'fees' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
//                     {displayProject.payment_type === 'fees' ? <><DollarSign className="w-3 h-3"/> Fee: ${displayProject.fee_amount}</> : <><Gift className="w-3 h-3"/> Free Volunteer</>}
//                   </span>
//                 )}
//               </div>
//             </div>
//             {displayProject.status === 'open' || !displayProject.status ? (
//               <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold"><Lock className="w-4 h-4" /> Close Project</button>
//             ) : (
//               <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4" /> Project Closed</span>
//             )}
//           </div>
//           <div className="mt-6 pt-6 border-t border-white/10">
//             <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
//             <p className="text-muted-foreground whitespace-pre-wrap">{displayProject.task_description || displayProject.description}</p>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//           <h2 className="text-2xl font-bold text-white">
//             Applicants ({activeApplications.length})
//           </h2>
          
//           {hasLinkedLearnerTask && (
//             <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
//               <button onClick={() => setViewMode('developer')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'developer' ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
//                 Senior Developers ({devApplications.length})
//               </button>
//               <button onClick={() => setViewMode('learner')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'learner' ? 'bg-secondary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
//                 Junior Learners ({learnerApplications.length})
//               </button>
//             </div>
//           )}
//         </div>
        
//         {activeApplications.length === 0 ? (
//           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">No {viewMode}s have applied to this project yet.</div>
//         ) : (
//           <div className="space-y-4">
//             {activeApplications.map((app) => {
//               let requiresInterview = false;
              
//               if (viewMode === 'developer') {
//                 requiresInterview = project.evaluation_method?.includes('interview');
//               } else if (viewMode === 'learner') {
//                 requiresInterview = linkedLearnerProject?.evaluation_method?.includes('interview') || false; 
//               }

//               const hasInterviewScheduled = !!app.interview_time;
//               const isInterviewCompleted = !!app.interview_completed;
              
//               return (
//                 <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">{app.applicant_name.charAt(0)}</div>
//                     <div>
//                       <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                         {app.applicant_name}
//                         {app.test_score !== null && app.test_score !== undefined && (
//                           <span className="bg-primary/20 text-primary text-[11px] font-bold uppercase px-2 py-0.5 rounded border border-primary/30 flex items-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.2)]"><Trophy className="w-3 h-3" /> Score: {app.test_score}</span>
//                         )}
//                         {app.status === 'paid' && <span className="bg-green-500/20 text-green-400 text-[10px] uppercase px-2 py-0.5 rounded border border-green-500/30">Paid Premium</span>}
//                         {isInterviewCompleted && <span className="bg-purple-500/20 text-purple-400 text-[10px] uppercase px-2 py-0.5 rounded border border-purple-500/30">Interviewed</span>}
//                       </h3>
//                       {app.applicant_github && <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"><Github className="w-3 h-3" /> @{app.applicant_github}</a>}
//                       {hasInterviewScheduled && !isInterviewCompleted && app.status !== 'accepted' && <div className="text-sm text-yellow-400 mt-2 flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20"><Calendar className="w-4 h-4" /> Interview: {new Date(app.interview_time).toLocaleString()}</div>}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
//                     {(app.status === 'pending' || app.status === 'paid') ? (
//                       <>
//                         <button onClick={() => openProfileModal(app.applicant_github)} className="px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold flex items-center border border-blue-500/20"><Eye className="w-4 h-4 mr-1"/> View</button>
                        
//                         {app.status === 'paid' ? (
//                           <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
//                         ) : requiresInterview && !hasInterviewScheduled ? (
//                           <button onClick={() => openScheduleModal(app.id)} className="px-3 py-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 rounded-lg text-sm font-bold flex items-center border border-purple-500/20"><Calendar className="w-4 h-4 mr-1"/> Schedule</button>
//                         ) : requiresInterview && hasInterviewScheduled && !isInterviewCompleted ? (
//                           <button onClick={() => { setActiveVideoRoom(app.meet_room_id); setActiveVideoAppId(app.id); }} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold flex items-center shadow-[0_0_15px_rgba(34,197,94,0.4)]"><Video className="w-4 h-4 mr-1"/> Join Call</button>
//                         ) : (
//                           <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
//                         )}
                        
//                         {app.status !== 'paid' && (
//                           <button onClick={() => { if (confirm("Reject this applicant?")) handleReject(app.id); }} className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold flex items-center border border-red-500/20"><XCircle className="w-4 h-4 mr-1"/> Reject</button>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         {app.status === 'accepted' && app.assigned_repo && (
//                           <>
//                             {/* --- NEW: VIEW EXPLANATIONS BUTTON --- */}
//                             {viewMode === 'developer' && hasLinkedLearnerTask && (
//                               <button 
//                                 onClick={() => handleViewExplanations(app.applicant_id)}
//                                 className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors mr-2"
//                               >
//                                 <PlayCircle className="w-4 h-4" /> View Explanations
//                               </button>
//                             )}

//                             <button 
//                               onClick={() => navigate(`/editor?repo=${encodeURIComponent(app.assigned_repo)}&projectId=${app.project_id}&founder=true`)}
//                               className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors mr-2"
//                             >
//                               <Code className="w-4 h-4" /> View Live Code
//                             </button>
//                           </>
//                         )}
//                         <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
//                           {app.status}
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* --- NEW: EXPLANATIONS MODAL UI --- */}
//         <AnimatePresence>
//           {explanationsModalOpen && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExplanationsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
//               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl glass border border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto">
//                 <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                   <h3 className="text-2xl font-bold text-white flex items-center gap-2">
//                     <PlayCircle className="w-6 h-6 text-purple-400" /> Developer Explanations
//                   </h3>
//                   <button onClick={() => setExplanationsModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
//                     <XCircle className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {isLoadingExplanations ? (
//                   <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
//                     <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
//                     <p>Loading videos...</p>
//                   </div>
//                 ) : explanationsData.length === 0 ? (
//                   <div className="py-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-xl">
//                     <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                     <p>This developer hasn't uploaded any explanation videos yet.</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-8">
//                     {explanationsData.map((expl: any) => (
//                       <div key={expl.id} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-lg">
//                         <div className="p-4 bg-[#1e293b] border-b border-white/5 flex items-start justify-between gap-4">
//                           <div>
//                             <p className="text-xs text-purple-400 font-bold uppercase mb-1">Commit Message</p>
//                             <p className="text-white font-mono text-sm">{expl.commit_message}</p>
//                           </div>
//                           <span className="text-xs text-muted-foreground whitespace-nowrap bg-black/30 px-2 py-1 rounded">
//                             {new Date(expl.created_at).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <div className="w-full bg-black aspect-video relative">
//                           <video 
//                             src={expl.video_url} 
//                             controls 
//                             className="w-full h-full absolute inset-0 object-contain"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* SCHEDULE INTERVIEW MODAL */}
//         <AnimatePresence>
//           {isScheduleModalOpen && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsScheduleModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
//                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Calendar className="text-purple-400"/> Schedule Interview</h3>
//                 <div className="mb-8"><input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none" /></div>
//                 <div className="flex gap-3"><button onClick={() => setIsScheduleModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white">Cancel</button><button onClick={confirmSchedule} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold"><CheckCircle2 className="inline w-4 h-4 mr-1" /> Save Schedule</button></div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* ASSIGN REPO MODAL */}
//         <AnimatePresence>
//           {isAcceptModalOpen && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
//                 <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
//                 <div className="mb-4">
//                   {isFetchingRepos ? <div className="text-muted-foreground"><Loader2 className="w-4 animate-spin inline"/> Fetching...</div> : (
//                     <select value={repoInput} onChange={(e) => setRepoInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
//                       <option value="" className="bg-[#0f172a] text-white">-- Choose a repo --</option>
//                       {founderRepos.map(repo => <option key={repo.id} value={repo.full_name} className="bg-[#0f172a] text-white">{repo.name}</option>)}
//                     </select>
//                   )}
//                 </div>
//                 <input type="text" value={repoInput} onChange={(e) => setRepoInput(e.target.value)} placeholder="Or type manually..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-8" />
//                 <div className="flex gap-3"><button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white">Cancel</button><button onClick={confirmAccept} className="flex-1 btn-neon rounded-xl"><CheckCircle2 className="inline w-4 mr-1" /> Confirm Hire</button></div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* PROFILE MODAL  */}
//         <AnimatePresence>
//           {isProfileModalOpen && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProfileModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto">
//                 <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
//                   <h3 className="text-2xl font-bold text-white flex items-center gap-2">
//                     <Github className="w-6 h-6 text-primary" /> AI Trust Engine Analysis
//                   </h3>
//                   <button onClick={() => setIsProfileModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
//                     <XCircle className="w-6 h-6" />
//                   </button>
//                 </div>
//                 {isFetchingProfile ? (
//                   <div className="py-20 flex flex-col items-center justify-center text-muted-foreground"><Loader2 className="w-10 h-10 animate-spin text-primary mb-4" /><p>Fetching Data from GitHub & Analyzing...</p></div>
//                 ) : selectedProfile && !selectedProfile.error ? (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="space-y-6">
//                       <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
//                         <ShieldCheck className="w-12 h-12 text-primary mb-4" />
//                         <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
//                         <div className="text-5xl font-display font-bold text-white mb-2">{selectedProfile.score || 0}<span className="text-2xl text-muted-foreground">/100</span></div>
//                         {selectedProfile.developer_type && <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2"><Code className="w-4 h-4 inline mr-1" /> {selectedProfile.developer_type}</span>}
//                       </div>
//                       {selectedProfile.tag && (
//                         <div className="glass-card p-6 border-secondary/30">
//                           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Tag className="w-5 h-5 text-secondary" /> AI Profile Tag</h3>
//                           <p className="text-secondary font-bold mb-1">{selectedProfile.tag.tag_name}</p>
//                           <p className="text-sm text-muted-foreground">{selectedProfile.tag.description}</p>
//                         </div>
//                       )}
//                       <div className="glass-card p-6 grid grid-cols-2 gap-4">
//                         <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div><p className="text-2xl font-bold text-white">{selectedProfile.public_repo_count || 0}</p></div>
//                         <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div><p className="text-2xl font-bold text-white">{selectedProfile.followers || 0}</p></div>
//                       </div>
//                     </div>
//                     <div className="md:col-span-2 space-y-6">
//                       <div className="glass-card p-6">
//                         <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> Deep AI Analysis</h3>
//                         <p className="text-muted-foreground leading-relaxed">{selectedProfile.detailed_analysis}</p>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="glass-card p-6">
//                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas</h3>
//                           <ul className="space-y-2">{(selectedProfile.improvement_areas || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">•</span> {item}</li>)}</ul>
//                         </div>
//                         <div className="glass-card p-6">
//                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics</h3>
//                           <ul className="space-y-2">{(selectedProfile.diagnostics || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-neon-pink mt-1">•</span> {item}</li>)}</ul>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="md:col-span-3 glass-card p-6">
//                       <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2"><Rocket className="w-6 h-6 text-primary" /> Suggested Projects</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {selectedProfile.project_ideas && Object.values(selectedProfile.project_ideas).map((idea: any, idx: number) => (
//                           <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5"><h4 className="font-bold text-white mb-2">{idea.title}</h4><p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p></div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="py-10 text-center"><div className="text-red-400 font-bold mb-2">Analysis Failed</div><p className="text-muted-foreground text-sm">Engine could not analyze this user.</p></div>
//                 )}
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//       </div>
//     </PageLayout>
//   );
// };

// export default ManageProject;






import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, XCircle, Github, Lock, Loader2, Eye,
  ShieldCheck, Brain, Lightbulb, Code, Users, FolderKanban, Tag, Rocket, BarChart3, DollarSign, Gift, Video, Calendar, Trophy, PlayCircle
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { JitsiMeeting } from '@jitsi/react-sdk';

const ManageProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  
  const [linkedLearnerProject, setLinkedLearnerProject] = useState<any>(null);
  
  const [projectType, setProjectType] = useState<'developer' | 'learner' | null>(null); 
  const [devApplications, setDevApplications] = useState<any[]>([]);
  const [learnerApplications, setLearnerApplications] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'developer' | 'learner'>('developer');
  const [hasLinkedLearnerTask, setHasLinkedLearnerTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [founderRepos, setFounderRepos] = useState<any[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);

  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [repoInput, setRepoInput] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  const [activeVideoRoom, setActiveVideoRoom] = useState<string | null>(null);
  const [activeVideoAppId, setActiveVideoAppId] = useState<string | null>(null);
  const [founderName, setFounderName] = useState('Founder');

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedGithubUsername, setSelectedGithubUsername] = useState<string>('');
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  // --- VIDEO EXPLANATIONS STATE ---
  const [explanationsModalOpen, setExplanationsModalOpen] = useState(false);
  const [explanationsData, setExplanationsData] = useState<any[]>([]);
  const [isLoadingExplanations, setIsLoadingExplanations] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState<any>(null); // <--- NEW: Tracks which video is playing

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      
      let { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();

      if (projData) {
        setProject(projData);
        setProjectType('developer');
        setViewMode('developer');

        const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
        if (appData) setDevApplications(appData.sort((a, b) => (b.test_score || -1) - (a.test_score || -1)));

        const { data: linkedTask } = await supabase.from('learner_tasks').select('*').eq('developer_project_id', id).maybeSingle();
        if (linkedTask) {
          setHasLinkedLearnerTask(true);
          setLinkedLearnerProject(linkedTask); 
          const { data: lAppData } = await supabase.from('project_applications').select('*').eq('project_id', linkedTask.id).order('created_at', { ascending: false });
          if (lAppData) setLearnerApplications(lAppData);
        }
      } else {
        const { data: learnerData } = await supabase.from('learner_tasks').select('*').eq('id', id).single();
        if (learnerData) {
          setProject(learnerData);
          setProjectType('learner');
          setViewMode('learner');
          const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
          if (appData) setLearnerApplications(appData);
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setFounderName(session.user.user_metadata?.full_name || 'Founder');
        const ghUsername = session.user.user_metadata?.preferred_username || session.user.user_metadata?.user_name;
        if (ghUsername) {
          setIsFetchingRepos(true);
          try {
            const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
            if (res.ok) setFounderRepos(await res.json());
          } catch (err) {} finally { setIsFetchingRepos(false); }
        }
      }
      setIsLoading(false);
    };
    
    if (id) fetchDetails();
  }, [id]);

  const activeApplications = viewMode === 'developer' ? devApplications : learnerApplications;
  const updateActiveApplications = (updater: (apps: any[]) => any[]) => {
    if (viewMode === 'developer') setDevApplications(updater(devApplications));
    else setLearnerApplications(updater(learnerApplications));
  };

  const handleReject = async (appId: string) => {
    const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
    if (!error) updateActiveApplications(apps => apps.filter(app => app.id !== appId));
  };

  const openAcceptModal = (appId: string) => { setSelectedApplicant(appId); setRepoInput(''); setIsAcceptModalOpen(true); };
  const openScheduleModal = (appId: string) => { setSelectedApplicant(appId); setInterviewDate(''); setIsScheduleModalOpen(true); };

  const confirmSchedule = async () => {
    if (!selectedApplicant || !interviewDate) return alert("Please select a date and time!");
    const uniqueRoomId = `DevPool-Interview-${selectedApplicant}-${Date.now()}`;
    const { error } = await supabase.from('project_applications').update({ interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId }).eq('id', selectedApplicant);
    if (!error) {
      updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, interview_time: new Date(interviewDate).toISOString(), meet_room_id: uniqueRoomId } : app));
      setIsScheduleModalOpen(false); setSelectedApplicant(null);
    } else { alert("Failed to schedule interview."); }
  };

  const handleEndInterview = async () => {
    if (!activeVideoAppId) return;
    const { error } = await supabase.from('project_applications').update({ interview_completed: true }).eq('id', activeVideoAppId);
    if (!error) {
      updateActiveApplications(apps => apps.map(app => app.id === activeVideoAppId ? { ...app, interview_completed: true } : app));
      setActiveVideoRoom(null); setActiveVideoAppId(null);
    } else { alert("Failed to end interview gracefully."); }
  };

  const openProfileModal = async (githubUsername: string) => {
    if (!githubUsername) return alert("This applicant hasn't linked a GitHub account.");
    setSelectedGithubUsername(githubUsername); 
    setIsProfileModalOpen(true); 
    setIsFetchingProfile(true); 
    setSelectedProfile(null);
    
    try {
        const { data, error } = await supabase.from('github_analysis').select('*').ilike('github_username', githubUsername).maybeSingle();
        
        if (data && data.analysis_data) {
           setSelectedProfile(data.analysis_data);
           setIsFetchingProfile(false);
           return;
        }

        const WORKER_URL = import.meta.env.VITE_GITHUB_WORKER_URL || "https://git.0xcloud.workers.dev/api"; 
        
        const response = await fetch(`${WORKER_URL}?username=${encodeURIComponent(githubUsername)}`);
        
        if (!response.ok) throw new Error("Worker failed to generate analysis");
        
        const workerData = await response.json();
        setSelectedProfile(workerData);

    } catch (err) { 
        console.error("Profile Analysis Error:", err);
        setSelectedProfile({ error: true }); 
    } finally { 
        setIsFetchingProfile(false); 
    }
  };

  const confirmAccept = async () => {
    if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
    setIsLoading(true);
    const applicant = activeApplications.find(a => a.id === selectedApplicant);
    const applicantGithub = applicant?.applicant_github;

    if (!applicantGithub) { alert("This applicant does not have a GitHub username."); setIsLoading(false); return; }

    const { data: { session } } = await supabase.auth.getSession();
    const founderToken = session?.user?.user_metadata?.github_token || session?.provider_token;

    if (founderToken) {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const res = await fetch(`${backendUrl}/api/github/invite`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${founderToken}` }, body: JSON.stringify({ repo: repoInput, developer_github: applicantGithub }) });
            if (!res.ok) throw new Error((await res.json()).error);
        } catch (err: any) { alert(`Failed to send GitHub invite: ${err.message}`); setIsLoading(false); return; }
    }

    const { error } = await supabase.from('project_applications').update({ status: 'accepted', assigned_repo: repoInput }).eq('id', selectedApplicant);
    if (!error) {
      updateActiveApplications(apps => apps.map(app => app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app));
      setIsAcceptModalOpen(false); setSelectedApplicant(null);
    }
    setIsLoading(false);
  };

  const closeProject = async () => {
    if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
    const tableName = projectType === 'developer' ? 'developer_projects' : 'learner_tasks';
    const { error } = await supabase.from(tableName).update({ status: 'closed' }).eq('id', id);
    if (!error) setProject({ ...project, status: 'closed' });
  };

  // --- FETCH EXPLANATION VIDEOS ---
  const handleViewExplanations = async (developerId: string) => {
    setIsLoadingExplanations(true);
    setExplanationsModalOpen(true);
    setActiveExplanation(null); // Reset to gallery view
    try {
      const { data, error } = await supabase
        .from('project_explanations')
        .select('*')
        .eq('project_id', id)
        .eq('developer_id', developerId)
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
  if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white font-bold text-2xl">Project not found.</div></PageLayout>;

  const displayProject = viewMode === 'developer' ? project : (linkedLearnerProject || project);

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto relative">
        
        {/* ACTIVE VIDEO ROOM OVERLAY */}
        {activeVideoRoom && (
          <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col">
            <div className="p-4 flex justify-between items-center bg-[#0f172a] border-b border-white/10">
              <h2 className="text-white font-bold flex items-center gap-2"><Video className="w-5 h-5 text-green-400"/> DevPool Live Interview</h2>
              <button onClick={handleEndInterview} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">End Interview & Make Decision</button>
            </div>
            <div className="flex-1 bg-black">
              <JitsiMeeting domain="meet.jit.si" roomName={activeVideoRoom} configOverwrite={{ startWithAudioMuted: false, startWithVideoMuted: false }} interfaceConfigOverwrite={{ DISABLE_JOIN_LEAVE_NOTIFICATIONS: true }} userInfo={{ displayName: founderName } as any} getIFrameRef={(iframeRef: HTMLDivElement) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }} />
            </div>
          </div>
        )}

        <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard</button>

        <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-display font-bold text-white">{displayProject.title}</h1>
                {viewMode === 'learner' && (
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full flex items-center gap-1 ${displayProject.payment_type === 'fees' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {displayProject.payment_type === 'fees' ? <><DollarSign className="w-3 h-3"/> Fee: ${displayProject.fee_amount}</> : <><Gift className="w-3 h-3"/> Free Volunteer</>}
                  </span>
                )}
              </div>
            </div>
            {displayProject.status === 'open' || !displayProject.status ? (
              <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold"><Lock className="w-4 h-4" /> Close Project</button>
            ) : (
              <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4" /> Project Closed</span>
            )}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{displayProject.task_description || displayProject.description}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-white">
            Applicants ({activeApplications.length})
          </h2>
          
          {hasLinkedLearnerTask && (
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
              <button onClick={() => setViewMode('developer')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'developer' ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
                Senior Developers ({devApplications.length})
              </button>
              <button onClick={() => setViewMode('learner')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'learner' ? 'bg-secondary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-muted-foreground hover:text-white'}`}>
                Junior Learners ({learnerApplications.length})
              </button>
            </div>
          )}
        </div>
        
        {activeApplications.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">No {viewMode}s have applied to this project yet.</div>
        ) : (
          <div className="space-y-4">
            {activeApplications.map((app) => {
              let requiresInterview = false;
              
              if (viewMode === 'developer') {
                requiresInterview = project.evaluation_method?.includes('interview');
              } else if (viewMode === 'learner') {
                requiresInterview = linkedLearnerProject?.evaluation_method?.includes('interview') || false; 
              }

              const hasInterviewScheduled = !!app.interview_time;
              const isInterviewCompleted = !!app.interview_completed;
              
              return (
                <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">{app.applicant_name.charAt(0)}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {app.applicant_name}
                        {app.test_score !== null && app.test_score !== undefined && (
                          <span className="bg-primary/20 text-primary text-[11px] font-bold uppercase px-2 py-0.5 rounded border border-primary/30 flex items-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.2)]"><Trophy className="w-3 h-3" /> Score: {app.test_score}</span>
                        )}
                        {app.status === 'paid' && <span className="bg-green-500/20 text-green-400 text-[10px] uppercase px-2 py-0.5 rounded border border-green-500/30">Paid Premium</span>}
                        {isInterviewCompleted && <span className="bg-purple-500/20 text-purple-400 text-[10px] uppercase px-2 py-0.5 rounded border border-purple-500/30">Interviewed</span>}
                      </h3>
                      {app.applicant_github && <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"><Github className="w-3 h-3" /> @{app.applicant_github}</a>}
                      {hasInterviewScheduled && !isInterviewCompleted && app.status !== 'accepted' && <div className="text-sm text-yellow-400 mt-2 flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20"><Calendar className="w-4 h-4" /> Interview: {new Date(app.interview_time).toLocaleString()}</div>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                    {(app.status === 'pending' || app.status === 'paid') ? (
                      <>
                        <button onClick={() => openProfileModal(app.applicant_github)} className="px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold flex items-center border border-blue-500/20"><Eye className="w-4 h-4 mr-1"/> View</button>
                        
                        {app.status === 'paid' ? (
                          <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
                        ) : requiresInterview && !hasInterviewScheduled ? (
                          <button onClick={() => openScheduleModal(app.id)} className="px-3 py-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 rounded-lg text-sm font-bold flex items-center border border-purple-500/20"><Calendar className="w-4 h-4 mr-1"/> Schedule</button>
                        ) : requiresInterview && hasInterviewScheduled && !isInterviewCompleted ? (
                          <button onClick={() => { setActiveVideoRoom(app.meet_room_id); setActiveVideoAppId(app.id); }} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold flex items-center shadow-[0_0_15px_rgba(34,197,94,0.4)]"><Video className="w-4 h-4 mr-1"/> Join Call</button>
                        ) : (
                          <button onClick={() => openAcceptModal(app.id)} className="px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold flex items-center border border-green-500/20"><CheckCircle2 className="w-4 h-4 mr-1"/> Accept</button>
                        )}
                        
                        {app.status !== 'paid' && (
                          <button onClick={() => { if (confirm("Reject this applicant?")) handleReject(app.id); }} className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold flex items-center border border-red-500/20"><XCircle className="w-4 h-4 mr-1"/> Reject</button>
                        )}
                      </>
                    ) : (
                      <>
                        {app.status === 'accepted' && app.assigned_repo && (
                          <>
                            {/* --- THE FIX: ALWAYS SHOW EXPLANATIONS BUTTON FOR DEVELOPERS --- */}
                            {viewMode === 'developer' && (
                              <button 
                                onClick={() => handleViewExplanations(app.applicant_id)}
                                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors mr-2"
                              >
                                <PlayCircle className="w-4 h-4" /> View Explanations
                              </button>
                            )}

                            <button 
                              onClick={() => navigate(`/editor?repo=${encodeURIComponent(app.assigned_repo)}&projectId=${app.project_id}&founder=true`)}
                              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors mr-2"
                            >
                              <Code className="w-4 h-4" /> View Live Code
                            </button>
                          </>
                        )}
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                          {app.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- NEW: EXPLANATIONS MODAL UI (GALLERY + PLAYER) --- */}
        <AnimatePresence>
          {explanationsModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExplanationsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl glass border border-purple-500/30 shadow-2xl shadow-purple-500/10 rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4 shrink-0">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <PlayCircle className="w-6 h-6 text-purple-400" /> Developer Explanations
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
                      <p>This developer hasn't uploaded any explanation videos yet.</p>
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

        {/* SCHEDULE INTERVIEW MODAL */}
        <AnimatePresence>
          {isScheduleModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsScheduleModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Calendar className="text-purple-400"/> Schedule Interview</h3>
                <div className="mb-8"><input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none" /></div>
                <div className="flex gap-3"><button onClick={() => setIsScheduleModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white">Cancel</button><button onClick={confirmSchedule} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl font-bold"><CheckCircle2 className="inline w-4 h-4 mr-1" /> Save Schedule</button></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ASSIGN REPO MODAL */}
        <AnimatePresence>
          {isAcceptModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
                <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
                <div className="mb-4">
                  {isFetchingRepos ? <div className="text-muted-foreground"><Loader2 className="w-4 animate-spin inline"/> Fetching...</div> : (
                    <select value={repoInput} onChange={(e) => setRepoInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                      <option value="" className="bg-[#0f172a] text-white">-- Choose a repo --</option>
                      {founderRepos.map(repo => <option key={repo.id} value={repo.full_name} className="bg-[#0f172a] text-white">{repo.name}</option>)}
                    </select>
                  )}
                </div>
                <input type="text" value={repoInput} onChange={(e) => setRepoInput(e.target.value)} placeholder="Or type manually..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-8" />
                <div className="flex gap-3"><button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white">Cancel</button><button onClick={confirmAccept} className="flex-1 btn-neon rounded-xl"><CheckCircle2 className="inline w-4 mr-1" /> Confirm Hire</button></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PROFILE MODAL  */}
        <AnimatePresence>
          {isProfileModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProfileModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Github className="w-6 h-6 text-primary" /> AI Trust Engine Analysis
                  </h3>
                  <button onClick={() => setIsProfileModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                {isFetchingProfile ? (
                  <div className="py-20 flex flex-col items-center justify-center text-muted-foreground"><Loader2 className="w-10 h-10 animate-spin text-primary mb-4" /><p>Fetching Data from GitHub & Analyzing...</p></div>
                ) : selectedProfile && !selectedProfile.error ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-6">
                      <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                        <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                        <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
                        <div className="text-5xl font-display font-bold text-white mb-2">{selectedProfile.score || 0}<span className="text-2xl text-muted-foreground">/100</span></div>
                        {selectedProfile.developer_type && <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2"><Code className="w-4 h-4 inline mr-1" /> {selectedProfile.developer_type}</span>}
                      </div>
                      {selectedProfile.tag && (
                        <div className="glass-card p-6 border-secondary/30">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Tag className="w-5 h-5 text-secondary" /> AI Profile Tag</h3>
                          <p className="text-secondary font-bold mb-1">{selectedProfile.tag.tag_name}</p>
                          <p className="text-sm text-muted-foreground">{selectedProfile.tag.description}</p>
                        </div>
                      )}
                      <div className="glass-card p-6 grid grid-cols-2 gap-4">
                        <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div><p className="text-2xl font-bold text-white">{selectedProfile.public_repo_count || 0}</p></div>
                        <div><div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div><p className="text-2xl font-bold text-white">{selectedProfile.followers || 0}</p></div>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                      <div className="glass-card p-6">
                        <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> Deep AI Analysis</h3>
                        <p className="text-muted-foreground leading-relaxed">{selectedProfile.detailed_analysis}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas</h3>
                          <ul className="space-y-2">{(selectedProfile.improvement_areas || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">•</span> {item}</li>)}</ul>
                        </div>
                        <div className="glass-card p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics</h3>
                          <ul className="space-y-2">{(selectedProfile.diagnostics || []).map((item: string, i: number) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-neon-pink mt-1">•</span> {item}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-3 glass-card p-6">
                      <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2"><Rocket className="w-6 h-6 text-primary" /> Suggested Projects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedProfile.project_ideas && Object.values(selectedProfile.project_ideas).map((idea: any, idx: number) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5"><h4 className="font-bold text-white mb-2">{idea.title}</h4><p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-10 text-center"><div className="text-red-400 font-bold mb-2">Analysis Failed</div><p className="text-muted-foreground text-sm">Engine could not analyze this user.</p></div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageLayout>
  );
};

export default ManageProject;