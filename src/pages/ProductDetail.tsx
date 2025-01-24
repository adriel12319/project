'use client'

import Head from 'next/head'
import Link from 'next/link'
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import React from 'react'

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

const ProductDetail = ({ productId }: { productId: string }) => {
  const product = products.find(p => p.id === Number(productId))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Product Details</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-gray-50/50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center mb-8 hover:text-gray-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-medium mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-2xl font-medium mb-8">${product.price.toFixed(2)}</p>
              <Button className="w-full md:w-auto">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail