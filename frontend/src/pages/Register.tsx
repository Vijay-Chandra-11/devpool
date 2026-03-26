// // // import { useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Link } from 'react-router-dom';
// // // import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
// // // import PageLayout from '@/components/layout/PageLayout';

// // // const Register = () => {
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [name, setName] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);
// // //     // Simulate registration
// // //     await new Promise((resolve) => setTimeout(resolve, 1500));
// // //     setIsLoading(false);
// // //   };

// // //   return (
// // //     <PageLayout showFooter={false}>
// // //       <section className="min-h-screen flex items-center justify-center py-20 relative">
// // //         {/* Background effects */}
// // //         <div className="absolute inset-0 radial-overlay pointer-events-none" />
        
// // //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 30 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.8 }}
// // //             className="max-w-md mx-auto"
// // //           >
// // //             {/* Header */}
// // //             <div className="text-center mb-8">
// // //               <Link to="/" className="inline-flex items-center space-x-2 mb-8">
// // //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// // //                   <span className="text-primary-foreground font-bold text-xl">D</span>
// // //                 </div>
// // //                 <span className="font-display font-bold text-2xl gradient-text">DevPool</span>
// // //               </Link>
// // //               <h1 className="text-3xl font-display font-bold mb-2">Create your account</h1>
// // //               <p className="text-muted-foreground">Join the DevPool community today</p>
// // //             </div>

// // //             {/* Form */}
// // //             <motion.form
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.1 }}
// // //               onSubmit={handleSubmit}
// // //               className="glass-card"
// // //             >
// // //               {/* Name */}
// // //               <div className="mb-5">
// // //                 <label htmlFor="name" className="block text-sm font-medium mb-2">
// // //                   Full Name
// // //                 </label>
// // //                 <div className="relative">
// // //                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                   <input
// // //                     id="name"
// // //                     type="text"
// // //                     value={name}
// // //                     onChange={(e) => setName(e.target.value)}
// // //                     placeholder="John Doe"
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Email */}
// // //               <div className="mb-5">
// // //                 <label htmlFor="email" className="block text-sm font-medium mb-2">
// // //                   Email
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                   <input
// // //                     id="email"
// // //                     type="email"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                     placeholder="you@example.com"
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Password */}
// // //               <div className="mb-6">
// // //                 <label htmlFor="password" className="block text-sm font-medium mb-2">
// // //                   Password
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                   <input
// // //                     id="password"
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     value={password}
// // //                     onChange={(e) => setPassword(e.target.value)}
// // //                     placeholder="••••••••"
// // //                     className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
// // //                     required
// // //                     minLength={8}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
// // //                   >
// // //                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// // //                   </button>
// // //                 </div>
// // //                 <p className="text-xs text-muted-foreground mt-2">
// // //                   Must be at least 8 characters
// // //                 </p>
// // //               </div>

// // //               {/* Terms */}
// // //               <div className="flex items-start gap-3 mb-6">
// // //                 <input
// // //                   type="checkbox"
// // //                   id="terms"
// // //                   required
// // //                   className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/20"
// // //                 />
// // //                 <label htmlFor="terms" className="text-sm text-muted-foreground">
// // //                   I agree to the{' '}
// // //                   <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
// // //                   {' '}and{' '}
// // //                   <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
// // //                 </label>
// // //               </div>

// // //               {/* Submit */}
// // //               <motion.button
// // //                 type="submit"
// // //                 disabled={isLoading}
// // //                 whileHover={{ scale: 1.02 }}
// // //                 whileTap={{ scale: 0.98 }}
// // //                 className="w-full btn-neon flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
// // //               >
// // //                 {isLoading ? (
// // //                   <motion.div
// // //                     animate={{ rotate: 360 }}
// // //                     transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
// // //                     className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
// // //                   />
// // //                 ) : (
// // //                   <>
// // //                     <span>Create Account</span>
// // //                     <ArrowRight className="w-4 h-4" />
// // //                   </>
// // //                 )}
// // //               </motion.button>

