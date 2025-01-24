'use client'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ProductCard from "@/components/ProductCard"
import { Product } from "@/types/product"

const products: Product[] = [
  {
    id: 1,
    name: "Premium Watch",
    description: "Elegant timepiece with premium materials and precise movement",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    description: "High-quality sound with active noise cancellation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
  },
  {
    id: 3,
    name: "Smart Speaker",
    description: "Voice-controlled speaker with premium sound quality",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab"
  }
]

const Products = () => {
  return (
    <>
      <Head>
        <title>Premium Products | Our Collection</title>
        <meta name="description" content="Discover our collection of premium products crafted with excellence" />
      </Head>
      
      <div className="min-h-screen bg-gray-50/50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-medium mb-4">Our Products</h1>
            <p className="text-gray-600">Discover our collection of premium products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products