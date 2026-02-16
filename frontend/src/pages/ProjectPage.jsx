import React from 'react';
import CodeEditor from '../components/CodeEditor';

const ProjectPage = () => {
  // In a real app, get these from your Flask Backend or URL params
  const projectId = "project-101"; 
  const currentUser = "Vijay"; 

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">DevPool Project Workspace</h1>
      <p className="mb-4 text-gray-400">Collaborating on: {projectId}</p>
      
      {/* This is the Live Editor */}
      <CodeEditor 
        roomId={projectId}   // Users in the same "roomId" see the same code
        userName={currentUser} 
      />
    </div>
  );
};

export default ProjectPage;