// // //               {/* Divider */}
// // //               <div className="relative my-6">
// // //                 <div className="absolute inset-0 flex items-center">
// // //                   <div className="w-full border-t border-white/10" />
// // //                 </div>
// // //                 <div className="relative flex justify-center text-xs uppercase">
// // //                   <span className="bg-card px-2 text-muted-foreground">or continue with</span>
// // //                 </div>
// // //               </div>

// // //               {/* Social login */}
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <button
// // //                   type="button"
// // //                   className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
// // //                 >
// // //                   <svg className="w-5 h-5" viewBox="0 0 24 24">
// // //                     <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
// // //                     <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
// // //                     <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
// // //                     <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
// // //                   </svg>
// // //                   <span className="text-sm">Google</span>
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
// // //                 >
// // //                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
// // //                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
// // //                   </svg>
// // //                   <span className="text-sm">GitHub</span>
// // //                 </button>
// // //               </div>
// // //             </motion.form>

// // //             {/* Login link */}
// // //             <motion.p
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: 1 }}
// // //               transition={{ delay: 0.3 }}
// // //               className="text-center mt-6 text-sm text-muted-foreground"
// // //             >
// // //               Already have an account?{' '}
// // //               <Link to="/login" className="text-primary hover:underline">
// // //                 Sign in
// // //               </Link>
// // //             </motion.p>
// // //           </motion.div>
// // //         </div>
// // //       </section>
// // //     </PageLayout>
// // //   );
// // // };

// // // export default Register;


// // // import { useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
// // // import PageLayout from '@/components/layout/PageLayout';

// // // const Register = () => {
// // //   const navigate = useNavigate();
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [name, setName] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);

// // //     try {
// // //       const res = await fetch('http://127.0.0.1:5000/signup', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ name, email, password }),
// // //       });

// // //       const data = await res.json();

// // //       if (!res.ok) {
// // //         alert(data.error || 'Signup failed');
// // //         setIsLoading(false);
// // //         return;
// // //       }

// // //       // Temporary login after signup
// // //       localStorage.setItem('isLoggedIn', 'true');
// // //       localStorage.setItem(
// // //         'user',
// // //         JSON.stringify({
// // //           name,
// // //           email,
// // //           role: 'learner',
// // //           founder_status: 'not_applied',
// // //         })
// // //       );

// // //       navigate('/founder-intent');
// // //     } catch (error) {
// // //       alert('Server error');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <PageLayout showFooter={false}>
// // //       <section className="min-h-screen flex items-center justify-center py-20 relative">
// // //         <div className="absolute inset-0 radial-overlay pointer-events-none" />

// // //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 30 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.8 }}
// // //             className="max-w-md mx-auto"
// // //           >
// // //             {/* Header */}
// // //             <div className="text-center mb-8">
// // //               <Link to="/" className="inline-flex items-center space-x-2 mb-8">
// // //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// // //                   <span className="text-primary-foreground font-bold text-xl">D</span>
// // //                 </div>
// // //                 <span className="font-display font-bold text-2xl gradient-text">
// // //                   DevPool
// // //                 </span>
// // //               </Link>
// // //               <h1 className="text-3xl font-display font-bold mb-2">
// // //                 Create your account
// // //               </h1>
// // //               <p className="text-muted-foreground">
// // //                 Join the DevPool community today
// // //               </p>
// // //             </div>

