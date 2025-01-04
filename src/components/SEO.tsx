import React from 'react';
import pkg from 'react-helmet-async';
const { Helmet } = pkg;

interface SEOProps {
  title: string;
  description: string;
  additionalTags?: React.ReactNode;
}

export function SEO({ title, description, additionalTags }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {additionalTags}
    </Helmet>
  );
}