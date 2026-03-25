import PageLayout from '@/components/layout/PageLayout';
import { Brain, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearnerProjects = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">Learner Projects</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Post beginner-friendly projects and "good first issues" for learners to build their skills.
            </p>
          </div>
          <button onClick={() => navigate('/post-project')}  className="btn-neon flex items-center justify-center gap-2 shrink-0">
            <PlusCircle className="w-5 h-5" />
            <span>Post New Project</span>
          </button>
        </div>

        {/* Dummy Empty State */}
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-80 border-dashed border-2 border-white/10">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
            <Brain className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Learner Tasks Yet</h2>
          <p className="text-muted-foreground max-w-md">
            Help the community grow by posting smaller learning tasks. Applications from eager learners will appear here.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default LearnerProjects;