// // //             {/* Form */}
// // //             <motion.form
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.1 }}
// // //               onSubmit={handleSubmit}
// // //               className="glass-card"
// // //             >
// // //               {/* Name */}
// // //               <div className="mb-5">
// // //                 <label className="block text-sm font-medium mb-2">
// // //                   Full Name
// // //                 </label>
// // //                 <div className="relative">
// // //                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                   <input
// // //                     type="text"
// // //                     value={name}
// // //                     onChange={(e) => setName(e.target.value)}
// // //                     placeholder="John Doe"
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Email */}
// // //               <div className="mb-5">
// // //                 <label className="block text-sm font-medium mb-2">
// // //                   Email
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                   <input
// // //                     type="email"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                     placeholder="you@example.com"
// // //                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Password */}
// // //               <div className="mb-6">
// // //                 <label className="block text-sm font-medium mb-2">
// // //                   Password
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                   <input
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     value={password}
// // //                     onChange={(e) => setPassword(e.target.value)}
// // //                     placeholder="••••••••"
// // //                     className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10"
// // //                     required
// // //                     minLength={8}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-4 top-1/2 -translate-y-1/2"
// // //                   >
// // //                     {showPassword ? <EyeOff /> : <Eye />}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               <motion.button
// // //                 type="submit"
// // //                 disabled={isLoading}
// // //                 className="w-full btn-neon"
// // //               >
// // //                 {isLoading ? 'Creating...' : 'Create Account'}
// // //               </motion.button>
// // //             </motion.form>

// // //             <p className="text-center mt-6 text-sm text-muted-foreground">
// // //               Already have an account?{' '}
// // //               <Link to="/login" className="text-primary hover:underline">
// // //                 Sign in
// // //               </Link>
// // //             </p>
// // //           </motion.div>
// // //         </div>
// // //       </section>
// // //     </PageLayout>
// // //   );
// // // };

// // // export default Register;





// // // import { useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github } from 'lucide-react';
// // // import PageLayout from '@/components/layout/PageLayout';
// // // import { supabase } from '@/lib/supabase';

// // // const Register = () => {
// // //   const navigate = useNavigate();
// // //   const [step, setStep] = useState(1); // Step 1: Form, Step 2: GitHub Link
  
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [name, setName] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
  
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // STEP 1: Create Account
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);
// // //     setError(null);

// // //     const { data, error } = await supabase.auth.signUp({
// // //       email,
// // //       password,
// // //       options: {
// // //         data: { full_name: name, role: 'learner' }
// // //       }
// // //     });

// // //     if (error) {
// // //       setError(error.message);
// // //       setIsLoading(false);
// // //     } else {
// // //       // Success! Move to step 2 to ask for GitHub
// // //       setIsLoading(false);
// // //       setStep(2); 
// // //     }
// // //   };

// // //   // STEP 2: Link GitHub Identity
// // //   const handleLinkGitHub = async () => {
// // //     // Links the newly created account to their GitHub
// // //     await supabase.auth.linkIdentity({
// // //       provider: 'github',
// // //       options: { redirectTo: `${window.location.origin}/dashboard` }
// // //     });
// // //   };

// // //   return (
// // //     <PageLayout showFooter={false}>
// // //       <section className="min-h-screen flex items-center justify-center py-20 relative">
// // //         <div className="absolute inset-0 radial-overlay pointer-events-none" />

// // //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// // //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-md mx-auto">
            
// // //             <div className="text-center mb-8">
// // //               <Link to="/" className="inline-flex items-center space-x-2 mb-8">
// // //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// // //                   <span className="text-primary-foreground font-bold text-xl">D</span>
// // //                 </div>
// // //                 <span className="font-display font-bold text-2xl gradient-text">DevPool</span>
// // //               </Link>
// // //               <h1 className="text-3xl font-display font-bold mb-2">
// // //                 {step === 1 ? 'Create your account' : 'Verify Your Skills'}
// // //               </h1>
// // //               <p className="text-muted-foreground">
// // //                 {step === 1 ? 'Join the DevPool community today' : 'Connect GitHub to activate the Trust Engine'}
// // //               </p>
// // //             </div>

// // //             <motion.div className="glass-card">
// // //               {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-400">{error}</div>}

// // //               {/* === STEP 1: REGISTRATION FORM === */}
// // //               {step === 1 && (
// // //                 <form onSubmit={handleSubmit}>
// // //                   <div className="mb-5">
// // //                     <label className="block text-sm font-medium mb-2">Full Name</label>
// // //                     <div className="relative">
// // //                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 outline-none" required />
// // //                     </div>
// // //                   </div>

