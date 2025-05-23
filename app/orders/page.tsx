"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Package, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFirebase } from "@/components/firebase-provider"
import { getUserOrders } from "@/lib/firebase/orders"

export default function OrdersPage() {
  const { user, loading } = useFirebase()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.uid)
          setOrders(userOrders)
        } catch (error) {
          console.error("Error fetching orders:", error)
        } finally {
          setLoadingOrders(false)
        }
      } else {
        setLoadingOrders(false)
      }
    }

    fetchOrders()
  }, [user])

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
            <p className="mb-4">You need to be logged in to view your orders.</p>
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
              <h1 className="text-3xl font-bold">My Orders</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order History
                </CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <p className="text-sm text-gray-500">Order placed</p>
                              <p className="font-medium">{format(new Date(order.orderDate), "MMM d, yyyy")}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <p className="text-sm text-gray-500">Order number</p>
                              <p className="font-medium">{order.orderNumber}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Items</h3>
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <Image
                                  src={item.image || "/placeholder.svg?height=50&width=50"}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                  className="rounded-md object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium">{item.name}</h4>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${order.id}`}>
                                View Order Details
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Link>
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
