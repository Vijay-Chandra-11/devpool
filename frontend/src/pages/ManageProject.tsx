// // // import { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { ArrowLeft, CheckCircle2, XCircle, Github, Lock, Database, Loader2 } from 'lucide-react';
// // // import PageLayout from '@/components/layout/PageLayout';
// // // import { supabase } from '@/lib/supabase';
// // // import { motion, AnimatePresence } from 'framer-motion';

// // // const ManageProject = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [project, setProject] = useState<any>(null);
// // //   const [applications, setApplications] = useState<any[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   // GitHub Repo State
// // //   const [founderRepos, setFounderRepos] = useState<any[]>([]);
// // //   const [isFetchingRepos, setIsFetchingRepos] = useState(false);

// // //   // Modal State
// // //   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
// // //   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
// // //   const [repoInput, setRepoInput] = useState('');

// // //   useEffect(() => {
// // //     const fetchDetails = async () => {
// // //       // 1. Fetch Project
// // //       const { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();
// // //       setProject(projData);

// // //       // 2. Fetch Applications
// // //       const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// // //       if (appData) setApplications(appData);

// // //       // 3. Fetch Founder's Real GitHub Repositories!
// // //       const { data: { session } } = await supabase.auth.getSession();
// // //       const ghUsername = session?.user?.user_metadata?.preferred_username || session?.user?.user_metadata?.user_name;
      
// // //       if (ghUsername) {
// // //         setIsFetchingRepos(true);
// // //         try {
// // //           const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
// // //           if (res.ok) {
// // //             const repos = await res.json();
// // //             setFounderRepos(repos);
// // //           }
// // //         } catch (err) {
// // //           console.error("Failed to fetch GitHub repos", err);
// // //         } finally {
// // //           setIsFetchingRepos(false);
// // //         }
// // //       }

// // //       setIsLoading(false);
// // //     };
// // //     fetchDetails();
// // //   }, [id]);

// // //   const handleReject = async (appId: string) => {
// // //     const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
// // //     if (!error) setApplications(applications.map(app => app.id === appId ? { ...app, status: 'rejected' } : app));
// // //   };

// // //   const openAcceptModal = (appId: string) => {
// // //     setSelectedApplicant(appId);
// // //     setRepoInput(''); // Clear previous input
// // //     setIsAcceptModalOpen(true);
// // //   };

// // //   const confirmAccept = async () => {
// // //     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
// // //     setIsLoading(true);

// // //     const applicant = applications.find(a => a.id === selectedApplicant);
// // //     const applicantGithub = applicant?.applicant_github;

// // //     if (!applicantGithub) {
// // //         alert("This applicant does not have a GitHub username on file.");
// // //         setIsLoading(false);
// // //         return;
// // //     }

// // //     // 1. GET THE FOUNDER'S TOKEN
// // //     const { data: { session } } = await supabase.auth.getSession();
// // //     const founderToken = session?.provider_token;

// // //     // 2. SEND THE GITHUB INVITE VIA FLASK
// // //     if (founderToken) {
// // //         try {
// // //             const res = await fetch('http://localhost:5000/api/github/invite', {
// // //                 method: 'POST',
// // //                 headers: { 
// // //                     'Content-Type': 'application/json',
// // //                     'Authorization': `Bearer ${founderToken}`
// // //                 },
// // //                 body: JSON.stringify({
// // //                     repo: repoInput,
// // //                     developer_github: applicantGithub
// // //                 })
// // //             });
// // //             const data = await res.json();
// // //             if (!res.ok) throw new Error(data.error);
// // //         } catch (err: any) {
// // //             alert(`Failed to send GitHub invite: ${err.message}`);
// // //             setIsLoading(false);
// // //             return; // Stop the hiring process if GitHub fails
// // //         }
// // //     }

// // //     // 3. UPDATE SUPABASE
// // //     const { error } = await supabase
// // //       .from('project_applications')
// // //       .update({ 
// // //         status: 'accepted',
// // //         assigned_repo: repoInput
// // //       })
// // //       .eq('id', selectedApplicant);

// // //     if (!error) {
// // //       setApplications(applications.map(app => 
// // //         app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app
// // //       ));
// // //       setIsAcceptModalOpen(false);
// // //       setSelectedApplicant(null);
// // //     } else {
// // //       alert("Failed to accept applicant.");
// // //     }
// // //     setIsLoading(false);
// // //   };

// // //   const closeProject = async () => {
// // //     if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
// // //     const { error } = await supabase.from('developer_projects').update({ status: 'closed' }).eq('id', id);
// // //     if (!error) setProject({ ...project, status: 'closed' });
// // //   };

// // //   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></PageLayout>;
// // //   if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white">Project not found.</div></PageLayout>;

// // //   return (
// // //     <PageLayout showFooter={false}>
// // //       <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto">
        
// // //         <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
// // //           <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
// // //         </button>

// // //         {/* --- PROJECT DETAILS SECTION --- */}
// // //         <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
// // //           <div className="flex justify-between items-start mb-4">
// // //             <div>
// // //               <h1 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h1>
// // //               <div className="flex gap-2 text-xs">
// // //                 {project.tech_stack?.map((tech: string) => (
// // //                   <span key={tech} className="bg-white/10 px-2 py-1 rounded text-muted-foreground">{tech}</span>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //             {project.status === 'open' ? (
// // //               <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold">
// // //                 <Lock className="w-4 h-4" /> Close Project
// // //               </button>
// // //             ) : (
// // //               <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2">
// // //                 <Lock className="w-4 h-4" /> Project Closed
// // //               </span>
// // //             )}
// // //           </div>
          
// // //           <div className="mt-6 pt-6 border-t border-white/10">
// // //             <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
// // //             <p className="text-muted-foreground whitespace-pre-wrap">{project.task_description}</p>
// // //           </div>
// // //         </div>

// // //         {/* --- APPLICATIONS SECTION --- */}
// // //         <h2 className="text-2xl font-bold text-white mb-6">Applicants ({applications.length})</h2>
        
