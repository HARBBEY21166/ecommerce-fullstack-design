"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ArrowLeft, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/useAuth";
import { getProducts } from "@/lib/service/products"

interface WishlistItem {
  id: string
  productId: string
  dateAdded: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
        // Mock wishlist data
        setWishlistItems([
          { id: "1", productId: "product-1", dateAdded: "2024-01-15" },
          { id: "2", productId: "product-2", dateAdded: "2024-01-10" },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
  }

  const wishlistProducts = wishlistItems
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="mb-4">You need to be logged in to view your wishlist.</p>
            <Button asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Saved Items ({wishlistProducts.length})
                </CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">
                      Save products you love to your wishlist and come back to them later.
                    </p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                        <div className="relative">
                          <Link href={`/products/${item.product.id}`}>
                            <Image
                              src={item.product.image || "/placeholder.svg?height=200&width=200"}
                              alt={item.product.name}
                              width={200}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="p-4">
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="font-semibold text-sm mb-2 hover:text-blue-600">{item.product.name}</h3>
                          </Link>
                          <p className="text-lg font-bold text-blue-600 mb-2">${item.product.price.toFixed(2)}</p>
                          <p className="text-xs text-gray-500 mb-3">Added on {item.dateAdded}</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