// // //                   <div className="mb-5">
// // //                     <label className="block text-sm font-medium mb-2">Email</label>
// // //                     <div className="relative">
// // //                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 outline-none" required />
// // //                     </div>
// // //                   </div>

// // //                   <div className="mb-6">
// // //                     <label className="block text-sm font-medium mb-2">Password</label>
// // //                     <div className="relative">
// // //                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // //                       <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 outline-none" required minLength={8} />
// // //                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
// // //                         {showPassword ? <EyeOff /> : <Eye />}
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   <motion.button type="submit" disabled={isLoading} className="w-full btn-neon flex items-center justify-center gap-2">
// // //                     {isLoading ? 'Creating...' : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
// // //                   </motion.button>
// // //                 </form>
// // //               )}

// // //               {/* === STEP 2: GITHUB CONNECTION === */}
// // //               {step === 2 && (
// // //                 <div className="text-center py-4">
// // //                   <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
// // //                     <User className="w-8 h-8" />
// // //                   </div>
// // //                   <h3 className="text-xl font-bold text-white mb-2">Account Created!</h3>
// // //                   <p className="text-gray-400 text-sm mb-8">
// // //                     To apply for Developer roles, founders need to see your verified coding stats. Link your GitHub account now.
// // //                   </p>

// // //                   <button 
// // //                     onClick={handleLinkGitHub} 
// // //                     className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mb-4 border border-white/10"
// // //                   >
// // //                     <Github className="w-5 h-5" /> Connect GitHub Account
// // //                   </button>

// // //                   <button onClick={() => navigate('/dashboard')} className="text-sm text-muted-foreground hover:text-white transition-colors">
// // //                     Skip for now (I am a Learner)
// // //                   </button>
// // //                 </div>
// // //               )}

// // //             </motion.div>

// // //             {step === 1 && (
// // //               <p className="text-center mt-6 text-sm text-muted-foreground">
// // //                 Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
// // //               </p>
// // //             )}
// // //           </motion.div>
// // //         </div>
// // //       </section>
// // //     </PageLayout>
// // //   );
// // // };

// // // export default Register;





// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, AlertCircle } from 'lucide-react';
// // import PageLayout from '@/components/layout/PageLayout';
// // import { supabase } from '@/lib/supabase';

// // const Register = () => {
// //   const navigate = useNavigate();
// //   const [step, setStep] = useState(1); // Step 1: Form, Step 2: Mandatory GitHub Link
  
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
  
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // STEP 1: Create Account (Mandatory First Step)
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError(null);

// //     const { error } = await supabase.auth.signUp({
// //       email,
// //       password,
// //       options: {
// //         data: { full_name: name, role: 'learner' }
// //       }
// //     });

// //     if (error) {
// //       setError(error.message);
// //       setIsLoading(false);
// //     } else {
// //       // Success! Move to step 2 to mandate GitHub connection
// //       setIsLoading(false);
// //       setStep(2); 
// //     }
// //   };

// //   // STEP 2: Link GitHub Identity (Mandatory Second Step)
// //   const handleLinkGitHub = async () => {
// //     setError(null);
// //     // linkIdentity securely attaches the GitHub profile to the Email account 
// //     // they just created, even if the email addresses are completely different.
// //     const { error } = await supabase.auth.linkIdentity({
// //       provider: 'github',
// //       options: { redirectTo: `${window.location.origin}/dashboard` }
// //     });

// //     if (error) {
// //        setError(error.message);
// //     }
// //   };

// //   return (
// //     <PageLayout showFooter={false}>
// //       <section className="min-h-screen flex items-center justify-center py-20 relative">
// //         <div className="absolute inset-0 radial-overlay pointer-events-none" />

// //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-md mx-auto">
            