// // //         {applications.length === 0 ? (
// // //           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">
// // //             No developers have applied to this project yet.
// // //           </div>
// // //         ) : (
// // //           <div className="space-y-4">
// // //             {applications.map((app) => (
// // //               <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
// // //                 <div className="flex items-center gap-4">
// // //                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
// // //                     {app.applicant_name.charAt(0)}
// // //                   </div>
// // //                   <div>
// // //                     <h3 className="text-lg font-bold text-white">{app.applicant_name}</h3>
// // //                     {app.applicant_github && (
// // //                       <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
// // //                         <Github className="w-3 h-3" /> @{app.applicant_github}
// // //                       </a>
// // //                     )}
// // //                     {app.assigned_repo && (
// // //                       <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
// // //                         <Database className="w-3 h-3" /> Assigned: {app.assigned_repo}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex items-center gap-3 w-full md:w-auto">
// // //                   {app.status === 'pending' ? (
// // //                     <>
// // //                       <button onClick={() => openAcceptModal(app.id)} className="flex-1 md:flex-none px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-green-500/20">
// // //                         <CheckCircle2 className="w-4 h-4" /> Accept
// // //                       </button>
// // //                       <button onClick={() => handleReject(app.id)} className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-red-500/20">
// // //                         <XCircle className="w-4 h-4" /> Reject
// // //                       </button>
// // //                     </>
// // //                   ) : (
// // //                     <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
// // //                       {app.status}
// // //                     </span>
// // //                   )}
// // //                 </div>

// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* --- ASSIGN REPO MODAL --- */}
// // //         <AnimatePresence>
// // //           {isAcceptModalOpen && (
// // //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
// // //               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
// // //                 <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
// // //                 <p className="text-sm text-muted-foreground mb-6">Select the GitHub repository this developer should work on. They will receive access in their Live Editor.</p>
                
// // //                 <div className="mb-4">
// // //                   <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Your Repositories</label>
// // //                   {isFetchingRepos ? (
// // //                     <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-muted-foreground flex items-center gap-2">
// // //                       <Loader2 className="w-4 h-4 animate-spin" /> Fetching GitHub...
// // //                     </div>
// // //                   ) : (
// // //                     <select 
// // //                       value={repoInput}
// // //                       onChange={(e) => setRepoInput(e.target.value)}
// // //                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none cursor-pointer"
// // //                     >
// // //                       <option value="" disabled className="bg-slate-900">-- Choose a repository --</option>
// // //                       {founderRepos.map(repo => (
// // //                         <option key={repo.id} value={repo.full_name} className="bg-slate-900">
// // //                           {repo.name} {repo.private ? '(Private)' : ''}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   )}
// // //                 </div>

// // //                 <div className="flex items-center gap-4 my-4">
// // //                   <div className="h-px bg-white/10 flex-1"></div>
// // //                   <div className="text-xs text-muted-foreground font-bold uppercase">OR</div>
// // //                   <div className="h-px bg-white/10 flex-1"></div>
// // //                 </div>

// // //                 <div className="mb-8">
// // //                   <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Enter Manually (Org / Private Repos)</label>
// // //                   <input 
// // //                     type="text" 
// // //                     value={repoInput}
// // //                     onChange={(e) => setRepoInput(e.target.value)}
// // //                     placeholder="e.g., your-username/repo-name" 
// // //                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
// // //                   />
// // //                 </div>

// // //                 <div className="flex gap-3">
// // //                   <button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
// // //                     Cancel
// // //                   </button>
// // //                   <button onClick={confirmAccept} className="flex-1 btn-neon py-2 rounded-xl flex items-center justify-center gap-2">
// // //                     <CheckCircle2 className="w-4 h-4" /> Confirm Hire
// // //                   </button>
// // //                 </div>
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
// // import { ArrowLeft, CheckCircle2, XCircle, Github, Lock, Database, Loader2, Eye } from 'lucide-react';
// // import PageLayout from '@/components/layout/PageLayout';
// // import { supabase } from '@/lib/supabase';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const ManageProject = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [project, setProject] = useState<any>(null);
// //   const [applications, setApplications] = useState<any[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // GitHub Repo State
// //   const [founderRepos, setFounderRepos] = useState<any[]>([]);
// //   const [isFetchingRepos, setIsFetchingRepos] = useState(false);

// //   // Modal States
// //   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
// //   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
// //   const [repoInput, setRepoInput] = useState('');

// //   // --- New GitHub Profile Modal States ---
// //   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
// //   const [selectedProfile, setSelectedProfile] = useState<any>(null);
// //   const [isFetchingProfile, setIsFetchingProfile] = useState(false);

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       // 1. Fetch Project
// //       const { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();
// //       setProject(projData);

// //       // 2. Fetch Applications
// //       const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// //       if (appData) setApplications(appData);

// //       // 3. Fetch Founder's Real GitHub Repositories
// //       const { data: { session } } = await supabase.auth.getSession();
// //       const ghUsername = session?.user?.user_metadata?.preferred_username || session?.user?.user_metadata?.user_name;
      
// //       if (ghUsername) {
// //         setIsFetchingRepos(true);
// //         try {
// //           const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
// //           if (res.ok) {
// //             const repos = await res.json();
// //             setFounderRepos(repos);
// //           }
// //         } catch (err) {
// //           console.error("Failed to fetch GitHub repos", err);
// //         } finally {
// //           setIsFetchingRepos(false);
// //         }
// //       }

// //       setIsLoading(false);
// //     };
// //     fetchDetails();
// //   }, [id]);

// //   const handleReject = async (appId: string) => {
// //     const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
// //     if (!error) {
// //       // Update state and immediately remove rejected applicant from UI list
// //       setApplications(applications.filter(app => app.id !== appId));
// //     } else {
// //       alert("Failed to reject applicant.");
// //     }
// //   };

// //   const openAcceptModal = (appId: string) => {
// //     setSelectedApplicant(appId);
// //     setRepoInput(''); // Clear previous input
// //     setIsAcceptModalOpen(true);
// //   };

// //   const openProfileModal = async (githubUsername: string) => {
// //     if (!githubUsername) {
// //         alert("This applicant hasn't linked a GitHub account.");
// //         return;
// //     }

// //     setIsProfileModalOpen(true);
// //     setIsFetchingProfile(true);

// //     try {
// //         // Fetch custom GitHub analysis data directly from the database
// //         const { data, error } = await supabase
// //             .from('github_analysis') 
// //             .select('*')
// //             .ilike('github_username', githubUsername)
// //             .single();

// //         if (error) throw error;

// //         if (data) {
// //             setSelectedProfile(data);
// //         } else {
// //             throw new Error("Analysis not found in database.");
// //         }
        
// //     } catch (err) {
// //         console.error("Failed to fetch profile analysis from database:", err);
// //         setSelectedProfile({ error: true, github_username: githubUsername }); // Fallback state
// //     } finally {
// //         setIsFetchingProfile(false);
// //     }
// //   };

// //   const confirmAccept = async () => {
// //     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
// //     setIsLoading(true);

// //     const applicant = applications.find(a => a.id === selectedApplicant);
// //     const applicantGithub = applicant?.applicant_github;

// //     if (!applicantGithub) {
// //         alert("This applicant does not have a GitHub username on file.");
// //         setIsLoading(false);
// //         return;
// //     }

