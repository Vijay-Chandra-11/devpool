// import { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FolderKanban, 
//   Brain, 
//   TrendingUp,
//   Clock,
//   Briefcase,
//   LogOut,
//   Camera,
//   Github,
//   Mail,
//   ExternalLink,
//   Activity
// } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';
// import { useMode } from '@/context/ModeContext';

// const Dashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const navigate = useNavigate();
//   const { mode } = useMode();

//   // --- DYNAMIC DATA STATES ---
//   const [totalProjects, setTotalProjects] = useState(0);
//   const [activeProjects, setActiveProjects] = useState(0);
//   const [avgFocusScore, setAvgFocusScore] = useState(0);
//   const [recentlyWorked, setRecentlyWorked] = useState<any[]>([]);
//   const [chartData, setChartData] = useState<{ day: string; score: number }[]>([]);

//   // Wrap fetch logic in useCallback so we can safely use it inside Realtime listeners
//   const fetchDashboardData = useCallback(async (userId: string) => {
//     // 1. Fetch Projects Data
//     const { data: apps, error: appsError } = await supabase
//       .from('project_applications')
//       .select(`id, status, created_at, project:developer_projects(title)`)
//       .eq('applicant_id', userId);

//     if (!appsError && apps) {
//       setTotalProjects(apps.length);
//       const active = apps.filter(app => app.status === 'accepted');
//       setActiveProjects(active.length);

//       // Format top 3 recent active projects
//       const recent = active
//         .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
//         .slice(0, 3)
//         .map((app: any) => {
//           // Fix: Supabase joins sometimes return arrays depending on the foreign key!
//           const projectData = Array.isArray(app.project) ? app.project[0] : app.project;

//           return {
//             name: projectData?.title || 'Unknown Project',
//             time: new Date(app.created_at).toLocaleDateString(),
//             status: 'In Progress'
//           };
//         });
//       setRecentlyWorked(recent);
//     }

//     // 2. Fetch Focus Sessions (Last 7 Days)
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const dateString = sevenDaysAgo.toISOString().split('T')[0]; // YYYY-MM-DD

//     const { data: sessions, error: sessionsError } = await supabase
//       .from('focus_sessions')
//       .select('*')
//       .eq('user_id', userId)
//       .eq('mode', mode) // <-- THIS SEPARATES DEVELOPER VS LEARNER MATH!
//       .gte('session_date', dateString);

//     if (!sessionsError && sessions) {
//       // Calculate overall average focus score for the current mode
//       if (sessions.length > 0) {
//         const totalScore = sessions.reduce((acc, curr) => acc + curr.average_score, 0);
//         setAvgFocusScore(Math.round(totalScore / sessions.length));
//       } else {
//         setAvgFocusScore(0);
//       }

//       // Group scores by Day using robust timezone parsing
//       const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//       const chartMap = new Map();
      
//       sessions.forEach(session => {
//         // Split date to avoid UTC shifting bugs
//         const [year, month, day] = session.session_date.split('-');
//         const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
//         const dayName = days[date.getDay()];
        
//         if (chartMap.has(dayName)) {
//             const existing = chartMap.get(dayName);
//             existing.total += session.average_score;
//             existing.count += 1;
//         } else {
//             chartMap.set(dayName, { total: session.average_score, count: 1 });
//         }
//       });

//       // Create a solid 7-day array ending on TODAY
//       const finalChartData = [];
//       for (let i = 6; i >= 0; i--) {
//           const d = new Date();
//           d.setDate(d.getDate() - i);
//           const dayName = days[d.getDay()];
          
//           if (chartMap.has(dayName)) {
//               const data = chartMap.get(dayName);
//               finalChartData.push({ day: dayName, score: Math.round(data.total / data.count) });
//           } else {
//               finalChartData.push({ day: dayName, score: 0 }); // 0 score if they didn't code
//           }
//       }
//       setChartData(finalChartData);
//     }
//   }, [mode]);

