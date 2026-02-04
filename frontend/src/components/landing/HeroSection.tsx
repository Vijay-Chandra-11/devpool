import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import HeroScene from '../3d/HeroScene';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 radial-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Collaboration Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            <span className="gradient-text">Build. Learn.</span>
            <br />
            <span className="text-foreground">Collaborate.</span>
            <br />
            <span className="text-muted-foreground">In Real Time.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            The unified platform where startup founders post real-world projects, 
            developers get paid for their skills, and learners grow by building live systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/role-selection" className="btn-neon group flex items-center gap-2">
              <span>Post a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/role-selection" className="btn-glass flex items-center gap-2">
              <span>Join as Learner</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {[
              { icon: Users, value: '10K+', label: 'Active Users' },
              { icon: Zap, value: '500+', label: 'Projects' },
              { icon: Sparkles, value: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl sm:text-3xl font-display font-bold gradient-text">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-2 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
