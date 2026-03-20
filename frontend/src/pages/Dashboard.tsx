// // import { motion } from 'framer-motion';
// // import { 
// //   LayoutDashboard, 
// //   FolderKanban, 
// //   Users, 
// //   BarChart3, 
// //   Brain, 
// //   Settings,
// //   Bell,
// //   Search,
// //   Plus,
// //   TrendingUp,
// //   Clock,
// //   CheckCircle2,
// //   AlertCircle
// // } from 'lucide-react';
// // import PageLayout from '@/components/layout/PageLayout';

// // const stats = [
// //   { label: 'Active Projects', value: '12', change: '+3', icon: FolderKanban, trend: 'up' },
// //   { label: 'Team Members', value: '48', change: '+7', icon: Users, trend: 'up' },
// //   { label: 'Tasks Completed', value: '156', change: '+24', icon: CheckCircle2, trend: 'up' },
// //   { label: 'Focus Score', value: '87%', change: '+5%', icon: Brain, trend: 'up' },
// // ];

// // const recentActivity = [
// //   { type: 'project', message: 'New project "AI Dashboard" created', time: '2 hours ago', icon: FolderKanban },
// //   { type: 'team', message: 'Sarah joined your team', time: '5 hours ago', icon: Users },
// //   { type: 'task', message: 'Task "API Integration" completed', time: '1 day ago', icon: CheckCircle2 },
// //   { type: 'alert', message: 'Deadline approaching for "Mobile App"', time: '1 day ago', icon: AlertCircle },
// // ];

// // const sidebarItems = [
// //   { icon: LayoutDashboard, label: 'Dashboard', active: true },
// //   { icon: FolderKanban, label: 'Projects' },
// //   { icon: Users, label: 'Team' },
// //   { icon: BarChart3, label: 'Analytics' },
// //   { icon: Brain, label: 'AI Focus' },
// //   { icon: Settings, label: 'Settings' },
// // ];

// // const Dashboard = () => {
// //   return (
// //     <PageLayout showFooter={false}>
// //       <div className="min-h-screen flex">
// //         {/* Sidebar */}
// //         <motion.aside
// //           initial={{ x: -100, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           transition={{ duration: 0.5 }}
// //           className="hidden lg:flex flex-col w-64 glass border-r border-white/5"
// //         >
// //           <div className="p-6">
// //             <div className="flex items-center space-x-2 mb-8">
// //               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// //                 <span className="text-primary-foreground font-bold text-lg">D</span>
// //               </div>
// //               <span className="font-display font-bold text-lg gradient-text">DevPool</span>
// //             </div>

// //             <nav className="space-y-1">
// //               {sidebarItems.map((item, index) => (
// //                 <motion.button
// //                   key={item.label}
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: index * 0.05 }}
// //                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
// //                     item.active
// //                       ? 'bg-primary/10 text-primary'
// //                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
// //                   }`}
// //                 >
// //                   <item.icon className="w-5 h-5" />
// //                   <span className="font-medium">{item.label}</span>
// //                 </motion.button>
// //               ))}
// //             </nav>
// //           </div>

// //           {/* AI Focus Score Card */}
// //           <div className="mt-auto p-6">
// //             <div className="glass-card p-4">
// //               <div className="flex items-center gap-3 mb-3">
// //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// //                   <Brain className="w-5 h-5 text-primary-foreground" />
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-medium">AI Focus</p>
// //                   <p className="text-xs text-muted-foreground">Your productivity</p>
// //                 </div>
// //               </div>
// //               <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
// //                 <motion.div
// //                   initial={{ width: 0 }}
// //                   animate={{ width: '87%' }}
// //                   transition={{ duration: 1, delay: 0.5 }}
// //                   className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
// //                 />
// //               </div>
// //               <p className="text-right text-sm mt-2 gradient-text font-semibold">87%</p>
// //             </div>
// //           </div>
// //         </motion.aside>

// //         {/* Main Content */}
// //         <div className="flex-1 flex flex-col">
// //           {/* Header */}
// //           <motion.header
// //             initial={{ y: -20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.5 }}
// //             className="glass border-b border-white/5 px-6 py-4"
// //           >
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h1 className="text-xl font-display font-bold">Dashboard</h1>
// //                 <p className="text-sm text-muted-foreground">Welcome back, Alex!</p>
// //               </div>

// //               <div className="flex items-center gap-4">
// //                 {/* Search */}
// //                 <div className="hidden md:flex items-center relative">
// //                   <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search..."
// //                     className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 w-64"
// //                   />
// //                 </div>

// //                 {/* Notifications */}
// //                 <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
// //                   <Bell className="w-5 h-5" />
// //                   <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
// //                 </button>

// //                 {/* Avatar */}
// //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">
// //                   AC
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.header>

