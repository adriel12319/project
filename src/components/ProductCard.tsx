'use client'

import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from 'next/image'

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="transform transition-all duration-300 hover:scale-105"
    >
      <Card className="overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <CardContent className="p-0 relative h-48">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <p className="text-gray-500">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;