import { db } from "@/lib/firebase"
import { ref, get, set, push } from "firebase/database"

export interface Order {
  id?: string
  orderNumber: string
  orderDate: string
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: string
  billingInfo: any
  paymentMethod: string
  userId: string
}

// Create a new order
export async function createOrder(orderData: Omit<Order, "id">): Promise<string> {
  try {
    const ordersRef = ref(db, "orders")
    const newOrderRef = push(ordersRef)
    await set(newOrderRef, orderData)
    return newOrderRef.key as string
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Get all orders
export async function getAllOrders(): Promise<Order[]> {
  try {
    const ordersRef = ref(db, "orders")
    const snapshot = await get(ordersRef)

    if (snapshot.exists()) {
      const ordersData = snapshot.val()
      return Object.keys(ordersData).map((key) => ({
        id: key,
        ...ordersData[key],
      }))
    }

    return []
  } catch (error) {
    console.error("Error fetching all orders:", error)
    return []
  }
}

// Get orders for the current user
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    // Instead of using a query that requires an index, we'll fetch all orders
    // and filter them on the client side
    const allOrders = await getAllOrders()

    // Filter orders by userId
    const userOrders = allOrders.filter((order) => order.userId === userId)

    // Sort orders by date (newest first)
    return userOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

// Get order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderRef = ref(db, `orders/${orderId}`)
    const snapshot = await get(orderRef)

    if (snapshot.exists()) {
      return {
        id: orderId,
        ...snapshot.val(),
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error)
    return null
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  try {
    const orderRef = ref(db, `orders/${orderId}/status`)
    await set(orderRef, status)
  } catch (error) {
    console.error(`Error updating order status for ID ${orderId}:`, error)
    throw error
  }
}
