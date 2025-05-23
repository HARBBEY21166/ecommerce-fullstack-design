"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFirebase } from "@/components/firebase-provider"

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    conversionRate: 0,
    topProducts: [],
    salesData: [],
  })
  const [loading, setLoading] = useState(true)
  const { user } = useFirebase()

  useEffect(() => {
    // Mock analytics data
    setAnalytics({
      totalSales: 15420.5,
      totalOrders: 127,
      totalCustomers: 89,
      conversionRate: 3.2,
      topProducts: [
        { name: "GoPro HERO6 4K Action Camera", sales: 45, revenue: 4477.5 },
        { name: "Apple MacBook Pro 16-inch", sales: 12, revenue: 15599.88 },
        { name: "Wireless Headphones", sales: 38, revenue: 3781.0 },
      ],
      salesData: [
        { month: "Jan", sales: 2400 },
        { month: "Feb", sales: 1398 },
        { month: "Mar", sales: 9800 },
        { month: "Apr", sales: 3908 },
        { month: "May", sales: 4800 },
        { month: "Jun", sales: 3800 },
      ],
    })
    setLoading(false)
  }, [])

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
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You need to be logged in to view analytics.</p>
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
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Monthly sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between space-x-2">
                    {analytics.salesData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-blue-500 w-full rounded-t"
                          style={{ height: `${(data.sales / 10000) * 250}px` }}
                        ></div>
                        <span className="text-xs mt-2">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sales} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
