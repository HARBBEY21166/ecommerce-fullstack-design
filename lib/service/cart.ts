import { db } from "@/lib/firebase"
import { ref, get, set, push, remove } from "firebase/database"
import { getProductById } from "./products"

// Get cart items for the current user
export async function getCartItems() {
  try {
    // In a real app, you would get the current user ID
    const userId = "current-user"
    const cartRef = ref(db, `carts/${userId}/items`)
    const snapshot = await get(cartRef)

    if (snapshot.exists()) {
      const cartData = snapshot.val()
      return Object.keys(cartData).map((key) => ({
        id: key,
        ...cartData[key],
      }))
    }

    return []
  } catch (error) {
    console.error("Error fetching cart items:", error)
    return []
  }
}

// Add item to cart
export async function addToCart(productId: string, quantity = 1) {
  try {
    const product = await getProductById(productId)
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`)
    }

    // In a real app, you would get the current user ID
    const userId = "current-user"
    const cartItemsRef = ref(db, `carts/${userId}/items`)
    const newItemRef = push(cartItemsRef)

    await set(newItemRef, {
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: "medium", // Default values
      color: "blue",
      material: "Plastic",
      seller: "Artel Market",
    })

    return newItemRef.key
  } catch (error) {
    console.error("Error adding item to cart:", error)
    throw error
  }
}

// Update cart item quantity
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    // In a real app, you would get the current user ID
    const userId = "current-user"
    const itemRef = ref(db, `carts/${userId}/items/${itemId}/quantity`)
    await set(itemRef, quantity)
  } catch (error) {
    console.error("Error updating cart item quantity:", error)
    throw error
  }
}

// Remove item from cart
export async function removeFromCart(itemId: string) {
  try {
    // In a real app, you would get the current user ID
    const userId = "current-user"
    const itemRef = ref(db, `carts/${userId}/items/${itemId}`)
    await remove(itemRef)
  } catch (error) {
    console.error("Error removing item from cart:", error)
    throw error
  }
}

// Get saved items for later
export async function getSavedItems() {
  try {
    // In a real app, you would get the current user ID
    const userId = "current-user"
    const savedRef = ref(db, `carts/${userId}/savedForLater`)
    const snapshot = await get(savedRef)

    if (snapshot.exists()) {
      const savedData = snapshot.val()
      return Object.keys(savedData).map((key) => ({
        id: key,
        ...savedData[key],
      }))
    }

    return []
  } catch (error) {
    console.error("Error fetching saved items:", error)
    return []
  }
}

// Save item for later
export async function saveForLater(productId: string) {
  try {
    const product = await getProductById(productId)
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`)
    }

    // In a real app, you would get the current user ID
    const userId = "current-user"
    const savedRef = ref(db, `carts/${userId}/savedForLater`)
    const newItemRef = push(savedRef)

    await set(newItemRef, {
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })

    return newItemRef.key
  } catch (error) {
    console.error("Error saving item for later:", error)
    throw error
  }
}

// Move item from saved to cart
export async function moveToCart(savedItemId: string) {
  try {
    // In a real app, you would get the current user ID
    const userId = "current-user"
    const savedItemRef = ref(db, `carts/${userId}/savedForLater/${savedItemId}`)
    const snapshot = await get(savedItemRef)

    if (snapshot.exists()) {
      const savedItem = snapshot.val()
      await addToCart(savedItem.productId)
      await remove(savedItemRef)
    } else {
      throw new Error(`Saved item with ID ${savedItemId} not found`)
    }
  } catch (error) {
    console.error("Error moving item to cart:", error)
    throw error
  }
}

// Clear cart
export async function clearCart() {
  try {
    // In a real app, you would get the current user ID
    const userId = "current-user"
    const cartRef = ref(db, `carts/${userId}/items`)
    await set(cartRef, null)
  } catch (error) {
    console.error("Error clearing cart:", error)
    throw error
  }
}
