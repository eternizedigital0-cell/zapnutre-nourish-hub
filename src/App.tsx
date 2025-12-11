import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileSelection from "./pages/ProfileSelection";
import NotFound from "./pages/NotFound";

// Layouts
import NutritionistLayout from "./components/layout/NutritionistLayout";
import PatientLayout from "./components/layout/PatientLayout";

// Nutritionist Pages
import NutritionistDashboard from "./pages/nutricionista/Dashboard";
import PatientsList from "./pages/nutricionista/PatientsList";
import PatientProfile from "./pages/nutricionista/PatientProfile";
import Reports from "./pages/nutricionista/Reports";
import NutritionistSettings from "./pages/nutricionista/Settings";

// Patient Pages
import PatientHome from "./pages/paciente/Home";
import PatientDiary from "./pages/paciente/Diary";
import PatientPlan from "./pages/paciente/Plan";
import PatientEvolution from "./pages/paciente/Evolution";
import PatientCheckIns from "./pages/paciente/CheckIns";
import PatientSettings from "./pages/paciente/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Profile Selection */}
          <Route path="/" element={<ProfileSelection />} />

          {/* Nutritionist Routes */}
          <Route path="/nutricionista" element={<NutritionistLayout />}>
            <Route path="dashboard" element={<NutritionistDashboard />} />
            <Route path="pacientes" element={<PatientsList />} />
            <Route path="paciente/:id" element={<PatientProfile />} />
            <Route path="relatorios" element={<Reports />} />
            <Route path="configuracoes" element={<NutritionistSettings />} />
          </Route>

          {/* Patient Routes */}
          <Route path="/paciente" element={<PatientLayout />}>
            <Route path="home" element={<PatientHome />} />
            <Route path="diario" element={<PatientDiary />} />
            <Route path="plano" element={<PatientPlan />} />
            <Route path="evolucao" element={<PatientEvolution />} />
            <Route path="checkins" element={<PatientCheckIns />} />
            <Route path="configuracoes" element={<PatientSettings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
