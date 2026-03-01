import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/institutional/hero-section';
import { ModelSection } from '@/components/institutional/model-section';
import { HowItWorksSection } from '@/components/institutional/how-it-works-section';
import { MetricsSection } from '@/components/institutional/metrics-section';
import { ImpactSection } from '@/components/institutional/impact-section';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ApuLab | Identidad STEAM para Niñas</title>
        <meta name="description" content="Plataforma gamificada con IA que detecta afinidades STEAM en niñas de primaria y las conecta con oportunidades reales." />
      </Helmet>
      
      <main className="flex-grow">
        <HeroSection />
        <ModelSection />
        <HowItWorksSection />
        <MetricsSection />
        <ImpactSection />
      </main>
    </>
  );
}
