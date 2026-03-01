import * as React from 'react';
import { motion } from 'motion/react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles, Heart, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-background-base flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-card border border-primary/10 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Ecosistema STEAM de Alto Impacto</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight">
              Impulsamos el <br />
              <span className="text-primary">talento STEAM</span> <br />
              en niñas
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Detectamos afinidad STEAM en tiempo real y la conectamos con oportunidades reales. Un solo ecosistema, dos puertas de entrada.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <Link to="/familias">
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl px-8 h-20 text-lg shadow-lg shadow-primary/20 transition-all flex flex-col items-start justify-center gap-0.5"
                >
                  <div className="flex items-center gap-2 font-bold">
                    Para Familias <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <span className="text-xs font-normal opacity-80">Descubre el potencial de tu hija</span>
                </Button>
              </Link>
              
              <Link to="/modelo-institucional">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-white rounded-2xl px-8 h-20 text-lg transition-all flex flex-col items-start justify-center gap-0.5"
                >
                  <div className="flex items-center gap-2 font-bold">
                    Instituciones <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-normal opacity-80">Analítica y métricas STEAM</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-background-card">
              <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=1000" 
                alt="Niña programando en el aula" 
                className="w-full h-auto object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-background-card p-6 rounded-3xl shadow-2xl border border-primary-badge flex items-center gap-4 max-w-[280px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-badge flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">98%</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Precisión IA</p>
                <p className="text-sm font-semibold text-text-primary">Perfil STEAM detectado con éxito</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
