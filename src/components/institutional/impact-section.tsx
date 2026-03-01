import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function ImpactSection() {
  return (
    <Section id="impacto" className="bg-primary-badge scroll-mt-24 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Heading size="h2" className="mb-6 text-text-primary">Impacto Real en el Futuro STEAM</Heading>
            <p className="text-lg text-text-secondary mb-6">
              Más allá de las métricas, transformamos vidas. Niñas que descubren su pasión hoy, serán las líderes científicas y tecnológicas de mañana.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Reducción de la brecha de género en tecnología.",
                "Empoderamiento temprano mediante validación de talentos.",
                "Visibilidad de roles y carreras STEAM.",
                "Acceso democratizado a oportunidades de alto nivel."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" className="shadow-lg shadow-primary/20">
              Ver Casos de Éxito
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[32px] overflow-hidden shadow-2xl shadow-primary/10 border border-background-card/60">
              <img 
                src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" 
                alt="Estudiante enfocada en tecnología" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            
            {/* Decorative blob */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
