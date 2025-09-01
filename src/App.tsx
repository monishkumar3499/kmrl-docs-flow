import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/components/LoginPage";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import DepartmentDashboard from "@/pages/DepartmentDashboard";
import DocumentsPage from "@/pages/DocumentsPage";
import ApprovalsPage from "@/pages/ApprovalsPage";
import OperationsDashboard from "@/pages/OperationsDashboard";
import EngineeringDashboard from "@/pages/EngineeringDashboard";
import FinanceDashboard from "@/pages/FinanceDashboard";
import HRDashboard from "@/pages/HRDashboard";
import SafetyDashboard from "@/pages/SafetyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route component that redirects based on user role
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <Navigate to="/dashboard" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Root redirect */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected routes with layout */}
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="dashboard" element={<DepartmentDashboard />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="approvals" element={<ApprovalsPage />} />
              
              {/* Department Routes */}
              <Route path="departments/operations" element={<OperationsDashboard />} />
              <Route path="departments/engineeringmaintenance" element={<EngineeringDashboard />} />
              <Route path="departments/financeprocurement" element={<FinanceDashboard />} />
              <Route path="departments/humanresources" element={<HRDashboard />} />
              <Route path="departments/safetyregulatory" element={<SafetyDashboard />} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
