import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactHelmet from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

const { HelmetProvider, Helmet } = ReactHelmet;

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default App;