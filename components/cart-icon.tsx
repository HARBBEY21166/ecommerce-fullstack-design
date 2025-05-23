"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useFirebase } from "./firebase-provider"
import { getCartItems } from "@/lib/firebase/cart"

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useFirebase()

  useEffect(() => {
    const fetchCartCount = async () => {
      if (user) {
        try {
          const items = await getCartItems()
          const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
          setCartCount(totalCount)
        } catch (error) {
          console.error("Error fetching cart count:", error)
        }
      } else {
        setCartCount(0)
      }
      setLoading(false)
    }

    fetchCartCount()

    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [user])

  return (
    <Link href="/cart" className="flex flex-col items-center text-xs relative">
      <div className="relative">
        <ShoppingCart className="h-5 w-5 mb-1" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </div>
      <span>My cart</span>
    </Link>
  )
}