// //     // 1. GET THE FOUNDER'S TOKEN
// //     const { data: { session } } = await supabase.auth.getSession();
// //     const founderToken = session?.provider_token;

// //     // 2. SEND THE GITHUB INVITE VIA FLASK
// //     if (founderToken) {
// //         try {
// //             const res = await fetch('http://localhost:5000/api/github/invite', {
// //                 method: 'POST',
// //                 headers: { 
// //                     'Content-Type': 'application/json',
// //                     'Authorization': `Bearer ${founderToken}`
// //                 },
// //                 body: JSON.stringify({
// //                     repo: repoInput,
// //                     developer_github: applicantGithub
// //                 })
// //             });
// //             const data = await res.json();
// //             if (!res.ok) throw new Error(data.error);
// //         } catch (err: any) {
// //             alert(`Failed to send GitHub invite: ${err.message}`);
// //             setIsLoading(false);
// //             return; // Stop the hiring process if GitHub fails
// //         }
// //     }

// //     // 3. UPDATE SUPABASE
// //     const { error } = await supabase
// //       .from('project_applications')
// //       .update({ 
// //         status: 'accepted',
// //         assigned_repo: repoInput
// //       })
// //       .eq('id', selectedApplicant);

// //     if (!error) {
// //       setApplications(applications.map(app => 
// //         app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app
// //       ));
// //       setIsAcceptModalOpen(false);
// //       setSelectedApplicant(null);
// //     } else {
// //       alert("Failed to accept applicant.");
// //     }
// //     setIsLoading(false);
// //   };

// //   const closeProject = async () => {
// //     if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
// //     const { error } = await supabase.from('developer_projects').update({ status: 'closed' }).eq('id', id);
// //     if (!error) setProject({ ...project, status: 'closed' });
// //   };

// //   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></PageLayout>;
// //   if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white">Project not found.</div></PageLayout>;

// //   return (
// //     <PageLayout showFooter={false}>
// //       <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto">
        
// //         <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
// //           <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
// //         </button>

// //         {/* --- PROJECT DETAILS SECTION --- */}
// //         <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
// //           <div className="flex justify-between items-start mb-4">
// //             <div>
// //               <h1 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h1>
// //               <div className="flex gap-2 text-xs">
// //                 {project.tech_stack?.map((tech: string) => (
// //                   <span key={tech} className="bg-white/10 px-2 py-1 rounded text-muted-foreground">{tech}</span>
// //                 ))}
// //               </div>
// //             </div>
// //             {project.status === 'open' ? (
// //               <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold">
// //                 <Lock className="w-4 h-4" /> Close Project
// //               </button>
// //             ) : (
// //               <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2">
// //                 <Lock className="w-4 h-4" /> Project Closed
// //               </span>
// //             )}
// //           </div>
          
// //           <div className="mt-6 pt-6 border-t border-white/10">
// //             <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
// //             <p className="text-muted-foreground whitespace-pre-wrap">{project.task_description}</p>
// //           </div>
// //         </div>

// //         {/* --- APPLICATIONS SECTION --- */}
// //         <h2 className="text-2xl font-bold text-white mb-6">Applicants ({applications.length})</h2>
        
// //         {applications.length === 0 ? (
// //           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">
// //             No developers have applied to this project yet.
// //           </div>
// //         ) : (
// //           <div className="space-y-4">
// //             {applications.map((app) => (
// //               <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
// //                 <div className="flex items-center gap-4">
// //                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
// //                     {app.applicant_name.charAt(0)}
// //                   </div>
// //                   <div>
// //                     <h3 className="text-lg font-bold text-white">{app.applicant_name}</h3>
// //                     {app.applicant_github && (
// //                       <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
// //                         <Github className="w-3 h-3" /> @{app.applicant_github}
// //                       </a>
// //                     )}
// //                     {app.assigned_repo && (
// //                       <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
// //                         <Database className="w-3 h-3" /> Assigned: {app.assigned_repo}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2 w-full md:w-auto">
// //                   {app.status === 'pending' ? (
// //                     <>
// //                       {/* VIEW PROFILE BUTTON */}
// //                       <button 
// //                         onClick={() => openProfileModal(app.applicant_github)}
// //                         className="flex-1 md:flex-none px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-blue-500/20"
// //                         title="View GitHub Analysis"
// //                       >
// //                         <Eye className="w-4 h-4 mr-1"/> View
// //                       </button>

// //                       {/* ACCEPT BUTTON */}
// //                       <button 
// //                         onClick={() => openAcceptModal(app.id)} 
// //                         className="flex-1 md:flex-none px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-green-500/20"
// //                       >
// //                         <CheckCircle2 className="w-4 h-4 mr-1"/> Accept
// //                       </button>

// //                       {/* REJECT BUTTON (Removes from list entirely) */}
// //                       <button 
// //                         onClick={async () => {
// //                           if (confirm("Are you sure you want to reject and remove this applicant?")) {
// //                             await handleReject(app.id);
// //                           }
// //                         }} 
// //                         className="flex-1 md:flex-none px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-red-500/20"
// //                       >
// //                         <XCircle className="w-4 h-4 mr-1"/> Reject
// //                       </button>
// //                     </>
// //                   ) : (
// //                     <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
// //                       {app.status}
// //                     </span>
// //                   )}
// //                 </div>

// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* --- ASSIGN REPO MODAL --- */}
// //         <AnimatePresence>
// //           {isAcceptModalOpen && (
// //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
// //               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
// //                 <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
// //                 <p className="text-sm text-muted-foreground mb-6">Select the GitHub repository this developer should work on. They will receive access in their Live Editor.</p>
                
// //                 <div className="mb-4">
// //                   <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Your Repositories</label>
// //                   {isFetchingRepos ? (
// //                     <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-muted-foreground flex items-center gap-2">
// //                       <Loader2 className="w-4 h-4 animate-spin" /> Fetching GitHub...
// //                     </div>
// //                   ) : (
// //                     <select 
// //                       value={repoInput}
// //                       onChange={(e) => setRepoInput(e.target.value)}
// //                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none cursor-pointer"
// //                     >
// //                       <option value="" disabled className="bg-slate-900">-- Choose a repository --</option>
// //                       {founderRepos.map(repo => (
// //                         <option key={repo.id} value={repo.full_name} className="bg-slate-900">
// //                           {repo.name} {repo.private ? '(Private)' : ''}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   )}
// //                 </div>

// //                 <div className="flex items-center gap-4 my-4">
// //                   <div className="h-px bg-white/10 flex-1"></div>
// //                   <div className="text-xs text-muted-foreground font-bold uppercase">OR</div>
// //                   <div className="h-px bg-white/10 flex-1"></div>
// //                 </div>

