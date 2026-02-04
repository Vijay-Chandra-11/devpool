import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ProjectCard from '@/components/projects/ProjectCard';
import { techStackOptions, difficultyOptions, typeOptions, Project, projects as initialProjects } from '@/data/projects';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch('http://127.0.0.1:5000/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Backend error:', err));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTech.length === 0 ||
        selectedTech.some((tech) => project.techStack.includes(tech));

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

  const activeFiltersCount =
    selectedTech.length + selectedDifficulty.length + selectedType.length;

  return (
    <PageLayout>
      <section className="min-h-screen py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Explore <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Live projects posted by founders on DevPool.
            </p>
          </motion.div>

          {/* SEARCH & FILTER */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5"
            >
              <Filter className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* FILTER PANEL */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card mb-6 space-y-6"
              >
                {/* TYPE */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Project Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleFilter(type, selectedType, setSelectedType)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedType.includes(type)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/5'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DIFFICULTY */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Difficulty</h4>
                  <div className="flex flex-wrap gap-2">
                    {difficultyOptions.map((diff) => (
                      <button
                        key={diff}
                        onClick={() =>
                          toggleFilter(diff, selectedDifficulty, setSelectedDifficulty)
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedDifficulty.includes(diff)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/5'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TECH */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStackOptions.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleFilter(tech, selectedTech, setSelectedTech)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedTech.includes(tech)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/5'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  <X className="inline w-4 h-4 mr-1" />
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COUNT */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredProjects.length} projects
          </p>

          {/* PROJECT GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* EMPTY STATE */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No projects found
            </div>
          )}

        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
