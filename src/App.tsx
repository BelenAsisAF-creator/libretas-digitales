import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Docente pages
import DocenteDashboard from "./pages/docente/DocenteDashboard";
import DocenteMaterias from "./pages/docente/DocenteMaterias";
import DocenteNotas from "./pages/docente/DocenteNotas";
import DocenteAsistencias from "./pages/docente/DocenteAsistencias";
import DocenteHistorial from "./pages/docente/DocenteHistorial";

// Bedelia pages
import BedeliaDashboard from "./pages/bedelia/BedeliaDashboard";
import BedeliaValidaciones from "./pages/bedelia/BedeliaValidaciones";
import BedeliaUsuarios from "./pages/bedelia/BedeliaUsuarios";
import BedeliaNotificaciones from "./pages/bedelia/BedeliaNotificaciones";

// SuperAdmin pages
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminReportes from "./pages/superadmin/SuperAdminReportes";
import SuperAdminAcademico from "./pages/superadmin/SuperAdminAcademico";
import SuperAdminRoles from "./pages/superadmin/SuperAdminRoles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            
            {/* Docente Routes */}
            <Route path="/docente/dashboard" element={<ProtectedRoute><Layout><DocenteDashboard /></Layout></ProtectedRoute>} />
            <Route path="/docente/materias" element={<ProtectedRoute><Layout><DocenteMaterias /></Layout></ProtectedRoute>} />
            <Route path="/docente/comision/:id/notas" element={<ProtectedRoute><Layout><DocenteNotas /></Layout></ProtectedRoute>} />
            <Route path="/docente/comision/:id/asistencias" element={<ProtectedRoute><Layout><DocenteAsistencias /></Layout></ProtectedRoute>} />
            <Route path="/docente/historial" element={<ProtectedRoute><Layout><DocenteHistorial /></Layout></ProtectedRoute>} />
            
            {/* Bedelia Routes */}
            <Route path="/bedelia/dashboard" element={<ProtectedRoute><Layout><BedeliaDashboard /></Layout></ProtectedRoute>} />
            <Route path="/bedelia/validaciones" element={<ProtectedRoute><Layout><BedeliaValidaciones /></Layout></ProtectedRoute>} />
            <Route path="/bedelia/usuarios" element={<ProtectedRoute><Layout><BedeliaUsuarios /></Layout></ProtectedRoute>} />
            <Route path="/bedelia/notificaciones" element={<ProtectedRoute><Layout><BedeliaNotificaciones /></Layout></ProtectedRoute>} />
            
            {/* SuperAdmin Routes */}
            <Route path="/superadmin/dashboard" element={<ProtectedRoute><Layout><SuperAdminDashboard /></Layout></ProtectedRoute>} />
            <Route path="/superadmin/reportes" element={<ProtectedRoute><Layout><SuperAdminReportes /></Layout></ProtectedRoute>} />
            <Route path="/superadmin/academico" element={<ProtectedRoute><Layout><SuperAdminAcademico /></Layout></ProtectedRoute>} />
            <Route path="/superadmin/roles" element={<ProtectedRoute><Layout><SuperAdminRoles /></Layout></ProtectedRoute>} />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
