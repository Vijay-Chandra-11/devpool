// // // // import { useState, useMemo, useEffect } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { Search, Filter, X } from 'lucide-react';
// // // // import PageLayout from '@/components/layout/PageLayout';
// // // // import ProjectCard from '@/components/projects/ProjectCard';
// // // // import { techStackOptions, difficultyOptions, typeOptions, Project, projects as initialProjects } from '@/data/projects';

// // // // const Projects = () => {
// // // //   const [projects, setProjects] = useState<Project[]>(initialProjects);
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [selectedTech, setSelectedTech] = useState<string[]>([]);
// // // //   const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
// // // //   const [selectedType, setSelectedType] = useState<string[]>([]);
// // // //   const [showFilters, setShowFilters] = useState(false);

// // // //   // ✅ FETCH FROM BACKEND
// // // //   useEffect(() => {
// // // //     fetch('http://127.0.0.1:5000/projects')
// // // //       .then((res) => res.json())
// // // //       .then((data) => setProjects(data))
// // // //       .catch((err) => console.error('Backend error:', err));
// // // //   }, []);

// // // //   const filteredProjects = useMemo(() => {
// // // //     return projects.filter((project) => {
// // // //       const matchesSearch =
// // // //         project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //         project.description.toLowerCase().includes(searchQuery.toLowerCase());

// // // //       const matchesTech =
// // // //         selectedTech.length === 0 ||
// // // //         selectedTech.some((tech) => project.techStack.includes(tech));

// // // //       const matchesDifficulty =
// // // //         selectedDifficulty.length === 0 ||
// // // //         selectedDifficulty.includes(project.difficulty);

// // // //       const matchesType =
// // // //         selectedType.length === 0 ||
// // // //         selectedType.includes(project.type);

// // // //       return matchesSearch && matchesTech && matchesDifficulty && matchesType;
// // // //     });
// // // //   }, [projects, searchQuery, selectedTech, selectedDifficulty, selectedType]);

// // // //   const toggleFilter = (
// // // //     value: string,
// // // //     selected: string[],
// // // //     setSelected: React.Dispatch<React.SetStateAction<string[]>>
// // // //   ) => {
// // // //     selected.includes(value)
// // // //       ? setSelected(selected.filter((v) => v !== value))
// // // //       : setSelected([...selected, value]);
// // // //   };

// // // //   const clearFilters = () => {
// // // //     setSelectedTech([]);
// // // //     setSelectedDifficulty([]);
// // // //     setSelectedType([]);
// // // //     setSearchQuery('');
// // // //   };

// // // //   const activeFiltersCount =
// // // //     selectedTech.length + selectedDifficulty.length + selectedType.length;

// // // //   return (
// // // //     <PageLayout>
// // // //       <section className="min-h-screen py-20 lg:py-28">
// // // //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">

// // // //           {/* HEADER */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 30 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6 }}
// // // //             className="text-center mb-12"
// // // //           >
// // // //             <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
// // // //               Explore <span className="gradient-text">Projects</span>
// // // //             </h1>
// // // //             <p className="text-lg text-muted-foreground max-w-xl mx-auto">
// // // //               Live projects posted by founders on DevPool.
// // // //             </p>
// // // //           </motion.div>

// // // //           {/* SEARCH & FILTER */}
// // // //           <div className="mb-8 flex flex-col sm:flex-row gap-4">
// // // //             <div className="relative flex-1">
// // // //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search projects..."
// // // //                 value={searchQuery}
// // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // //                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10"
// // // //               />
// // // //             </div>

// // // //             <button
// // // //               onClick={() => setShowFilters(!showFilters)}
// // // //               className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5"
// // // //             >
// // // //               <Filter className="w-5 h-5" />
// // // //               Filters
// // // //               {activeFiltersCount > 0 && (
// // // //                 <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
// // // //                   {activeFiltersCount}
// // // //                 </span>
// // // //               )}
// // // //             </button>
// // // //           </div>

// // // //           {/* FILTER PANEL */}
// // // //           <AnimatePresence>
// // // //             {showFilters && (
// // // //               <motion.div
// // // //                 initial={{ opacity: 0, height: 0 }}
// // // //                 animate={{ opacity: 1, height: 'auto' }}
// // // //                 exit={{ opacity: 0, height: 0 }}
// // // //                 transition={{ duration: 0.3 }}
// // // //                 className="glass-card mb-6 space-y-6"
// // // //               >
// // // //                 {/* TYPE */}
// // // //                 <div>
// // // //                   <h4 className="text-sm font-medium mb-3">Project Type</h4>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {typeOptions.map((type) => (
// // // //                       <button
// // // //                         key={type}
// // // //                         onClick={() => toggleFilter(type, selectedType, setSelectedType)}
// // // //                         className={`px-3 py-1.5 rounded-lg text-sm ${
// // // //                           selectedType.includes(type)
// // // //                             ? 'bg-primary text-primary-foreground'
// // // //                             : 'bg-white/5'
// // // //                         }`}
// // // //                       >
// // // //                         {type}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* DIFFICULTY */}
// // // //                 <div>
// // // //                   <h4 className="text-sm font-medium mb-3">Difficulty</h4>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {difficultyOptions.map((diff) => (
// // // //                       <button
// // // //                         key={diff}
// // // //                         onClick={() =>
// // // //                           toggleFilter(diff, selectedDifficulty, setSelectedDifficulty)
// // // //                         }
// // // //                         className={`px-3 py-1.5 rounded-lg text-sm ${
// // // //                           selectedDifficulty.includes(diff)
// // // //                             ? 'bg-primary text-primary-foreground'
// // // //                             : 'bg-white/5'
// // // //                         }`}
// // // //                       >
// // // //                         {diff}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* TECH */}
// // // //                 <div>
// // // //                   <h4 className="text-sm font-medium mb-3">Tech Stack</h4>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {techStackOptions.map((tech) => (
// // // //                       <button
// // // //                         key={tech}
// // // //                         onClick={() => toggleFilter(tech, selectedTech, setSelectedTech)}
// // // //                         className={`px-3 py-1.5 rounded-lg text-sm ${
// // // //                           selectedTech.includes(tech)
// // // //                             ? 'bg-primary text-primary-foreground'
// // // //                             : 'bg-white/5'
// // // //                         }`}
// // // //                       >
// // // //                         {tech}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>

// // // //                 <button
// // // //                   onClick={clearFilters}
// // // //                   className="text-sm text-muted-foreground hover:text-foreground"
// // // //                 >
// // // //                   <X className="inline w-4 h-4 mr-1" />
// // // //                   Clear all filters
// // // //                 </button>
// // // //               </motion.div>
// // // //             )}
// // // //           </AnimatePresence>

// // // //           {/* COUNT */}
// // // //           <p className="text-sm text-muted-foreground mb-6">
// // // //             Showing {filteredProjects.length} projects
// // // //           </p>

// // // //           {/* PROJECT GRID */}
// // // //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //             <AnimatePresence>
// // // //               {filteredProjects.map((project, index) => (
// // // //                 <ProjectCard key={project.id} project={project} index={index} />
// // // //               ))}
// // // //             </AnimatePresence>
// // // //           </div>

// // // //           {/* EMPTY STATE */}
// // // //           {filteredProjects.length === 0 && (
// // // //             <div className="text-center py-20 text-muted-foreground">
// // // //               No projects found
// // // //             </div>
// // // //           )}

// // // //         </div>
// // // //       </section>
// // // //     </PageLayout>
// // // //   );
// // // // };

// // // // export default Projects;



// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Terminal, Brain, Search, Clock, Zap } from 'lucide-react';
// // // import PageLayout from '@/components/layout/PageLayout';
// // // import { supabase } from '@/lib/supabase';
// // // import { useMode } from '@/context/ModeContext';

// // // const Projects = () => {
// // //   const { mode } = useMode();
// // //   const [projects, setProjects] = useState<any[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   // Fetch projects based on the current mode toggle!
// // //   useEffect(() => {
// // //     const fetchProjects = async () => {
// // //       setIsLoading(true);
      
// // //       if (mode === 'developer') {
// // //         // Fetch real Developer Projects from Supabase
// // //         const { data, error } = await supabase
// // //           .from('developer_projects')
// // //           .select('*')
// // //           .order('created_at', { ascending: false });
          
// // //         if (!error && data) {
// // //           setProjects(data);
// // //         }
// // //       } else {
// // //         // Mock Learner Projects (Since we haven't built the Founder Learner table yet)
// // //         setProjects([]); 
// // //       }
      
// // //       setIsLoading(false);
// // //     };

// // //     fetchProjects();
// // //   }, [mode]); // <--- Re-runs this automatically whenever the toggle is clicked!

