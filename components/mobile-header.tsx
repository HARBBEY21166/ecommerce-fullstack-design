"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, User, Home, Grid3X3, Heart, Package, Globe, Headphones, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useFirebase } from "./firebase-provider"
import { auth } from "./firebase-provider"

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { user } = useFirebase()

  const categories = [
    { name: "All category", href: "/products" },
    { name: "Gadgets", href: "/products?category=electronics" },
    { name: "Clothes", href: "/products?category=clothing" },
    { name: "Accessories", href: "/products?category=accessories" },
  ]

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Grid3X3, label: "Categories", href: "/products" },
    { icon: Heart, label: "Favorites", href: "/wishlist" },
    { icon: Package, label: "My orders", href: "/orders" },
  ]

  const settingsItems = [
    { icon: Globe, label: "English | USD", href: "#" },
    { icon: Headphones, label: "Contact us", href: "/help/contact" },
    { icon: Info, label: "About", href: "/about" },
  ]

  const footerLinks = [
    { label: "User agreement", href: "/terms" },
    { label: "Partnership", href: "/partnership" },
    { label: "Privacy policy", href: "/privacy" },
  ]

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* User Section */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      {user ? (
                        <div>
                          <p className="font-medium">{user.displayName || "User"}</p>
                          <button onClick={() => auth.signOut()} className="text-sm text-blue-600 hover:underline">
                            Sign out
                          </button>
                        </div>
                      ) : (
                        <div className="space-x-2">
                          <Link
                            href="/auth/login"
                            className="text-sm font-medium hover:underline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Sign in
                          </Link>
                          <span className="text-gray-400">|</span>
                          <Link
                            href="/auth/register"
                            className="text-sm font-medium hover:underline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Register
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 py-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t mt-4 pt-4">
                    {settingsItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="border-t p-6 space-y-3">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
              <span className="text-lg font-bold">B</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-blue-500">Brand</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 pb-3">
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 ${
                  pathname === category.href || (category.href !== "/products" && pathname.includes(category.href))
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}
