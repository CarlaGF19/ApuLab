import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, ShieldCheck, GraduationCap, FileText, Calendar, ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function InstitutionalLanding() {
  return (
    <div className="min-h-screen bg-background-base">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-border-soft bg-background-card">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-background-base text-text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Building2 className="w-4 h-4" /> Modelo B2B Institucional
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
              Analítica Predictiva para <br />
              <span className="text-primary">Instituciones Educativas</span>
            </h1>
            <p className="text-lg text-text-secondary mb-10 leading-relaxed">
              Potencie el perfil STEAM de sus estudiantes con métricas medibles, reportes de impacto y una plataforma de seguimiento institucional de alto rendimiento.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button className="bg-text-primary hover:bg-primary-dark text-white rounded-lg px-8 py-6 text-lg transition-all flex items-center gap-2">
                Solicitar reunión institucional <Calendar className="w-5 h-5" />
              </Button>
              <Link to="/login">
                <Button variant="outline" className="border-border-soft text-text-primary hover:bg-background-base rounded-lg px-8 py-6 text-lg">
                  Acceso Docente
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="relative">
            <div className="bg-background-card rounded-2xl shadow-sm border border-border-soft p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="h-8 w-32 bg-background-base rounded animate-pulse" />
                <div className="h-8 w-8 bg-primary/10 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-background-base rounded" />
                <div className="h-4 w-3/4 bg-background-base rounded" />
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="h-24 bg-primary-badge rounded-xl border border-primary/10" />
                  <div className="h-24 bg-primary-badge rounded-xl border border-primary/10" />
                  <div className="h-24 bg-primary rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background-card p-8 rounded-2xl border border-border-soft shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-badge flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Analítica Docente</h3>
              <p className="text-text-secondary">Panel de control avanzado para el seguimiento del progreso STEAM por aula y estudiante.</p>
            </div>
            <div className="bg-background-card p-8 rounded-2xl border border-border-soft shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-badge flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Reportes de Impacto</h3>
              <p className="text-text-secondary">Generación automática de informes para la dirección y acreditaciones internacionales.</p>
            </div>
            <div className="bg-background-card p-8 rounded-2xl border border-border-soft shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-badge flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Licencia Anual</h3>
              <p className="text-text-secondary">Modelo de suscripción institucional con soporte prioritario y capacitación docente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Impact */}
      <section className="py-20 bg-text-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Transformación Educativa Basada en Datos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-white/60 text-sm uppercase tracking-widest">Precisión en Afinidad</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+15k</div>
              <p className="text-white/60 text-sm uppercase tracking-widest">Alumnos Medidos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">45</div>
              <p className="text-white/60 text-sm uppercase tracking-widest">Colegios Aliados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <p className="text-white/60 text-sm uppercase tracking-widest">Países</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-text-primary mb-6">¿Su institución está lista para el siguiente nivel?</h2>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Únase a la red de colegios que están liderando la educación STEAM en la región.
          </p>
          <Button className="bg-primary hover:bg-primary-dark text-white rounded-lg px-10 py-7 text-xl font-bold transition-all shadow-xl shadow-primary/20">
            Agendar Demo Institucional <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
