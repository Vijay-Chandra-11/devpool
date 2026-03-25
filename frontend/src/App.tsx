// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Pages
// import Index from "./pages/Index";
// import RoleSelection from "./pages/RoleSelection";
// import Projects from "./pages/Projects";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import FounderDashboard from "./pages/FounderDashboard";
// import NotFound from "./pages/NotFound";
// import FounderIntent from "./pages/FounderIntent";
// import FounderApply from "./pages/FounderApply";  
// import LiveEditor from "./pages/LiveEditor";
// import GithubAnalysis from "./pages/GithubAnalysis";
// import DeveloperProjects from "./pages/DeveloperProjects";
// import LearnerProjects from "./pages/LearnerProjects";
// import PostProject from "./pages/PostProject";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Index />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/editor" element={<LiveEditor />} />
          
//           {/* Main Dashboards */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/founder-dashboard" element={<FounderDashboard />} />
//           <Route path="/role-selection" element={<RoleSelection />} />
//           <Route path="/founder-intent" element={<FounderIntent />} />
//           <Route path="/founder-apply" element={<FounderApply />} />
//           <Route path="/github-analysis" element={<GithubAnalysis />} />
//           <Route path="/developer-projects" element={<DeveloperProjects />} />
//           <Route path="/learner-projects" element={<LearnerProjects />} />
//           <Route path="/post-project" element={<PostProject />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;




import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeProvider } from "./context/ModeContext"; // <-- Import the new context!

// Pages
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FounderDashboard from "./pages/FounderDashboard";
import NotFound from "./pages/NotFound";
import FounderIntent from "./pages/FounderIntent";
import FounderApply from "./pages/FounderApply";  
import LiveEditor from "./pages/LiveEditor";
import GithubAnalysis from "./pages/GithubAnalysis";
import DeveloperProjects from "./pages/DeveloperProjects";
import LearnerProjects from "./pages/LearnerProjects";
import PostProject from "./pages/PostProject";
import ManageProject from "./pages/ManageProject";
import MyProjects from "./pages/MyProjects";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Wrap BrowserRouter with the ModeProvider so the whole app knows the state */}
      <ModeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/editor" element={<LiveEditor />} />
            
            {/* Main Dashboards */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/founder-dashboard" element={<FounderDashboard />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/founder-intent" element={<FounderIntent />} />
            <Route path="/founder-apply" element={<FounderApply />} />
            <Route path="/github-analysis" element={<GithubAnalysis />} />
            <Route path="/developer-projects" element={<DeveloperProjects />} />
            <Route path="/learner-projects" element={<LearnerProjects />} />
            <Route path="/post-project" element={<PostProject />} />
            <Route path="/manage-project/:id" element={<ManageProject />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;