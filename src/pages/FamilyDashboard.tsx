import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Target, Star, Bell, Settings, LogOut, Search, Filter, BookOpen, Rocket, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/layout/DemoBanner';

export default function FamilyDashboard() {
  const { user, logout } = useAuthStore();

  const opportunities = [
    { id: 1, title: 'Taller de Robótica Espacial', category: 'Tecnología', date: '15 Mar', type: 'Presencial' },
    { id: 2, title: 'Club de Bio-Arte', category: 'Arte + Ciencia', date: '20 Mar', type: 'Online' },
    { id: 3, title: 'Hackathon Juvenil 2024', category: 'Ingeniería', date: '05 Abr', type: 'Híbrido' },
  ];

  return (
    <div className="min-h-screen bg-background-base flex">
      {user?.isDemo && <DemoBanner />}
      
      {/* Sidebar */}
      <aside className="w-64 bg-background-card border-r border-border-soft flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-border-soft">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Heart className="w-6 h-6" /> ApuLab
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-badge text-primary font-medium">
            <Sparkles className="w-5 h-5" /> Mi Panel
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-primary-badge hover:text-primary transition-all">
            <Target className="w-5 h-5" /> Oportunidades
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-primary-badge hover:text-primary transition-all">
            <Star className="w-5 h-5" /> Favoritos
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-primary-badge hover:text-primary transition-all">
            <BookOpen className="w-5 h-5" /> Recursos
          </button>
        </nav>

        <div className="p-4 border-t border-border-soft">
          <button 
            onClick={() => { logout(); window.location.href = '/'; }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">¡Hola, {user?.name}! 👋</h1>
            <p className="text-text-secondary">Descubre el camino STEAM de tu hija hoy.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-background-card border border-border-soft text-text-secondary hover:text-primary transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-background-card border border-border-soft text-text-secondary hover:text-primary transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Stats / Quick View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-[24px] text-white shadow-lg shadow-primary/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded">Nivel 1</span>
            </div>
            <h3 className="text-lg font-bold mb-1">Afinidad Detectada</h3>
            <p className="text-white/70 text-sm">Tecnología & Arte</p>
          </div>
          
          <div className="bg-background-card p-6 rounded-[24px] border border-border-soft shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary-badge rounded-xl text-primary">
                <Target className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Oportunidades</h3>
            <p className="text-text-secondary text-sm">12 recomendadas para ella</p>
          </div>

          <div className="bg-background-card p-6 rounded-[24px] border border-border-soft shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary-badge rounded-xl text-primary">
                <Star className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">Intereses</h3>
            <p className="text-text-secondary text-sm">4 áreas guardadas</p>
          </div>
        </div>

        {/* Opportunities List */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">Recomendaciones para tu hija</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full border-border-soft text-text-secondary"><Filter className="w-4 h-4 mr-2" /> Filtrar</Button>
              <Button variant="outline" size="sm" className="rounded-full border-border-soft text-text-secondary"><Search className="w-4 h-4 mr-2" /> Buscar</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {opportunities.map((opp) => (
              <motion.div 
                key={opp.id}
                whileHover={{ x: 4 }}
                className="bg-background-card p-5 rounded-2xl border border-border-soft flex items-center justify-between hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-badge flex items-center justify-center text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary">{opp.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium text-primary bg-primary-badge px-2 py-0.5 rounded-full">{opp.category}</span>
                      <span className="text-xs text-text-secondary flex items-center gap-1"><Calendar className="w-3 h-3" /> {opp.date}</span>
                      <span className="text-xs text-text-secondary">{opp.type}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="text-primary hover:bg-primary-badge rounded-full">Ver más</Button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
