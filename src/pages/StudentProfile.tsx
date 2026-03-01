import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Star, 
  Trash2, 
  ChevronRight, 
  Clock, 
  Zap,
  Rocket,
  Settings,
  Shield,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import { MOCK_OPPORTUNITIES } from '@/data/opportunities';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';

import { StudentLayout } from '@/components/layout/StudentLayout';

export default function StudentProfile() {
  const { user, toggleFavorite } = useAuthStore();
  
  const favoriteOpportunities = MOCK_OPPORTUNITIES.filter(opp => 
    user?.favorites?.includes(opp.id)
  );

  const handleRemoveFavorite = (id: string) => {
    toggleFavorite(id);
    toast.info('Oportunidad eliminada de tus favoritas.', {
      duration: 2000,
      position: 'bottom-center',
    });
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12 pb-20">
        {/* Profile Header */}
        <div className="bg-white p-10 rounded-[40px] border border-border-soft shadow-sm flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="w-32 h-32 rounded-[40px] bg-primary-badge flex items-center justify-center text-primary relative z-10">
            <User className="w-16 h-16" />
          </div>
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <h1 className="text-4xl font-bold text-text-primary mb-2">{user?.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="px-4 py-2 bg-background-base rounded-xl text-sm font-bold text-text-secondary">
                Grado: 5° A
              </span>
              <span className="px-4 py-2 bg-background-base rounded-xl text-sm font-bold text-text-secondary">
                Edad: 11 años
              </span>
              <span className="px-4 py-2 bg-primary-badge rounded-xl text-sm font-bold text-primary">
                Perfil: Tecno-Creativa
              </span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <button className="p-4 rounded-2xl border border-border-soft text-text-secondary hover:text-primary hover:border-primary/50 transition-all">
              <Settings className="w-6 h-6" />
            </button>
            <button className="p-4 rounded-2xl border border-border-soft text-text-secondary hover:text-primary hover:border-primary/50 transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Favorites Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Star className="w-6 h-6 text-primary fill-primary" /> Mis oportunidades guardadas
            </h2>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {favoriteOpportunities.length > 0 ? (
                  favoriteOpportunities.map((opp) => (
                    <motion.div 
                      layout
                      key={opp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white p-6 rounded-[32px] border border-border-soft shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary-badge flex items-center justify-center text-primary flex-shrink-0">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">{opp.title}</h3>
                          <p className="text-sm text-text-secondary mt-1 flex items-center gap-1 font-medium">
                            <Clock className="w-4 h-4" /> Fecha límite: {opp.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <Link to={`/oportunidades/${opp.id}`} className="flex-1 md:flex-none">
                          <Button variant="ghost" className="w-full text-primary hover:bg-primary-badge rounded-xl px-6 py-4 font-bold flex items-center gap-2">
                            Ver detalles <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <button 
                          onClick={() => handleRemoveFavorite(opp.id)}
                          className="p-4 rounded-xl text-text-secondary hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-border-soft">
                    <Star className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-20" />
                    <p className="text-text-secondary font-medium mb-6">Aún no tienes oportunidades guardadas.</p>
                    <Link to="/oportunidades">
                      <Button className="bg-primary hover:bg-primary-dark text-white rounded-2xl px-8 py-4 font-bold">
                        Explorar oportunidades
                      </Button>
                    </Link>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Info (Privacy/Settings) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" /> Privacidad y Seguridad
            </h2>
            <div className="bg-white p-8 rounded-[32px] border border-border-soft shadow-sm space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-background-base rounded-2xl">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-text-primary">Tus datos están seguros</p>
                    <p className="text-xs text-text-secondary">Solo tú y tus docentes pueden ver tu progreso.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background-base rounded-2xl">
                  <Rocket className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-text-primary">ApuLab no comparte tu info</p>
                    <p className="text-xs text-text-secondary">Tus afinidades se usan solo para recomendarte retos.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-soft">
                <p className="text-xs text-text-secondary leading-relaxed italic">
                  "El alumno solo puede ver su información, su progreso y oportunidades recomendadas. No puede ver datos de otros estudiantes ni modificar su identidad detectada."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