//   useEffect(() => {
//     const initDashboard = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       const currentUser = session?.user ?? null;
//       setUser(currentUser);

//       if (currentUser?.user_metadata?.role === 'founder') {
//         navigate('/founder-dashboard');
//         return;
//       }

//       if (currentUser) {
//         await fetchDashboardData(currentUser.id);
//       }
//       setLoading(false);
//     };

//     initDashboard();
//   }, [navigate, fetchDashboardData]);

//   // --- NEW: REALTIME DATABASE SUBSCRIPTION ---
//   // This automatically re-runs the math and updates the graphs the second the Live Editor is closed!
//   useEffect(() => {
//     if (!user) return;

//     const channel = supabase.channel('realtime_dashboard')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'focus_sessions', filter: `user_id=eq.${user.id}` }, 
//         () => {
//           console.log("Focus Session updated! Refreshing graph dynamically...");
//           fetchDashboardData(user.id);
//         }
//       )
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'project_applications', filter: `applicant_id=eq.${user.id}` }, 
//         () => {
//           console.log("Projects updated! Refreshing counts dynamically...");
//           fetchDashboardData(user.id);
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [user, fetchDashboardData]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate('/');
//   };

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

//       if (!error && data.user) setUser(data.user); 
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
//               Thank you for applying as a Founder! Our team is currently reviewing your LinkedIn and company website to verify your startup.
//             </p>
//             <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-red-400 transition-colors">
//               <LogOut className="w-4 h-4" /> Sign out
//             </button>
//           </motion.div>
//         </div>
//       </PageLayout>
//     );
//   }

//   const displayName = user?.user_metadata?.full_name || 'Developer';
//   const githubUsername = user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || 'GitHub Linked';
//   const githubLink = `https://github.com/${githubUsername}`;
//   const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&rounded=true&bold=true`;
//   const profileImage = user?.user_metadata?.avatar_url || defaultAvatar;

//   const stats = [
//     { label: 'Active Projects', value: activeProjects.toString(), change: 'Current', icon: FolderKanban, trend: 'up' },
//     { label: 'Total Projects', value: totalProjects.toString(), change: 'Lifetime', icon: FolderKanban, trend: 'up' },
//     { label: `${mode === 'developer' ? 'Developer' : 'Learner'} Focus`, value: `${avgFocusScore}%`, change: 'Last 7 Days', icon: Brain, trend: 'up' },
//   ];

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen flex">
        
//         {/* === LEFT SIDEBAR === */}
//         <motion.aside
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="hidden lg:flex flex-col w-1/4 min-w-[300px] max-w-[350px] glass border-r border-white/5 relative"
//         >
//           <div className="p-8 flex-1 flex flex-col items-center">
//             <div className="relative mb-6 group">
//               <img 
//                 src={profileImage} 
//                 alt="Profile" 
//                 className={`w-32 h-32 rounded-full border-4 border-[#1e293b] shadow-2xl object-cover transition-opacity ${uploadingImage ? 'opacity-50' : 'opacity-100'}`}
//               />
//               <label className="absolute bottom-0 right-0 p-3 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-transform transform hover:scale-105 shadow-lg border-2 border-[#0f172a]">
//                 <Camera className="w-5 h-5 text-primary-foreground" />
//                 <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//               </label>
//             </div>

//             <h2 className="text-2xl font-bold text-white mb-2 text-center">{displayName}</h2>
//             <div className="w-full space-y-4 mt-6">
//               <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
//                 <Mail className="w-5 h-5 text-primary" />
//                 <span className="text-sm truncate" title={user?.email}>{user?.email}</span>
//               </div>
              
//               <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
//                 <div className="flex items-center gap-3 truncate">
//                   <Github className="w-5 h-5 text-primary" />
//                   <span className="text-sm truncate group-hover:text-white transition-colors">{githubUsername}</span>
//                 </div>
//                 <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
//               </a>
//             </div>

