import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthLayout } from "./components/auth/AuthLayout";
import { LabDashboard } from "./components/dashboard/LabDashboard";
import { BatchCreation } from "./components/batch/BatchCreation";
import { Analytics } from "./components/analytics/Analytics";
import { AuthProvider, useAuth } from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import { ProductDetails } from "./components/ProductDetails";
import { useNavigate } from "react-router-dom";
import AllCerificateds from "./components/AllCerificateds";
import LabProfileAndCertificates from "./components/AllCerificateds";

// Your pages
const queryClient = new QueryClient();

const AppRoutes = () => {
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    if (view === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${view}`);
    }
  };

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthLayout onAuthenticated={fetchUser} />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <LabDashboard onNavigate={handleNavigate} />
        }
      />
      <Route
        path="/dashboard/batch"
        element={
          <PrivateRoute>
            <BatchCreation onNavigate={handleNavigate} />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/analytics"
        element={
          <PrivateRoute>
            <Analytics onNavigate={handleNavigate} />
          </PrivateRoute>
        }
      />
      <Route path="/product/:id" element={<ProductDetails onNavigate={handleNavigate} />} />

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);


export default App;
