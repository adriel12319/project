import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from 'next/navigation'
import { supabase } from "@/lib/supabase"
import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

async function getProduct(id: string) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error || !product) {
      throw error || new Error('Product not found')
    }

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('products')
    .select('id')
  
  return products?.map((product) => ({
    id: product.id.toString(),
  })) || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: product.name,
    description: `${product.description} - $${product.price.toFixed(2)}`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: `${product.description} - $${product.price.toFixed(2)}`,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
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
  )
}
