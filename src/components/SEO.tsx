import React from 'react';
import { HelmetProvider } from 'react-helmet-async';


interface SEOProps {
  title: string;
  description: string;
  additionalTags?: React.ReactNode;
}

export function SEO({ title, description, additionalTags }: SEOProps) {
  return (
    <HelmetProvider>
      <title>{title}</title>
      <meta name="description" content={description} />
      {additionalTags}
    </HelmetProvider>
  );
}