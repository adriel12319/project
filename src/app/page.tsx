import React from 'react'
import ProductCard from "@/components/ProductCard"
import { supabase } from "@/lib/supabase"

async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return products
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium mb-4">Our Products</h1>
          <p className="text-gray-600">Discover our collection of premium products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
