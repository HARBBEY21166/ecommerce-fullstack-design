import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const user = null // Replace with actual authentication logic

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-100 py-6">
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

        {/* Deals and Offers */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Deals and offers</h2>
                <p className="text-sm text-gray-500">Hygiene equipments</p>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[60px]">
                  <p className="text-lg font-bold">04</p>
                  <p className="text-xs">Days</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[60px]">
                  <p className="text-lg font-bold">13</p>
                  <p className="text-xs">Hour</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[60px]">
                  <p className="text-lg font-bold">34</p>
                  <p className="text-xs">Min</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-center min-w-[60px]">
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products?category=home">Source now</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white p-6 rounded-md flex items-center md:row-span-2">
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
                { name: "Soft chairs", category: "furniture" },
                { name: "Sofa & chair", category: "furniture" },
                { name: "Kitchen dishes", category: "home" },
                { name: "Smart watches", category: "wearables" },
                { name: "Kitchen mixer", category: "home-appliances" },
                { name: "Blenders", category: "home-appliances" },
                { name: "Home appliance", category: "home-appliances" },
                { name: "Coffee maker", category: "home-appliances" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={`/products?category=${item.category}`}
                  className="bg-white p-4 rounded-md flex items-center hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500">From USD 19</p>
                  </div>
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Product"
                    width={80}
                    height={80}
                    className="ml-auto"
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
              <h2 className="text-xl font-semibold">Consumer electronics and gadgets</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products?category=electronics">Source now</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white p-6 rounded-md flex items-center md:row-span-2">
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
                { name: "Smart watches", category: "wearables" },
                { name: "Cameras", category: "electronics" },
                { name: "Headphones", category: "audio" },
                { name: "Smart watches", category: "wearables" },
                { name: "Gaming set", category: "gaming" },
                { name: "Laptops & PC", category: "computers" },
                { name: "Smartphones", category: "smartphones" },
                { name: "Electric kettle", category: "home-appliances" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={`/products?category=${item.category}`}
                  className="bg-white p-4 rounded-md flex items-center hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500">From USD 19</p>
                  </div>
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Product"
                    width={80}
                    height={80}
                    className="ml-auto"
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
                <h2 className="text-2xl font-bold mb-2">An easy way to send requests to all suppliers</h2>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                </p>
              </div>

              <div className="bg-white p-6 rounded-md text-gray-800">
                <h3 className="font-semibold mb-4">Send quote to suppliers</h3>
                <form className="space-y-4">
                  <Input placeholder="What item you need?" />
                  <textarea
                    className="w-full p-2 border rounded-md"
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
                    src="/placeholder.svg?height=150&width=150"
                    alt="Product"
                    width={150}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold">${(Math.random() * 100).toFixed(2)}</p>
                    <p className="text-xs text-gray-600 mt-1">
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

        {/* Services */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mb-4">Our extra services</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Source from Industry Hubs", icon: "🏭" },
                { title: "Customize Your Products", icon: "🛠️" },
                { title: "Fast, reliable shipping by ocean or air", icon: "✈️" },
                { title: "Product monitoring and inspection", icon: "🔍" },
              ].map((service, i) => (
                <div key={i} className="bg-white p-4 rounded-md relative">
                  <Image
                    src="/placeholder.svg?height=150&width=250"
                    alt={service.title}
                    width={250}
                    height={150}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium">{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suppliers by Region */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mb-4">Suppliers by region</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { country: "Arabic Emirates", flag: "🇦🇪", companies: "shopname.ae" },
                { country: "Australia", flag: "🇦🇺", companies: "shopname.au" },
                { country: "United States", flag: "🇺🇸", companies: "shopname.com" },
                { country: "Russia", flag: "🇷🇺", companies: "shopname.ru" },
                { country: "Italy", flag: "🇮🇹", companies: "shopname.it" },
                { country: "Denmark", flag: "🇩🇰", companies: "shopname.com.dk" },
                { country: "France", flag: "🇫🇷", companies: "shopname.com.fr" },
                { country: "Arabic Emirates", flag: "🇦🇪", companies: "shopname.ae" },
                { country: "China", flag: "🇨🇳", companies: "shopname.cn" },
                { country: "Great Britain", flag: "🇬🇧", companies: "shopname.co.uk" },
              ].map((region, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-2xl">{region.flag}</span>
                  <div>
                    <p className="text-sm font-medium">{region.country}</p>
                    <p className="text-xs text-gray-500">{region.companies}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold mb-2">Subscribe on our newsletter</h2>
            <p className="text-sm text-gray-600 mb-4">
              Get daily news on upcoming offers from many suppliers all over the world
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-2 max-w-md mx-auto">
              <Input placeholder="Email" className="w-full md:w-auto" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
