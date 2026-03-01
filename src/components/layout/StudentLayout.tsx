import React from 'react';
import { StudentSidebar } from './StudentSidebar';
import { StudentNavbar } from './StudentNavbar';
import { useAuthStore } from '@/store/authStore';
import { DemoBanner } from './DemoBanner';
import { Toaster } from 'sonner';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background-base font-sans flex">
      <Toaster richColors />
      
      {/* Sidebar - Fixed/Sticky on the left */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {user?.isDemo && <DemoBanner />}
        
        {/* Navbar - Glass, Relative (No Fijo) as requested */}
        <StudentNavbar />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
