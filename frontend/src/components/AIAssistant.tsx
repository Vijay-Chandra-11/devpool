import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, MessageSquareCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  currentCode: string;
  activeFile: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentCode, activeFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your DevPool AI Tutor. What would you like to know about the code?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is missing in .env");

      // Filter out any previous error messages so we don't break Gemini's strict role rules
      const validHistory = messages.slice(1).filter(msg => !msg.content.startsWith('❌'));
      
      const formattedHistory = validHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // Create the payload using Gemini's official system_instruction format
      const payload = {
        system_instruction: {
          parts: [{ 
            text: "You are an expert, helpful programming tutor for a platform called DevPool. Answer the user's questions clearly and concisely. Keep explanations beginner-friendly." 
          }]
        },
        contents: [
          ...formattedHistory,
          { 
            role: "user", 
            parts: [{ 
              text: `Here is the code the user is currently looking at in the file named "${activeFile}":\n\n\`\`\`\n${currentCode}\n\`\`\`\n\nBased ONLY on this code, answer the following question: ${userMessage}` 
            }] 
          }
        ]
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // --- DETAILED ERROR PARSING ---
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Unknown Google API Error');
      }

      const data = await response.json();
      const aiReply = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error: any) {
      console.error("Gemini Fetch Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ Error: ${error.message}` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 h-[500px] mb-4 bg-[#1e293b] border border-blue-500/30 shadow-2xl shadow-blue-500/10 rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0f172a] p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">AI Code Tutor</h3>
                  <p className="text-xs text-blue-400">Gemini 1.5 Flash</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1e293b]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-blue-500/20 text-blue-400'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-[#0f172a] text-gray-200 rounded-tl-none border border-white/5'}`}>
                    {/* Render markdown formatting simply */}
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-1 last:mb-0 min-h-[1em]">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0f172a] border border-white/5 flex items-center gap-2 text-sm text-gray-400 rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 bg-[#0f172a] border-t border-white/10">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Ask about ${activeFile || 'the code'}...`}
                  className="w-full bg-[#1e293b] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-lg text-white transition-colors shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING ACTION BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-blue-400/30 relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquareCode className="w-6 h-6" />}
      </motion.button>
      
    </div>
  );
};

export default AIAssistant;