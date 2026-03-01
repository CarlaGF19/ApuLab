import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Search, 
  Filter, 
  Star, 
  ChevronRight, 
  Clock, 
  Zap,
  MapPin,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { MOCK_OPPORTUNITIES } from '@/data/opportunities';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SteamArea, OpportunityType } from '@/types/opportunity';

import { StudentLayout } from '@/components/layout/StudentLayout';
import { LandingLayout } from '@/components/layout/LandingLayout';
import { SEO } from '@/components/seo/SEO';

export default function OpportunitiesList() {
  const { user, toggleFavorite, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<OpportunityType | 'Todos'>('Todos');
  const [filterArea, setFilterArea] = useState<SteamArea | 'Todas'>('Todas');
  const [filterStatus, setFilterStatus] = useState<'Todas' | 'Abiertas' | 'Próximas'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const isStudent = isAuthenticated && (user?.role === 'alumno' || user?.role === 'demo_alumno');
  const Layout = isStudent ? StudentLayout : LandingLayout;

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter(opp => {
    const matchesType = filterType === 'Todos' || opp.type === filterType;
    const matchesArea = filterArea === 'Todas' || opp.area === filterArea;
    // For now, status is mock logic
    const matchesStatus = filterStatus === 'Todas' || (filterStatus === 'Abiertas' ? true : false);
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesArea && matchesSearch && matchesStatus;
  });

  const handleToggleFavorite = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Inicia sesión para guardar favoritas', {
        action: {
          label: 'Login',
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    const isFavorite = user?.favorites?.includes(id);
    toggleFavorite(id);
    if (!isFavorite) {
      toast.success('Guardado en tus favoritas.', {
        duration: 2000,
        position: 'bottom-center',
      });
    }
  };

  return (
    <Layout>
      <SEO 
        title="Oportunidades STEAM" 
        description="Descubre concursos, hackathones y talleres para potenciar tu perfil STEAM." 
      />
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12 pb-20">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-text-primary flex items-center gap-3">
            <Rocket className="w-10 h-10 text-primary" /> Oportunidades en tiempo real
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Descubre concursos, hackathones y talleres curados especialmente para potenciar tu perfil STEAM.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] border border-border-soft shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Buscar oportunidades..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background-base rounded-2xl border border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none font-medium"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-6 py-4 bg-background-base rounded-2xl border border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none font-semibold text-text-primary appearance-none cursor-pointer"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Local">Local</option>
                <option value="Nacional">Nacional</option>
              </select>
              <select 
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value as any)}
                className="px-6 py-4 bg-background-base rounded-2xl border border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none font-semibold text-text-primary appearance-none cursor-pointer"
              >
                <option value="Todas">Todas las áreas</option>
                <option value="Ciencia">Ciencia</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Ingeniería">Ingeniería</option>
                <option value="Arte">Arte</option>
                <option value="Matemática">Matemática</option>
              </select>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-6 py-4 bg-background-base rounded-2xl border border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none font-semibold text-text-primary appearance-none cursor-pointer"
              >
                <option value="Todas">Todos los estados</option>
                <option value="Abiertas">Abiertas</option>
                <option value="Próximas">Próximas</option>
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="grid gap-6">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opp) => {
              const isFavorite = user?.favorites?.includes(opp.id);
              return (
                <motion.div 
                  layout
                  key={opp.id} 
                  className="bg-background-card p-8 rounded-[40px] border border-border-soft shadow-sm hover:border-primary/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group relative"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-primary-badge flex items-center justify-center text-primary flex-shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary-badge px-2 py-0.5 rounded">
                          Recomendada para ti
                        </span>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1">
                          {opp.type === 'Local' ? <MapPin className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                          {opp.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">{opp.title}</h3>
                      <p className="text-sm text-text-secondary mt-1 flex items-center gap-1 font-medium">
                        <Clock className="w-4 h-4" /> Fecha límite: {opp.deadline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleToggleFavorite(opp.id)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all",
                        isFavorite 
                          ? "bg-primary border-primary text-white" 
                          : "bg-white border-border-soft text-text-secondary hover:border-primary/50"
                      )}
                    >
                      <Star className={cn("w-5 h-5", isFavorite && "fill-current")} />
                    </button>
                    <Link to={`/oportunidades/${opp.id}`} className="flex-1 md:flex-none">
                      <Button className="w-full bg-text-primary hover:bg-primary text-white rounded-2xl px-8 py-6 font-bold transition-all">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-border-soft">
              <Search className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-20" />
              <p className="text-text-secondary font-medium">No encontramos oportunidades que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
