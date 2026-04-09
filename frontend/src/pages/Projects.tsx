// import { useState, useMemo, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, X, Terminal, Brain, Loader2, FolderKanban } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { ProjectCard } from '@/components/projects/ProjectCard';
// import { techStackOptions, difficultyOptions, typeOptions } from '@/data/projects';
// import { useMode } from '@/context/ModeContext';
// import { supabase } from '../lib/supabase';

// const Projects = () => {
//   const { mode } = useMode(); 
  
//   const [projects, setProjects] = useState<any[]>([]); 
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Filter States
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTech, setSelectedTech] = useState<string[]>([]);
//   const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
//   const [selectedType, setSelectedType] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     let isMounted = true; 
    
//     const fetchProjects = async () => {
//       setIsLoading(true);
//       if (isMounted) setProjects([]); 

//       try {
//         if (mode === 'developer') {
//           const { data, error } = await supabase
//             .from('developer_projects')
//             .select('*')
//             .order('created_at', { ascending: false });

//           if (error) throw error;

//           if (isMounted && data) {
//             const formattedProjects = data.map((p: any) => ({
//               id: p.id,
//               title: p.title,
//               description: p.summary || p.task_description || 'No description provided.',
//               founder: { name: 'Founder', avatar: 'F' }, 
//               techStack: p.tech_stack || [],
//               difficulty: 'Advanced', 
//               type: 'Paid', 
//               timeline: 'Flexible',
//               applicants: 0,
//               spotsLeft: 1,
//               createdAt: p.created_at || new Date().toISOString(),
//             }));
//             setProjects(formattedProjects);
//           }
//         } else if (mode === 'learner') {
//           const { data, error } = await supabase
//             .from('learner_tasks')
//             .select('*')
//             .order('created_at', { ascending: false });

//           if (error) throw error;

//           if (isMounted && data) {
//             const formattedProjects = data.map((p: any) => ({
//               id: p.id,
//               title: p.title,
//               description: p.summary || p.description || 'No description provided.',
//               founder: { name: 'Founder', avatar: 'F' }, 
//               techStack: typeof p.tech_stack === 'string' ? p.tech_stack.split(',').map((t: string) => t.trim()) : p.tech_stack || [],
//               difficulty: 'Beginner', 
//               type: p.payment_type === 'fees' ? 'Paid' : 'Open Source',
//               paymentType: p.payment_type, 
//               feeAmount: p.fee_amount,     
//               timeline: 'Flexible',
//               applicants: 0,
//               spotsLeft: 1,
//               createdAt: p.created_at || new Date().toISOString(),
//             }));
//             setProjects(formattedProjects);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//       } finally {
//         if (isMounted) setIsLoading(false);
//       }
//     };

//     fetchProjects();

//     return () => {
//       isMounted = false; 
//     };
//   }, [mode]);

//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchesSearch =
//         project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         project.description.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesTech =
//         selectedTech.length === 0 ||
//         selectedTech.some((tech: string) => project.techStack.includes(tech));

//       const matchesDifficulty =
//         selectedDifficulty.length === 0 ||
//         selectedDifficulty.includes(project.difficulty);

//       const matchesType =
//         selectedType.length === 0 ||
//         selectedType.includes(project.type);

//       return matchesSearch && matchesTech && matchesDifficulty && matchesType;
//     });
//   }, [projects, searchQuery, selectedTech, selectedDifficulty, selectedType]);

//   const toggleFilter = (
//     value: string,
//     selected: string[],
//     setSelected: React.Dispatch<React.SetStateAction<string[]>>
//   ) => {
//     selected.includes(value)
//       ? setSelected(selected.filter((v) => v !== value))
//       : setSelected([...selected, value]);
//   };

//   const clearFilters = () => {
//     setSelectedTech([]);
//     setSelectedDifficulty([]);
//     setSelectedType([]);
//     setSearchQuery('');
//   };

//   const activeFiltersCount = selectedTech.length + selectedDifficulty.length + selectedType.length;

//   return (
//     <PageLayout>
//       <section className="min-h-screen py-20 lg:py-28 relative">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//           {/* DYNAMIC HEADER */}
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
//             <div className="flex justify-center mb-4">
//               {mode === 'developer' ? <Terminal className="w-12 h-12 text-primary" /> : <Brain className="w-12 h-12 text-secondary" />}
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
//               Explore <span className="gradient-text">{mode === 'developer' ? 'Developer' : 'Learner'} Projects</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-xl mx-auto">
//               {mode === 'developer' 
//                 ? "Browse complex, real-world tasks posted by founders. High Trust Score recommended."
//                 : "Find beginner-friendly 'good first issues' to build your skills and portfolio."}
//             </p>
//           </motion.div>

