// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FolderKanban, 
//   TrendingUp,
//   Briefcase,
//   LogOut,
//   Camera,
//   Github,
//   Mail,
//   ExternalLink,
//   Linkedin,
//   Globe,
//   PlusCircle,
//   Activity,
//   Brain
// } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';

// // Simplified stats for Founders
// const stats = [
//   { label: 'Active Projects', value: '2', change: '+1', icon: FolderKanban, trend: 'up' },
//   { label: 'Total Projects', value: '5', change: '+2', icon: FolderKanban, trend: 'up' },
// ];

// const FounderDashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       const currentUser = session?.user ?? null;
//       setUser(currentUser);
//       setLoading(false);

//       // --- ROLE BASED REDIRECTION ---
//       if (currentUser?.user_metadata?.role === 'learner') {
//         navigate('/dashboard');
//       }
//     });
//   }, [navigate]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate('/');
//   };

//   // --- PROFILE IMAGE UPLOAD ---
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploadingImage(true);
//     const reader = new FileReader();
    
//     reader.onloadend = async () => {
//       const base64Image = reader.result as string;
      
//       const { data, error } = await supabase.auth.updateUser({
//         data: { avatar_url: base64Image }
//       });

//       if (!error && data.user) {
//         setUser(data.user);
//       }
//       setUploadingImage(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   if (loading) {
//     return (
//       <PageLayout showFooter={false}>
//         <div className="min-h-screen flex items-center justify-center">
//           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
//         </div>
//       </PageLayout>
//     );
//   }

//   // --- FOUNDER PENDING APPROVAL LOCK SCREEN ---
//   if (user?.user_metadata?.role === 'pending_founder') {
//     return (
//       <PageLayout showFooter={false}>
//         <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-center px-4 relative">
//           <div className="absolute inset-0 radial-overlay pointer-events-none" />
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md glass-card p-10 rounded-3xl relative z-10 border border-white/10 shadow-2xl">
//             <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Briefcase className="w-10 h-10 text-primary" />
//             </div>
//             <h2 className="text-3xl font-display font-bold text-white mb-4">Account Pending</h2>
//             <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
//               Thank you for applying as a Founder! Our team is currently reviewing your LinkedIn and company website to verify your startup. We will grant you access to the DevPool talent network shortly.
//             </p>
//             <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-red-400 transition-colors">
//               <LogOut className="w-4 h-4" /> Sign out
//             </button>
//           </motion.div>
//         </div>
//       </PageLayout>
//     );
//   }

//   // --- USER DATA EXTRACTION ---
//   const displayName = user?.user_metadata?.full_name || 'Founder';
//   const githubUsername = user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || 'GitHub Linked';
//   const githubLink = `https://github.com/${githubUsername}`;
  
//   const linkedinUrl = user?.user_metadata?.linkedin_url || '#';
//   const websiteUrl = user?.user_metadata?.company_website || '#';
  
//   const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&rounded=true&bold=true`;
//   const profileImage = user?.user_metadata?.avatar_url || defaultAvatar;

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen flex">
        
//         {/* === LEFT SIDEBAR (1/4 Width Profile Section) === */}
//         <motion.aside
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="hidden lg:flex flex-col w-1/4 min-w-[300px] max-w-[350px] glass border-r border-white/5 relative"
//         >
//           <div className="p-8 flex-1 flex flex-col items-center">

//             {/* Profile Picture with Upload */}
//             <div className="relative mb-6 group">
//               <img 
//                 src={profileImage} 
//                 alt="Profile" 
//                 className={`w-32 h-32 rounded-full border-4 border-[#1e293b] shadow-2xl object-cover transition-opacity ${uploadingImage ? 'opacity-50' : 'opacity-100'}`}
//               />
//               <label className="absolute bottom-0 right-0 p-3 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-transform transform hover:scale-105 shadow-lg border-2 border-[#0f172a]">
//                 <Camera className="w-5 h-5 text-primary-foreground" />
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   className="hidden" 
//                   onChange={handleImageUpload} 
//                   disabled={uploadingImage} 
//                 />
//               </label>
//             </div>

