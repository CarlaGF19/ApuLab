import { motion, AnimatePresence } from 'motion/react';
import { UserRole, useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { X, GraduationCap, Users, BookOpen } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'institutional' | 'all';
}

export function DemoModal({ isOpen, onClose, mode = 'all' }: DemoModalProps) {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSelectDemo = (role: UserRole) => {
    const demoUser = {
      id: 'demo-id',
      email: role === 'demo_docente' 
        ? 'docente@demo.apulab.edu' 
        : role === 'demo_alumno' 
          ? 'estudiante@demo.apulab.edu' 
          : 'familia@demo.apulab.edu',
      name: role === 'demo_docente' 
        ? 'Docente Demo' 
        : role === 'demo_alumno' 
          ? 'Estudiante Demo' 
          : 'Familia Demo',
      role,
      isDemo: true,
    };

    login(demoUser);
    
    // Redirect based on role
    if (role === 'demo_docente') {
      navigate('/dashboard-docente');
    } else if (role === 'demo_alumno') {
      navigate('/dashboard-alumno');
    } else {
      navigate('/dashboard-familia');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-background-card rounded-2xl shadow-2xl overflow-hidden z-10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                {mode === 'institutional' ? 'Selecciona vista demo institucional' : 'Selecciona una vista demo'}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-background-base rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => handleSelectDemo('demo_docente')}
                className="flex items-start gap-4 p-4 rounded-xl border border-border-soft hover:border-primary hover:bg-primary-badge transition-all group text-left"
              >
                <div className="p-3 bg-primary-badge rounded-lg group-hover:bg-primary transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Docente</h4>
                  <p className="text-sm text-text-secondary mt-1">
                    Visualiza analítica institucional y seguimiento STEAM.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleSelectDemo('demo_alumno')}
                className="flex items-start gap-4 p-4 rounded-xl border border-border-soft hover:border-primary hover:bg-primary-badge transition-all group text-left"
              >
                <div className="p-3 bg-primary-badge rounded-lg group-hover:bg-primary transition-colors">
                  <BookOpen className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Estudiante</h4>
                  <p className="text-sm text-text-secondary mt-1">
                    Explora tu perfil STEAM y actividades recomendadas.
                  </p>
                </div>
              </button>

              {mode === 'all' && (
                <button
                  onClick={() => handleSelectDemo('demo_family')}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border-soft hover:border-primary hover:bg-primary-badge transition-all group text-left"
                >
                  <div className="p-3 bg-primary-badge rounded-lg group-hover:bg-primary transition-colors">
                    <Users className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Familia</h4>
                    <p className="text-sm text-text-secondary mt-1">
                      Explora progreso y oportunidades recomendadas.
                    </p>
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
