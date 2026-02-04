import { motion } from 'framer-motion';
import { Briefcase, Code2, GraduationCap, Brain, Rocket, Target } from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'For Founders',
    description: 'Post real-world projects and find talented developers to bring your vision to life.',
    color: 'text-neon-cyan',
    gradient: 'from-neon-cyan/20 to-transparent',
  },
  {
    icon: Code2,
    title: 'For Developers',
    description: 'Apply to exciting projects, get paid for your skills, and build your portfolio.',
    color: 'text-neon-purple',
    gradient: 'from-neon-purple/20 to-transparent',
  },
  {
    icon: GraduationCap,
    title: 'For Learners',
    description: 'Join live projects to learn by doing and accelerate your development journey.',
    color: 'text-neon-pink',
    gradient: 'from-neon-pink/20 to-transparent',
  },
  {
    icon: Brain,
    title: 'AI Focus Module',
    description: 'Personalized productivity and learning powered by intelligent task scheduling.',
    color: 'text-neon-cyan',
    gradient: 'from-neon-cyan/20 to-transparent',
  },
  {
    icon: Rocket,
    title: 'Real-Time Collaboration',
    description: 'Work together seamlessly with integrated tools and live communication.',
    color: 'text-neon-purple',
    gradient: 'from-neon-purple/20 to-transparent',
  },
  {
    icon: Target,
    title: 'Progress Tracking',
    description: 'Visual dashboards to track milestones, productivity, and learning goals.',
    color: 'text-neon-pink',
    gradient: 'from-neon-pink/20 to-transparent',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Everything you need to{' '}
            <span className="gradient-text">succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete ecosystem designed for collaboration, learning, and building amazing products together.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card h-full group cursor-pointer"
              >
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/10 flex items-center justify-center mb-6 group-hover:neon-glow transition-all duration-500`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
