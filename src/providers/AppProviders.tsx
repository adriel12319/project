import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  );
}