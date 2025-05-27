//contexts/CartContext.tsx
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast"

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

import {
  getCartItems as fetchCartItemsFromService,
  addToCart as addItemToServiceCart,
  removeFromCart as removeItemFromServiceCart,
  updateCartItemQuantity as updateItemQuantityInService,
  clearCart as clearServiceCart,
} from "@/lib/service/cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await fetchCartItemsFromService();
      setCartItems(items);
    };
    fetchCartItems();
  }, []); // Fetch cart items on initial load

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
          toast({ title: "Stock limit reached", description: `Cannot add more ${product.name} to cart.`, variant: "destructive" });
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      if (quantity > product.stock) {
        toast({ title: "Stock limit reached", description: `Cannot add ${quantity} of ${product.name} to cart.`, variant: "destructive" });
        return prevItems;
      }
      return [...prevItems, { ...product, quantity }];
    });
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast({ title: "Removed from cart", description: "Item removed from your cart." });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          if (quantity <= 0) {
            removeFromCart(productId); // This will cause a double update, better to filter here
            return null; // Mark for removal
          }
          if (quantity > item.stock) {
             toast({ title: "Stock limit reached", description: `Only ${item.stock} of ${item.name} available.`, variant: "destructive" });
             return { ...item, quantity: item.stock };
          }
          return { ...item, quantity };
        }
        return item;
      }).filter(item => item !== null) as CartItem[] // Filter out removed items
    );
  }, [removeFromCart, toast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({ title: "Cart cleared", description: "Your cart is now empty." });
  }, [toast]);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
