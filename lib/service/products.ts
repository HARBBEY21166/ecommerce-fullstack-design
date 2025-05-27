import { db } from "@/lib/firebase"
import { ref, get, set, push, remove } from "firebase/database"

export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  stock: number
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = ref(db, "products")
    const snapshot = await get(productsRef)

    if (snapshot.exists()) {
      const productsData = snapshot.val()
      return Object.keys(productsData).map((key) => ({
        id: key,
        ...productsData[key],
      }))
    }

    return []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productRef = ref(db, `products/${id}`)
    const snapshot = await get(productRef)

    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    // Instead of using a query that requires an index, we'll fetch all products
    // and filter them on the client side
    const products = await getProducts()

    // Filter products by category (case-insensitive)
    return products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() ||
        product.category.toLowerCase().includes(category.toLowerCase()),
    )
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error)
    return []
  }
}

// Get related products
export async function getRelatedProducts(category: string): Promise<Product[]> {
  try {
    const products = await getProductsByCategory(category)
    return products.slice(0, 6) // Return up to 6 related products
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

// Create a new product
export async function createProduct(product: Omit<Product, "id">): Promise<string> {
  try {
    const productsRef = ref(db, "products")
    const newProductRef = push(productsRef)
    await set(newProductRef, product)
    return newProductRef.key as string
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

// Update a product
export async function updateProduct(id: string, updates: Partial<Omit<Product, "id">>): Promise<void> {
  try {
    const productRef = ref(db, `products/${id}`)
    const snapshot = await get(productRef)

    if (snapshot.exists()) {
      const currentData = snapshot.val()
      await set(productRef, {
        ...currentData,
        ...updates,
      })
    } else {
      throw new Error(`Product with ID ${id} not found`)
    }
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error)
    throw error
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<void> {
  try {
    const productRef = ref(db, `products/${id}`)
    await remove(productRef)
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error)
    throw error
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await getProducts()
    const lowerCaseQuery = query.toLowerCase()

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery),
    )
  } catch (error) {
    console.error(`Error searching products with query ${query}:`, error)
    return []
  }
}
