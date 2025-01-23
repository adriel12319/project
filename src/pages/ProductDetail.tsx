import React from 'react';
import { useParams } from 'react-router-dom';

// Simulated product data
const products = {
  1: { id: 1, name: 'Product 1', price: 99.99, description: 'Detailed description for Product 1' },
  2: { id: 2, name: 'Product 2', price: 149.99, description: 'Detailed description for Product 2' },
  3: { id: 3, name: 'Product 3', price: 199.99, description: 'Detailed description for Product 3' },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products[id as keyof typeof products];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-2xl text-blue-600 mb-4">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}