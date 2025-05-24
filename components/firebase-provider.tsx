"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBUgx20HJrk5nx1-CkiNwN7b7UZfpwG_Vk",
  authDomain: "ecommerce-33698.firebaseapp.com",
  databaseURL: "https://ecommerce-33698-default-rtdb.firebaseio.com/",
  projectId: "ecommerce-33698",
  storageBucket: "ecommerce-33698.firebasestorage.app",
  messagingSenderId: "572182771672",
  appId: "1:572182771672:web:e388db3327bf1d627724ad",
  measurementId: "G-ZCQP18CKWP"
}

type FirebaseContextType = {
  user: User | null
  loading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
})

export const useFirebase = () => useContext(FirebaseContext)

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)

export default function FirebaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <FirebaseContext.Provider value={{ user, loading }}>{children}</FirebaseContext.Provider>
}