// //           {/* Dashboard Content */}
// //           <main className="flex-1 p-6 overflow-auto">
// //             {/* Stats */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //               {stats.map((stat, index) => (
// //                 <motion.div
// //                   key={stat.label}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: index * 0.1 }}
// //                   className="glass-card group"
// //                 >
// //                   <div className="flex items-start justify-between mb-4">
// //                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:neon-glow transition-all">
// //                       <stat.icon className="w-6 h-6 text-primary" />
// //                     </div>
// //                     <div className="flex items-center gap-1 text-green-400 text-sm">
// //                       <TrendingUp className="w-4 h-4" />
// //                       <span>{stat.change}</span>
// //                     </div>
// //                   </div>
// //                   <p className="text-2xl font-display font-bold mb-1">{stat.value}</p>
// //                   <p className="text-sm text-muted-foreground">{stat.label}</p>
// //                 </motion.div>
// //               ))}
// //             </div>

// //             <div className="grid lg:grid-cols-3 gap-6">
// //               {/* Chart Placeholder */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.4 }}
// //                 className="lg:col-span-2 glass-card"
// //               >
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-lg font-display font-semibold">Productivity Overview</h2>
// //                   <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50">
// //                     <option>This Week</option>
// //                     <option>This Month</option>
// //                     <option>This Year</option>
// //                   </select>
// //                 </div>
                
// //                 {/* Chart visualization */}
// //                 <div className="h-64 flex items-end justify-between gap-2 px-4">
// //                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
// //                     const heights = [60, 80, 45, 90, 75, 40, 65];
// //                     return (
// //                       <div key={day} className="flex-1 flex flex-col items-center gap-2">
// //                         <motion.div
// //                           initial={{ height: 0 }}
// //                           animate={{ height: `${heights[i]}%` }}
// //                           transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
// //                           className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary relative group cursor-pointer"
// //                         >
// //                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs whitespace-nowrap">
// //                             {heights[i]}%
// //                           </div>
// //                         </motion.div>
// //                         <span className="text-xs text-muted-foreground">{day}</span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </motion.div>

// //               {/* Recent Activity */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.5 }}
// //                 className="glass-card"
// //               >
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-lg font-display font-semibold">Recent Activity</h2>
// //                   <button className="text-sm text-primary hover:underline">View All</button>
// //                 </div>

// //                 <div className="space-y-4">
// //                   {recentActivity.map((activity, index) => (
// //                     <motion.div
// //                       key={index}
// //                       initial={{ opacity: 0, x: -10 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ delay: 0.6 + index * 0.1 }}
// //                       className="flex items-start gap-3"
// //                     >
// //                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
// //                         activity.type === 'alert' 
// //                           ? 'bg-yellow-500/20 text-yellow-400'
// //                           : 'bg-primary/20 text-primary'
// //                       }`}>
// //                         <activity.icon className="w-4 h-4" />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-sm line-clamp-1">{activity.message}</p>
// //                         <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
// //                           <Clock className="w-3 h-3" />
// //                           <span>{activity.time}</span>
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </motion.div>
// //             </div>

// //             {/* Quick Actions */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.7 }}
// //               className="mt-6"
// //             >
// //               <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
// //               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //                 {[
// //                   { icon: Plus, label: 'New Project', color: 'from-primary to-secondary' },
// //                   { icon: Users, label: 'Invite Member', color: 'from-secondary to-neon-pink' },
// //                   { icon: Brain, label: 'Start Focus', color: 'from-neon-pink to-primary' },
// //                   { icon: BarChart3, label: 'View Reports', color: 'from-neon-blue to-primary' },
// //                 ].map((action, index) => (
// //                   <motion.button
// //                     key={action.label}
// //                     whileHover={{ y: -4, scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="glass-card flex items-center gap-3 group cursor-pointer"
// //                   >
// //                     <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:neon-glow transition-all`}>
// //                       <action.icon className="w-5 h-5 text-white" />
// //                     </div>
// //                     <span className="font-medium group-hover:text-primary transition-colors">
// //                       {action.label}
// //                     </span>
// //                   </motion.button>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           </main>
// //         </div>
// //       </div>
// //     </PageLayout>
// //   );
// // };

// // export default Dashboard;





// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   FolderKanban, 
//   Users, 
//   BarChart3, 
//   Brain, 
//   Settings,
//   Bell,
//   Search,
//   Plus,
//   TrendingUp,
//   Clock,
//   CheckCircle2,
//   AlertCircle,
//   Briefcase,
//   LogOut
// } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';

// const stats = [
//   { label: 'Active Projects', value: '12', change: '+3', icon: FolderKanban, trend: 'up' },
//   { label: 'Team Members', value: '48', change: '+7', icon: Users, trend: 'up' },
//   { label: 'Tasks Completed', value: '156', change: '+24', icon: CheckCircle2, trend: 'up' },
//   { label: 'Focus Score', value: '87%', change: '+5%', icon: Brain, trend: 'up' },
// ];

