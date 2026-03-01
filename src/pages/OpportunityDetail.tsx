import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Clock, 
  Target, 
  Zap, 
  CheckCircle2,
  Info,
  Rocket
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import { MOCK_OPPORTUNITIES } from '@/data/opportunities';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';

import { StudentLayout } from '@/components/layout/StudentLayout';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleFavorite } = useAuthStore();
  
  const opportunity = MOCK_OPPORTUNITIES.find(opp => opp.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background-base flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Oportunidad no encontrada</h1>
        <Button onClick={() => navigate('/oportunidades')}>Volver a la lista</Button>
      </div>
    );
  }

  const isFavorite = user?.favorites?.includes(opportunity.id);

  const handleToggleFavorite = () => {
    toggleFavorite(opportunity.id);
    if (!isFavorite) {
      toast.success('Guardado en tus favoritas.', {
        duration: 2000,
        position: 'bottom-center',
      });
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-10 pb-20">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-[40px] border border-border-soft shadow-sm overflow-hidden">
          <div className="h-[400px] w-full relative">
            <img 
              src={opportunity.image} 
              alt={opportunity.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {opportunity.area}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                    {opportunity.type}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {opportunity.title}
                </h1>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={handleToggleFavorite}
                  className={cn(
                    "p-5 rounded-2xl border transition-all",
                    isFavorite 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                  )}
                >
                  <Star className={cn("w-6 h-6", isFavorite && "fill-current")} />
                </button>
                <a 
                  href={opportunity.externalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-text-primary px-8 py-5 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                >
                  Ir al sitio oficial <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-10 rounded-[40px] border border-border-soft shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" /> Descripción completa
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed font-medium">
                {opportunity.description}
              </p>
            </section>

            {/* AI Recommendation Section */}
            <section className="bg-primary-badge p-10 rounded-[40px] border border-primary/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 relative z-10">
                <Rocket className="w-6 h-6" /> ¿Por qué te recomendamos esto?
              </h2>
              <div className="space-y-6 relative z-10">
                <p className="text-primary font-semibold text-lg italic leading-relaxed">
                  "{opportunity.matchReason}"
                </p>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Se alinea con tu afinidad en {opportunity.area}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Tu rendimiento actual es alto en Matemática</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Es adecuado para estudiantes de 5° grado</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-border-soft shadow-sm space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Nivel recomendado</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold text-text-primary">{opportunity.level}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Fecha límite</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold text-text-primary">{opportunity.deadline}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Afinidad detectada</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold text-text-primary">{opportunity.matchScore}% Match</span>
                </div>
              </div>
            </div>

            {/* Mobile Actions (Sticky Bottom or Sidebar) */}
            <div className="md:hidden space-y-4">
              <Button 
                onClick={handleToggleFavorite}
                className={cn(
                  "w-full py-6 rounded-2xl font-bold transition-all",
                  isFavorite 
                    ? "bg-primary text-white" 
                    : "bg-white border border-border-soft text-text-secondary"
                )}
              >
                <Star className={cn("w-5 h-5 mr-2", isFavorite && "fill-current")} />
                {isFavorite ? 'Guardado' : 'Guardar'}
              </Button>
              <a 
                href={opportunity.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-text-primary text-white text-center py-6 rounded-2xl font-bold hover:bg-primary transition-all"
              >
                Ir al sitio oficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
