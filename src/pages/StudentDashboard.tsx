import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Dna, 
  Trophy, 
  Clock, 
  ChevronRight,
  Star,
  Rocket,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import { cn } from '@/lib/utils';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer
} from 'recharts';
import { getRecommendedOpportunities } from '@/data/opportunities';
import { toast, Toaster } from 'sonner';

// Mock Data for Student
const studentSteamData = [
  { subject: 'Ciencia', A: 75 },
  { subject: 'Tecnología', A: 95 },
  { subject: 'Ingeniería', A: 65 },
  { subject: 'Arte', A: 88 },
  { subject: 'Matemática', A: 82 },
];

const challenges = [
  { id: 1, title: 'Misión: Algoritmos Creativos', level: 'Intermedio', time: '45 min', icon: <Zap className="w-5 h-5" /> },
  { id: 2, title: 'Desafío: Bio-Arte Digital', level: 'Avanzado', time: '1h 20min', icon: <Dna className="w-5 h-5" /> },
];

const achievements = [
  { id: 1, title: 'Constancia', icon: <Clock className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
  { id: 2, title: 'Creatividad', icon: <Sparkles className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600' },
  { id: 3, title: 'Lógica', icon: <Target className="w-6 h-6" />, color: 'bg-green-50 text-green-600' },
  { id: 4, title: 'Participación', icon: <Rocket className="w-6 h-6" />, color: 'bg-orange-50 text-orange-600' },
];

import { StudentLayout } from '@/components/layout/StudentLayout';

export default function StudentDashboard() {
  const { user, toggleFavorite } = useAuthStore();
  const featuredOpportunities = getRecommendedOpportunities(2);

  const handleToggleFavorite = (id: string) => {
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
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-12 pb-20">
        {/* SECCIÓN 1 — IDENTIDAD STEAM */}
        <section>
          <div className="bg-background-card p-8 md:p-12 rounded-[40px] border border-border-soft shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Dna className="w-4 h-4" /> Tu identidad STEAM actual
                  </h2>
                  <h1 className="text-4xl md:text-5xl font-semibold text-text-primary leading-tight">
                    Perfil <span className="text-primary">Tecno-Creativa</span>
                  </h1>
                </div>

                <div className="p-6 bg-primary-badge rounded-3xl border border-primary/10">
                  <p className="text-primary font-medium leading-relaxed italic">
                    "Tu mayor fortaleza es la Tecnología. Estás creciendo mucho en Ciencia, ¡sigue explorando!"
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="px-6 py-3 bg-background-base rounded-2xl">
                    <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest mb-1">Nivel Actual</p>
                    <span className="text-lg font-semibold text-text-primary">Exploradora Pro</span>
                  </div>
                  <div className="px-6 py-3 bg-background-base rounded-2xl">
                    <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest mb-1">Tendencia</p>
                    <span className="text-lg font-semibold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-5 h-5" /> Creciendo
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={studentSteamData}>
                    <PolarGrid stroke="#E8E6EC" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B6B75', fontSize: 12, fontWeight: 500 }} />
                    <Radar
                      name="Tú"
                      dataKey="A"
                      stroke="#92487A"
                      fill="#92487A"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* SECCIÓN 2 — RETOS ACTIVOS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Retos recomendados para ti
              </h2>
              <Link to="/retos" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-background-card p-6 rounded-[32px] border border-border-soft shadow-sm hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    {challenge.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{challenge.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-8">
                    <span className="font-semibold text-primary">{challenge.level}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {challenge.time}</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-6 font-semibold shadow-lg shadow-primary/20">
                    Empezar reto
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 3 — LOGROS */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" /> Logros
            </h2>
            <div className="bg-background-card p-8 rounded-[32px] border border-border-soft shadow-sm grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="text-center group">
                  <div className={`w-14 h-14 rounded-full ${achievement.color} flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
                    {achievement.icon}
                  </div>
                  <h3 className="text-xs font-bold text-text-primary">{achievement.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN 4 — OPORTUNIDADES DESTACADAS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" /> Oportunidades destacadas
            </h2>
            <Link to="/oportunidades" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Ver todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredOpportunities.map((opp) => {
              const isFavorite = user?.favorites?.includes(opp.id);
              return (
                <div key={opp.id} className="bg-background-card p-8 rounded-[40px] border border-border-soft shadow-sm hover:border-primary/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group relative">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-primary-badge flex items-center justify-center text-primary flex-shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary-badge px-2 py-0.5 rounded">
                          {opp.matchLabel}
                        </span>
                        <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest">
                          {opp.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">{opp.title}</h3>
                      <p className="text-sm text-text-secondary mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Fecha límite: {opp.deadline}
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
                      <Button className="w-full bg-text-primary hover:bg-primary text-white rounded-2xl px-8 py-6 font-semibold transition-all">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
