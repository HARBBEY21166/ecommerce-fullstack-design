import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const user = null // Replace with actual authentication logic

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Desktop */}
        <section className="hidden md:block bg-gray-100 py-6">
          <div className="container mx-auto px-4 grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-semibold mb-2">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products?category=automobiles" className="hover:text-blue-500">
                    Automobiles
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=clothing" className="hover:text-blue-500">
                    Clothes and wear
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=home" className="hover:text-blue-500">
                    Home interiors
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=electronics" className="hover:text-blue-500">
                    Computer and tech
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=tools" className="hover:text-blue-500">
                    Tools, equipment
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=sports" className="hover:text-blue-500">
                    Sports and outdoor
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=pets" className="hover:text-blue-500">
                    Animal and pets
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=machinery" className="hover:text-blue-500">
                    Machinery tools
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-blue-500">
                    More category
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-md flex items-center">
              <div className="text-white">
                <h2 className="text-xl font-semibold mb-1">Latest trending</h2>
                <h1 className="text-2xl font-bold mb-4">Electronic items</h1>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/products?category=electronics">Learn more</Link>
                </Button>
              </div>
              <div className="ml-auto">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Electronics"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-md">
              {user ? (
                <div className="mb-4">
                  <p className="text-sm mb-1">Hi, {user.displayName || "User"}</p>
                  <p className="text-sm font-semibold">Welcome back!</p>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-sm mb-1">Hi, user</p>
                  <p className="text-sm font-semibold">Let's get started</p>
                </div>
              )}
              <div className="space-y-2">
                {user ? (
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/products">Shop Now</Link>
                  </Button>
                ) : (
                  <>
                    <Button className="w-full" size="sm" asChild>
                      <Link href="/auth/register">Join now</Link>
                    </Button>
                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <Link href="/auth/login">Log in</Link>
                    </Button>
                  </>
                )}
              </div>
              <div className="mt-4 p-3 bg-orange-100 rounded-md">
                <p className="text-sm font-semibold">Get US $10 off</p>
                <p className="text-xs">with a new supplier</p>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-md">
                <p className="text-sm font-semibold">Send quotes with supplier preferences</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Hero Section */}
        <section className="md:hidden">
          <div className="bg-gradient-to-r from-green-400 to-green-300 p-6 mx-4 my-4 rounded-lg relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-white text-lg font-semibold mb-1">Latest trending</h2>
              <h1 className="text-white text-xl font-bold mb-4">Electronic items</h1>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/products?category=electronics">Learn more</Link>
              </Button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mobile-main.jpg-BXSA5enHTeQXVCOL1nyX6dLTFHCaKa.jpeg"
                alt="Electronics"
                fill
                className="object-cover object-right"
              />
            </div>
          </div>
        </section>

        {/* Deals and Offers */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Deals and offers</h2>
                <p className="text-sm text-gray-500">Electronic equipments</p>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[50px] md:min-w-[60px]">
                  <p className="text-lg font-bold">13</p>
                  <p className="text-xs">Hour</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[50px] md:min-w-[60px]">
                  <p className="text-lg font-bold">34</p>
                  <p className="text-xs">Min</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[50px] md:min-w-[60px]">
                  <p className="text-lg font-bold">56</p>
                  <p className="text-xs">Sec</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link
                href="/products?category=wearables"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Smart watches"
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <h3 className="text-sm font-medium">Smart watches</h3>
                <p className="text-xs text-red-500 mt-1">-25%</p>
              </Link>
              <Link
                href="/products?category=computers"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Laptops"
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <h3 className="text-sm font-medium">Laptops</h3>
                <p className="text-xs text-red-500 mt-1">-15%</p>
              </Link>
              <Link
                href="/products?category=electronics"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="GoPro cameras"
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <h3 className="text-sm font-medium">GoPro cameras</h3>
                <p className="text-xs text-red-500 mt-1">-40%</p>
              </Link>
              <Link
                href="/products?category=audio"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Headphones"
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <h3 className="text-sm font-medium">Headphones</h3>
                <p className="text-xs text-red-500 mt-1">-25%</p>
              </Link>
              <Link
                href="/products?category=electronics"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Canon cameras"
                  width={100}
                  height={100}
                  className="mx-auto mb-2"
                />
                <h3 className="text-sm font-medium">Canon cameras</h3>
                <p className="text-xs text-red-500 mt-1">-25%</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Home and Outdoor */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Home and outdoor</h2>
              <Button variant="ghost" size="sm" asChild className="text-blue-600">
                <Link href="/products?category=home">Source now →</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="hidden md:block bg-white p-6 rounded-md flex items-center md:row-span-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Home and outdoor</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/products?category=home">Source now</Link>
                  </Button>
                </div>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Home and outdoor"
                  width={150}
                  height={150}
                  className="ml-auto"
                />
              </div>

              {[
                { name: "Soft chairs", category: "furniture", price: "From USD 19" },
                { name: "Sofa & chair", category: "furniture", price: "From USD 19" },
                { name: "Kitchen dishes", category: "home", price: "From USD 19" },
                { name: "Smart watches", category: "wearables", price: "From USD 19" },
                { name: "Kitchen mixer", category: "home-appliances", price: "From USD 19" },
                { name: "Blenders", category: "home-appliances", price: "From USD 19" },
                { name: "Home appliance", category: "home-appliances", price: "From USD 19" },
                { name: "Coffee maker", category: "home-appliances", price: "From USD 19" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={`/products?category=${item.category}`}
                  className="bg-white p-3 md:p-4 rounded-md flex flex-col md:flex-row items-center hover:shadow-md transition-shadow"
                >
                  <div className="mb-2 md:mb-0 md:mr-3">
                    <h3 className="text-sm font-medium mb-1 text-center md:text-left">{item.name}</h3>
                    <p className="text-xs text-gray-500 text-center md:text-left">{item.price}</p>
                  </div>
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Product"
                    width={60}
                    height={60}
                    className="md:ml-auto"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Consumer Electronics */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Consumer electronics</h2>
              <Button variant="ghost" size="sm" asChild className="text-blue-600">
                <Link href="/products?category=electronics">Source now →</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="hidden md:block bg-white p-6 rounded-md flex items-center md:row-span-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Consumer electronics and gadgets</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/products?category=electronics">Source now</Link>
                  </Button>
                </div>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Electronics"
                  width={150}
                  height={150}
                  className="ml-auto"
                />
              </div>

              {[
                { name: "Smart watches", category: "wearables", price: "From USD 19" },
                { name: "Cameras", category: "electronics", price: "From USD 19" },
                { name: "Headphones", category: "audio", price: "From USD 19" },
                { name: "Smart watches", category: "wearables", price: "From USD 19" },
                { name: "Gaming set", category: "gaming", price: "From USD 19" },
                { name: "Laptops & PC", category: "computers", price: "From USD 19" },
                { name: "Smartphones", category: "smartphones", price: "From USD 19" },
                { name: "Electric kettle", category: "home-appliances", price: "From USD 19" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={`/products?category=${item.category}`}
                  className="bg-white p-3 md:p-4 rounded-md flex flex-col md:flex-row items-center hover:shadow-md transition-shadow"
                >
                  <div className="mb-2 md:mb-0 md:mr-3">
                    <h3 className="text-sm font-medium mb-1 text-center md:text-left">{item.name}</h3>
                    <p className="text-xs text-gray-500 text-center md:text-left">{item.price}</p>
                  </div>
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Product"
                    width={60}
                    height={60}
                    className="md:ml-auto"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Request Quote */}
        <section className="py-8 bg-blue-500 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold mb-2">An easy way to send requests to all suppliers</h2>
                <p className="mb-4 text-sm md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                </p>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-md text-gray-800">
                <h3 className="font-semibold mb-4">Send quote to suppliers</h3>
                <form className="space-y-4">
                  <Input placeholder="What item you need?" />
                  <textarea
                    className="w-full p-2 border rounded-md text-sm"
                    rows={3}
                    placeholder="Type more details"
                  ></textarea>
                  <div className="flex gap-4">
                    <Input placeholder="Quantity" className="w-1/2" />
                    <Select defaultValue="pcs">
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pcs</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="set">Set</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Send inquiry</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Items */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mb-4">Recommended items</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Link
                  key={i}
                  href={`/products/product-${i + 1}`}
                  className="bg-white border rounded-md overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Product"
                    width={120}
                    height={120}
                    className="w-full h-24 md:h-32 object-cover"
                  />
                  <div className="p-2 md:p-3">
                    <p className="font-semibold text-sm md:text-base">${(Math.random() * 100).toFixed(2)}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {
                        [
                          "T-shirts with multiple colors, for men",
                          "Jeans shorts for men blue color",
                          "Brown winter coat medium size",
                          "Jeans bag for travel for men",
                          "Leather wallet",
                          "Canon camera black, 100x zoom",
                          "Headset for gaming with mic",
                          "Smartwatch silver color modern",
                          "Blue wallet for men leather material",
                          "Jeans bag for travel for men",
                        ][i]
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Our extra services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Source from Industry Hubs", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
                { title: "Customize Your Products", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
                { title: "Fast, reliable shipping", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
                { title: "Product monitoring", image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
              ].map((service, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
                  <img src={service.image} alt={service.title} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="font-semibold text-sm">{service.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Suppliers by Region */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Suppliers by region</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-sm">
              {[
                { country: "Arabic Emirates", flag: "ae" },
                { country: "Australia", flag: "au" },
                { country: "United States", flag: "us" },
                { country: "Russia", flag: "ru" },
                { country: "Italy", flag: "it" },
                { country: "Denmark", flag: "dk" },
                { country: "France", flag: "fr" },
                { country: "Germany", flag: "de" },
              ].map((supplier, index) => (
                <div key={index} className="flex items-center">
                  <img src={`https://flagcdn.com/w20/${supplier.flag}.png`} alt={supplier.country} className="w-5 h-3 mr-2" />
                  <span>{supplier.country}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Newsletter */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h2>
            <p className="text-gray-600 mb-6">Get daily news on upcoming offers from many suppliers all over the world</p>
            <div className="flex max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Email" 
                className="flex-1 rounded-r-none"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      </main>
      <Footer />
    </div>
  )
}
