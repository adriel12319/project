import React from 'react';
import pkg from 'react-helmet-async';
const { HelmetProvider } = pkg;

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