//             <div className="mt-auto w-full pt-8">
//               <button onClick={() => navigate('/github-analysis')} className="w-full btn-neon flex items-center justify-center gap-2">
//                 <Activity className="w-5 h-5" />
//                 <span>GitHub Analysis</span>
//               </button>
//             </div>
//           </div>
//         </motion.aside>

//         {/* === RIGHT SIDE === */}
//         <div className="flex-1 flex flex-col p-8 lg:p-10 overflow-auto">
//           <motion.header
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             <h1 className="text-3xl font-display font-bold text-white mb-2">{mode === 'developer' ? 'Developer' : 'Learner'} Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back, {displayName}!</p>
//           </motion.header>

//           <main className="flex-1">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
//                       <span className="text-xs">{stat.change}</span>
//                     </div>
//                   </div>
//                   <p className="text-3xl font-display font-bold mb-1 text-white">{stat.value}</p>
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Productivity Overview */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="lg:col-span-2 glass-card p-6"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg font-display font-semibold text-white">Focus Overview</h2>
//                   <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 uppercase tracking-wider">
//                     {mode} Mode
//                   </span>
//                 </div>
                
//                 <div className="h-64 flex items-end justify-between gap-2 px-4 mt-8">
//                   {chartData.length > 0 ? chartData.map((data, i) => (
                    
//                     /* FIX: Added h-full and justify-end here so the bar renders from the bottom up! */
//                     <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-3">
                      
//                       <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: `${Math.max(8, data.score)}%` }} // Minimum 8% height so empty days have a tiny bump
//                         transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
//                         className={`w-full rounded-t-lg relative group cursor-pointer max-w-[40px] ${data.score === 0 ? 'bg-white/10' : 'bg-gradient-to-t from-primary/50 to-primary'}`}
//                       >
//                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap z-10">
//                           {data.score}% Focus
//                         </div>
//                       </motion.div>
//                       <span className={`text-xs font-medium ${i === 6 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{data.day}</span>
//                     </div>
//                   )) : (
//                     <div className="w-full text-center text-muted-foreground text-sm">No focus data found for the last 7 days.</div>
//                   )}
//                 </div>
//               </motion.div>

//               {/* Recently Worked */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="glass-card p-6 flex flex-col"
//               >
//                 <div className="mb-6">
//                   <h2 className="text-lg font-display font-semibold text-white">Recently Assigned</h2>
//                 </div>

//                 <div className="space-y-4 flex-1 overflow-auto pr-2">
//                   {recentlyWorked.length > 0 ? recentlyWorked.map((project, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 + index * 0.1 }}
//                       className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group"
//                       onClick={() => navigate('/my-projects')}
//                     >
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                           <FolderKanban className="w-5 h-5 text-primary" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors truncate">
//                             {project.name}
//                           </h4>
//                           <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                             <Clock className="w-3 h-3" />
//                             <span className="truncate">Started: {project.time}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )) : (
//                     <div className="text-center h-full flex flex-col items-center justify-center text-sm text-muted-foreground py-8 border border-dashed border-white/10 rounded-xl">
//                       <FolderKanban className="w-8 h-8 opacity-20 mb-3" />
//                       No active projects.
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default Dashboard;






