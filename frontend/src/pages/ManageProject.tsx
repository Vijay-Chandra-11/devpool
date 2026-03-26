// // import { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { ArrowLeft, CheckCircle2, XCircle, Github, Lock } from 'lucide-react';
// // import PageLayout from '@/components/layout/PageLayout';
// // import { supabase } from '@/lib/supabase';

// // const ManageProject = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [project, setProject] = useState<any>(null);
// //   const [applications, setApplications] = useState<any[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       // Fetch Project
// //       const { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();
// //       setProject(projData);

// //       // Fetch Applications
// //       const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
// //       if (appData) setApplications(appData);

// //       setIsLoading(false);
// //     };
// //     fetchDetails();
// //   }, [id]);

// //   const updateApplicationStatus = async (appId: string, newStatus: string) => {
// //     const { error } = await supabase.from('project_applications').update({ status: newStatus }).eq('id', appId);
// //     if (!error) {
// //       setApplications(applications.map(app => app.id === appId ? { ...app, status: newStatus } : app));
// //     }
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

// //         {/* Project Header */}
// //         <div className="glass-card p-8 mb-8 relative overflow-hidden">
// //           <div className="flex justify-between items-start mb-4">
// //             <h1 className="text-3xl font-display font-bold text-white">{project.title}</h1>
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
// //           <p className="text-muted-foreground">{project.summary}</p>
// //         </div>

// //         {/* Applications List */}
// //         <h2 className="text-2xl font-bold text-white mb-6">Applicants ({applications.length})</h2>
        
// //         {applications.length === 0 ? (
// //           <div className="glass-card p-12 text-center text-muted-foreground border-dashed border-2 border-white/10">
// //             No developers have applied to this project yet.
// //           </div>
// //         ) : (
// //           <div className="space-y-4">
// //             {applications.map((app) => (
// //               <div key={app.id} className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                
// //                 <div className="flex items-center gap-4">
// //                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
// //                     {app.applicant_name.charAt(0)}
// //                   </div>
// //                   <div>
// //                     <h3 className="text-lg font-bold text-white">{app.applicant_name}</h3>
// //                     {app.applicant_github && (
// //                       <a href={`https://github.com/${app.applicant_github}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
// //                         <Github className="w-3 h-3" /> @{app.applicant_github}
// //                       </a>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3 w-full sm:w-auto">
// //                   {app.status === 'pending' ? (
// //                     <>
// //                       <button onClick={() => updateApplicationStatus(app.id, 'accepted')} className="flex-1 sm:flex-none px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
// //                         <CheckCircle2 className="w-4 h-4" /> Accept
// //                       </button>
// //                       <button onClick={() => updateApplicationStatus(app.id, 'rejected')} className="flex-1 sm:flex-none px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
// //                         <XCircle className="w-4 h-4" /> Reject
// //                       </button>
// //                     </>
// //                   ) : (
// //                     <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${app.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
// //                       {app.status}
// //                     </span>
// //                   )}
// //                 </div>

// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </PageLayout>
// //   );
// // };

// // export default ManageProject;







// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, CheckCircle2, XCircle, Github, Lock, Database, Loader2 } from 'lucide-react';
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

//   // Modal State
//   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
//   const [repoInput, setRepoInput] = useState('');

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
//           // Fetch the 50 most recently updated public repos for this user
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
//     if (!error) setApplications(applications.map(app => app.id === appId ? { ...app, status: 'rejected' } : app));
//   };

//   const openAcceptModal = (appId: string) => {
//     setSelectedApplicant(appId);
//     setRepoInput(''); // Clear previous input
//     setIsAcceptModalOpen(true);
//   };

//   const confirmAccept = async () => {
//     if (!selectedApplicant || !repoInput) return alert("Please select or enter a GitHub repository!");

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

//                 <div className="flex items-center gap-3 w-full md:w-auto">
//                   {app.status === 'pending' ? (
//                     <>
//                       <button onClick={() => openAcceptModal(app.id)} className="flex-1 md:flex-none px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-green-500/20">
//                         <CheckCircle2 className="w-4 h-4" /> Accept
//                       </button>
//                       <button onClick={() => handleReject(app.id)} className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-red-500/20">
//                         <XCircle className="w-4 h-4" /> Reject
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
                
//                 {/* 1. GitHub Fetch Dropdown */}
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

//                 {/* 2. Manual Fallback Input */}
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

//                 {/* Actions */}
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

//       </div>
//     </PageLayout>
//   );
// };

// export default ManageProject;





import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Github, Lock, Database, Loader2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // GitHub Repo State
  const [founderRepos, setFounderRepos] = useState<any[]>([]);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);

  // Modal State
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [repoInput, setRepoInput] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      // 1. Fetch Project
      const { data: projData } = await supabase.from('developer_projects').select('*').eq('id', id).single();
      setProject(projData);

      // 2. Fetch Applications
      const { data: appData } = await supabase.from('project_applications').select('*').eq('project_id', id).order('created_at', { ascending: false });
      if (appData) setApplications(appData);

      // 3. Fetch Founder's Real GitHub Repositories!
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
    fetchDetails();
  }, [id]);

  const handleReject = async (appId: string) => {
    const { error } = await supabase.from('project_applications').update({ status: 'rejected' }).eq('id', appId);
    if (!error) setApplications(applications.map(app => app.id === appId ? { ...app, status: 'rejected' } : app));
  };

  const openAcceptModal = (appId: string) => {
    setSelectedApplicant(appId);
    setRepoInput(''); // Clear previous input
    setIsAcceptModalOpen(true);
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
    const { error } = await supabase.from('developer_projects').update({ status: 'closed' }).eq('id', id);
    if (!error) setProject({ ...project, status: 'closed' });
  };

  if (isLoading) return <PageLayout showFooter={false}><div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div></PageLayout>;
  if (!project) return <PageLayout showFooter={false}><div className="text-center py-20 text-white">Project not found.</div></PageLayout>;

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
              <h1 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h1>
              <div className="flex gap-2 text-xs">
                {project.tech_stack?.map((tech: string) => (
                  <span key={tech} className="bg-white/10 px-2 py-1 rounded text-muted-foreground">{tech}</span>
                ))}
              </div>
            </div>
            {project.status === 'open' ? (
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
            <p className="text-muted-foreground whitespace-pre-wrap">{project.task_description}</p>
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
                    <h3 className="text-lg font-bold text-white">{app.applicant_name}</h3>
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

                <div className="flex items-center gap-3 w-full md:w-auto">
                  {app.status === 'pending' ? (
                    <>
                      <button onClick={() => openAcceptModal(app.id)} className="flex-1 md:flex-none px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-green-500/20">
                        <CheckCircle2 className="w-4 h-4" /> Accept
                      </button>
                      <button onClick={() => handleReject(app.id)} className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-red-500/20">
                        <XCircle className="w-4 h-4" /> Reject
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

      </div>
    </PageLayout>
  );
};

export default ManageProject;