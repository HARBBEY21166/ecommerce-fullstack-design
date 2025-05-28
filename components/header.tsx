"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { auth as firebaseAuth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";
import { SidebarNavigation } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import logo from "@/public/logo.png"; // Adjust the path to your logo image

import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MessageSquare,
  Menu,
  ChevronDown,
  Package, // Using Package as a generic brand icon for now
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const mainCategories = [
    { name: "All category", href: "/products" },
    { name: "Hot offers", href: "/products?tag=hot-offers" },
    { name: "Gift boxes", href: "/products?category=gifts" },
    { name: "Projects", href: "/products?category=projects" },
    { name: "Menu item", href: "/products?tag=new" }, // Example
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      ;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const CartActionIcon = () => (
    <Link href="/cart" className="relative flex flex-col items-center text-xs text-foreground/80 hover:text-primary">
      <ShoppingCart className="h-5 w-5 mb-0.5" />
      <span>My cart</span>
      {itemCount > 0 && (
        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
          {itemCount}
        </Badge>
      )}
    </Link>
  );

  const UserActionIcon = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-col items-center text-xs text-foreground/80 hover:text-primary cursor-pointer">
              <User className="h-5 w-5 mb-0.5" />
              <span>{user.displayName?.split(' ')[0] || "Profile"}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin">Admin Panel</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Link href="/login" className="flex flex-col items-center text-xs text-foreground/80 hover:text-primary">
        <User className="h-5 w-5 mb-0.5" />
        <span>Login</span>
      </Link>
    );
  };

  // Main Navigation: Logo, SearchBar, UserActions (Section 1 from description)
  const MainNav = () => {
    const isMobile = useIsMobile();

      return(
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            {/* Blue brand logo with "B" */}
            {/*<span className="text-xl font-bold">B</span>*/}
            <Image src={logo} alt="Logo" />
          </div>
          <span className="ml-2 text-xl font-semibold text-primary">Brand</span> {/* Brand name */}
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full flex">
            <Input
              type="search"
              placeholder="Search"
              className="rounded-r-none border-r-0 focus:border-primary focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none px-3 hover:bg-accent">
                  All category <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => console.log("Category: Electronics")}>Electronics</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log("Category: Apparel")}>Apparel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button type="submit" className="rounded-l-none bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Search</span>
            </Button>
          </form>
        </div>

        {/* User Actions & Mobile Menu Trigger */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
            <UserActionIcon />
            <Link href="/messages" className="flex flex-col items-center text-xs text-foreground/80 hover:text-primary">
              <MessageSquare className="h-5 w-5 mb-0.5" />
              <span>Message</span>
            </Link>
            <Link href="/orders" className="flex flex-col items-center text-xs text-foreground/80 hover:text-primary">
              <Heart className="h-5 w-5 mb-0.5" /> {/* Using Heart for Orders as per original user's design */}
              <span>Orders</span>
            </Link>
          </div>
          {isMobile && <SidebarNavigation />} 
          <CartActionIcon />
        </div>
      </div>
    </div>
  );
};
  
  // Category Navigation (Secondary Navigation Bar from description)
  const CategoryNav = () => (
    <nav className="hidden md:block border-t bg-card">
     <div className="container mx-auto px-4 py-2 flex items-center justify-between"> {/* Added justify-between here */}
  <div className="flex items-center space-x-6"> {/* Wrap the left-aligned items in a div */}
    <Button variant="ghost" size="sm" className="text-sm font-medium p-1 h-auto">
      <Menu className="h-4 w-4 mr-2" />
      All category
    </Button>
    {mainCategories.slice(1).map((category) => ( // Slice to skip "All category" handled by button
    <Link
      key={category.name}
      href={category.href}
      className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      pathname === category.href || (category.href !== "/products" && pathname.startsWith(category.href))
      ? "text-primary"
      : "text-muted-foreground"
      )}
      >
      {category.name}
    </Link>
    ))}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-primary p-1 h-auto">
          Help <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild><Link href="/help/faq">FAQ</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/help/contact">Contact Us</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/help/shipping">Shipping Info</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div className="flex items-center space-x-4"> {/* Removed mx-auto and justify-end here */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs p-1 h-auto hover:bg-transparent hover:text-primary">
          English, USD <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>English, USD</DropdownMenuItem>
        <DropdownMenuItem>Español, EUR</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs p-1 h-auto hover:bg-transparent hover:text-primary">
          Ship to <span className="mx-1">🇩🇪</span> {/* Placeholder flag */}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Germany 🇩🇪</DropdownMenuItem>
        <DropdownMenuItem>United States 🇺🇸</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>      
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm border-b">
      <MainNav />
      <CategoryNav />
    </header>
  );
};

export default Header;