// //             <div className="text-center mb-8">
// //               <Link to="/" className="inline-flex items-center space-x-2 mb-8">
// //                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// //                   <span className="text-primary-foreground font-bold text-xl">D</span>
// //                 </div>
// //                 <span className="font-display font-bold text-2xl gradient-text">DevPool</span>
// //               </Link>
// //               <h1 className="text-3xl font-display font-bold mb-2">
// //                 {step === 1 ? 'Create your account' : 'Verify Your Identity'}
// //               </h1>
// //               <p className="text-muted-foreground">
// //                 {step === 1 ? 'Join the DevPool community today' : 'GitHub connection is mandatory for all users'}
// //               </p>
// //             </div>

// //             <motion.div className="glass-card">
// //               {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-400">{error}</div>}

// //               {/* === STEP 1: REGISTRATION FORM === */}
// //               {step === 1 && (
// //                 <form onSubmit={handleSubmit}>
// //                   <div className="mb-5">
// //                     <label className="block text-sm font-medium mb-2">Full Name</label>
// //                     <div className="relative">
// //                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// //                       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required />
// //                     </div>
// //                   </div>

// //                   <div className="mb-5">
// //                     <label className="block text-sm font-medium mb-2">Email</label>
// //                     <div className="relative">
// //                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// //                       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required />
// //                     </div>
// //                   </div>

// //                   <div className="mb-6">
// //                     <label className="block text-sm font-medium mb-2">Password</label>
// //                     <div className="relative">
// //                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// //                       <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required minLength={8} />
// //                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
// //                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <motion.button type="submit" disabled={isLoading} className="w-full btn-neon flex items-center justify-center gap-2">
// //                     {isLoading ? 'Creating...' : <><span>Continue to Step 2</span><ArrowRight className="w-4 h-4" /></>}
// //                   </motion.button>
// //                 </form>
// //               )}

// //               {/* === STEP 2: GITHUB CONNECTION === */}
// //               {step === 2 && (
// //                 <div className="text-center py-4">
// //                   <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
// //                     <User className="w-8 h-8" />
// //                   </div>
// //                   <h3 className="text-xl font-bold text-foreground mb-2">Account Created!</h3>
                  
// //                   {/* Clear confirmation message about emails */}
// //                   <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6 text-left">
// //                     <p className="text-foreground text-sm mb-2 flex items-start gap-2">
// //                       <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
// //                       Logged in as: <strong className="ml-1">{email}</strong>
// //                     </p>
// //                     <p className="text-muted-foreground text-xs">
// //                       To activate the Trust Engine, you must link your GitHub profile. 
// //                       <strong className="text-foreground"> It is perfectly fine if your GitHub uses a different email address.</strong> We will securely link it to this DevPool account.
// //                     </p>
// //                   </div>

// //                   <button 
// //                     onClick={handleLinkGitHub} 
// //                     className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-white/10"
// //                   >
// //                     <Github className="w-5 h-5" /> Connect GitHub Account
// //                   </button>

// //                   {/* Note: The 'Skip for now' button has been removed as GitHub is mandatory */}
// //                 </div>
// //               )}

// //             </motion.div>

// //             {step === 1 && (
// //               <p className="text-center mt-6 text-sm text-muted-foreground">
// //                 Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
// //               </p>
// //             )}
// //           </motion.div>
// //         </div>
// //       </section>
// //     </PageLayout>
// //   );
// // };

// // export default Register;





// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, AlertCircle, Briefcase, Linkedin, Globe, Terminal } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { supabase } from '@/lib/supabase';

// const Register = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
  
//   // Initialize step based on URL (Allows returning to Step 3 after GitHub redirect)
//   const [step, setStep] = useState(Number(searchParams.get('step')) || 1); 
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   // Step 3 States
//   const [selectedRole, setSelectedRole] = useState<'none' | 'developer' | 'founder'>('none');
//   const [linkedin, setLinkedin] = useState('');
//   const [website, setWebsite] = useState('');

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // === STEP 1: CREATE ACCOUNT ===
//   const handleSubmitStep1 = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         // Default everyone to learner first
//         data: { full_name: name, role: 'learner' } 
//       }
//     });

