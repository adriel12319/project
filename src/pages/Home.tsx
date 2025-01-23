import React from 'react';
import { Link } from 'react-router-dom';
import pkg from 'react-helmet-async';
const { Helmet } = pkg;
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>EcoStore - Premium Products for Modern Living</title>
        <meta name="description" content="Discover our curated collection of high-quality products for your lifestyle needs." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Products for
            <span className="text-indigo-600"> Modern Living</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover our curated collection of high-quality products designed to enhance your lifestyle.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;