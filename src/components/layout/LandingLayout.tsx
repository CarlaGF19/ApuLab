import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PilotModal } from '@/components/pilot/pilot-modal';
import { PilotToast } from '@/components/pilot/pilot-toast';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <PilotModal />
      <PilotToast />
    </div>
  );
}
