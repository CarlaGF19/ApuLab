import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Home from '@/pages/home';
import { PilotModal } from '@/components/pilot/pilot-modal';
import { PilotToast } from '@/components/pilot/pilot-toast';

export function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-text-main antialiased selection:bg-primary/20 selection:text-primary-dark overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      
      {/* Global Components */}
      <PilotModal />
      <PilotToast />
    </div>
  );
}