//     if (error) {
//       setError(error.message);
//       setIsLoading(false);
//     } else {
//       setIsLoading(false);
//       setStep(2); 
//     }
//   };

//   // === STEP 2: LINK GITHUB ===
//   const handleLinkGitHub = async () => {
//     setError(null);
//     const { error } = await supabase.auth.linkIdentity({
//       provider: 'github',
//       // Redirect back to Step 3 instead of Dashboard!
//       options: { redirectTo: `${window.location.origin}/register?step=3` } 
//     });

//     if (error) setError(error.message);
//   };

//   // === STEP 3: FINISH REGISTRATION ===
//   const handleFinishRegistration = async () => {
//     setIsLoading(true);
//     setError(null);

//     if (selectedRole === 'developer') {
//       // They are already a learner/developer from Step 1, just go to dashboard
//       navigate('/dashboard');
//     } else if (selectedRole === 'founder') {
//       // Update their metadata to pending_founder and save their links
//       const { error } = await supabase.auth.updateUser({
//         data: { 
//           role: 'pending_founder', 
//           linkedin_url: linkedin, 
//           company_website: website 
//         }
//       });

//       if (error) {
//         setError(error.message);
//         setIsLoading(false);
//       } else {
//         navigate('/dashboard');
//       }
//     }
//   };

//   return (
//     <PageLayout showFooter={false}>
//       <section className="min-h-screen flex items-center justify-center py-20 relative">
//         <div className="absolute inset-0 radial-overlay pointer-events-none" />

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-md mx-auto">
            
//             <div className="text-center mb-8">
//               <Link to="/" className="inline-flex items-center space-x-2 mb-8">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                   <span className="text-primary-foreground font-bold text-xl">D</span>
//                 </div>
//                 <span className="font-display font-bold text-2xl gradient-text">DevPool</span>
//               </Link>
//               <h1 className="text-3xl font-display font-bold mb-2">
//                 {step === 1 && 'Create your account'}
//                 {step === 2 && 'Verify Your Identity'}
//                 {step === 3 && 'Choose Your Path'}
//               </h1>
//               <p className="text-muted-foreground">
//                 {step === 1 && 'Join the DevPool community today'}
//                 {step === 2 && 'GitHub connection is mandatory for all users'}
//                 {step === 3 && 'How will you be using DevPool?'}
//               </p>
//             </div>

//             <motion.div className="glass-card overflow-hidden">
//               {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-400">{error}</div>}

//               {/* === STEP 1: REGISTRATION FORM === */}
//               {step === 1 && (
//                 <form onSubmit={handleSubmitStep1}>
//                   <div className="mb-5">
//                     <label className="block text-sm font-medium mb-2">Full Name</label>
//                     <div className="relative">
//                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required />
//                     </div>
//                   </div>

//                   <div className="mb-5">
//                     <label className="block text-sm font-medium mb-2">Email</label>
//                     <div className="relative">
//                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required />
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium mb-2">Password</label>
//                     <div className="relative">
//                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                       <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required minLength={8} />
//                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   <motion.button type="submit" disabled={isLoading} className="w-full btn-neon flex items-center justify-center gap-2">
//                     {isLoading ? 'Creating...' : <><span>Continue to Step 2</span><ArrowRight className="w-4 h-4" /></>}
//                   </motion.button>
//                 </form>
//               )}

//               {/* === STEP 2: GITHUB CONNECTION === */}
//               {step === 2 && (
//                 <div className="text-center py-4">
//                   <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Github className="w-8 h-8" />
//                   </div>
//                   <h3 className="text-xl font-bold text-foreground mb-2">Account Created!</h3>
                  
