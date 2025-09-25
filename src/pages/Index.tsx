import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LabDashboard } from "@/components/dashboard/LabDashboard";
import { BatchCreation } from "@/components/batch/BatchCreation";
import { ResearchForm } from "@/components/research/ResearchForm";
import { Analytics } from "@/components/analytics/Analytics";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  if (!isAuthenticated) {
    return <AuthLayout onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <LabDashboard onNavigate={setCurrentView} />;
      case "batch":
        return <BatchCreation onNavigate={setCurrentView} />;
      case "research":
        return <ResearchForm onNavigate={setCurrentView} />;
      case "analytics":
        return <Analytics onNavigate={setCurrentView} />;
      default:
        return <LabDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderView()}
    </div>
  );
};

export default Index;