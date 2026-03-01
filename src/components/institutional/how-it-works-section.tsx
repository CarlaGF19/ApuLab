import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { motion } from 'framer-motion';
import { ScanFace, BrainCircuit, Trophy, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: ScanFace,
    title: "1. Detección",
    description: "La estudiante interactúa con nuestros desafíos gamificados. Nuestra IA analiza sus patrones de resolución y preferencias en tiempo real."
  },
  {
    icon: BrainCircuit,
    title: "2. Análisis",
    description: "Generamos un perfil de afinidad STEAM único, identificando fortalezas en áreas como lógica, creatividad, ingeniería o ciencias."
  },
  {
    icon: Trophy,
    title: "3. Conexión",
    description: "Conectamos el perfil detectado con oportunidades reales: concursos, becas y talleres que potencian su talento específico."
  }
];

export function HowItWorksSection() {
  return (
    <Section id="como-funciona" className="bg-background-card py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Heading size="h2" className="mb-4 text-text-primary">Cómo Funciona</Heading>
          <p className="text-lg text-text-secondary leading-relaxed">
            Un proceso fluido y divertido para las estudiantes, pero poderoso para la institución.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 to-primary/20 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-background-card border border-primary/10 flex items-center justify-center mb-6 shadow-lg shadow-primary/5 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <step.icon className="w-10 h-10 text-primary transition-colors duration-300 relative z-10" />
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm px-4">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="md:hidden my-6 text-primary/30">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
