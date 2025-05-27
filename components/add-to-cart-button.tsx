"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    stock?: number
  }
  className?: string
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const { user } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!user) {
      router.push(`/auth/login?redirect=/products/${product.id}`)
      return
    }

    setLoading(true)
    try {
      addToCart(product, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading || added}
      className={cn(
        "transition-all duration-200",
        added && "bg-green-500 hover:bg-green-600",
        className
      )}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {loading ? "Adding..." : added ? "Added!" : "Add to Cart"}
    </Button>
  )
}