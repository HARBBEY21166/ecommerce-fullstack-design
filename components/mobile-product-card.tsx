"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating?: number
  reviews?: number
  orders?: number
  freeShipping?: boolean
}

interface MobileProductCardProps {
  product: Product
  layout?: "grid" | "list"
}

export default function MobileProductCard({ product, layout = "grid" }: MobileProductCardProps) {
  if (layout === "list") {
    return (
      <div className="bg-white border-b p-4">
        <div className="flex space-x-3">
          <Link href={`/products/${product.id}`} className="flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg?height=80&width=80"}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
            </Link>
            <div className="flex items-center mt-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < (product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">{product.rating || 7.5}</span>
              <span className="text-xs text-gray-400 ml-2">• {product.orders || 154} orders</span>
            </div>
            <div className="mt-2">
              <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            {product.freeShipping && (
              <span className="inline-block mt-1 text-xs text-green-600 font-medium">Free Shipping</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image || "/placeholder.svg?height=150&width=150"}
          alt={product.name}
          width={150}
          height={150}
          className="w-full h-32 object-cover"
        />
      </Link>
      <div className="p-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < (product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">{product.rating || 7.5}</span>
        </div>
        <div className="mt-2">
          <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        {product.freeShipping && (
          <span className="inline-block mt-1 text-xs text-green-600 font-medium">Free Shipping</span>
        )}
      </div>
    </div>
  )
}