// const recentActivity = [
//   { type: 'project', message: 'New project "AI Dashboard" created', time: '2 hours ago', icon: FolderKanban },
//   { type: 'team', message: 'Sarah joined your team', time: '5 hours ago', icon: Users },
//   { type: 'task', message: 'Task "API Integration" completed', time: '1 day ago', icon: CheckCircle2 },
//   { type: 'alert', message: 'Deadline approaching for "Mobile App"', time: '1 day ago', icon: AlertCircle },
// ];

// const sidebarItems = [
//   { icon: LayoutDashboard, label: 'Dashboard', active: true },
//   { icon: FolderKanban, label: 'Projects' },
//   { icon: Users, label: 'Team' },
//   { icon: BarChart3, label: 'Analytics' },
//   { icon: Brain, label: 'AI Focus' },
//   { icon: Settings, label: 'Settings' },
// ];

// const Dashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate('/');
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

//   // --- MAIN DASHBOARD LOGIC ---
//   const displayName = user?.user_metadata?.full_name || 'Developer';
//   const firstName = displayName.split(' ')[0]; // Gets just the first name for the welcome message
//   const googleStyleAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&rounded=true&bold=true`;

//   return (
//     <PageLayout showFooter={false}>
//       <div className="min-h-screen flex">
//         {/* Sidebar */}
//         <motion.aside
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="hidden lg:flex flex-col w-64 glass border-r border-white/5"
//         >
//           <div className="p-6">
//             <div className="flex items-center space-x-2 mb-8">
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-lg">D</span>
//               </div>
//               <span className="font-display font-bold text-lg gradient-text">DevPool</span>
//             </div>

//             <nav className="space-y-1">
//               {sidebarItems.map((item, index) => (
//                 <motion.button
//                   key={item.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                     item.active
//                       ? 'bg-primary/10 text-primary'
//                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </motion.button>
//               ))}
//             </nav>
//           </div>

//           {/* AI Focus Score Card */}
//           <div className="mt-auto p-6">
//             <div className="glass-card p-4">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                   <Brain className="w-5 h-5 text-primary-foreground" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">AI Focus</p>
//                   <p className="text-xs text-muted-foreground">Your productivity</p>
//                 </div>
//               </div>
//               <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: '87%' }}
//                   transition={{ duration: 1, delay: 0.5 }}
//                   className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
//                 />
//               </div>
//               <p className="text-right text-sm mt-2 gradient-text font-semibold">87%</p>
//             </div>
//           </div>
//         </motion.aside>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <motion.header
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="glass border-b border-white/5 px-6 py-4"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-xl font-display font-bold">Dashboard</h1>
//                 <p className="text-sm text-muted-foreground">Welcome back, {firstName}!</p>
//               </div>

//               <div className="flex items-center gap-4">
//                 {/* Search */}
//                 <div className="hidden md:flex items-center relative">
//                   <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 w-64"
//                   />
//                 </div>

//                 {/* Notifications */}
//                 <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
//                   <Bell className="w-5 h-5" />
//                   <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
//                 </button>

//                 {/* Dynamic Google-Style Avatar */}
//                 <img 
//                   src={googleStyleAvatar} 
//                   alt="Profile" 
//                   className="w-10 h-10 rounded-xl border border-white/10 shadow-sm"
//                 />
//               </div>
//             </div>
//           </motion.header>

//           {/* Dashboard Content */}
//           <main className="flex-1 p-6 overflow-auto">
//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="glass-card group"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:neon-glow transition-all">
//                       <stat.icon className="w-6 h-6 text-primary" />
//                     </div>
//                     <div className="flex items-center gap-1 text-green-400 text-sm">
//                       <TrendingUp className="w-4 h-4" />
//                       <span>{stat.change}</span>
//                     </div>
//                   </div>
//                   <p className="text-2xl font-display font-bold mb-1">{stat.value}</p>
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Chart Placeholder */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="lg:col-span-2 glass-card"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg font-display font-semibold">Productivity Overview</h2>
//                   <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50">
//                     <option>This Week</option>
//                     <option>This Month</option>
//                     <option>This Year</option>
//                   </select>
//                 </div>
                
//                 {/* Chart visualization */}
//                 <div className="h-64 flex items-end justify-between gap-2 px-4">
//                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
//                     const heights = [60, 80, 45, 90, 75, 40, 65];
//                     return (
//                       <div key={day} className="flex-1 flex flex-col items-center gap-2">
//                         <motion.div
//                           initial={{ height: 0 }}
//                           animate={{ height: `${heights[i]}%` }}
//                           transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
//                           className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary relative group cursor-pointer"
//                         >
//                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs whitespace-nowrap">
//                             {heights[i]}%
//                           </div>
//                         </motion.div>
//                         <span className="text-xs text-muted-foreground">{day}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>

