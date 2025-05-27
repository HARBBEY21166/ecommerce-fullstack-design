"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getCartItems, updateCartItemQuantity, removeFromCart, getSavedItems, moveToCart } from "@/lib/service/cart"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
  material: string
  seller: string
}

interface SavedItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const items = await getCartItems()
        const saved = await getSavedItems()
        setCartItems(items)
        setSavedItems(saved)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cart data:", error)
        setLoading(false)
      }
    }

    fetchCartData()
  }, [])

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    try {
      await updateCartItemQuantity(id, newQuantity)
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
      window.dispatchEvent(new CustomEvent("cartUpdated"))
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await removeFromCart(id)
      setCartItems(cartItems.filter((item) => item.id !== id))
      window.dispatchEvent(new CustomEvent("cartUpdated"))
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const handleMoveToCart = async (id: string) => {
    try {
      await moveToCart(id)
      const movedItem = savedItems.find((item) => item.id === id)
      if (movedItem) {
        const newCartItem = {
          ...movedItem,
          quantity: 1,
          size: "medium",
          color: "blue",
          material: "Plastic",
          seller: "Artel Market",
        }
        setCartItems([...cartItems, newCartItem as CartItem])
        setSavedItems(savedItems.filter((item) => item.id !== id))
        window.dispatchEvent(new CustomEvent("cartUpdated"))
      }
    } catch (error) {
      console.error("Error moving item to cart:", error)
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10
  const tax = 7
  const total = subtotal + shipping + tax - discount

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="hidden md:block">
          <Header />
        </div>
        
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      <main className="flex-1 bg-gray-50">
        {/* Mobile Cart Header */}
        <div className="md:hidden bg-white border-b">
          <div className="flex items-center px-4 py-3">
            <Button variant="ghost" size="icon" asChild className="mr-3">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Shopping cart</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Desktop Title */}
          <div className="hidden md:block">
            <h1 className="text-2xl font-semibold mb-6">My cart ({cartItems.length})</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 border md:border-0 md:shadow-sm">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm md:text-base line-clamp-2">{item.name}</h3>
                        <div className="text-xs md:text-sm text-gray-500 mt-1">
                          <p>
                            Size: {item.size}, Color: {item.color}
                          </p>
                          <p>Seller: {item.seller}</p>
                        </div>

                        {/* Mobile Quantity and Price */}
                        <div className="md:hidden flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Quantity and Price */}
                      <div className="hidden md:block text-right">
                        <p className="font-semibold mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center">
                          <label className="text-sm text-gray-500 mr-2">Qty:</label>
                          <select
                            className="border rounded-md p-1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* More Options */}
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg p-4 border md:border-0 md:shadow-sm">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({cartItems.length}):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/checkout">Checkout ({cartItems.length} items)</Link>
                </Button>
              </div>

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Saved for later</h2>
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg p-4 border md:border-0 md:shadow-sm">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg?height=64&width=64"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <p className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</p>
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-600"
                                onClick={() => handleMoveToCart(item.id)}
                              >
                                Move to cart
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
