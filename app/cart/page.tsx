"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/CartContext"
import { Input } from "@/components/ui/input" // Added Input import

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
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  // Assuming the cart context manages loading state internally or you handle it differently now
  const loading = false; // Or get loading state from useCart if available

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  }

  const handleRemoveItem = async (id: string) => {
    removeFromCart(id);
  }

  const handleMoveToCart = async (id: string) => {
    // You will need to implement the logic to move an item from savedItems
    // back to the cartItems state and potentially update Firebase.
    // This might involve adding the item to cartItems and removing it from savedItems.
    console.log("Move to cart clicked for item:", id);
    // Example placeholder:
    // const itemToMove = savedItems.find(item => item.id === id);
    // if (itemToMove) {
    //   // Add to cartItems
    //   // Remove from savedItems
    //   // Update Firebase if necessary
    // }
  }

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    console.log("Applying coupon:", couponCode);
    // Example placeholder:
    // if (couponCode === "DISCOUNT10") {
    //   setDiscount(subtotal * 0.1);
    // } else {
    //   setDiscount(0);
    // }
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
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold mb-6">My cart ({cartItems.length})</h1>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Cart Items */}
              <div className="bg-white rounded-md shadow-sm overflow-hidden mb-6">
                {cartItems.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button className="mt-4" asChild>
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="border-b last:border-b-0 p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=96&width=96"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            <p>
                              Size: {item.size}, Color: {item.color}, Material: {item.material}
                            </p>
                            <p>Seller: {item.seller}</p>
                          </div>
                          <div className="flex mt-2">
                            <button className="text-red-500 text-sm" onClick={() => handleRemoveItem(item.id)}>
                              Remove
                            </button>
                            {/* You'll need to implement the Save for Later logic */}
                            <button className="text-blue-500 text-sm ml-4">Save for later</button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <div className="flex items-center mt-2">
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
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Button variant="outline" className="mb-6" asChild>
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to shop
                </Link>
              </Button>

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className="bg-white rounded-md shadow-sm overflow-hidden mb-6">
                  <h2 className="text-xl font-semibold p-4 border-b">Saved for later</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="border rounded-md overflow-hidden">
                        <div className="h-32 overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg?height=128&width=128"}
                            alt={item.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                          <p className="text-sm truncate">{item.name}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => handleMoveToCart(item.id)}
                          >
                            Move to cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-md shadow-sm overflow-hidden mb-6">
                <h2 className="text-lg font-semibold p-4 border-b">Have a coupon?</h2>
                <div className="p-4">
                  <div className="flex">
                    <Input
                      placeholder="Add coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button onClick={handleApplyCoupon} className="rounded-l-none">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-sm overflow-hidden">
                <h2 className="text-lg font-semibold p-4 border-b">Order Summary</h2>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-red-500">- ${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-green-500">+ ${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
