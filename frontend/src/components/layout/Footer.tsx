import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'Features', path: '#features' },
      { name: 'Projects', path: '/projects' },
      { name: 'Pricing', path: '#pricing' },
      { name: 'Roadmap', path: '#roadmap' },
    ],
    Company: [
      { name: 'About', path: '#about' },
      { name: 'Careers', path: '#careers' },
      { name: 'Blog', path: '#blog' },
      { name: 'Press', path: '#press' },
    ],
    Resources: [
      { name: 'Documentation', path: '#docs' },
      { name: 'Help Center', path: '#help' },
      { name: 'Community', path: '#community' },
      { name: 'API', path: '#api' },
    ],
    Legal: [
      { name: 'Privacy', path: '#privacy' },
      { name: 'Terms', path: '#terms' },
      { name: 'Cookies', path: '#cookies' },
      { name: 'Licenses', path: '#licenses' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text">DevPool</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              The unified collaboration platform connecting founders, developers, and learners. Build. Learn. Collaborate.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevPool. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-red-500"
            >
              ♥
            </motion.span>
            <span>for developers</span>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
};

export default Footer;