//             {/* User Info */}
//             <h2 className="text-2xl font-bold text-white mb-1 text-center">{displayName}</h2>
//             <p className="text-sm font-medium text-primary mb-6">Verified Founder</p>
            
//             <div className="w-full space-y-3 mt-2">
//               <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
//                 <Mail className="w-5 h-5 text-primary shrink-0" />
//                 <span className="text-sm truncate" title={user?.email}>{user?.email}</span>
//               </div>
              
//               <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
//                 <div className="flex items-center gap-3 truncate">
//                   <Github className="w-5 h-5 text-primary shrink-0" />
//                   <span className="text-sm truncate group-hover:text-white transition-colors">{githubUsername}</span>
//                 </div>
//                 <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
//               </a>

//               <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
//                 <div className="flex items-center gap-3 truncate">
//                   <Linkedin className="w-5 h-5 text-primary shrink-0" />
//                   <span className="text-sm truncate group-hover:text-white transition-colors">LinkedIn Profile</span>
//                 </div>
//                 <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
//               </a>

//               <a href={websiteUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
//                 <div className="flex items-center gap-3 truncate">
//                   <Globe className="w-5 h-5 text-primary shrink-0" />
//                   <span className="text-sm truncate group-hover:text-white transition-colors">Company Website</span>
//                 </div>
//                 <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
//               </a>
//             </div>

//             {/* Bottom Button - Updated to GitHub Analysis */}
//             <div className="mt-auto w-full pt-8">
//               <button 
//                 onClick={() => navigate('/github-analysis')} 
//                 className="w-full btn-neon flex items-center justify-center gap-2"
//               >
//                 <Activity className="w-5 h-5" />
//                 <span>GitHub Analysis</span>
//               </button>
//             </div>

//           </div>
//         </motion.aside>

//         {/* === RIGHT SIDE (Main Content) === */}
//         <div className="flex-1 flex flex-col p-8 lg:p-10 overflow-auto">
          
//           {/* Header with Post Button */}
//           <motion.header
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8 flex items-center justify-between gap-4"
//           >
//             <div>
//               <h1 className="text-3xl font-display font-bold text-white mb-2">Founder Dashboard</h1>
//               <p className="text-muted-foreground">Welcome back, {displayName.split(' ')[0]}! Ready to build your team?</p>
//             </div>
            
//             {/* Relocated Post Button */}
//             <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2">
//               <PlusCircle className="w-5 h-5" />
//               <span>Post New Project</span>
//             </button>
//           </motion.header>

//           <main className="flex-1">
//             {/* Stats Grid (Exactly 2 items) */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="glass-card group p-6"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:neon-glow transition-all">
//                       <stat.icon className="w-6 h-6 text-primary" />
//                     </div>
//                     <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
//                       <TrendingUp className="w-4 h-4" />
//                       <span>{stat.change}</span>
//                     </div>
//                   </div>
//                   <p className="text-3xl font-display font-bold mb-1 text-white">{stat.value}</p>
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Project Split View */}
//             <div className="grid lg:grid-cols-2 gap-6">
              
//               {/* Developing Projects (Left Half) */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="glass-card p-6 min-h-[400px] flex flex-col"
//               >
//                 <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
//                   <h2 className="text-xl font-display font-bold text-white">Developing Projects</h2>
//                   <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">For Developers</span>
//                 </div>
                
//                 {/* Empty State Placeholder */}
//                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
//                   <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
//                     <FolderKanban className="w-8 h-8 text-muted-foreground" />
//                   </div>
//                   <p className="text-muted-foreground font-medium mb-1">No developing projects yet</p>
//                   <p className="text-xs text-muted-foreground max-w-[250px]">Projects you post for developers to build will appear here.</p>
//                 </div>
//               </motion.div>

//               {/* Learning Projects (Right Half) */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="glass-card p-6 min-h-[400px] flex flex-col"
//               >
//                 <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
//                   <h2 className="text-xl font-display font-bold text-white">Learning Projects</h2>
//                   <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">For Learners</span>
//                 </div>

