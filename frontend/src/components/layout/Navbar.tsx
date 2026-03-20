// // import { useState } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Menu, X } from 'lucide-react';
// // import RoleSwitcher from "@/components/common/RoleSwitcher";


// // const navLinks = [
// //   { name: 'Home', path: '/' },
// //   { name: 'Projects', path: '/projects' },
// //   { name: 'Dashboard', path: '/dashboard' },
// // ];

// // export const Navbar = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const location = useLocation();

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 z-50">
// //       <div className="glass border-b border-white/5">
// //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16 md:h-20">
// //             {/* Logo */}
// //             <Link to="/" className="flex items-center space-x-2">
// //               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// //                 <span className="text-primary-foreground font-bold text-lg">D</span>
// //               </div>
// //               <span className="font-display font-bold text-xl gradient-text">DevPool</span>
// //             </Link>

// //             {/* Desktop Navigation */}
// //             <div className="hidden md:flex items-center space-x-1">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.path}
// //                   to={link.path}
// //                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
// //                     location.pathname === link.path
// //                       ? 'text-primary bg-primary/10'
// //                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
// //                   }`}
// //                 >
// //                   {link.name}
// //                 </Link>
// //               ))}
// //             </div>

// //             {/* Auth Buttons */}
// //             <div className="hidden md:flex items-center space-x-3">
// //               <Link
// //                 to="/login"
// //                 className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
// //               >
// //                 Sign In
// //               </Link>
// //               <Link
// //                 to="/register"
// //                 className="btn-neon px-5 py-2.5 text-sm"
// //               >
// //                 Get Started
// //               </Link>
// //             </div>

// //             {/* Mobile Menu Button */}
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
// //             >
// //               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -10 }}
// //             transition={{ duration: 0.2 }}
// //             className="md:hidden glass border-b border-white/5"
// //           >
// //             <div className="container mx-auto px-4 py-4 space-y-2">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.path}
// //                   to={link.path}
// //                   onClick={() => setIsOpen(false)}
// //                   className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
// //                     location.pathname === link.path
// //                       ? 'text-primary bg-primary/10'
// //                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
// //                   }`}
// //                 >
// //                   {link.name}
// //                 </Link>
// //               ))}
// //               <div className="pt-4 space-y-2 border-t border-white/10">
// //                 <Link
// //                   to="/login"
// //                   onClick={() => setIsOpen(false)}
// //                   className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
// //                 >
// //                   Sign In
// //                 </Link>
// //                 <Link
// //                   to="/register"
// //                   onClick={() => setIsOpen(false)}
// //                   className="block btn-neon text-center text-sm"
// //                 >
// //                   Get Started
// //                 </Link>
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Home, FolderKanban, LayoutDashboard, Terminal } from 'lucide-react';
// import RoleSwitcher from "@/components/common/RoleSwitcher";

// // Updated navLinks with Icons
// const navLinks = [
//   { 
//     name: 'Home', 
//     path: '/', 
//     icon: <Home className="w-4 h-4" /> 
//   },
//   { 
//     name: 'Projects', 
//     path: '/projects', 
//     icon: <FolderKanban className="w-4 h-4" /> 
//   },
//   { 
//     name: 'Dashboard', 
//     path: '/dashboard', 
//     icon: <LayoutDashboard className="w-4 h-4" /> 
//   },
//   { 
//     name: 'Live Editor', 
//     path: '/editor', 
//     icon: <Terminal className="w-4 h-4" /> 
//   },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50">
//       <div className="glass border-b border-white/5">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-lg">D</span>
//               </div>
//               <span className="font-display font-bold text-xl gradient-text">DevPool</span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                     location.pathname === link.path
//                       ? 'text-primary bg-primary/10'
//                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
//                   }`}
//                 >
//                   {link.icon}
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Auth Buttons */}
//             <div className="hidden md:flex items-center space-x-3">
//               <Link
//                 to="/login"
//                 className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="btn-neon px-5 py-2.5 text-sm"
//               >
//                 Get Started
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="md:hidden glass border-b border-white/5 absolute w-full bg-[#0f172a]" // Added bg color for better mobile visibility
//           >
//             <div className="container mx-auto px-4 py-4 space-y-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
//                     location.pathname === link.path
//                       ? 'text-primary bg-primary/10'
//                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
//                   }`}
//                 >
//                   {link.icon}
//                   {link.name}
//                 </Link>
//               ))}
//               <div className="pt-4 space-y-2 border-t border-white/10">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsOpen(false)}
//                   className="block btn-neon text-center text-sm mx-4"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;




// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Home, FolderKanban, LayoutDashboard, Terminal, LogOut } from 'lucide-react';
// import { supabase } from '@/lib/supabase';

// // Updated navLinks with Icons
// const navLinks = [
//   { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
//   { name: 'Projects', path: '/projects', icon: <FolderKanban className="w-4 h-4" /> },
//   { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
//   { name: 'Live Editor', path: '/editor', icon: <Terminal className="w-4 h-4" /> },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Listen for Supabase Login Status
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate('/');
//   };

//   // Filter links: If not logged in, only show 'Home'
//   const visibleLinks = user ? navLinks : navLinks.filter(link => link.name === 'Home');

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50">
//       <div className="glass border-b border-white/5">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-lg">D</span>
//               </div>
//               <span className="font-display font-bold text-xl gradient-text">DevPool</span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {visibleLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                     location.pathname === link.path
//                       ? 'text-primary bg-primary/10'
//                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
//                   }`}
//                 >
//                   {link.icon}
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Auth Buttons / Profile */}
//             <div className="hidden md:flex items-center space-x-3">
//               {!user ? (
//                 <>
//                   <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//                     Sign In
//                   </Link>
//                   <Link to="/register" className="btn-neon px-5 py-2.5 text-sm">
//                     Get Started
//                   </Link>
//                 </>
//               ) : (
//                 <div className="flex items-center gap-4">
//                   <Link to="/dashboard" className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
//                     <img 
//                       src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
//                       alt="Profile" 
//                       className="w-8 h-8 rounded-full border border-white/20"
//                     />
//                     <span className="text-sm font-medium truncate max-w-[100px] text-white">
//                       {user.user_metadata?.full_name || 'User'}
//                     </span>
//                   </Link>
//                   <button onClick={handleLogout} className="text-muted-foreground hover:text-red-400 transition-colors p-2">
//                     <LogOut className="w-5 h-5" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
//             className="md:hidden glass border-b border-white/5 absolute w-full bg-[#0f172a]"
//           >
//             <div className="container mx-auto px-4 py-4 space-y-2">
//               {visibleLinks.map((link) => (
//                 <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${location.pathname === link.path ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
//                   {link.icon} {link.name}
//                 </Link>
//               ))}
//               <div className="pt-4 space-y-2 border-t border-white/10">
//                 {!user ? (
//                   <>
//                     <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">Sign In</Link>
//                     <Link to="/register" onClick={() => setIsOpen(false)} className="block btn-neon text-center text-sm mx-4">Get Started</Link>
//                   </>
//                 ) : (
//                   <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-white/5 text-left">
//                     <LogOut className="w-4 h-4" /> Log Out
//                   </button>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FolderKanban, LayoutDashboard, Terminal, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Updated navLinks with requested order and Home removed
const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: 'Projects', path: '/projects', icon: <FolderKanban className="w-4 h-4" /> },
  { name: 'Live Editor', path: '/editor', icon: <Terminal className="w-4 h-4" /> },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for Supabase Login Status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Filter links: If not logged in, show an empty array (no links)
  const visibleLinks = user ? navLinks : [];

  // Grab the manually entered name, fallback to 'User'
  const displayName = user?.user_metadata?.full_name || 'User';
  
  // Create a clean, Google-style Avatar using their initials
  const googleStyleAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=fff&rounded=true&bold=true`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text">DevPool</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons / Profile */}
            <div className="hidden md:flex items-center space-x-3">
              {!user ? (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-neon px-5 py-2.5 text-sm">
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
                    {/* Google-Style Avatar */}
                    <img 
                      src={googleStyleAvatar} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border border-white/10 shadow-sm"
                    />
                    {/* Manually Entered Name */}
                    <span className="text-sm font-medium truncate max-w-[120px] text-white">
                      {displayName}
                    </span>
                  </Link>
                  <button onClick={handleLogout} className="text-muted-foreground hover:text-red-400 transition-colors p-2">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-white/5 absolute w-full bg-[#0f172a]"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {visibleLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${location.pathname === link.path ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                  {link.icon} {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-white/10">
                {!user ? (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">Sign In</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block btn-neon text-center text-sm mx-4">Get Started</Link>
                  </>
                ) : (
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-white/5 text-left">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;