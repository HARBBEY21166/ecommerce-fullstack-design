"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFirebase } from "@/components/firebase-provider"
import { getOrderById } from "@/lib/firebase/orders"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { user, loading } = useFirebase()
  const [order, setOrder] = useState<any>(null)
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      if (user) {
        try {
          const orderData = await getOrderById(params.id)

          if (!orderData) {
            setError("Order not found")
          } else if (orderData.userId !== user.uid) {
            setError("You don't have permission to view this order")
          } else {
            setOrder(orderData)
          }
        } catch (err) {
          console.error("Error fetching order:", err)
          setError("Failed to load order details")
        } finally {
          setLoadingOrder(false)
        }
      } else {
        setLoadingOrder(false)
      }
    }

    fetchOrder()
  }, [params.id, user])

  if (loading || loadingOrder) {
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
            <p className="mb-4">You need to be logged in to view order details.</p>
            <Button asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-4">{error}</h1>
            <Button asChild>
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="mb-4">The order you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/orders">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Orders
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Order Details</h1>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Order #{order.orderNumber}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {order.status}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  Placed on {format(new Date(order.orderDate), "MMMM d, yyyy 'at' h:mm a")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              {item.size && `Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <div className="text-sm">
                        <p className="font-medium">
                          {order.billingInfo.firstName} {order.billingInfo.lastName}
                        </p>
                        <p>{order.billingInfo.address}</p>
                        <p>
                          {order.billingInfo.city}, {order.billingInfo.state} {order.billingInfo.zipCode}
                        </p>
                        <p>{order.billingInfo.country}</p>
                        <p className="mt-1">{order.billingInfo.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Payment Information</h3>
                      <div className="text-sm">
                        <p>
                          <span className="font-medium">Method:</span>{" "}
                          {order.paymentMethod === "card" ? "Credit/Debit Card" : "PayPal"}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {order.billingInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${order.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/orders">Back to Orders</Link>
              </Button>
              <Button>Track Order</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
