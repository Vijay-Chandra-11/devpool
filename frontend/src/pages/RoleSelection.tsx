import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Code2, GraduationCap, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const roles = [
  {
    id: 'founder',
    title: 'Founder',
    icon: Briefcase,
    description: 'Post your projects and find talented developers to bring your vision to life.',
    features: ['Post unlimited projects', 'Access developer pool', 'Project management tools', 'Payment integration'],
    color: 'neon-cyan',
    gradient: 'from-[hsl(185,100%,50%)] to-[hsl(220,90%,60%)]',
  },
  {
    id: 'developer',
    title: 'Developer',
    icon: Code2,
    description: 'Apply to exciting projects, get paid for your skills, and grow your portfolio.',
    features: ['Browse paid projects', 'Build your portfolio', 'Earn while learning', 'Remote flexibility'],
    color: 'neon-purple',
    gradient: 'from-[hsl(270,70%,60%)] to-[hsl(330,80%,60%)]',
  },
  {
    id: 'learner',
    title: 'Learner',
    icon: GraduationCap,
    description: 'Join live projects to learn by doing and accelerate your development journey.',
    features: ['Learn by building', 'Mentorship access', 'AI-powered learning', 'Real experience'],
    color: 'neon-pink',
    gradient: 'from-[hsl(330,80%,60%)] to-[hsl(270,70%,60%)]',
  },
];

const RoleSelection = () => {
  return (
    <PageLayout>
      <section className="min-h-screen py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Choose your <span className="gradient-text">path</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Select the role that best describes you. You can always change this later.
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto perspective-1000">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="preserve-3d"
              >
                <motion.div
                  whileHover={{ 
                    y: -12, 
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="glass-card h-full flex flex-col group cursor-pointer relative overflow-hidden"
                >
                  {/* Glow effect */}
                  <div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${role.gradient}`} 
                  />

                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {role.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.gradient} mr-3`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link 
                    to="/register" 
                    className={`mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${role.gradient} text-white group-hover:shadow-lg`}
                  >
                    <span>Continue as {role.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-12"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </motion.p>
        </div>
      </section>
    </PageLayout>
  );
};

export default RoleSelection;