//                 {/* Empty State Placeholder */}
//                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
//                   <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
//                     <Brain className="w-8 h-8 text-muted-foreground" />
//                   </div>
//                   <p className="text-muted-foreground font-medium mb-1">No learning projects yet</p>
//                   <p className="text-xs text-muted-foreground max-w-[250px]">Beginner-friendly projects you post for learners will appear here.</p>
//                 </div>
//               </motion.div>
//             </div>

//           </main>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default FounderDashboard;






import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  TrendingUp,
  Briefcase,
  LogOut,
  Camera,
  Github,
  Mail,
  ExternalLink,
  Linkedin,
  Globe,
  PlusCircle,
  Activity,
  Brain,
  Settings,
  Terminal
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

// Simplified stats for Founders
const stats = [
  { label: 'Active Projects', value: '2', change: '+1', icon: FolderKanban, trend: 'up' },
  { label: 'Total Projects', value: '5', change: '+2', icon: FolderKanban, trend: 'up' },
];

const FounderDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  // --- NEW: State for Recent Projects ---
  const [recentDevProjects, setRecentDevProjects] = useState<any[]>([]);
  const [recentLearnerProjects, setRecentLearnerProjects] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // --- ROLE BASED REDIRECTION ---
      if (currentUser?.user_metadata?.role === 'learner') {
        navigate('/dashboard');
        return; // Stop execution if redirecting
      }

      if (currentUser) {
        fetchRecentProjects(currentUser.id);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  // --- NEW: Fetch Top 3 Recent Projects ---
  const fetchRecentProjects = async (userId: string) => {
    try {
      // Fetch Developer Projects
      const { data: devData } = await supabase
        .from('developer_projects')
        .select('*')
        .eq('founder_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (devData) setRecentDevProjects(devData);

      // Fetch Learner Projects
      const { data: learnerData } = await supabase
        .from('learner_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (learnerData) setRecentLearnerProjects(learnerData);

    } catch (err) {
      console.error("Error fetching recent projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // --- PROFILE IMAGE UPLOAD ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      
      const { data, error } = await supabase.auth.updateUser({
        data: { avatar_url: base64Image }
      });

      if (!error && data.user) {
        setUser(data.user);
      }
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <PageLayout showFooter={false}>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </PageLayout>
    );
  }

  // --- FOUNDER PENDING APPROVAL LOCK SCREEN ---
  if (user?.user_metadata?.role === 'pending_founder') {
    return (
      <PageLayout showFooter={false}>
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-center px-4 relative">
          <div className="absolute inset-0 radial-overlay pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md glass-card p-10 rounded-3xl relative z-10 border border-white/10 shadow-2xl">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Account Pending</h2>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Thank you for applying as a Founder! Our team is currently reviewing your LinkedIn and company website to verify your startup. We will grant you access to the DevPool talent network shortly.
            </p>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  // --- USER DATA EXTRACTION ---
  const displayName = user?.user_metadata?.full_name || 'Founder';
  const githubUsername = user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || 'GitHub Linked';
  const githubLink = `https://github.com/${githubUsername}`;
  
  const linkedinUrl = user?.user_metadata?.linkedin_url || '#';
  const websiteUrl = user?.user_metadata?.company_website || '#';
  
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&rounded=true&bold=true`;
  const profileImage = user?.user_metadata?.avatar_url || defaultAvatar;

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen flex">
        
        {/* === LEFT SIDEBAR (1/4 Width Profile Section) === */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col w-1/4 min-w-[300px] max-w-[350px] glass border-r border-white/5 relative z-10"
        >
          <div className="p-8 flex-1 flex flex-col items-center">

            {/* Profile Picture with Upload */}
            <div className="relative mb-6 group">
              <img 
                src={profileImage} 
                alt="Profile" 
                className={`w-32 h-32 rounded-full border-4 border-[#1e293b] shadow-2xl object-cover transition-opacity ${uploadingImage ? 'opacity-50' : 'opacity-100'}`}
              />
              <label className="absolute bottom-0 right-0 p-3 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-transform transform hover:scale-105 shadow-lg border-2 border-[#0f172a]">
                <Camera className="w-5 h-5 text-primary-foreground" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                  disabled={uploadingImage} 
                />
              </label>
            </div>

            {/* User Info */}
            <h2 className="text-2xl font-bold text-white mb-1 text-center">{displayName}</h2>
            <p className="text-sm font-medium text-primary mb-6">Verified Founder</p>
            
            <div className="w-full space-y-3 mt-2">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm truncate" title={user?.email}>{user?.email}</span>
              </div>
              
              <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3 truncate">
                  <Github className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm truncate group-hover:text-white transition-colors">{githubUsername}</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
              </a>

              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3 truncate">
                  <Linkedin className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm truncate group-hover:text-white transition-colors">LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
              </a>

              <a href={websiteUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3 truncate">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm truncate group-hover:text-white transition-colors">Company Website</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
              </a>
            </div>

            {/* Bottom Button - GitHub Analysis */}
            <div className="mt-auto w-full pt-8">
              <button 
                onClick={() => navigate('/github-analysis')} 
                className="w-full btn-neon flex items-center justify-center gap-2"
              >
                <Activity className="w-5 h-5" />
                <span>GitHub Analysis</span>
              </button>
            </div>

          </div>
        </motion.aside>

        {/* === RIGHT SIDE (Main Content) === */}
        <div className="flex-1 flex flex-col p-8 lg:p-10 overflow-auto relative z-10">
          
          {/* Header with Post Button */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Founder Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {displayName.split(' ')[0]}! Ready to build your team?</p>
            </div>
            
            <button onClick={() => navigate('/post-project')} className="btn-neon flex items-center justify-center gap-2">
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Post New Project</span>
              <span className="sm:hidden">Post</span>
            </button>
          </motion.header>

          <main className="flex-1">
            {/* Stats Grid (Exactly 2 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card group p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:neon-glow transition-all">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-display font-bold mb-1 text-white">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Project Split View */}
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* --- DEVELOPING PROJECTS (Left Half) --- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 min-h-[400px] flex flex-col border border-primary/20"
              >
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" /> Developing Projects
                  </h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">For Developers</span>
                </div>
                
                {recentDevProjects.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <FolderKanban className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">No developing projects yet</p>
                    <p className="text-xs text-muted-foreground max-w-[250px]">Projects you post for developers to build will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    {recentDevProjects.map(project => (
                      <div key={project.id} className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white truncate max-w-[70%]">{project.title}</h3>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${project.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {project.status || 'open'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.summary}</p>
                        <button 
                          onClick={() => navigate(`/manage-project/${project.id}`)}
                          className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Settings className="w-4 h-4" /> Manage Applicants
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {recentDevProjects.length > 0 && (
                  <button onClick={() => navigate('/developer-projects')} className="w-full mt-4 py-3 text-sm text-muted-foreground hover:text-white transition-colors border-t border-white/5 pt-4">
                    View all developer projects &rarr;
                  </button>
                )}
              </motion.div>

              {/* --- LEARNING PROJECTS (Right Half) --- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 min-h-[400px] flex flex-col border border-secondary/20"
              >
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-secondary" /> Learning Projects
                  </h2>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full border border-secondary/20">For Learners</span>
                </div>

                {recentLearnerProjects.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <Brain className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">No learning projects yet</p>
                    <p className="text-xs text-muted-foreground max-w-[250px]">Beginner-friendly projects you post for learners will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    {recentLearnerProjects.map(project => (
                      <div key={project.id} className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-secondary/50 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white truncate max-w-[70%]">{project.title}</h3>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${project.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {project.status || 'open'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.summary}</p>
                        <button 
                          onClick={() => navigate(`/manage-project/${project.id}`)}
                          className="w-full py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Settings className="w-4 h-4" /> Manage Applicants
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {recentLearnerProjects.length > 0 && (
                  <button onClick={() => navigate('/learner-projects')} className="w-full mt-4 py-3 text-sm text-muted-foreground hover:text-white transition-colors border-t border-white/5 pt-4">
                    View all learner projects &rarr;
                  </button>
                )}
              </motion.div>
            </div>

          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default FounderDashboard;