"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAA__9DDwszmGls8Rk0Apyw1ek0rlCkixI",
  authDomain: "ecommerce-backend-c8553.firebaseapp.com",
  databaseURL: "https://ecommerce-backend-c8553-default-rtdb.firebaseio.com",
  projectId: "ecommerce-backend-c8553",
  storageBucket: "ecommerce-backend-c8553.firebasestorage.app",
  messagingSenderId: "280684538093",
  appId: "1:280684538093:web:7d0c5724c7ffd9d04444e4",
  measurementId: "G-PMZLP5N4JQ",
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
