"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth";
import { addToCart } from "@/lib/service/cart"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const { user } = useAuth()

  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/auth/login"
      return
    }

    setLoading(true)
    try {
      await addToCart(product.id)
      setAdded(true)

      // Dispatch custom event to update cart count
      window.dispatchEvent(new CustomEvent("cartUpdated"))

      setTimeout(() => setAdded(false), 2000) // Reset after 2 seconds
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading}
      className={cn("transition-all duration-200", added && "bg-green-500 hover:bg-green-600", className)}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {loading ? "Adding..." : added ? "Added!" : "Add to Cart"}
    </Button>
  )
}