// // //   return (
// // //     <PageLayout>
// // //       <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
// // //         {/* Dynamic Header */}
// // //         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
// // //           <div>
// // //             <h1 className="text-4xl font-display font-bold text-white mb-4 flex items-center gap-3">
// // //               {mode === 'developer' ? <Terminal className="w-8 h-8 text-primary" /> : <Brain className="w-8 h-8 text-secondary" />}
// // //               Explore {mode === 'developer' ? 'Developer' : 'Learner'} Projects
// // //             </h1>
// // //             <p className="text-muted-foreground text-lg max-w-2xl">
// // //               {mode === 'developer' 
// // //                 ? "Browse complex, real-world tasks posted by founders. High Trust Score recommended."
// // //                 : "Find beginner-friendly 'good first issues' to build your skills and portfolio."}
// // //             </p>
// // //           </div>

// // //           <div className="relative w-full md:w-72">
// // //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// // //             <input 
// // //               type="text" 
// // //               placeholder="Search projects or tech..." 
// // //               className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/50 outline-none"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Loading State */}
// // //         {isLoading ? (
// // //           <div className="flex justify-center items-center py-20">
// // //             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
// // //             {/* Empty State */}
// // //             {projects.length === 0 && (
// // //               <div className="col-span-full glass-card p-12 text-center border-dashed border-2 border-white/10">
// // //                 <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
// // //                 <p className="text-muted-foreground">Founders haven't posted any {mode} projects yet. Check back soon!</p>
// // //               </div>
// // //             )}

// // //             {/* Project Cards Map */}
// // //             {projects.map((project) => (
// // //               <motion.div 
// // //                 key={project.id}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 className="glass-card p-6 hover:border-primary/30 transition-colors group cursor-pointer flex flex-col"
// // //               >
// // //                 <div className="flex justify-between items-start mb-4">
// // //                   <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
// // //                   {project.evaluation_method?.includes('quick') && (
// // //                     <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded flex items-center gap-1 shrink-0">
// // //                       <Zap className="w-3 h-3" /> Quick Hire
// // //                     </span>
// // //                   )}
// // //                 </div>
                
// // //                 <p className="text-muted-foreground text-sm mb-6 flex-grow">{project.summary}</p>
                
// // //                 <div className="flex flex-wrap gap-2 mb-6">
// // //                   {project.tech_stack?.map((tech: string) => (
// // //                     <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-white text-xs rounded-full">
// // //                       {tech}
// // //                     </span>
// // //                   ))}
// // //                 </div>

// // //                 <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
// // //                   <div className="flex items-center text-xs text-muted-foreground">
// // //                     <Clock className="w-4 h-4 mr-1" />
// // //                     Posted recently
// // //                   </div>
// // //                   <button className="text-sm font-bold text-primary hover:text-white transition-colors">
// // //                     View Details →
// // //                   </button>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </PageLayout>
// // //   );
// // // };

// // // export default Projects;


// // import { useState, useMemo, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Search, Filter, X, Terminal, Brain, Loader2 } from 'lucide-react';
// // import PageLayout from '@/components/layout/PageLayout';
// // import ProjectCard from '@/components/projects/ProjectCard';
// // import { techStackOptions, difficultyOptions, typeOptions, Project, projects as initialProjects } from '@/data/projects';
// // import { useMode } from '@/context/ModeContext';
// // // import { supabase } from '@/lib/supabase'; // Required to fetch founder projects
// // import { supabase } from '../lib/supabase';

// // const Projects = () => {
// //   const { mode } = useMode(); // GET THE CURRENT MODE
// //   const [projects, setProjects] = useState<Project[]>(initialProjects);
// //   const [isLoading, setIsLoading] = useState(true);
  
// //   // Filter States
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedTech, setSelectedTech] = useState<string[]>([]);
// //   const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
// //   const [selectedType, setSelectedType] = useState<string[]>([]);
// //   const [showFilters, setShowFilters] = useState(false);

// //   // ✅ DYNAMIC FETCH BASED ON MODE
// //   useEffect(() => {
// //     const fetchProjects = async () => {
// //       setIsLoading(true);

// //       if (mode === 'developer') {
// //         // Fetch Real Developer Projects posted by Founders
// //         const { data, error } = await supabase
// //           .from('developer_projects')
// //           .select('*')
// //           .order('created_at', { ascending: false });

