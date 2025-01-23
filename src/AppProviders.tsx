import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

interface AppProvidersProps {
  children: React.ReactNode;
  context?: object;
}

const helmetContext = {};

export function AppProviders({ children, context = helmetContext }: AppProvidersProps) {
  return (
    <HelmetProvider context={context}>
      {children}
    </HelmetProvider>
  );
}

export { helmetContext };