// //                 <div className="mb-8">
// //                   <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Enter Manually (Org / Private Repos)</label>
// //                   <input 
// //                     type="text" 
// //                     value={repoInput}
// //                     onChange={(e) => setRepoInput(e.target.value)}
// //                     placeholder="e.g., your-username/repo-name" 
// //                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
// //                   />
// //                 </div>

// //                 <div className="flex gap-3">
// //                   <button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
// //                     Cancel
// //                   </button>
// //                   <button onClick={confirmAccept} className="flex-1 btn-neon py-2 rounded-xl flex items-center justify-center gap-2">
// //                     <CheckCircle2 className="w-4 h-4" /> Confirm Hire
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           )}
// //         </AnimatePresence>

// //         {/* --- GITHUB PROFILE ANALYSIS MODAL --- */}
// //         <AnimatePresence>
// //           {isProfileModalOpen && (
// //             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProfileModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
// //               <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a] max-h-[90vh] overflow-y-auto">
                
// //                 <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
// //                   <h3 className="text-2xl font-bold text-white flex items-center gap-2">
// //                     <Github className="w-6 h-6 text-primary" /> Trust Engine Analysis
// //                   </h3>
// //                   <button onClick={() => setIsProfileModalOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
// //                     <XCircle className="w-6 h-6" />
// //                   </button>
// //                 </div>

// //                 {isFetchingProfile ? (
// //                   <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
// //                     <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
// //                     <p>Fetching Trust Engine Data...</p>
// //                   </div>
// //                 ) : selectedProfile && !selectedProfile.error ? (
// //                   <div className="space-y-6">
// //                     {/* Header: Basic Info */}
// //                     <div className="flex items-center gap-6">
// //                       <div className="w-24 h-24 rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/20 text-primary text-3xl font-bold">
// //                         {selectedProfile.github_username?.charAt(0).toUpperCase()}
// //                       </div>
// //                       <div>
// //                         <h4 className="text-2xl font-bold text-white">@{selectedProfile.github_username}</h4>
                        
// //                         {/* Trust Engine Score */}
// //                         {selectedProfile.trust_score !== undefined && (
// //                            <div className="mt-2 inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
// //                              Trust Score: {selectedProfile.trust_score}/100
// //                            </div>
// //                         )}
// //                       </div>
// //                     </div>

// //                     <div className="bg-white/5 border border-white/10 rounded-xl p-5">
// //                       <h5 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-primary">AI Evaluation</h5>
// //                       <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
// //                         {selectedProfile.analysis_summary || "Detailed analysis summary not available."}
// //                       </p>
// //                     </div>

// //                     {/* Stats Grid */}
// //                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
// //                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
// //                         <div className="text-2xl font-bold text-white mb-1">{selectedProfile.total_commits || 0}</div>
// //                         <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Commits</div>
// //                       </div>
// //                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
// //                         <div className="text-2xl font-bold text-white mb-1">{selectedProfile.public_repos || 0}</div>
// //                         <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Repos</div>
// //                       </div>
// //                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
// //                         <div className="text-2xl font-bold text-white mb-1">{selectedProfile.years_active || 0}</div>
// //                         <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Years Active</div>
// //                       </div>
// //                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
// //                         <div className="text-xl font-bold text-white mb-1 truncate">{selectedProfile.top_language || 'N/A'}</div>
// //                         <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Top Lang</div>
// //                       </div>
// //                     </div>

// //                     {/* Extracted Tech Stack */}
// //                     {selectedProfile.tech_stack && selectedProfile.tech_stack.length > 0 && (
// //                       <div>
// //                         <h5 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Detected Technologies</h5>
// //                         <div className="flex flex-wrap gap-2">
// //                           {selectedProfile.tech_stack.map((lang: string) => (
// //                             <span key={lang} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold">
// //                               {lang}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                   </div>
// //                 ) : (
// //                   <div className="py-10 text-center">
// //                     <div className="text-red-400 font-bold mb-2">Analysis Pending</div>
// //                     <p className="text-muted-foreground text-sm">
// //                       The Trust Engine has not yet analyzed @{selectedProfile?.github_username}'s profile, or the data could not be found.
// //                     </p>
// //                   </div>
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
//   ArrowLeft, CheckCircle2, XCircle, Github, Lock, Database, Loader2, Eye,
//   ShieldCheck, Brain, Lightbulb, Code, Users, FolderKanban, Tag, Rocket, BarChart3
// } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';
// import { motion, AnimatePresence } from 'framer-motion';

// const ManageProject = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState<any>(null);
//   const [applications, setApplications] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // GitHub Repo State
//   const [founderRepos, setFounderRepos] = useState<any[]>([]);
//   const [isFetchingRepos, setIsFetchingRepos] = useState(false);

//   // Accept Modal State
//   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
//   const [repoInput, setRepoInput] = useState('');

//   // --- Profile Analysis Modal States ---
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState<any>(null);
//   const [selectedGithubUsername, setSelectedGithubUsername] = useState<string>('');
//   const [isFetchingProfile, setIsFetchingProfile] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       // 1. Fetch Project
//       const { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();
//       setProject(projData);

//       // 2. Fetch Applications
//       const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
//       if (appData) setApplications(appData);

//       // 3. Fetch Founder's Real GitHub Repositories!
//       const { data: { session } } = await supabase.auth.getSession();
//       const ghUsername = session?.user?.user_metadata?.preferred_username || session?.user?.user_metadata?.user_name;
      
//       if (ghUsername) {
//         setIsFetchingRepos(true);
//         try {
//           const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
//           if (res.ok) {
//             const repos = await res.json();
//             setFounderRepos(repos);
//           }
//         } catch (err) {
//           console.error("Failed to fetch GitHub repos", err);
//         } finally {
//           setIsFetchingRepos(false);
//         }
//       }

//       setIsLoading(false);
//     };
//     fetchDetails();
//   }, [id]);

//   const handleReject = async (appId: string) => {
//     const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
//     if (!error) {
//       setApplications(applications.filter(app => app.id !== appId));
//     } else {
//       alert("Failed to reject applicant.");
//     }
//   };

//   const openAcceptModal = (appId: string) => {
//     setSelectedApplicant(appId);
//     setRepoInput(''); // Clear previous input
//     setIsAcceptModalOpen(true);
//   };

//   const openProfileModal = async (githubUsername: string) => {
//     if (!githubUsername) {
//         alert("This applicant hasn't linked a GitHub account.");
//         return;
//     }

//     setSelectedGithubUsername(githubUsername);
//     setIsProfileModalOpen(true);
//     setIsFetchingProfile(true);
//     setSelectedProfile(null);

