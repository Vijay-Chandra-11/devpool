import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/20 via-secondary/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card max-w-4xl mx-auto text-center py-12 lg:py-16 px-8 lg:px-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to start{' '}
              <span className="gradient-text">building</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Join thousands of founders, developers, and learners already collaborating on DevPool.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/role-selection" className="btn-neon group flex items-center gap-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/projects" className="btn-glass">
                Explore Projects
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
