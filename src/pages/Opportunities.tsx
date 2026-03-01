import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Calendar, ArrowRight, Sparkles, Rocket, BookOpen, Laptop, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OpportunitiesPage() {
  const categories = [
    { name: 'Tecnología', icon: <Laptop className="w-4 h-4" />, count: 12 },
    { name: 'Ciencia', icon: <Rocket className="w-4 h-4" />, count: 8 },
    { name: 'Arte Digital', icon: <Palette className="w-4 h-4" />, count: 15 },
    { name: 'Ingeniería', icon: <BookOpen className="w-4 h-4" />, count: 6 },
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Hackathon Nacional de Robótica',
      organization: 'Tech Perú',
      location: 'Lima / Híbrido',
      date: '15 - 20 de Mayo',
      category: 'Tecnología',
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800',
      tags: ['Gratis', 'Certificado']
    },
    {
      id: 2,
      title: 'Taller de Bio-Ingeniería Marina',
      organization: 'Océano Vivo',
      location: 'Online',
      date: '02 de Junio',
      category: 'Ciencia',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=800',
      tags: ['Cupos Limitados']
    },
    {
      id: 3,
      title: 'Concurso de Diseño 3D y VR',
      organization: 'ApuLab Partners',
      location: 'Nacional',
      date: 'Julio 2024',
      category: 'Arte Digital',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=800',
      tags: ['Premios']
    }
  ];

  return (
    <div className="min-h-screen bg-background-base pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-badge text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Explora tu Futuro
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Oportunidades <span className="text-primary">STEAM</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Conectamos el talento de las niñas con los mejores programas, concursos y talleres de la región.
            </p>
          </motion.div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-background-card p-4 rounded-3xl shadow-sm border border-border-soft mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, tema o ciudad..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-background-base border-none focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-2xl border-border-soft text-text-primary">
              <Filter className="w-4 h-4 mr-2" /> Categorías
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-2xl border-border-soft text-text-primary">
              <MapPin className="w-4 h-4 mr-2" /> Ubicación
            </Button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-background-card border border-border-soft hover:border-primary hover:bg-primary-badge transition-all group"
            >
              <span className="text-primary group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-sm font-semibold text-text-primary">{cat.name}</span>
              <span className="text-xs text-text-secondary bg-background-base px-2 py-0.5 rounded-full">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opp) => (
            <motion.div
              key={opp.id}
              whileHover={{ y: -8 }}
              className="bg-background-card rounded-[32px] overflow-hidden border border-border-soft shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={opp.image} 
                  alt={opp.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {opp.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{opp.category}</div>
                <h3 className="text-xl font-bold text-text-primary mb-4 line-clamp-2">{opp.title}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4" /> {opp.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" /> {opp.date}
                  </div>
                </div>

                <Button className="w-full bg-primary-badge hover:bg-primary text-primary hover:text-white rounded-2xl py-6 font-bold transition-all flex items-center justify-center gap-2 group">
                  Ver detalles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <Button variant="ghost" className="text-primary font-bold text-lg hover:bg-primary-badge rounded-full px-12 py-6">
            Cargar más oportunidades
          </Button>
        </div>
      </div>
    </div>
  );
}
