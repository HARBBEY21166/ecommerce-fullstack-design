import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { ref, get, child, query, orderByChild, equalTo } from 'firebase/database';

export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = ref(db, 'products');
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const productsData = snapshot.val();
      // Firebase returns an object, convert it to an array
      return Object.keys(productsData).map(key => ({
        id: key,
        ...productsData[key],
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productRef = child(ref(db, 'products'), id);
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      return { id: snapshot.key, ...snapshot.val() } as Product;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // Firebase Realtime Database doesn't support querying for true on a potentially non-existent field easily.
    // A common pattern is to have a separate list of featured product IDs or fetch all and filter.
    // For simplicity, we'll fetch all and filter. For larger datasets, denormalize or use Firestore.
    const allProducts = await getProducts();
    return allProducts.filter(product => product.featured);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