// //         if (!error && data) {
// //           // Map Supabase database columns to fit your ProjectCard props
// //           const formattedProjects: Project[] = data.map((p: any) => ({
// //             id: p.id,
// //             title: p.title,
// //             description: p.summary,
// //             // Provide required fields to satisfy TypeScript
// //             founder: { name: 'Founder', avatar: 'F' }, 
// //             techStack: p.tech_stack || [],
// //             difficulty: 'Advanced', 
// //             type: 'Paid', // Must be 'Paid', 'Learning', or 'Open Source' based on your interface
// //             timeline: 'Flexible',
// //             applicants: 0,
// //             spotsLeft: 1,
// //             createdAt: p.created_at || new Date().toISOString(),
// //             // We can pass the evaluation method in a custom way if needed later, 
// //             // but for now, we satisfy the strict Project type!
// //           }));
// //           setProjects(formattedProjects);
// //         }
// //       } else {
// //         // Fetch Learner Projects from Flask Backend
// //         try {
// //           const res = await fetch('http://127.0.0.1:5000/projects');
// //           if (res.ok) {
// //             const data = await res.json();
// //             setProjects(data);
// //           }
// //         } catch (err) {
// //           console.error('Backend error:', err);
// //         }
// //       }
// //       setIsLoading(false);
// //     };

// //     fetchProjects();
// //   }, [mode]); // Re-runs instantly whenever the user clicks the Navbar toggle!

// //   const filteredProjects = useMemo(() => {
// //     return projects.filter((project) => {
// //       const matchesSearch =
// //         project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         project.description.toLowerCase().includes(searchQuery.toLowerCase());

// //       const matchesTech =
// //         selectedTech.length === 0 ||
// //         selectedTech.some((tech) => project.techStack.includes(tech));

// //       const matchesDifficulty =
// //         selectedDifficulty.length === 0 ||
// //         selectedDifficulty.includes(project.difficulty);

// //       const matchesType =
// //         selectedType.length === 0 ||
// //         selectedType.includes(project.type);

// //       return matchesSearch && matchesTech && matchesDifficulty && matchesType;
// //     });
// //   }, [projects, searchQuery, selectedTech, selectedDifficulty, selectedType]);

// //   const toggleFilter = (
// //     value: string,
// //     selected: string[],
// //     setSelected: React.Dispatch<React.SetStateAction<string[]>>
// //   ) => {
// //     selected.includes(value)
// //       ? setSelected(selected.filter((v) => v !== value))
// //       : setSelected([...selected, value]);
// //   };

// //   const clearFilters = () => {
// //     setSelectedTech([]);
// //     setSelectedDifficulty([]);
// //     setSelectedType([]);
// //     setSearchQuery('');
// //   };

// //   const activeFiltersCount = selectedTech.length + selectedDifficulty.length + selectedType.length;

// //   return (
// //     <PageLayout>
// //       <section className="min-h-screen py-20 lg:py-28">
// //         <div className="container mx-auto px-4 sm:px-6 lg:px-8">

// //           {/* DYNAMIC HEADER */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="text-center mb-12"
// //           >
// //             <div className="flex justify-center mb-4">
// //               {mode === 'developer' ? (
// //                 <Terminal className="w-12 h-12 text-primary" />
// //               ) : (
// //                 <Brain className="w-12 h-12 text-secondary" />
// //               )}
// //             </div>
// //             <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
// //               Explore <span className="gradient-text">{mode === 'developer' ? 'Developer' : 'Learner'} Projects</span>
// //             </h1>
// //             <p className="text-lg text-muted-foreground max-w-xl mx-auto">
// //               {mode === 'developer' 
// //                 ? "Browse complex, real-world tasks posted by founders. High Trust Score recommended."
// //                 : "Find beginner-friendly 'good first issues' to build your skills and portfolio."}
// //             </p>
// //           </motion.div>

// //           {/* SEARCH & FILTER BAR */}
// //           <div className="mb-8 flex flex-col sm:flex-row gap-4">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// //               <input
// //                 type="text"
// //                 placeholder={`Search ${mode} projects...`}
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 outline-none transition-colors"
// //               />
// //             </div>

// //             <button
// //               onClick={() => setShowFilters(!showFilters)}
// //               className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-colors ${
// //                 showFilters || activeFiltersCount > 0 ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'
// //               }`}
// //             >
// //               <Filter className="w-5 h-5" />
// //               Filters
// //               {activeFiltersCount > 0 && (
// //                 <span className="ml-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
// //                   {activeFiltersCount}
// //                 </span>
// //               )}
// //             </button>
// //           </div>