//           {/* SEARCH & FILTER BAR */}
//           <div className="mb-8 flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder={`Search ${mode} projects...`}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 outline-none transition-colors"
//               />
//             </div>

//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-colors ${
//                 showFilters || activeFiltersCount > 0 ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'
//               }`}
//             >
//               <Filter className="w-5 h-5" />
//               Filters
//               {activeFiltersCount > 0 && (
//                 <span className="ml-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
//                   {activeFiltersCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* FILTER PANEL */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card p-6 mb-6 space-y-6 overflow-hidden">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                     <h4 className="text-sm font-medium mb-3 text-white">Project Type</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {typeOptions.map((type) => (
//                         <button key={type} onClick={() => toggleFilter(type, selectedType, setSelectedType)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedType.includes(type) ? 'bg-primary text-white border-primary' : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'}`}>
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium mb-3 text-white">Difficulty</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {difficultyOptions.map((diff) => (
//                         <button key={diff} onClick={() => toggleFilter(diff, selectedDifficulty, setSelectedDifficulty)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedDifficulty.includes(diff) ? 'bg-primary text-white border-primary' : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'}`}>
//                           {diff}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium mb-3 text-white">Tech Stack</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {techStackOptions.map((tech) => (
//                         <button key={tech} onClick={() => toggleFilter(tech, selectedTech, setSelectedTech)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedTech.includes(tech) ? 'bg-primary text-white border-primary' : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'}`}>
//                           {tech}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
//                   <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-red-400 flex items-center transition-colors">
//                     <X className="w-4 h-4 mr-1" /> Clear all filters
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* CONTENT GRID OR EMPTY STATES */}
//           {isLoading ? (
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="w-8 h-8 text-primary animate-spin" />
//             </div>
//           ) : projects.length === 0 ? (
//             <div className="glass-card p-16 text-center mt-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
//               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
//                 <FolderKanban className="w-10 h-10 text-muted-foreground" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-2">No {mode} projects posted yet</h3>
//               <p className="text-muted-foreground max-w-md">Founders haven't posted any tasks for this mode. Check back later!</p>
//             </div>
//           ) : filteredProjects.length === 0 ? (
//             <div className="glass-card p-12 text-center mt-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
//               <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
//               <p className="text-muted-foreground">Try adjusting your filters or search query to see available tasks.</p>
//               {activeFiltersCount > 0 && (
//                 <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 text-sm font-medium transition-colors">
//                   Clear All Filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <>
//               <p className="text-sm text-muted-foreground mb-6">
//                 Showing {filteredProjects.length} {mode} projects
//               </p>

//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <AnimatePresence>
//                   {filteredProjects.map((project, index) => (
//                     <motion.div 
//                       key={project.id} 
//                       initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
//                       className="flex flex-col h-full gap-3"
//                     >
//                       {/* ProjectCard now handles the modal and application internally! */}
//                       <ProjectCard project={project} index={index} />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             </>
//           )}

//         </div>
//       </section>
//     </PageLayout>
//   );
// };

// export default Projects;






