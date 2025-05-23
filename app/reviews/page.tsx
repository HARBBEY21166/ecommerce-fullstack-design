"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFirebase } from "@/components/firebase-provider"
import { getProducts } from "@/lib/firebase/products"

interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  notHelpful: number
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [selectedProduct, setSelectedProduct] = useState("")
  const { user } = useFirebase()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
        // Mock reviews data
        setReviews([
          {
            id: "1",
            productId: "product-1",
            userId: "user1",
            userName: "John Doe",
            rating: 5,
            comment: "Excellent product! Highly recommended.",
            date: "2024-01-15",
            helpful: 12,
            notHelpful: 1,
          },
          {
            id: "2",
            productId: "product-2",
            userId: "user2",
            userName: "Jane Smith",
            rating: 4,
            comment: "Good quality, fast shipping. Would buy again.",
            date: "2024-01-10",
            helpful: 8,
            notHelpful: 0,
          },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !selectedProduct) return

    const review: Review = {
      id: Date.now().toString(),
      productId: selectedProduct,
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      notHelpful: 0,
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: "" })
    setSelectedProduct("")
  }

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
              <h1 className="text-3xl font-bold">Product Reviews</h1>
            </div>

            {user && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                  <CardDescription>Share your experience with other customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Label htmlFor="product">Select Product</Label>
                      <select
                        id="product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Choose a product...</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">Your Review</Label>
                      <Textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Tell others about your experience..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit">Submit Review</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>See what others are saying about our products</CardDescription>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                    <p className="text-gray-600">Be the first to review a product!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => {
                      const product = products.find((p) => p.id === review.productId)
                      return (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            {product && (
                              <Image
                                src={product.image || "/placeholder.svg?height=60&width=60"}
                                alt={product.name}
                                width={60}
                                height={60}
                                className="rounded-md object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{review.userName}</h4>
                                  <p className="text-sm text-gray-500">{product?.name}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              <div className="flex items-center space-x-4">
                                <button className="flex items-center text-sm text-gray-500 hover:text-green-600">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Helpful ({review.helpful})
                                </button>
                                <button className="flex items-center text-sm text-gray-500 hover:text-red-600">
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Not helpful ({review.notHelpful})
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
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
