// Dummy project data for DevPool
export interface Project {
  id: string;
  title: string;
  description: string;
  founder: {
    name: string;
    avatar: string;
  };
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Paid' | 'Learning' | 'Open Source';
  budget?: string;
  timeline: string;
  applicants: number;
  spotsLeft: number;
  createdAt: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered E-commerce Platform',
    description: 'Build a modern e-commerce platform with AI-driven product recommendations and personalized shopping experiences.',
    founder: { name: 'Alex Chen', avatar: 'AC' },
    techStack: ['React', 'Node.js', 'PostgreSQL', 'OpenAI'],
    difficulty: 'Advanced',
    type: 'Paid',
    budget: '$5,000 - $10,000',
    timeline: '3 months',
    applicants: 23,
    spotsLeft: 2,
    createdAt: '2024-01-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Real-Time Collaboration Tool',
    description: 'Create a collaborative workspace with real-time document editing, video chat, and project management features.',
    founder: { name: 'Sarah Miller', avatar: 'SM' },
    techStack: ['Next.js', 'WebSocket', 'Redis', 'MongoDB'],
    difficulty: 'Advanced',
    type: 'Paid',
    budget: '$8,000 - $15,000',
    timeline: '4 months',
    applicants: 31,
    spotsLeft: 3,
    createdAt: '2024-01-12',
    featured: true,
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'Develop a cross-platform fitness app with workout tracking, nutrition logging, and social features.',
    founder: { name: 'Mike Johnson', avatar: 'MJ' },
    techStack: ['React Native', 'Firebase', 'TypeScript'],
    difficulty: 'Intermediate',
    type: 'Paid',
    budget: '$3,000 - $6,000',
    timeline: '2 months',
    applicants: 45,
    spotsLeft: 5,
    createdAt: '2024-01-18',
  },
  {
    id: '4',
    title: 'Open Source Dashboard Framework',
    description: 'Contribute to an open-source analytics dashboard framework with customizable widgets and themes.',
    founder: { name: 'OpenDev Team', avatar: 'OD' },
    techStack: ['Vue.js', 'D3.js', 'GraphQL'],
    difficulty: 'Intermediate',
    type: 'Open Source',
    timeline: 'Ongoing',
    applicants: 67,
    spotsLeft: 10,
    createdAt: '2024-01-10',
  },
  {
    id: '5',
    title: 'Learn: Build a Blog Platform',
    description: 'A guided learning project to build a full-stack blog platform from scratch with mentorship.',
    founder: { name: 'DevPool Academy', avatar: 'DA' },
    techStack: ['React', 'Express', 'MongoDB'],
    difficulty: 'Beginner',
    type: 'Learning',
    timeline: '6 weeks',
    applicants: 89,
    spotsLeft: 15,
    createdAt: '2024-01-20',
  },
  {
    id: '6',
    title: 'Blockchain Voting System',
    description: 'Create a secure, transparent voting system using blockchain technology for organizations.',
    founder: { name: 'BlockTech Inc', avatar: 'BT' },
    techStack: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    difficulty: 'Advanced',
    type: 'Paid',
    budget: '$12,000 - $20,000',
    timeline: '5 months',
    applicants: 18,
    spotsLeft: 2,
    createdAt: '2024-01-08',
  },
];

export const techStackOptions = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Python', 
  'TypeScript', 'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Docker'
];

export const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];
export const typeOptions = ['Paid', 'Learning', 'Open Source'];