import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Terminal, Brain, Loader2, FolderKanban } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { techStackOptions, difficultyOptions, typeOptions } from '@/data/projects';
import { useMode } from '@/context/ModeContext';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const { mode } = useMode(); 
  
  const [projects, setProjects] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let isMounted = true; 
    
    const fetchProjects = async () => {
      setIsLoading(true);
      if (isMounted) setProjects([]); 

      try {
        if (mode === 'developer') {
          const { data, error } = await supabase
            .from('developer_projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          if (isMounted && data) {
            const formattedProjects = data.map((p: any) => ({
              id: p.id,
              title: p.title,
              description: p.summary || p.task_description || 'No description provided.',
              founder: { name: 'Founder', avatar: 'F' }, 
              techStack: p.tech_stack || [],
              difficulty: 'Advanced', 
              type: 'Paid', 
              timeline: 'Flexible',
              applicants: 0,
              spotsLeft: 1,
              createdAt: p.created_at || new Date().toISOString(),
              // --- THE FIX: PASSING THE EVALUATION METHOD TO THE CARD ---
              evaluation_method: p.evaluation_method || [], 
            }));
            setProjects(formattedProjects);
          }
        } else if (mode === 'learner') {
          const { data, error } = await supabase
            .from('learner_tasks')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          if (isMounted && data) {
            const formattedProjects = data.map((p: any) => ({
              id: p.id,
              title: p.title,
              description: p.summary || p.description || 'No description provided.',
              founder: { name: 'Founder', avatar: 'F' }, 
              techStack: typeof p.tech_stack === 'string' ? p.tech_stack.split(',').map((t: string) => t.trim()) : p.tech_stack || [],
              difficulty: 'Beginner', 
              type: p.payment_type === 'fees' ? 'Paid' : 'Open Source',
              paymentType: p.payment_type, 
              feeAmount: p.fee_amount,     
              timeline: 'Flexible',
              applicants: 0,
              spotsLeft: 1,
              createdAt: p.created_at || new Date().toISOString(),
              // --- THE FIX: ADDED HERE TOO JUST IN CASE ---
              evaluation_method: p.evaluation_method || [], 
            }));
            setProjects(formattedProjects);
          }
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false; 
    };
  }, [mode]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTech.length === 0 ||
        selectedTech.some((tech: string) => project.techStack.includes(tech));

      const matchesDifficulty =
        selectedDifficulty.length === 0 ||
        selectedDifficulty.includes(project.difficulty);

      const matchesType =
        selectedType.length === 0 ||
        selectedType.includes(project.type);

      return matchesSearch && matchesTech && matchesDifficulty && matchesType;
    });
  }, [projects, searchQuery, selectedTech, selectedDifficulty, selectedType]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    selected.includes(value)
      ? setSelected(selected.filter((v) => v !== value))
      : setSelected([...selected, value]);
  };

  const clearFilters = () => {
    setSelectedTech([]);
    setSelectedDifficulty([]);
    setSelectedType([]);
    setSearchQuery('');
  };

  const activeFiltersCount = selectedTech.length + selectedDifficulty.length + selectedType.length;

  return (
    <PageLayout>
      <section className="min-h-screen py-20 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* DYNAMIC HEADER */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="flex justify-center mb-4">
              {mode === 'developer' ? <Terminal className="w-12 h-12 text-primary" /> : <Brain className="w-12 h-12 text-secondary" />}
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Explore <span className="gradient-text">{mode === 'developer' ? 'Developer' : 'Learner'} Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {mode === 'developer' 
                ? "Browse complex, real-world tasks posted by founders. High Trust Score recommended."
                : "Find beginner-friendly 'good first issues' to build your skills and portfolio."}
            </p>
          </motion.div>

          {/* SEARCH & FILTER BAR */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${mode} projects...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-colors ${
                showFilters || activeFiltersCount > 0 ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* FILTER PANEL */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card p-6 mb-6 space-y-6 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-white">Project Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {typeOptions.map((type) => (
                        <button key={type} onClick={() => toggleFilter(type, selectedType, setSelectedType)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedType.includes(type) ? 'bg-primary text-white border-primary' : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-white">Difficulty</h4>
                    <div className="flex flex-wrap gap-2">
                      {difficultyOptions.map((diff) => (
                        <button key={diff} onClick={() => toggleFilter(diff, selectedDifficulty, setSelectedDifficulty)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedDifficulty.includes(diff) ? 'bg-primary text-white border-primary' : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'}`}>
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-white">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStackOptions.map((tech) => (
                        <button key={tech} onClick={() => toggleFilter(tech, selectedTech, setSelectedTech)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${selectedTech.includes(tech) ? 'bg-primary text-white border-primary' : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'}`}>
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                  <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-red-400 flex items-center transition-colors">
                    <X className="w-4 h-4 mr-1" /> Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONTENT GRID OR EMPTY STATES */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="glass-card p-16 text-center mt-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <FolderKanban className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No {mode} projects posted yet</h3>
              <p className="text-muted-foreground max-w-md">Founders haven't posted any tasks for this mode. Check back later!</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="glass-card p-12 text-center mt-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query to see available tasks.</p>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 text-sm font-medium transition-colors">
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProjects.length} {mode} projects
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <motion.div 
                      key={project.id} 
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col h-full gap-3"
                    >
                      {/* ProjectCard now handles the modal and application internally! */}
                      <ProjectCard project={project} index={index} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;