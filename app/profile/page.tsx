"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Mail, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFirebase } from "@/components/firebase-provider"
import { auth } from "@/components/firebase-provider"
import { updateProfile } from "firebase/auth"

export default function ProfilePage() {
  const { user, loading } = useFirebase()
  const [displayName, setDisplayName] = useState("")
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "")
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setUpdating(true)
    setMessage("")

    try {
      await updateProfile(user, { displayName })
      setMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("Failed to update profile. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

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
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="mb-4">You need to be logged in to view your profile.</p>
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
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  {message && (
                    <div
                      className={`mb-4 p-3 rounded-md ${
                        message.includes("successfully")
                          ? "bg-green-50 border border-green-200 text-green-700"
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" value={user.email || ""} disabled className="bg-gray-100" />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <Button type="submit" disabled={updating}>
                      {updating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="text-sm">Member since</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {user.metadata.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="text-sm">Email verified</span>
                    </div>
                    <span className={`text-sm ${user.emailVerified ? "text-green-600" : "text-red-600"}`}>
                      {user.emailVerified ? "Verified" : "Not verified"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/orders">
                      <User className="mr-2 h-4 w-4" />
                      View My Orders
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/cart">
                      <User className="mr-2 h-4 w-4" />
                      View My Cart
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/admin/dashboard">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                  <Button variant="destructive" className="w-full justify-start" onClick={handleSignOut}>
                    Sign Out
                  </Button>
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
