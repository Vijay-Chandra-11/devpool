import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import RoleSwitcher from "@/components/common/RoleSwitcher";


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Dashboard', path: '/dashboard' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-neon px-5 py-2.5 text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-white/5"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block btn-neon text-center text-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X } from 'lucide-react';
// import RoleSwitcher from "@/components/common/RoleSwitcher";

// const navLinks = [
//   { name: 'Home', path: '/' },
//   { name: 'Projects', path: '/projects' },
//   { name: 'Dashboard', path: '/dashboard' },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   // 🔹 TEMP: Replace with real auth later
//   const isLoggedIn = true;

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
//               <span className="font-display font-bold text-xl gradient-text">
//                 DevPool
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                     location.pathname === link.path
//                       ? 'text-primary bg-primary/10'
//                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Right Section */}
//             <div className="hidden md:flex items-center space-x-3">
//               {isLoggedIn ? (
//                 <>
//                   {/* 🔹 ROLE SWITCHER */}
//                   <RoleSwitcher />
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="btn-neon px-5 py-2.5 text-sm"
//                   >
//                     Get Started
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
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
//             className="md:hidden glass border-b border-white/5"
//           >
//             <div className="container mx-auto px-4 py-4 space-y-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
//                     location.pathname === link.path
//                       ? 'text-primary bg-primary/10'
//                       : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}

//               <div className="pt-4 space-y-2 border-t border-white/10">
//                 {isLoggedIn ? (
//                   <div className="px-4">
//                     <RoleSwitcher />
//                   </div>
//                 ) : (
//                   <>
//                     <Link
//                       to="/login"
//                       onClick={() => setIsOpen(false)}
//                       className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       to="/register"
//                       onClick={() => setIsOpen(false)}
//                       className="block btn-neon text-center text-sm"
//                     >
//                       Get Started
//                     </Link>
//                   </>
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
