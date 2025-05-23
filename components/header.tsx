"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { User, MessageSquare, Heart, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useFirebase } from "./firebase-provider"
import { cn } from "@/lib/utils"
import { auth } from "./firebase-provider"
import CartIcon from "./cart-icon"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useFirebase()

  const categories = [
    { name: "All category", href: "/" },
    { name: "Hot offers", href: "/hot-offers" },
    { name: "Gift boxes", href: "/gift-boxes" },
    { name: "Projects", href: "/projects" },
    { name: "Menu item", href: "/menu-item" },
    { name: "Help", href: "/help", hasDropdown: true },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
                <span className="text-xl font-bold">B</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-blue-500">Brand</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input type="search" placeholder="Search" className="pr-10 rounded-r-none border-r-0" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-l-none border-l-0">
                    All category <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Electronics</DropdownMenuItem>
                  <DropdownMenuItem>Clothing</DropdownMenuItem>
                  <DropdownMenuItem>Home & Garden</DropdownMenuItem>
                  <DropdownMenuItem>Sports</DropdownMenuItem>
                  <DropdownMenuItem>Toys</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button className="ml-2">Search</Button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hidden sm:flex flex-col items-center text-xs cursor-pointer">
                    <User className="h-5 w-5 mb-1" />
                    <span>{user.displayName || "User"}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/dashboard">Admin Panel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => auth.signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login" className="hidden sm:flex flex-col items-center text-xs">
                <User className="h-5 w-5 mb-1" />
                <span>Login</span>
              </Link>
            )}
            <Link href="/messages" className="hidden sm:flex flex-col items-center text-xs">
              <MessageSquare className="h-5 w-5 mb-1" />
              <span>Message</span>
            </Link>
            <Link href="/orders" className="hidden sm:flex flex-col items-center text-xs">
              <Heart className="h-5 w-5 mb-1" />
              <span>Orders</span>
            </Link>
            <CartIcon />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 mt-2">
          {categories.map((category) =>
            category.hasDropdown ? (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm font-medium">
                    {category.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/help/faq">FAQ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/help/contact">Contact Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/help/shipping">Shipping Info</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === category.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {category.name}
              </Link>
            ),
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Help <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>FAQ</DropdownMenuItem>
              <DropdownMenuItem>Contact Us</DropdownMenuItem>
              <DropdownMenuItem>Shipping Info</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                English, USD <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English, USD</DropdownMenuItem>
              <DropdownMenuItem>Spanish, EUR</DropdownMenuItem>
              <DropdownMenuItem>French, EUR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Ship to 🇩🇪 <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Germany 🇩🇪</DropdownMenuItem>
              <DropdownMenuItem>United States 🇺🇸</DropdownMenuItem>
              <DropdownMenuItem>United Kingdom 🇬🇧</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <div className="flex items-center mb-4">
            <Input type="search" placeholder="Search" className="flex-1" />
            <Button className="ml-2">Search</Button>
          </div>
          <nav className="grid gap-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  pathname === category.href ? "bg-muted text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/help"
              className="text-sm font-medium transition-colors hover:text-primary p-2 rounded-md text-muted-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
