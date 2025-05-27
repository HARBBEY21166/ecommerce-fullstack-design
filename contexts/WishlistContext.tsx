"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Product, WishlistItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
// TODO: Integrate with Firebase for logged-in users

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const getInitialWishlist = (): WishlistItem[] => {
  if (typeof window !== "undefined") {
    const storedWishlist = localStorage.getItem("shopstream-wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }
  return [];
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setWishlistItems(getInitialWishlist());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopstream-wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        toast({ title: "Already in wishlist", description: `${product.name} is already in your wishlist.`, variant: "default" });
        return prevItems;
      }
      toast({ title: "Added to wishlist", description: `${product.name} has been added to your wishlist.` });
      return [...prevItems, product];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast({ title: "Removed from wishlist", description: "Item removed from your wishlist." });
  }, [toast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    toast({ title: "Wishlist cleared", description: "Your wishlist is now empty." });
  }, [toast]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