//               {/* Recent Activity */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="glass-card"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg font-display font-semibold">Recent Activity</h2>
//                   <button className="text-sm text-primary hover:underline">View All</button>
//                 </div>

//                 <div className="space-y-4">
//                   {recentActivity.map((activity, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 + index * 0.1 }}
//                       className="flex items-start gap-3"
//                     >
//                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                         activity.type === 'alert' 
//                           ? 'bg-yellow-500/20 text-yellow-400'
//                           : 'bg-primary/20 text-primary'
//                       }`}>
//                         <activity.icon className="w-4 h-4" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm line-clamp-1">{activity.message}</p>
//                         <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
//                           <Clock className="w-3 h-3" />
//                           <span>{activity.time}</span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Quick Actions */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="mt-6"
//             >
//               <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {[
//                   { icon: Plus, label: 'New Project', color: 'from-primary to-secondary' },
//                   { icon: Users, label: 'Invite Member', color: 'from-secondary to-neon-pink' },
//                   { icon: Brain, label: 'Start Focus', color: 'from-neon-pink to-primary' },
//                   { icon: BarChart3, label: 'View Reports', color: 'from-neon-blue to-primary' },
//                 ].map((action, index) => (
//                   <motion.button
//                     key={action.label}
//                     whileHover={{ y: -4, scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="glass-card flex items-center gap-3 group cursor-pointer w-full text-left"
//                   >
//                     <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:neon-glow transition-all`}>
//                       <action.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <span className="font-medium group-hover:text-primary transition-colors">
//                       {action.label}
//                     </span>
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           </main>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default Dashboard;







import { useState, useEffect } from 'react';
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

const stats = [
  { label: 'Active Projects', value: '3', change: '+1', icon: FolderKanban, trend: 'up' },
  { label: 'Total Projects', value: '12', change: '+4', icon: FolderKanban, trend: 'up' },
  { label: 'Focus Score', value: '87%', change: '+5%', icon: Brain, trend: 'up' },
];

const recentlyWorked = [
  { name: 'Uni-RAG Agent', time: 'Last opened 2 hours ago', status: 'In Progress' },
  { name: 'AI Study Buddy', time: 'Last opened yesterday', status: 'Review' },
  { name: 'Portfolio Website', time: 'Last opened 3 days ago', status: 'Completed' },
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      // --- ROLE BASED REDIRECTION ---
      if (currentUser?.user_metadata?.role === 'founder') {
        navigate('/founder-dashboard');
      }
    });
  }, [navigate]);

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
      
      // Save directly to Supabase metadata
      const { data, error } = await supabase.auth.updateUser({
        data: { avatar_url: base64Image }
      });

      if (!error && data.user) {
        setUser(data.user); // Update local state to show new image instantly
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

  // --- USER DATA EXTRACTION ---
  const displayName = user?.user_metadata?.full_name || 'Developer';
  const githubUsername = user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || 'GitHub Linked';
  const githubLink = `https://github.com/${githubUsername}`;
  
  // Uses saved database image, OR fallback to Google-style initials
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
          className="hidden lg:flex flex-col w-1/4 min-w-[300px] max-w-[350px] glass border-r border-white/5 relative"
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
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{displayName}</h2>
            
            <div className="w-full space-y-4 mt-6">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm truncate" title={user?.email}>{user?.email}</span>
              </div>
              
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3 truncate">
                  <Github className="w-5 h-5 text-primary" />
                  <span className="text-sm truncate group-hover:text-white transition-colors">
                    {githubUsername}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </div>

            {/* Bottom Button */}
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
        <div className="flex-1 flex flex-col p-8 lg:p-10 overflow-auto">
          
          {/* Header (No items on the right) */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {displayName}!</p>
          </motion.header>

          <main className="flex-1">
            {/* Stats Grid (Exactly 3 items) */}
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
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-display font-bold mb-1 text-white">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts & Projects Area */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Productivity Overview (Left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display font-semibold text-white">Productivity Overview</h2>
                  <select className="bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:border-primary/50">
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                
                {/* Chart visualization */}
                <div className="h-64 flex items-end justify-between gap-2 px-4 mt-8">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const heights = [60, 80, 45, 90, 75, 40, 65];
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-3">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heights[i]}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary relative group cursor-pointer max-w-[40px]"
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                            {heights[i]}%
                          </div>
                        </motion.div>
                        <span className="text-xs font-medium text-muted-foreground">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Recently Worked Projects (Right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
              >
                <div className="mb-6">
                  <h2 className="text-lg font-display font-semibold text-white">Recently Worked</h2>
                </div>

                <div className="space-y-4">
                  {recentlyWorked.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group"
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
                            <span className="truncate">{project.time}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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