//                   <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6 text-left">
//                     <p className="text-foreground text-sm mb-2 flex items-start gap-2">
//                       <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
//                       Logged in as: <strong className="ml-1">{email}</strong>
//                     </p>
//                     <p className="text-muted-foreground text-xs">
//                       To activate the Trust Engine, you must link your GitHub profile. 
//                       <strong className="text-foreground"> It is perfectly fine if your GitHub uses a different email address.</strong> We will securely link it to this DevPool account.
//                     </p>
//                   </div>

//                   <button onClick={handleLinkGitHub} className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mb-4 border border-white/10">
//                     <Github className="w-5 h-5" /> Connect GitHub Account
//                   </button>
//                 </div>
//               )}

//               {/* === STEP 3: ROLE SELECTION === */}
//               {step === 3 && (
//                 <div className="py-2">
                  
//                   {/* Option 1: Developer/Learner */}
//                   <div 
//                     onClick={() => setSelectedRole('developer')}
//                     className={`p-4 rounded-xl border cursor-pointer transition-all mb-4 flex items-center gap-4 ${selectedRole === 'developer' ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
//                   >
//                     <div className={`p-3 rounded-full ${selectedRole === 'developer' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
//                       <Terminal className="w-6 h-6" />
//                     </div>
//                     <div className="text-left">
//                       <h4 className="font-bold text-foreground">Developer / Learner</h4>
//                       <p className="text-xs text-muted-foreground">I want to build projects and verify my skills.</p>
//                     </div>
//                   </div>

//                   {/* Option 2: Founder */}
//                   <div 
//                     onClick={() => setSelectedRole('founder')}
//                     className={`p-4 rounded-xl border cursor-pointer transition-all mb-6 flex items-center gap-4 ${selectedRole === 'founder' ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
//                   >
//                     <div className={`p-3 rounded-full ${selectedRole === 'founder' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
//                       <Briefcase className="w-6 h-6" />
//                     </div>
//                     <div className="text-left">
//                       <h4 className="font-bold text-foreground">Startup Founder</h4>
//                       <p className="text-xs text-muted-foreground">I want to recruit verified developers for my project.</p>
//                     </div>
//                   </div>

//                   {/* Founder Extra Inputs */}
//                   {selectedRole === 'founder' && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">LinkedIn Profile URL</label>
//                         <div className="relative">
//                           <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                           <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourprofile" className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground focus:border-primary/50 outline-none" required />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Company Website</label>
//                         <div className="relative">
//                           <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                           <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourstartup.com" className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground focus:border-primary/50 outline-none" required />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   <button 
//                     onClick={handleFinishRegistration} 
//                     disabled={selectedRole === 'none' || isLoading || (selectedRole === 'founder' && (!linkedin || !website))}
//                     className="w-full btn-neon flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? 'Saving...' : <><span>Complete Registration</span><ArrowRight className="w-4 h-4" /></>}
//                   </button>

//                 </div>
//               )}

//             </motion.div>

//             {step === 1 && (
//               <p className="text-center mt-6 text-sm text-muted-foreground">
//                 Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
//               </p>
//             )}
//           </motion.div>
//         </div>
//       </section>
//     </PageLayout>
//   );
// };

// export default Register;