//     try {
//         // Fetch the custom GitHub analysis JSON data from your database
//         const { data, error } = await supabase
//             .from('github_analysis') 
//             .select('*')
//             .ilike('github_username', githubUsername) // Case-insensitive match
//             .single();

//         if (error) throw error;

//         if (data && data.analysis_data) {
//             setSelectedProfile(data.analysis_data);
//         } else {
//             throw new Error("Analysis data empty.");
//         }
        
//     } catch (err) {
//         console.error("Failed to fetch profile analysis from database:", err);
//         setSelectedProfile({ error: true }); // Sets error state for the modal
//     } finally {
//         setIsFetchingProfile(false);
//     }
//   };

//   const confirmAccept = async () => {
//     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
//     setIsLoading(true);

//     const applicant = applications.find(a => a.id === selectedApplicant);
//     const applicantGithub = applicant?.applicant_github;

//     if (!applicantGithub) {
//         alert("This applicant does not have a GitHub username on file.");
//         setIsLoading(false);
//         return;
//     }

//     // 1. GET THE FOUNDER'S TOKEN
//     const { data: { session } } = await supabase.auth.getSession();
//     const founderToken = session?.provider_token;

//     // 2. SEND THE GITHUB INVITE VIA FLASK
//     if (founderToken) {
//         try {
//             const res = await fetch('http://localhost:5000/api/github/invite', {
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${founderToken}`
//                 },
//                 body: JSON.stringify({
//                     repo: repoInput,
//                     developer_github: applicantGithub
//                 })
//             });
//             const data = await res.json();
//             if (!res.ok) throw new Error(data.error);
//         } catch (err: any) {
//             alert(`Failed to send GitHub invite: ${err.message}`);
//             setIsLoading(false);
//             return; // Stop the hiring process if GitHub fails
//         }
//     }

//     // 3. UPDATE SUPABASE
//     const { error } = await supabase
//       .from('project_applications')
//       .update({ 
//         status: 'accepted',
//         assigned_repo: repoInput
//       })
//       .eq('id', selectedApplicant);

//     if (!error) {
//       setApplications(applications.map(app => 
//         app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app
//       ));
//       setIsAcceptModalOpen(false);
//       setSelectedApplicant(null);
//     } else {
//       alert("Failed to accept applicant.");
//     }
//     setIsLoading(false);
//   };

//   const closeProject = async () => {
//     if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
//     const { error } = await supabase.from('developer_projects').update({ status: 'closed' }).eq('id', id);
//     if (!error) setProject({ ...project, status: 'closed' });
//   };

//   if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></PageLayout>;
//   if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white">Project not found.</div></PageLayout>;

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto">
        
//         <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
//           <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
//         </button>

//         {/* --- PROJECT DETAILS SECTION --- */}
//         <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h1 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h1>
//               <div className="flex gap-2 text-xs">
//                 {project.tech_stack?.map((tech: string) => (
//                   <span key={tech} className="bg-white/10 px-2 py-1 rounded text-muted-foreground">{tech}</span>
//                 ))}
//               </div>
//             </div>
//             {project.status === 'open' ? (
//               <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold">
//                 <Lock className="w-4 h-4" /> Close Project
//               </button>
//             ) : (
//               <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2">
//                 <Lock className="w-4 h-4" /> Project Closed
//               </span>
//             )}
//           </div>
          
//           <div className="mt-6 pt-6 border-t border-white/10">
//             <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
//             <p className="text-muted-foreground whitespace-pre-wrap">{project.task_description}</p>
//           </div>
//         </div>

//         {/* --- APPLICATIONS SECTION --- */}
//         <h2 className="text-2xl font-bold text-white mb-6">Applicants ({applications.length})</h2>
        
//         {applications.length === 0 ? (
//           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">
//             No developers have applied to this project yet.
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {applications.map((app) => (
//               <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
//                     {app.applicant_name.charAt(0)}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-white">{app.applicant_name}</h3>
//                     {app.applicant_github && (
//                       <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
//                         <Github className="w-3 h-3" /> @{app.applicant_github}
//                       </a>
//                     )}
//                     {app.assigned_repo && (
//                       <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
//                         <Database className="w-3 h-3" /> Assigned: {app.assigned_repo}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 w-full md:w-auto">
//                   {app.status === 'pending' ? (
//                     <>
//                       {/* VIEW PROFILE BUTTON */}
//                       <button 
//                         onClick={() => openProfileModal(app.applicant_github)}
//                         className="flex-1 md:flex-none px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-blue-500/20"
//                         title="View GitHub Analysis"
//                       >
//                         <Eye className="w-4 h-4 mr-1"/> View
//                       </button>

//                       {/* ACCEPT BUTTON */}
//                       <button 
//                         onClick={() => openAcceptModal(app.id)} 
//                         className="flex-1 md:flex-none px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-green-500/20"
//                       >
//                         <CheckCircle2 className="w-4 h-4 mr-1"/> Accept
//                       </button>

//                       {/* REJECT BUTTON (Removes from list entirely) */}
//                       <button 
//                         onClick={async () => {
//                           if (confirm("Are you sure you want to reject and remove this applicant?")) {
//                             await handleReject(app.id);
//                           }
//                         }} 
//                         className="flex-1 md:flex-none px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-red-500/20"
//                       >
//                         <XCircle className="w-4 h-4 mr-1"/> Reject
//                       </button>
//                     </>
//                   ) : (
//                     <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
//                       {app.status}
//                     </span>
//                   )}
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}

//         {/* --- ASSIGN REPO MODAL --- */}
//         <AnimatePresence>
//           {isAcceptModalOpen && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
//               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
//                 <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
//                 <p className="text-sm text-muted-foreground mb-6">Select the GitHub repository this developer should work on. They will receive access in their Live Editor.</p>
                
//                 <div className="mb-4">
//                   <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Your Repositories</label>
//                   {isFetchingRepos ? (
//                     <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-muted-foreground flex items-center gap-2">
//                       <Loader2 className="w-4 h-4 animate-spin" /> Fetching GitHub...
//                     </div>
//                   ) : (
//                     <select 
//                       value={repoInput}
//                       onChange={(e) => setRepoInput(e.target.value)}
//                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none cursor-pointer"
//                     >
//                       <option value="" disabled className="bg-slate-900">-- Choose a repository --</option>
//                       {founderRepos.map(repo => (
//                         <option key={repo.id} value={repo.full_name} className="bg-slate-900">
//                           {repo.name} {repo.private ? '(Private)' : ''}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-4 my-4">
//                   <div className="h-px bg-white/10 flex-1"></div>
//                   <div className="text-xs text-muted-foreground font-bold uppercase">OR</div>
//                   <div className="h-px bg-white/10 flex-1"></div>
//                 </div>

//                 <div className="mb-8">
//                   <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Enter Manually (Org / Private Repos)</label>
//                   <input 
//                     type="text" 
//                     value={repoInput}
//                     onChange={(e) => setRepoInput(e.target.value)}
//                     placeholder="e.g., your-username/repo-name" 
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
//                     Cancel
//                   </button>
//                   <button onClick={confirmAccept} className="flex-1 btn-neon py-2 rounded-xl flex items-center justify-center gap-2">
//                     <CheckCircle2 className="w-4 h-4" /> Confirm Hire
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* --- GITHUB PROFILE ANALYSIS MODAL (TRUST ENGINE) --- */}
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
//                   <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
//                     <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
//                     <p>Fetching Trust Engine Data from Database...</p>
//                   </div>
//                 ) : selectedProfile && !selectedProfile.error ? (
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
//                     {/* Left Column: Stats & Trust Score */}
//                     <div className="space-y-6">
//                       <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
//                         <ShieldCheck className="w-12 h-12 text-primary mb-4" />
//                         <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
//                         <div className="text-5xl font-display font-bold text-white mb-2">
//                           {selectedProfile.score || 0}<span className="text-2xl text-muted-foreground">/100</span>
//                         </div>
//                         {selectedProfile.developer_type && (
//                           <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2">
//                             <Code className="w-4 h-4 inline mr-1" /> {selectedProfile.developer_type}
//                           </span>
//                         )}
//                       </div>

//                       {/* Tag / Personality */}
//                       {selectedProfile.tag && (
//                         <div className="glass-card p-6 border-secondary/30">
//                           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
//                             <Tag className="w-5 h-5 text-secondary" /> AI Profile Tag
//                           </h3>
//                           <p className="text-secondary font-bold mb-1">{selectedProfile.tag.tag_name}</p>
//                           <p className="text-sm text-muted-foreground">{selectedProfile.tag.description}</p>
//                         </div>
//                       )}

//                       {/* Hard Stats */}
//                       <div className="glass-card p-6 grid grid-cols-2 gap-4">
//                         <div>
//                           <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div>
//                           <p className="text-2xl font-bold text-white">{selectedProfile.public_repo_count || 0}</p>
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div>
//                           <p className="text-2xl font-bold text-white">{selectedProfile.followers || 0}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Middle & Right Column: AI Text Analysis */}
//                     <div className="md:col-span-2 space-y-6">
//                       <div className="glass-card p-6">
//                         <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
//                           <Brain className="w-6 h-6 text-primary" /> Deep AI Analysis
//                         </h3>
//                         <p className="text-muted-foreground leading-relaxed">
//                           {selectedProfile.detailed_analysis}
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="glass-card p-6">
//                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
//                             <Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas
//                           </h3>
//                           <ul className="space-y-2">
//                             {(selectedProfile.improvement_areas || []).map((item: string, i: number) => (
//                               <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
//                                 <span className="text-primary mt-1">•</span> {item}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <div className="glass-card p-6">
//                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
//                             <BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics
//                           </h3>
//                           <ul className="space-y-2">
//                             {(selectedProfile.diagnostics || []).map((item: string, i: number) => (
//                               <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
//                                 <span className="text-neon-pink mt-1">•</span> {item}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Bottom Row: Project Ideas */}
//                     <div className="md:col-span-3 glass-card p-6">
//                       <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
//                         <Rocket className="w-6 h-6 text-primary" /> AI Suggested Project Ideas
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {selectedProfile.project_ideas && Object.values(selectedProfile.project_ideas).map((idea: any, idx: number) => (
//                           <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-colors">
//                             <h4 className="font-bold text-white mb-2">{idea.title}</h4>
//                             <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p>
//                             <div className="flex flex-wrap gap-2">
//                               {(idea.tech_stack || idea['tech stack'] || []).slice(0,3).map((tech: string, i: number) => (
//                                 <span key={i} className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-md">{tech}</span>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Dynamic Graph Section */}
//                     <div className="md:col-span-3 glass-card p-6">
//                        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
//                         <BarChart3 className="w-6 h-6 text-primary" /> GitHub Activity Graphs
//                       </h3>
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                         <img src={`https://github-readme-stats.vercel.app/api?username=${selectedGithubUsername}&theme=dark&show_icons=true&hide_border=true`} alt="Stats" className="w-full rounded-xl" />
//                         <img src={`https://github-readme-stats.vercel.app/api/top-langs?username=${selectedGithubUsername}&theme=dark&layout=compact&hide_border=true`} alt="Languages" className="w-full rounded-xl" />
//                         <img src={`https://streak-stats.demolab.com?user=${selectedGithubUsername}&theme=dark&hide_border=true&mode=daily`} alt="Daily Streak" className="w-full rounded-xl" />
//                         <img src={`https://streak-stats.demolab.com?user=${selectedGithubUsername}&theme=dark&hide_border=true&mode=weekly`} alt="Weekly Streak" className="w-full rounded-xl" />
//                         <img src={`https://github-profile-trophy.vercel.app/?username=${selectedGithubUsername}&theme=dark&no-frame=true&row=1&column=7`} alt="Trophies" className="w-full rounded-xl lg:col-span-2" />
//                       </div>
//                     </div>

