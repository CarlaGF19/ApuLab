import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ReactLenis } from 'lenis/react';
import { queryClient } from '@/lib/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
