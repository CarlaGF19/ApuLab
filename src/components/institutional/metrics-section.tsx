import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { motion } from 'framer-motion';

const metrics = [
  { value: "45%", label: "Aumento en interés STEAM" },
  { value: "12k+", label: "Niñas impactadas" },
  { value: "85", label: "Colegios aliados" },
  { value: "3x", label: "Participación en concursos" },
];

export function MetricsSection() {
  return (
    <Section id="metricas" className="bg-background-base relative overflow-hidden py-16 lg:py-20 scroll-mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute left-0 bottom-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading size="h2" className="text-text-primary mb-4">Resultados Medibles</Heading>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              No solo enseñamos, transformamos la cultura educativa. Nuestras métricas demuestran un impacto tangible en la confianza y el desempeño de las estudiantes en áreas de ciencia y tecnología.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background-card p-6 rounded-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[400px] bg-background-card rounded-[24px] border border-border-soft p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            {/* Abstract Chart Representation */}
            <div className="flex items-end justify-between h-full gap-4 pb-8 border-b border-primary/10">
              {[40, 65, 55, 80, 70, 90, 85].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-lg relative group"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-text-primary text-white px-3 py-1.5 rounded-lg shadow-lg">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="absolute top-6 right-8 text-xs font-medium text-text-secondary bg-background-base px-3 py-1 rounded-full">
              Crecimiento de afinidad (2024-2025)
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
