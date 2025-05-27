"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/lib/firebase"
import { ref, set } from "firebase/database"

// Sample product data
const sampleProducts = [
  {
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    description:
      "Capture your adventures in stunning 4K resolution with the GoPro HERO6. This action camera is waterproof, shockproof, and ready for any adventure. Features include voice control, touch display, and advanced image stabilization.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Canon Camera EOS 2000 Black 10x zoom",
    price: 998.0,
    description:
      "Professional-grade DSLR camera with 10x optical zoom, 24.1MP sensor, and 4K video recording capabilities. Includes built-in Wi-Fi and Bluetooth for easy sharing.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Apple MacBook Pro 16-inch",
    price: 1299.99,
    description:
      "Powerful laptop featuring Apple M1 Pro chip, 16GB RAM, 512GB SSD, and a stunning 16-inch Retina display. Perfect for creative professionals and power users.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Computers",
    stock: 10,
  },
  {
    name: "Wireless Headphones - Silver",
    price: 99.5,
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design. Features high-resolution audio and built-in microphone for calls.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Audio",
    stock: 30,
  },
  {
    name: "Smart Watch Series 5 - Silver",
    price: 199.5,
    description:
      "Advanced smartwatch with health monitoring features, GPS, always-on display, and water resistance up to 50 meters. Compatible with iOS and Android devices.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Wearables",
    stock: 20,
  },
  {
    name: "Men's Long Sleeve T-shirt Cotton Base Layer",
    price: 78.0,
    description:
      "Premium cotton t-shirt designed for comfort and durability. Features a slim fit design, breathable fabric, and is available in multiple colors and sizes.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    stock: 50,
  },
  {
    name: "Leather Wallet - Brown",
    price: 45.99,
    description:
      "Genuine leather wallet with multiple card slots, bill compartment, and RFID blocking technology. Slim design fits comfortably in pocket.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    stock: 40,
  },
  {
    name: "Electric Kettle - Black",
    price: 35.5,
    description:
      "Fast-boiling electric kettle with 1.7L capacity, auto shut-off feature, and boil-dry protection. Cordless design for easy pouring.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Appliances",
    stock: 35,
  },
  {
    name: "Denim Jeans - Blue",
    price: 59.99,
    description:
      "Classic denim jeans with comfortable stretch fabric, five-pocket styling, and durable construction. Available in multiple sizes and washes.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    stock: 45,
  },
  {
    name: "Backpack - Blue",
    price: 89.0,
    description:
      "Durable backpack with laptop compartment, multiple pockets, and water-resistant material. Perfect for school, work, or travel.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Bags",
    stock: 30,
  },
  {
    name: "Coffee Maker - Black",
    price: 65.95,
    description:
      "Programmable coffee maker with 12-cup capacity, auto shut-off, and brew strength control. Includes reusable filter and anti-drip system.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Home Appliances",
    stock: 25,
  },
  {
    name: "Winter Coat - Brown",
    price: 129.5,
    description:
      "Warm winter coat with water-resistant outer shell, insulated lining, and adjustable hood. Features multiple pockets and durable zipper closure.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    stock: 20,
  },
]

export default function SeedDatabase() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSeedDatabase = async () => {
    setLoading(true)
    setSuccess(false)
    setError(null)

    try {
      // Create a products object with unique IDs
      const productsData: Record<string, any> = {}

      sampleProducts.forEach((product, index) => {
        const productId = `product-${index + 1}`
        productsData[productId] = product
      })

      // Set the products in Firebase
      const productsRef = ref(db, "products")
      await set(productsRef, productsData)

      setSuccess(true)
    } catch (err) {
      console.error("Error seeding database:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Seed Database</h1>
      <p className="mb-4 text-gray-600">
        This will populate your Firebase database with sample product data. Use this to quickly set up your eCommerce
        store with test products.
      </p>

      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>The database has been successfully seeded with product data.</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSeedDatabase} disabled={loading} className="w-full">
        {loading ? "Seeding Database..." : "Seed Database with Products"}
      </Button>
    </div>
  )
}
