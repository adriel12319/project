import React from 'react';
import { HelmetProvider, helmetContext } from './helmet';

interface AppProvidersProps {
  children: React.ReactNode;
  context?: object;
}

export function AppProviders({ children, context = helmetContext }: AppProvidersProps) {
  return (
    <HelmetProvider context={context}>
      {children}
    </HelmetProvider>
  );
}

export { helmetContext };