import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, AlertCircle, Briefcase, Linkedin, Globe, Terminal } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Initialize step based on URL (Allows returning to Step 3 after GitHub redirect)
  const [step, setStep] = useState(Number(searchParams.get('step')) || 1); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 3 States
  const [selectedRole, setSelectedRole] = useState<'none' | 'developer' | 'founder'>('none');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === STEP 1: CREATE ACCOUNT ===
  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role: 'learner' } 
      }
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setStep(2); 
    }
  };

  // === STEP 2: LINK GITHUB (UPDATED FOR REPO ACCESS) ===
  const handleLinkGitHub = async () => {
    setError(null);
    const { error } = await supabase.auth.linkIdentity({
      provider: 'github',
      options: { 
        redirectTo: `${window.location.origin}/register?step=3`,
        scopes: 'repo workflow' // <--- Added strict scopes here!
      } 
    });

    if (error) setError(error.message);
  };

  // === STEP 3: FINISH REGISTRATION ===
  const handleFinishRegistration = async () => {
    setIsLoading(true);
    setError(null);

    if (selectedRole === 'developer') {
      navigate('/dashboard');
    } else if (selectedRole === 'founder') {
      const { error } = await supabase.auth.updateUser({
        data: { 
          role: 'pending_founder', 
          linkedin_url: linkedin, 
          company_website: website 
        }
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <PageLayout showFooter={false}>
      <section className="min-h-screen flex items-center justify-center py-20 relative">
        <div className="absolute inset-0 radial-overlay pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-md mx-auto">
            
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">D</span>
                </div>
                <span className="font-display font-bold text-2xl gradient-text">DevPool</span>
              </Link>
              <h1 className="text-3xl font-display font-bold mb-2">
                {step === 1 && 'Create your account'}
                {step === 2 && 'Verify Your Identity'}
                {step === 3 && 'Choose Your Path'}
              </h1>
              <p className="text-muted-foreground">
                {step === 1 && 'Join the DevPool community today'}
                {step === 2 && 'GitHub connection is mandatory for all users'}
                {step === 3 && 'How will you be using DevPool?'}
              </p>
            </div>

            <motion.div className="glass-card overflow-hidden">
              {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-400">{error}</div>}

              {/* === STEP 1: REGISTRATION FORM === */}
              {step === 1 && (
                <form onSubmit={handleSubmitStep1}>
                  <div className="mb-5">
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary/50 outline-none transition-all" required minLength={8} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <motion.button type="submit" disabled={isLoading} className="w-full btn-neon flex items-center justify-center gap-2">
                    {isLoading ? 'Creating...' : <><span>Continue to Step 2</span><ArrowRight className="w-4 h-4" /></>}
                  </motion.button>
                </form>
              )}

              {/* === STEP 2: GITHUB CONNECTION === */}
              {step === 2 && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Github className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Account Created!</h3>
                  
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6 text-left">
                    <p className="text-foreground text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Logged in as: <strong className="ml-1">{email}</strong>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      To activate the Trust Engine, you must link your GitHub profile. 
                      <strong className="text-foreground"> It is perfectly fine if your GitHub uses a different email address.</strong> We will securely link it to this DevPool account.
                    </p>
                  </div>

                  <button onClick={handleLinkGitHub} className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mb-4 border border-white/10">
                    <Github className="w-5 h-5" /> Connect GitHub Account
                  </button>
                </div>
              )}

              {/* === STEP 3: ROLE SELECTION === */}
              {step === 3 && (
                <div className="py-2">
                  
                  <div 
                    onClick={() => setSelectedRole('developer')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all mb-4 flex items-center gap-4 ${selectedRole === 'developer' ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
                  >
                    <div className={`p-3 rounded-full ${selectedRole === 'developer' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-foreground">Developer / Learner</h4>
                      <p className="text-xs text-muted-foreground">I want to build projects and verify my skills.</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedRole('founder')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all mb-6 flex items-center gap-4 ${selectedRole === 'founder' ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
                  >
                    <div className={`p-3 rounded-full ${selectedRole === 'founder' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-foreground">Startup Founder</h4>
                      <p className="text-xs text-muted-foreground">I want to recruit verified developers for my project.</p>
                    </div>
                  </div>

                  {selectedRole === 'founder' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn Profile URL</label>
                        <div className="relative">
                          <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourprofile" className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground focus:border-primary/50 outline-none" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Website</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourstartup.com" className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground focus:border-primary/50 outline-none" required />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <button 
                    onClick={handleFinishRegistration} 
                    disabled={selectedRole === 'none' || isLoading || (selectedRole === 'founder' && (!linkedin || !website))}
                    className="w-full btn-neon flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : <><span>Complete Registration</span><ArrowRight className="w-4 h-4" /></>}
                  </button>

                </div>
              )}

            </motion.div>

            {step === 1 && (
              <p className="text-center mt-6 text-sm text-muted-foreground">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Register;