// //           {/* FILTER PANEL */}
// //           <AnimatePresence>
// //             {showFilters && (
// //               <motion.div
// //                 initial={{ opacity: 0, height: 0 }}
// //                 animate={{ opacity: 1, height: 'auto' }}
// //                 exit={{ opacity: 0, height: 0 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="glass-card p-6 mb-6 space-y-6 overflow-hidden"
// //               >
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                   {/* TYPE */}
// //                   <div>
// //                     <h4 className="text-sm font-medium mb-3 text-white">Project Type</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {typeOptions.map((type) => (
// //                         <button
// //                           key={type}
// //                           onClick={() => toggleFilter(type, selectedType, setSelectedType)}
// //                           className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
// //                             selectedType.includes(type)
// //                               ? 'bg-primary text-white border-primary'
// //                               : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'
// //                           }`}
// //                         >
// //                           {type}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* DIFFICULTY */}
// //                   <div>
// //                     <h4 className="text-sm font-medium mb-3 text-white">Difficulty</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {difficultyOptions.map((diff) => (
// //                         <button
// //                           key={diff}
// //                           onClick={() => toggleFilter(diff, selectedDifficulty, setSelectedDifficulty)}
// //                           className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
// //                             selectedDifficulty.includes(diff)
// //                               ? 'bg-primary text-white border-primary'
// //                               : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'
// //                           }`}
// //                         >
// //                           {diff}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* TECH */}
// //                   <div>
// //                     <h4 className="text-sm font-medium mb-3 text-white">Tech Stack</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {techStackOptions.map((tech) => (
// //                         <button
// //                           key={tech}
// //                           onClick={() => toggleFilter(tech, selectedTech, setSelectedTech)}
// //                           className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
// //                             selectedTech.includes(tech)
// //                               ? 'bg-primary text-white border-primary'
// //                               : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'
// //                           }`}
// //                         >
// //                           {tech}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
// //                   <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-red-400 flex items-center transition-colors">
// //                     <X className="w-4 h-4 mr-1" /> Clear all filters
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* COUNT & PROJECT GRID */}
// //           {isLoading ? (
// //             <div className="flex justify-center items-center py-20">
// //               <Loader2 className="w-8 h-8 text-primary animate-spin" />
// //             </div>
// //           ) : (
// //             <>
// //               <p className="text-sm text-muted-foreground mb-6">
// //                 Showing {filteredProjects.length} {mode} projects
// //               </p>

// //               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 <AnimatePresence>
// //                   {filteredProjects.map((project, index) => (
// //                     <ProjectCard key={project.id} project={project} index={index} />
// //                   ))}
// //                 </AnimatePresence>
// //               </div>

// //               {/* EMPTY STATE */}
// //               {filteredProjects.length === 0 && (
// //                 <div className="glass-card p-12 text-center mt-6 border-dashed border-2 border-white/10">
// //                   <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
// //                   <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
// //                   {activeFiltersCount > 0 && (
// //                     <button onClick={clearFilters} className="mt-4 text-primary hover:text-white text-sm font-medium">
// //                       Clear Filters
// //                     </button>
// //                   )}
// //                 </div>
// //               )}
// //             </>
// //           )}

// //         </div>
// //       </section>
// //     </PageLayout>
// //   );
// // };

// // export default Projects;





// import { useState, useMemo, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, X, Terminal, Brain, Loader2, DollarSign, Gift, FolderKanban } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import ProjectCard from '@/components/projects/ProjectCard';
// // NOTICE: initialProjects is COMPLETELY REMOVED from this import!
// import { techStackOptions, difficultyOptions, typeOptions } from '@/data/projects';
// import { useMode } from '@/context/ModeContext';
// import { supabase } from '../lib/supabase';

// const Projects = () => {
//   const { mode } = useMode(); 
  
//   // STRICTLY empty starting array
//   const [projects, setProjects] = useState<any[]>([]); 
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Filter States
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTech, setSelectedTech] = useState<string[]>([]);
//   const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
//   const [selectedType, setSelectedType] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(false);

//   // Application / Payment States
//   const [selectedProject, setSelectedProject] = useState<any>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // ✅ BULLETPROOF DYNAMIC FETCH
//   useEffect(() => {
//     // 1. isMounted prevents the Race Condition bug when toggling fast
//     let isMounted = true; 
    
