import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Target, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function FamiliesLanding() {
  return (
    <div className="min-h-screen bg-background-base">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-primary-dark/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-badge text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> Para Familias que Inspiran
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-tight mb-6">
              Descubre el potencial <br />
              <span className="text-primary">STEAM</span> de tu hija
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              ApuLab ayuda a las familias a identificar las pasiones naturales de sus hijas y las conecta con las mejores oportunidades para brillar en el mundo del mañana.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/registro-familia">
                <Button className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105">
                  Crear cuenta gratuita
                </Button>
              </Link>
              <Link to="/oportunidades">
                <Button variant="ghost" className="text-primary hover:bg-primary-badge rounded-full px-8 py-6 text-lg">
                  Ver oportunidades
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-background-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">¿Por qué elegir ApuLab?</h2>
            <p className="text-text-secondary">Diseñamos un camino personalizado para el crecimiento de tu hija.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Detección de Afinidad</h3>
                  <p className="text-text-secondary">Nuestra tecnología identifica qué áreas STEAM (Ciencia, Tecnología, Ingeniería, Arte y Matemáticas) despiertan más curiosidad en ella.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Conexión con Oportunidades</h3>
                  <p className="text-text-secondary">Acceso a talleres, becas y programas exclusivos que se alinean perfectamente con sus intereses y talentos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-badge flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Comunidad de Apoyo</h3>
                  <p className="text-text-secondary">Únete a otras familias que, como tú, buscan empoderar a la próxima generación de líderes e innovadoras.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" 
                  alt="Niña aprendiendo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background-card p-6 rounded-2xl shadow-xl border border-primary-badge max-w-[240px] -rotate-3">
                <div className="flex items-center gap-2 text-primary font-bold mb-1">
                  <CheckCircle2 className="w-5 h-5" /> +500 Familias
                </div>
                <p className="text-sm text-text-secondary">Confiando en el futuro de sus hijas con ApuLab.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Lista para empezar el viaje?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              El primer paso para un futuro extraordinario comienza hoy. Crea tu cuenta y descubre el mundo de posibilidades para tu hija.
            </p>
            <Link to="/registro-familia">
              <Button className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 py-7 text-xl font-bold transition-all hover:scale-105">
                Regístrate Gratis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
