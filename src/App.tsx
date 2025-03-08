
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LearningPage from "./pages/LearningPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import QuizPage from "./pages/QuizPage";
import GuidePage from "./pages/GuidePage";
import CertificationDetailsPage from "./pages/CertificationDetailsPage";
import CertificationPathwayPage from "./pages/CertificationPathwayPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/learning" replace />} />
          <Route path="/index" element={<Index />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/certification" element={<CertificationPathwayPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/guide/:guideId" element={<GuidePage />} />
          <Route path="/certification/:certificationId" element={<CertificationDetailsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
