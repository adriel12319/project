import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-500">
              <Store className="h-6 w-6" />
              <span className="font-bold text-xl">EcoStore</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-indigo-600">Products</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;