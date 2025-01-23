import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppProviders, helmetContext } from './AppProviders';
import App from './App';

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <AppProviders context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </AppProviders>
  );

  return {
    html,
    helmet: helmetContext.helmet
  };
}