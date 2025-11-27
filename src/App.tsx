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

// Student pages
import StudentProfile from "./pages/student/Profile";
import StudentGrades from "./pages/student/Grades";
import StudentAttendance from "./pages/student/Attendance";

// Teacher pages
import TeacherGrades from "./pages/teacher/Grades";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherCourses from "./pages/teacher/Courses";

// Registrar pages
import RegistrarValidate from "./pages/registrar/Validate";
import RegistrarUsers from "./pages/registrar/Users";
import RegistrarReports from "./pages/registrar/Reports";

// Admin pages
import AdminRoles from "./pages/admin/Roles";
import AdminReports from "./pages/admin/Reports";
import AdminStatistics from "./pages/admin/Statistics";
import AdminSettings from "./pages/admin/Settings";

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
            
            {/* Dashboard principal */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Rutas de Estudiante */}
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <StudentProfile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/grades"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <StudentGrades />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/attendance"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <StudentAttendance />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Rutas de Docente */}
            <Route
              path="/teacher/grades"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <Layout>
                    <TeacherGrades />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <Layout>
                    <TeacherAttendance />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/courses"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <Layout>
                    <TeacherCourses />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Rutas de Bedelía */}
            <Route
              path="/registrar/validate"
              element={
                <ProtectedRoute allowedRoles={['registrar']}>
                  <Layout>
                    <RegistrarValidate />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/registrar/users"
              element={
                <ProtectedRoute allowedRoles={['registrar']}>
                  <Layout>
                    <RegistrarUsers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/registrar/reports"
              element={
                <ProtectedRoute allowedRoles={['registrar']}>
                  <Layout>
                    <RegistrarReports />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Rutas de Administrador */}
            <Route
              path="/admin/roles"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminRoles />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminReports />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminStatistics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AdminSettings />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
