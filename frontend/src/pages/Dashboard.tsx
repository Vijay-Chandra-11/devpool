import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Brain, 
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const stats = [
  { label: 'Active Projects', value: '12', change: '+3', icon: FolderKanban, trend: 'up' },
  { label: 'Team Members', value: '48', change: '+7', icon: Users, trend: 'up' },
  { label: 'Tasks Completed', value: '156', change: '+24', icon: CheckCircle2, trend: 'up' },
  { label: 'Focus Score', value: '87%', change: '+5%', icon: Brain, trend: 'up' },
];

const recentActivity = [
  { type: 'project', message: 'New project "AI Dashboard" created', time: '2 hours ago', icon: FolderKanban },
  { type: 'team', message: 'Sarah joined your team', time: '5 hours ago', icon: Users },
  { type: 'task', message: 'Task "API Integration" completed', time: '1 day ago', icon: CheckCircle2 },
  { type: 'alert', message: 'Deadline approaching for "Mobile App"', time: '1 day ago', icon: AlertCircle },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FolderKanban, label: 'Projects' },
  { icon: Users, label: 'Team' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Brain, label: 'AI Focus' },
  { icon: Settings, label: 'Settings' },
];

const Dashboard = () => {
  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col w-64 glass border-r border-white/5"
        >
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-display font-bold text-lg gradient-text">DevPool</span>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* AI Focus Score Card */}
          <div className="mt-auto p-6">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI Focus</p>
                  <p className="text-xs text-muted-foreground">Your productivity</p>
                </div>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
              <p className="text-right text-sm mt-2 gradient-text font-semibold">87%</p>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass border-b border-white/5 px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-display font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Alex!</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center relative">
                  <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 w-64"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </button>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">
                  AC
                </div>
              </div>
            </div>
          </motion.header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:neon-glow transition-all">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-display font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display font-semibold">Productivity Overview</h2>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                
                {/* Chart visualization */}
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const heights = [60, 80, 45, 90, 75, 40, 65];
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heights[i]}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary relative group cursor-pointer"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs whitespace-nowrap">
                            {heights[i]}%
                          </div>
                        </motion.div>
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display font-semibold">Recent Activity</h2>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'alert' 
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-primary/20 text-primary'
                      }`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{activity.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Plus, label: 'New Project', color: 'from-primary to-secondary' },
                  { icon: Users, label: 'Invite Member', color: 'from-secondary to-neon-pink' },
                  { icon: Brain, label: 'Start Focus', color: 'from-neon-pink to-primary' },
                  { icon: BarChart3, label: 'View Reports', color: 'from-neon-blue to-primary' },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card flex items-center gap-3 group cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:neon-glow transition-all`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
