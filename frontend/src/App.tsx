// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import RoleSelection from "./pages/RoleSelection";
// import Projects from "./pages/Projects";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";
// import FounderIntent from "./pages/FounderIntent";
// import FounderApply from "./pages/FounderApply";  
// import LiveEditor from "./pages/LiveEditor";


// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/role-selection" element={<RoleSelection />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/founder-intent" element={<FounderIntent />} />
//           <Route path="/founder-apply" element={<FounderApply />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="/editor" element={<LiveEditor />} />
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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

          {/* Legacy Routes (You can delete these later if the new Register Step 3 replaces them entirely) */}
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/founder-intent" element={<FounderIntent />} />
          <Route path="/founder-apply" element={<FounderApply />} />
          <Route path="/github-analysis" element={<GithubAnalysis />} />
          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;