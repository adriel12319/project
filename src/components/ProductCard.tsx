'use client'

import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

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
        <CardContent className="p-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
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