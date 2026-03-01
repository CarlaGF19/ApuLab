import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading } from '@/components/ui/heading';
import { Target, Users, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Target,
    title: "Detección Temprana",
    description: "Identificamos talentos STEAM antes de que se pierdan por falta de estímulo."
  },
  {
    icon: Zap,
    title: "Conexión Real",
    description: "Vinculamos a las estudiantes con hackathones, mentorías y becas activas."
  },
  {
    icon: Users,
    title: "Comunidad Segura",
    description: "Entorno gamificado diseñado específicamente para niñas, libre de sesgos."
  },
  {
    icon: BarChart3,
    title: "Analítica para Docentes",
    description: "Dashboard en tiempo real con métricas de desempeño y áreas de interés.",
    featured: true
  }
];

export function ModelSection() {
  return (
    <Section id="modelo" className="bg-background-base py-16 lg:py-20 scroll-mt-20 overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Heading size="h2" className="mb-4 text-text-primary tracking-tight">
              Modelo Institucional Integral
            </Heading>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal">
              Nuestra metodología combina inteligencia artificial con pedagogía moderna para transformar la educación STEAM en su colegio.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <div 
                className={cn(
                  "group relative h-full p-8 rounded-[18px] border bg-background-card shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out flex flex-col overflow-hidden",
                  feature.featured 
                    ? "border-primary/30 hover:border-primary/50" 
                    : "border-transparent hover:border-primary/20"
                )}
              >
                
                {/* Icon Container */}
                <div 
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300",
                    feature.featured
                      ? "bg-primary shadow-primary/20"
                      : "bg-primary-badge text-primary"
                  )}
                >
                  <feature.icon className={cn("w-6 h-6", feature.featured ? "text-white" : "text-primary")} />
                </div>
                
                {/* Content */}
                <h3 
                  className={cn(
                    "text-lg font-semibold text-text-primary mb-3 transition-colors duration-300",
                    "group-hover:text-primary"
                  )}
                >
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm flex-grow">
                  {feature.description}
                </p>
                
                {/* Subtle bottom highlight on hover */}
                <div 
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-[18px]",
                    "bg-primary"
                  )} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