import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Brain, 
  TrendingUp,
  Clock,
  Briefcase,
  LogOut,
  Camera,
  Github,
  Mail,
  ExternalLink,
  Activity
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';
import { useMode } from '@/context/ModeContext';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();
  const { mode } = useMode();

  // --- DYNAMIC DATA STATES ---
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [avgFocusScore, setAvgFocusScore] = useState(0);
  const [recentlyWorked, setRecentlyWorked] = useState<any[]>([]);
  const [chartData, setChartData] = useState<{ day: string; score: number }[]>([]);

  // Wrap fetch logic in useCallback so we can safely use it inside Realtime listeners
  const fetchDashboardData = useCallback(async (userId: string) => {
    // 1. Fetch Applications Data
    const { data: apps, error: appsError } = await supabase
      .from('project_applications')
      .select('*')
      .eq('applicant_id', userId);

    if (!appsError && apps) {
      const tableName = mode === 'developer' ? 'developer_projects' : 'learner_tasks';
      const modeApps = [];

      // Manually join project data based on the current mode
      for (let app of apps) {
        const { data: projectData } = await supabase
          .from(tableName)
          .select('title')
          .eq('id', app.project_id)
          .single();

        // If a project is found in the current mode's table, it belongs to this mode!
        if (projectData) {
          modeApps.push({
            ...app,
            project_title: projectData.title
          });
        }
      }

      setTotalProjects(modeApps.length);
      const active = modeApps.filter(app => app.status === 'accepted');
      setActiveProjects(active.length);

      // Format top 3 recent active projects
      const recent = active
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3)
        .map((app: any) => {
          return {
            name: app.project_title || 'Unknown Project',
            time: new Date(app.created_at).toLocaleDateString(),
            status: 'In Progress'
          };
        });
      setRecentlyWorked(recent);
    }

    // 2. Fetch Focus Sessions (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dateString = sevenDaysAgo.toISOString().split('T')[0]; // YYYY-MM-DD

    const { data: sessions, error: sessionsError } = await supabase
      .from('focus_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('mode', mode) // SEPARATES DEVELOPER VS LEARNER MATH!
      .gte('session_date', dateString);

    if (!sessionsError && sessions) {
      // Calculate overall average focus score for the current mode
      if (sessions.length > 0) {
        const totalScore = sessions.reduce((acc, curr) => acc + curr.average_score, 0);
        setAvgFocusScore(Math.round(totalScore / sessions.length));
      } else {
        setAvgFocusScore(0);
      }

      // Group scores by Day using robust timezone parsing
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const chartMap = new Map();
      
      sessions.forEach(session => {
        // Split date to avoid UTC shifting bugs
        const [year, month, day] = session.session_date.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const dayName = days[date.getDay()];
        
        if (chartMap.has(dayName)) {
            const existing = chartMap.get(dayName);
            existing.total += session.average_score;
            existing.count += 1;
        } else {
            chartMap.set(dayName, { total: session.average_score, count: 1 });
        }
      });

      // Create a solid 7-day array ending on TODAY
      const finalChartData = [];
      for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dayName = days[d.getDay()];
          
          if (chartMap.has(dayName)) {
              const data = chartMap.get(dayName);
              finalChartData.push({ day: dayName, score: Math.round(data.total / data.count) });
          } else {
              finalChartData.push({ day: dayName, score: 0 }); // 0 score if they didn't code
          }
      }
      setChartData(finalChartData);
    }
  }, [mode]);

  useEffect(() => {
    const initDashboard = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.user_metadata?.role === 'founder') {
        navigate('/founder-dashboard');
        return;
      }

      if (currentUser) {
        await fetchDashboardData(currentUser.id);
      }
      setLoading(false);
    };

    initDashboard();
  }, [navigate, fetchDashboardData]);

  // --- NEW: REALTIME DATABASE SUBSCRIPTION ---
  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('realtime_dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'focus_sessions', filter: `user_id=eq.${user.id}` }, 
        () => {
          console.log("Focus Session updated! Refreshing graph dynamically...");
          fetchDashboardData(user.id);
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_applications', filter: `applicant_id=eq.${user.id}` }, 
        () => {
          console.log("Projects updated! Refreshing counts dynamically...");
          fetchDashboardData(user.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchDashboardData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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

      if (!error && data.user) setUser(data.user); 
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
              Thank you for applying as a Founder! Our team is currently reviewing your LinkedIn and company website to verify your startup.
            </p>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  const displayName = user?.user_metadata?.full_name || 'Developer';
  const githubUsername = user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || 'GitHub Linked';
  const githubLink = `https://github.com/${githubUsername}`;
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&rounded=true&bold=true`;
  const profileImage = user?.user_metadata?.avatar_url || defaultAvatar;

  const stats = [
    { label: 'Active Projects', value: activeProjects.toString(), change: 'Current', icon: FolderKanban, trend: 'up' },
    { label: 'Total Projects', value: totalProjects.toString(), change: 'Lifetime', icon: FolderKanban, trend: 'up' },
    { label: `${mode === 'developer' ? 'Developer' : 'Learner'} Focus`, value: `${avgFocusScore}%`, change: 'Last 7 Days', icon: Brain, trend: 'up' },
  ];

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen flex">
        
        {/* === LEFT SIDEBAR === */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col w-1/4 min-w-[300px] max-w-[350px] glass border-r border-white/5 relative"
        >
          <div className="p-8 flex-1 flex flex-col items-center">
            <div className="relative mb-6 group">
              <img 
                src={profileImage} 
                alt="Profile" 
                className={`w-32 h-32 rounded-full border-4 border-[#1e293b] shadow-2xl object-cover transition-opacity ${uploadingImage ? 'opacity-50' : 'opacity-100'}`}
              />
              <label className="absolute bottom-0 right-0 p-3 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-transform transform hover:scale-105 shadow-lg border-2 border-[#0f172a]">
                <Camera className="w-5 h-5 text-primary-foreground" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center">{displayName}</h2>
            <div className="w-full space-y-4 mt-6">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm truncate" title={user?.email}>{user?.email}</span>
              </div>
              
              <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3 truncate">
                  <Github className="w-5 h-5 text-primary" />
                  <span className="text-sm truncate group-hover:text-white transition-colors">{githubUsername}</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </div>

            <div className="mt-auto w-full pt-8">
              <button onClick={() => navigate('/github-analysis')} className="w-full btn-neon flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" />
                <span>GitHub Analysis</span>
              </button>
            </div>
          </div>
        </motion.aside>

        {/* === RIGHT SIDE === */}
        <div className="flex-1 flex flex-col p-8 lg:p-10 overflow-auto">
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-white mb-2">{mode === 'developer' ? 'Developer' : 'Learner'} Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {displayName}!</p>
          </motion.header>

          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                      <span className="text-xs">{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-display font-bold mb-1 text-white">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Productivity Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display font-semibold text-white">Focus Overview</h2>
                  <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 uppercase tracking-wider">
                    {mode} Mode
                  </span>
                </div>
                
                <div className="h-64 flex items-end justify-between gap-2 px-4 mt-8">
                  {chartData.length > 0 ? chartData.map((data, i) => (
                    
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-3">
                      
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(8, data.score)}%` }} // Minimum 8% height so empty days have a tiny bump
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                        className={`w-full rounded-t-lg relative group cursor-pointer max-w-[40px] ${data.score === 0 ? 'bg-white/10' : 'bg-gradient-to-t from-primary/50 to-primary'}`}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap z-10">
                          {data.score}% Focus
                        </div>
                      </motion.div>
                      <span className={`text-xs font-medium ${i === 6 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{data.day}</span>
                    </div>
                  )) : (
                    <div className="w-full text-center text-muted-foreground text-sm">No focus data found for the last 7 days.</div>
                  )}
                </div>
              </motion.div>

              {/* Recently Worked */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="text-lg font-display font-semibold text-white">Recently Assigned</h2>
                </div>

                <div className="space-y-4 flex-1 overflow-auto pr-2">
                  {recentlyWorked.length > 0 ? recentlyWorked.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group"
                      onClick={() => navigate('/my-projects')}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FolderKanban className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors truncate">
                            {project.name}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span className="truncate">Started: {project.time}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center h-full flex flex-col items-center justify-center text-sm text-muted-foreground py-8 border border-dashed border-white/10 rounded-xl">
                      <FolderKanban className="w-8 h-8 opacity-20 mb-3" />
                      No active projects.
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;