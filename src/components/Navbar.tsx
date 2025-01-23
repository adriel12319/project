import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, Package } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Info size={20} />
              <span>About</span>
            </Link>
            <Link to="/products" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Package size={20} />
              <span>Products</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}