//                   </div>
//                 ) : (
//                   <div className="py-10 text-center">
//                     <div className="text-red-400 font-bold mb-2">Analysis Pending</div>
//                     <p className="text-muted-foreground text-sm">
//                       The Trust Engine has not yet analyzed @{selectedGithubUsername}'s profile, or the data could not be found in the database.
//                     </p>
//                   </div>
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
  ArrowLeft, CheckCircle2, XCircle, Github, Lock, Database, Loader2, Eye,
  ShieldCheck, Brain, Lightbulb, Code, Users, FolderKanban, Tag, Rocket, BarChart3, DollarSign, Gift
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [projectType, setProjectType] = useState<'developer' | 'learner' | null>(null); // Keep track of what table it came from
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // GitHub Repo State
  const [founderRepos, setFounderRepos] = useState<any[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);

  // Accept Modal State
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [repoInput, setRepoInput] = useState('');

  // --- Profile Analysis Modal States ---
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedGithubUsername, setSelectedGithubUsername] = useState<string>('');
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      
      // 1. Try to fetch from Developer Projects FIRST
      let { data: projData, error: devError } = await supabase
        .from('developer_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (projData) {
        setProject(projData);
        setProjectType('developer');
      } else {
        // 2. If not found in Developer Projects, try Learner Tasks!
        const { data: learnerData, error: learnerError } = await supabase
          .from('learner_tasks')
          .select('*')
          .eq('id', id)
          .single();

        if (learnerData) {
          setProject(learnerData);
          setProjectType('learner');
        }
      }

      // 3. Fetch Applications (Both use the exact same applications table)
      const { data: appData } = await supabase
        .from('project_applications')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false });
        
      if (appData) setApplications(appData);

      // 4. Fetch Founder's Real GitHub Repositories
      const { data: { session } } = await supabase.auth.getSession();
      const ghUsername = session?.user?.user_metadata?.preferred_username || session?.user?.user_metadata?.user_name;
      
      if (ghUsername) {
        setIsFetchingRepos(true);
        try {
          const res = await fetch(`https://api.github.com/users/${ghUsername}/repos?sort=updated&per_page=50`);
          if (res.ok) {
            const repos = await res.json();
            setFounderRepos(repos);
          }
        } catch (err) {
          console.error("Failed to fetch GitHub repos", err);
        } finally {
          setIsFetchingRepos(false);
        }
      }

      setIsLoading(false);
    };
    
    if (id) fetchDetails();
  }, [id]);

  const handleReject = async (appId: string) => {
    const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
    if (!error) {
      setApplications(applications.filter(app => app.id !== appId));
    } else {
      alert("Failed to reject applicant.");
    }
  };

  const openAcceptModal = (appId: string) => {
    setSelectedApplicant(appId);
    setRepoInput(''); // Clear previous input
    setIsAcceptModalOpen(true);
  };

  const openProfileModal = async (githubUsername: string) => {
    if (!githubUsername) {
        alert("This applicant hasn't linked a GitHub account.");
        return;
    }

    setSelectedGithubUsername(githubUsername);
    setIsProfileModalOpen(true);
    setIsFetchingProfile(true);
    setSelectedProfile(null);

    try {
        // Fetch the custom GitHub analysis JSON data from your database
        const { data, error } = await supabase
            .from('github_analysis') 
            .select('*')
            .ilike('github_username', githubUsername) // Case-insensitive match
            .single();

        if (error) throw error;

        if (data && data.analysis_data) {
            setSelectedProfile(data.analysis_data);
        } else {
            throw new Error("Analysis data empty.");
        }
        
    } catch (err) {
        console.error("Failed to fetch profile analysis from database:", err);
        setSelectedProfile({ error: true }); // Sets error state for the modal
    } finally {
        setIsFetchingProfile(false);
    }
  };

  const confirmAccept = async () => {
    if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");
    setIsLoading(true);

    const applicant = applications.find(a => a.id === selectedApplicant);
    const applicantGithub = applicant?.applicant_github;

    if (!applicantGithub) {
        alert("This applicant does not have a GitHub username on file.");
        setIsLoading(false);
        return;
    }

    // 1. GET THE FOUNDER'S TOKEN
    const { data: { session } } = await supabase.auth.getSession();
    const founderToken = session?.provider_token;

    // 2. SEND THE GITHUB INVITE VIA FLASK
    if (founderToken) {
        try {
            const res = await fetch('http://localhost:5000/api/github/invite', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${founderToken}`
                },
                body: JSON.stringify({
                    repo: repoInput,
                    developer_github: applicantGithub
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
        } catch (err: any) {
            alert(`Failed to send GitHub invite: ${err.message}`);
            setIsLoading(false);
            return; // Stop the hiring process if GitHub fails
        }
    }

    // 3. UPDATE SUPABASE
    const { error } = await supabase
      .from('project_applications')
      .update({ 
        status: 'accepted',
        assigned_repo: repoInput
      })
      .eq('id', selectedApplicant);

    if (!error) {
      setApplications(applications.map(app => 
        app.id === selectedApplicant ? { ...app, status: 'accepted', assigned_repo: repoInput } : app
      ));
      setIsAcceptModalOpen(false);
      setSelectedApplicant(null);
    } else {
      alert("Failed to accept applicant.");
    }
    setIsLoading(false);
  };

  const closeProject = async () => {
    if(!confirm("Are you sure you want to close this project? No one else will be able to apply.")) return;
    
    // Dynamically close based on which table it came from
    const tableName = projectType === 'developer' ? 'developer_projects' : 'learner_tasks';
    const { error } = await supabase.from(tableName).update({ status: 'closed' }).eq('id', id);
    
    if (!error) setProject({ ...project, status: 'closed' });
  };

  if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></PageLayout>;
  if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white font-bold text-2xl">Project not found.</div></PageLayout>;

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen py-24 px-4 max-w-5xl mx-auto">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </button>

        {/* --- PROJECT DETAILS SECTION --- */}
        <div className="glass-card p-8 mb-8 relative overflow-hidden border border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-display font-bold text-white">{project.title}</h1>
                
                {/* Dynamically show Learner badges if applicable */}
                {projectType === 'learner' && (
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full flex items-center gap-1 ${project.payment_type === 'fees' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {project.payment_type === 'fees' ? <><DollarSign className="w-3 h-3"/> Fee: ${project.fee_amount}</> : <><Gift className="w-3 h-3"/> Free Volunteer</>}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {/* Handle both string-based and array-based tech stacks seamlessly */}
                {(Array.isArray(project.tech_stack) ? project.tech_stack : project.tech_stack?.split(',') || []).map((tech: string, i: number) => (
                  <span key={i} className="bg-white/10 px-2 py-1 rounded text-muted-foreground">{tech.trim()}</span>
                ))}
              </div>
            </div>

            {project.status === 'open' || !project.status ? (
              <button onClick={closeProject} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-bold">
                <Lock className="w-4 h-4" /> Close Project
              </button>
            ) : (
              <span className="px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground rounded-lg text-sm font-bold flex items-center gap-2">
                <Lock className="w-4 h-4" /> Project Closed
              </span>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Detailed Task</h3>
            {/* Fallback to description for learner tasks, task_description for devs */}
            <p className="text-muted-foreground whitespace-pre-wrap">{project.task_description || project.description}</p>
          </div>
        </div>

        {/* --- APPLICATIONS SECTION --- */}
        <h2 className="text-2xl font-bold text-white mb-6">Applicants ({applications.length})</h2>
        
        {applications.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">
            No developers have applied to this project yet.
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
                    {app.applicant_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {app.applicant_name}
                      {/* Show 'PAID' badge for Learner fee tasks */}
                      {app.status === 'paid' && <span className="bg-green-500/20 text-green-400 text-[10px] uppercase px-2 py-0.5 rounded border border-green-500/30">Paid</span>}
                    </h3>
                    {app.applicant_github && (
                      <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                        <Github className="w-3 h-3" /> @{app.applicant_github}
                      </a>
                    )}
                    {app.assigned_repo && (
                      <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                        <Database className="w-3 h-3" /> Assigned: {app.assigned_repo}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  {/* Notice we include 'paid' here so founders can accept paid learners! */}
                  {app.status === 'pending' || app.status === 'paid' ? (
                    <>
                      {/* VIEW PROFILE BUTTON */}
                      <button 
                        onClick={() => openProfileModal(app.applicant_github)}
                        className="flex-1 md:flex-none px-3 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-blue-500/20"
                        title="View GitHub Analysis"
                      >
                        <Eye className="w-4 h-4 mr-1"/> View
                      </button>

                      {/* ACCEPT BUTTON */}
                      <button 
                        onClick={() => openAcceptModal(app.id)} 
                        className="flex-1 md:flex-none px-3 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-green-500/20"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1"/> Accept
                      </button>

                      {/* REJECT BUTTON (Removes from list entirely) */}
                      <button 
                        onClick={async () => {
                          if (confirm("Are you sure you want to reject and remove this applicant?")) {
                            await handleReject(app.id);
                          }
                        }} 
                        className="flex-1 md:flex-none px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center border border-red-500/20"
                      >
                        <XCircle className="w-4 h-4 mr-1"/> Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                      {app.status}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* --- ASSIGN REPO MODAL --- */}
        <AnimatePresence>
          {isAcceptModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAcceptModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass border border-white/20 shadow-2xl rounded-2xl p-6 z-10 bg-[#0f172a]">
                <h3 className="text-xl font-bold text-white mb-2">Assign Repository</h3>
                <p className="text-sm text-muted-foreground mb-6">Select the GitHub repository this developer should work on. They will receive access in their Live Editor.</p>
                
                <div className="mb-4">
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Your Repositories</label>
                  {isFetchingRepos ? (
                    <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-muted-foreground flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Fetching GitHub...
                    </div>
                  ) : (
                    <select 
                      value={repoInput}
                      onChange={(e) => setRepoInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-900">-- Choose a repository --</option>
                      {founderRepos.map(repo => (
                        <option key={repo.id} value={repo.full_name} className="bg-slate-900">
                          {repo.name} {repo.private ? '(Private)' : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <div className="text-xs text-muted-foreground font-bold uppercase">OR</div>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Enter Manually (Org / Private Repos)</label>
                  <input 
                    type="text" 
                    value={repoInput}
                    onChange={(e) => setRepoInput(e.target.value)}
                    placeholder="e.g., your-username/repo-name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setIsAcceptModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button onClick={confirmAccept} className="flex-1 btn-neon py-2 rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Confirm Hire
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- GITHUB PROFILE ANALYSIS MODAL (TRUST ENGINE) --- */}
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
                  <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                    <p>Fetching Trust Engine Data from Database...</p>
                  </div>
                ) : selectedProfile && !selectedProfile.error ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Left Column: Stats & Trust Score */}
                    <div className="space-y-6">
                      <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                        <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                        <h2 className="text-lg text-muted-foreground mb-2">Profile Score</h2>
                        <div className="text-5xl font-display font-bold text-white mb-2">
                          {selectedProfile.score || 0}<span className="text-2xl text-muted-foreground">/100</span>
                        </div>
                        {selectedProfile.developer_type && (
                          <span className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mt-2">
                            <Code className="w-4 h-4 inline mr-1" /> {selectedProfile.developer_type}
                          </span>
                        )}
                      </div>

                      {/* Tag / Personality */}
                      {selectedProfile.tag && (
                        <div className="glass-card p-6 border-secondary/30">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-secondary" /> AI Profile Tag
                          </h3>
                          <p className="text-secondary font-bold mb-1">{selectedProfile.tag.tag_name}</p>
                          <p className="text-sm text-muted-foreground">{selectedProfile.tag.description}</p>
                        </div>
                      )}

                      {/* Hard Stats */}
                      <div className="glass-card p-6 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><FolderKanban className="w-4 h-4 text-blue-400" /> Repos</div>
                          <p className="text-2xl font-bold text-white">{selectedProfile.public_repo_count || 0}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-1 text-sm"><Users className="w-4 h-4 text-green-400" /> Followers</div>
                          <p className="text-2xl font-bold text-white">{selectedProfile.followers || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Middle & Right Column: AI Text Analysis */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="glass-card p-6">
                        <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                          <Brain className="w-6 h-6 text-primary" /> Deep AI Analysis
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedProfile.detailed_analysis}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-400" /> Improvement Areas
                          </h3>
                          <ul className="space-y-2">
                            {(selectedProfile.improvement_areas || []).map((item: string, i: number) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="glass-card p-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-neon-pink" /> Diagnostics
                          </h3>
                          <ul className="space-y-2">
                            {(selectedProfile.diagnostics || []).map((item: string, i: number) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-neon-pink mt-1">•</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Project Ideas */}
                    <div className="md:col-span-3 glass-card p-6">
                      <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                        <Rocket className="w-6 h-6 text-primary" /> AI Suggested Project Ideas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedProfile.project_ideas && Object.values(selectedProfile.project_ideas).map((idea: any, idx: number) => (
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
                    </div>

                    {/* Dynamic Graph Section */}
                    <div className="md:col-span-3 glass-card p-6">
                       <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-primary" /> GitHub Activity Graphs
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <img src={`https://github-readme-stats.vercel.app/api?username=${selectedGithubUsername}&theme=dark&show_icons=true&hide_border=true`} alt="Stats" className="w-full rounded-xl" />
                        <img src={`https://github-readme-stats.vercel.app/api/top-langs?username=${selectedGithubUsername}&theme=dark&layout=compact&hide_border=true`} alt="Languages" className="w-full rounded-xl" />
                        <img src={`https://streak-stats.demolab.com?user=${selectedGithubUsername}&theme=dark&hide_border=true&mode=daily`} alt="Daily Streak" className="w-full rounded-xl" />
                        <img src={`https://streak-stats.demolab.com?user=${selectedGithubUsername}&theme=dark&hide_border=true&mode=weekly`} alt="Weekly Streak" className="w-full rounded-xl" />
                        <img src={`https://github-profile-trophy.vercel.app/?username=${selectedGithubUsername}&theme=dark&no-frame=true&row=1&column=7`} alt="Trophies" className="w-full rounded-xl lg:col-span-2" />
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <div className="text-red-400 font-bold mb-2">Analysis Pending</div>
                    <p className="text-muted-foreground text-sm">
                      The Trust Engine has not yet analyzed @{selectedGithubUsername}'s profile, or the data could not be found in the database.
                    </p>
                  </div>
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