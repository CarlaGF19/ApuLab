import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Target, 
  Rocket, 
  TrendingUp, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function StudentNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/dashboard-alumno' },
    { name: 'Retos', path: '/retos' },
    { name: 'Oportunidades', path: '/oportunidades' },
    { name: 'Mi Progreso', path: '/progreso' },
  ];

  const handleLogout = () => {
    navigate('/login');
    // Pequeño timeout para asegurar que la navegación ocurrió antes de limpiar el estado
    setTimeout(() => {
      logout();
    }, 100);
  };

  return (
    <>
      <nav className="relative z-[60] bg-white/60 backdrop-blur-[16px] border-b border-[#92487A]/[0.08] h-20 flex items-center font-sans">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/dashboard-alumno" className="flex items-center gap-2">
            <Logo className="scale-90" />
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative py-2 text-[14px] font-medium transition-colors duration-200",
                    isActive ? "text-[#92487A]" : "text-[#2E1A2F] hover:text-[#92487A]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#92487A] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: User Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/perfil" 
              className="flex items-center gap-3 group transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-primary-badge flex items-center justify-center text-primary group-hover:-translate-y-0.5 transition-transform duration-200 shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-medium text-[#2E1A2F] group-hover:text-[#92487A]">Perfil</span>
            </Link>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-[14px] font-normal text-[#2E1A2F] hover:text-[#92487A] transition-colors duration-200"
            >
              Cerrar sesión
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#2E1A2F] hover:text-[#92487A] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 left-0 w-full bg-white/90 backdrop-blur-[16px] border-b border-[#92487A]/[0.08] shadow-xl p-6 md:hidden z-50"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-[15px] font-medium py-2 transition-colors",
                        isActive ? "text-[#92487A]" : "text-[#2E1A2F]"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="h-px bg-[#92487A]/[0.08] my-2" />
                <Link
                  to="/perfil"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-[15px] font-medium text-[#2E1A2F]"
                >
                  <User className="w-5 h-5 text-primary" />
                  Perfil
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="flex items-center gap-3 text-[15px] font-normal text-[#2E1A2F] text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar sesión
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Logout Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-background-card p-8 rounded-3xl shadow-2xl border border-border-soft w-full max-w-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary-badge flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">¿Cerrar sesión?</h3>
              <p className="text-text-secondary mb-8">¿Estás seguro que deseas salir de tu panel?</p>
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 rounded-xl text-text-secondary hover:bg-background-base"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl"
                >
                  Cerrar sesión
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
