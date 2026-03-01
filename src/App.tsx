import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '@/pages/home';
import LoginPage from '@/pages/Login';
import FamiliesLanding from '@/pages/FamiliesLanding';
import FamilyRegistration from '@/pages/FamilyRegistration';
import InstitutionalLanding from '@/pages/InstitutionalLanding';
import FamilyDashboard from '@/pages/FamilyDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';
import StudentDashboard from '@/pages/StudentDashboard';
import OpportunitiesList from '@/pages/OpportunitiesList';
import OpportunityDetail from '@/pages/OpportunityDetail';
import StudentProfile from '@/pages/StudentProfile';
import { useAuthStore } from '@/store/authStore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import { Link } from 'react-router-dom';
import { PilotModal } from '@/components/pilot/pilot-modal';
import { PilotToast } from '@/components/pilot/pilot-toast';

const queryClient = new QueryClient();

// Layout wrapper for landing pages
const LandingLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <PilotModal />
    <PilotToast />
  </div>
);

// Placeholder Dashboard Components are now imported from pages

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingLayout><Home /></LandingLayout>} />
            <Route path="/familias" element={<LandingLayout><FamiliesLanding /></LandingLayout>} />
            <Route path="/modelo-institucional" element={<LandingLayout><InstitutionalLanding /></LandingLayout>} />
            <Route path="/registro-familia" element={<FamilyRegistration />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard-docente" 
              element={
                <ProtectedRoute allowedRoles={['docente', 'demo_docente']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard-familia" 
              element={
                <ProtectedRoute allowedRoles={['family', 'demo_family']}>
                  <FamilyDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard-alumno" 
              element={
                <ProtectedRoute allowedRoles={['alumno', 'demo_alumno']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/oportunidades" 
              element={
                <ProtectedRoute allowedRoles={['alumno', 'demo_alumno']}>
                  <OpportunitiesList />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/oportunidades/:id" 
              element={
                <ProtectedRoute allowedRoles={['alumno', 'demo_alumno']}>
                  <OpportunityDetail />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute allowedRoles={['alumno', 'demo_alumno']}>
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/retos" 
              element={
                <ProtectedRoute allowedRoles={['alumno', 'demo_alumno']}>
                  <div className="min-h-screen bg-background-base flex flex-col items-center justify-center p-6">
                    <StudentNavbar />
                    <h1 className="text-2xl font-bold text-text-primary mt-20">Página de Retos (Próximamente)</h1>
                    <Link to="/dashboard-alumno" className="mt-4 text-primary font-bold">Volver al inicio</Link>
                  </div>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/progreso" 
              element={
                <ProtectedRoute allowedRoles={['alumno', 'demo_alumno']}>
                  <div className="min-h-screen bg-background-base flex flex-col items-center justify-center p-6">
                    <StudentNavbar />
                    <h1 className="text-2xl font-bold text-text-primary mt-20">Página de Progreso (Próximamente)</h1>
                    <Link to="/dashboard-alumno" className="mt-4 text-primary font-bold">Volver al inicio</Link>
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