//     const fetchProjects = async () => {
//       setIsLoading(true);
//       // 2. Instantly clear the screen when you switch modes to prevent ghosting
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

//     // 3. Cleanup function: If the user toggles modes BEFORE the DB responds, 
//     // this cancels the state update so Developer projects don't bleed into Learner mode.
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

//   // ✅ PROCESS APPLICATION & PAYMENT
//   const processApplication = async (project: any) => {
//     setIsProcessing(true);
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) {
//         alert("You must be logged in to apply!");
//         setIsProcessing(false);
//         return;
//       }

//       const { error } = await supabase
//         .from('project_applications')
//         .insert({
//           project_id: project.id,
//           applicant_id: session.user.id,
//           status: 'paid' 
//         });

//       if (error) throw error;

//       alert("Application Successful! The founder will review your profile.");
//       setSelectedProject(null); 
//     } catch (error: any) {
//       console.error(error);
//       alert(error.message || "Something went wrong.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const activeFiltersCount = selectedTech.length + selectedDifficulty.length + selectedType.length;

//   return (
//     <PageLayout>
//       <section className="min-h-screen py-20 lg:py-28 relative">
        
//         {/* PAYMENT / APPLY MODAL */}
//         <AnimatePresence>
//           {selectedProject && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
//                 className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
//               >
//                 <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
                
//                 <h3 className="text-2xl font-bold text-white mb-2 pr-6">Apply for Task</h3>
//                 <p className="text-primary font-medium mb-6 line-clamp-1">{selectedProject.title}</p>
                
//                 {selectedProject.paymentType === 'fees' ? (
//                   <>
//                     <p className="text-muted-foreground mb-6 text-sm">
//                       This is a premium learning task. To access the founder's codebase and guidance, a fee is required.
//                     </p>
//                     <div className="bg-black/40 p-4 rounded-xl mb-8 flex justify-between items-center border border-white/5 shadow-inner">
//                       <span className="text-white font-medium flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400"/> Total Fee</span>
//                       <span className="text-3xl font-bold text-green-400">${selectedProject.feeAmount}</span>
//                     </div>
//                     <button 
//                       onClick={() => processApplication(selectedProject)} 
//                       disabled={isProcessing}
//                       className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
//                     >
//                       {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay & Submit Application"}
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-muted-foreground mb-6 text-sm">
//                       This is a free volunteer learning task. You can apply directly to help out and gain experience!
//                     </p>
//                     <div className="bg-black/40 p-4 rounded-xl mb-8 flex items-center gap-3 border border-white/5">
//                       <Gift className="w-5 h-5 text-blue-400" />
//                       <span className="text-white font-bold">Free Application</span>
//                     </div>
//                     <button 
//                       onClick={() => processApplication(selectedProject)} 
//                       disabled={isProcessing}
//                       className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
//                     >
//                       {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Application"}
//                     </button>
//                   </>
//                 )}
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

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
//             // ABSOLUTE ZERO PROJECTS POSTED IN THIS MODE
//             <div className="glass-card p-16 text-center mt-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
//               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
//                 <FolderKanban className="w-10 h-10 text-muted-foreground" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-2">No {mode} projects posted yet</h3>
//               <p className="text-muted-foreground max-w-md">Founders haven't posted any tasks for this mode. Check back later!</p>
//             </div>
//           ) : filteredProjects.length === 0 ? (
//             // PROJECTS EXIST BUT DO NOT MATCH SEARCH/FILTERS
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
//             // PROJECTS FOUND AND RENDERED
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
//                       <ProjectCard project={project} index={index} />
                      
//                       {/* QUICK APPLY BUTTON (Learner Mode Only) */}
//                       {mode === 'learner' && (
//                         <button 
//                           onClick={() => setSelectedProject(project)}
//                           className={`w-full py-3 rounded-xl font-bold transition-all border shadow-lg flex justify-center items-center gap-2 ${
//                             project.paymentType === 'fees' 
//                               ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 shadow-green-500/5' 
//                               : 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 shadow-blue-500/5'
//                           }`}
//                         >
//                           {project.paymentType === 'fees' ? (
//                             <><DollarSign className="w-4 h-4" /> Pay ${project.feeAmount} to Apply</>
//                           ) : (
//                             <><Gift className="w-4 h-4" /> Apply for Free</>
//                           )}
//                         </button>
//                       )}
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
import ProjectCard from '@/components/projects/ProjectCard';
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