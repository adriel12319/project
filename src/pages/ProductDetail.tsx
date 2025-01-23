import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Updated import statement
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.title} - EcoStore`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/products')}
          className="mb-8 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            <p className="text-gray-600 text-lg">{product.description}</p>

            <div className="text-3xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </div>

            <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;