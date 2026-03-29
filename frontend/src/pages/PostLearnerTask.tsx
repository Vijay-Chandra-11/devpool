import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, FileText, AlignLeft, Layers, Gift, DollarSign, Send, Loader2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { supabase } from '@/lib/supabase';

const PostLearnerTask = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form States
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [paymentType, setPaymentType] = useState<'free' | 'fees'>('free');
  const [feeAmount, setFeeAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert("You must be logged in to post a task.");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('learner_tasks').insert({
        user_id: session.user.id,
        title,
        summary,
        description,
        tech_stack: techStack,
        payment_type: paymentType,
        fee_amount: paymentType === 'fees' ? parseFloat(feeAmount) : null
      });

      if (error) throw error;

      // Success! Redirect to the dashboard or task board
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("Error posting task:", error);
      alert(error.message || "Failed to post task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Post a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Learner's Task</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Need help from a developer while you learn? Post a structured task, define your tech stack, and set your terms.
          </p>
        </motion.div>

        {/* The Form Card */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-10"
        >
          <div className="space-y-8">
            
            {/* 1. Project Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                <Code className="w-4 h-4 text-primary" /> Project Title
              </label>
              <input 
                required
                type="text"
                placeholder="e.g., Build a responsive navbar for my portfolio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* 2. Brief Summary */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-primary" /> Brief Summary
              </label>
              <input 
                required
                type="text"
                placeholder="A short one-sentence description of the goal"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* 3. Detailed Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                <AlignLeft className="w-4 h-4 text-primary" /> Detailed Task Description
              </label>
              <textarea 
                required
                rows={5}
                placeholder="Describe exactly what needs to be done, any specific requirements, and what you hope to learn from it..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-gray-600"
              />
            </div>

            {/* 4. Tech Stack Needed */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-primary" /> Tech Stack Needed
              </label>
              <input 
                required
                type="text"
                placeholder="e.g., React, TailwindCSS, Node.js (comma separated)"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* 5. Payment Options & Dynamic Fee Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-primary" /> Task Compensation
              </label>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                
                {/* Free Button */}
                <button 
                  type="button"
                  onClick={() => { setPaymentType('free'); setFeeAmount(''); }}
                  className={`flex-1 w-full sm:w-auto p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 ${
                    paymentType === 'free' 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <Gift className="w-5 h-5" /> 
                  <span className="font-bold">Free (Volunteer)</span>
                </button>

                {/* Fees Button */}
                <button 
                  type="button"
                  onClick={() => setPaymentType('fees')}
                  className={`flex-1 w-full sm:w-auto p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 ${
                    paymentType === 'fees' 
                      ? 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <DollarSign className="w-5 h-5" /> 
                  <span className="font-bold">Paid Task</span>
                </button>

                {/* Animated Textbox (Only shows if 'Fees' is selected) */}
                <AnimatePresence>
                  {paymentType === 'fees' && (
                    <motion.div 
                      initial={{ width: 0, opacity: 0, scale: 0.8 }}
                      animate={{ width: 'auto', opacity: 1, scale: 1 }}
                      exit={{ width: 0, opacity: 0, scale: 0.8 }}
                      className="relative w-full sm:w-48 overflow-hidden"
                    >
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-green-500 font-bold">$</span>
                      </div>
                      <input 
                        required
                        type="number"
                        min="1"
                        placeholder="Amount"
                        value={feeAmount}
                        onChange={(e) => setFeeAmount(e.target.value)}
                        className="w-full bg-black/40 border border-green-500/30 rounded-xl py-4 pl-8 pr-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-600"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/10">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-neon py-4 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Send className="w-6 h-6" /> Confirm and Post Project
                  </>
                )}
              </button>
            </div>

          </div>
        </motion.form>

      </div>
    </PageLayout>
  );
};

export default PostLearnerTask;