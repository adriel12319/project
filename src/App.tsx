import React from 'react';
import { SEO } from './components/SEO';

function App() {
  return (
    <>
      <SEO 
        title="Minha Aplicação SSR"
        description="Uma aplicação React com SSR"
      />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Esta página agora tem SSR!</p>
      </div>
    </>
  );
}

export default App;