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
    <><div className="min-h-screen flex flex-col">
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
                  src="https://i.pinimg.com/736x/67/2a/2e/672a2eca2b68c1ab9d960e8a864e3e17.jpg"
                  alt="Electronics"
                  width={150}
                  height={150}
                  className="rounded-md" />
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
                className="object-cover object-right" />
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
                  src="https://i.pinimg.com/736x/2b/c5/a6/2bc5a6a8634fbb69ba0e066aa5676c39.jpg"
                  alt="Smart watches"
                  width={100}
                  height={100}
                  className="mx-auto mb-2" />
                <h3 className="text-sm font-medium">Smart watches</h3>
                <p className="text-xs text-red-500 mt-1">-25%</p>
              </Link>
              <Link
                href="/products?category=computers"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="https://i.pinimg.com/736x/78/bf/a8/78bfa893270a0b531705b1c56f25674d.jpg"
                  alt="Laptops"
                  width={100}
                  height={100}
                  className="mx-auto mb-2" />
                <h3 className="text-sm font-medium">Laptops</h3>
                <p className="text-xs text-red-500 mt-1">-15%</p>
              </Link>
              <Link
                href="/products?category=electronics"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="https://i.pinimg.com/736x/4a/1d/d8/4a1dd8bd0b0e3b0eb788d597d4c0df8f.jpg"
                  alt="GoPro cameras"
                  width={100}
                  height={100}
                  className="mx-auto mb-2" />
                <h3 className="text-sm font-medium">GoPro cameras</h3>
                <p className="text-xs text-red-500 mt-1">-40%</p>
              </Link>
              <Link
                href="/products?category=audio"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="https://i.pinimg.com/736x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg"
                  alt="Headphones"
                  width={100}
                  height={100}
                  className="mx-auto mb-2" />
                <h3 className="text-sm font-medium">Headphones</h3>
                <p className="text-xs text-red-500 mt-1">-25%</p>
              </Link>
              <Link
                href="/products?category=electronics"
                className="bg-white p-4 rounded-md text-center hover:shadow-md transition-shadow"
              >
                <Image
                  src="https://i.pinimg.com/736x/be/db/a6/bedba68744108caff81981ed77b95980.jpg"
                  alt="Canon cameras"
                  width={100}
                  height={100}
                  className="mx-auto mb-2" />
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
                  src="https://i.pinimg.com/736x/8b/e1/89/8be18946884dd101fafd77535f660eae.jpg"
                  alt="Home and outdoor"
                  width={150}
                  height={150}
                  className="ml-auto" />
              </div>

              {[
                { name: "Soft chairs", category: "furniture", price: "From USD 19", image: "https://i.pinimg.com/736x/6b/81/3f/6b813ff256e49639e8e85f254d296807.jpg" },
                { name: "Sofa & chair", category: "furniture", price: "From USD 19", image: "https://i.pinimg.com/736x/85/94/c5/8594c50661226eb10bb58a63e38e8bdc.jpg" },
                { name: "Kitchen dishes", category: "home", price: "From USD 19", image: "https://i.pinimg.com/736x/0a/41/c3/0a41c3d685bcbae32e073328fece819e.jpg" },
                { name: "Bed", category: "furniture", price: "From USD 19", image: "https://i.pinimg.com/736x/00/3e/87/003e87ee12d3ed7a514129e49c2016a0.jpg" },
                { name: "Kitchen mixer", category: "home-appliances", price: "From USD 19", image: "https://i.pinimg.com/736x/90/87/14/9087140ab8b2cbc3634124c033581afc.jpg" },
                { name: "Blenders", category: "home-appliances", price: "From USD 19", image: "https://i.pinimg.com/736x/4f/61/06/4f6106c2ab041c1717d6a227ae530f6f.jpg" },
                { name: "Home appliance", category: "home-appliances", price: "From USD 19", image: "https://i.pinimg.com/736x/9c/9c/9a/9c9c9af5b47d23db3ee71fbc32575dd3.jpg" },
                { name: "Coffee maker", category: "home-appliances", price: "From USD 19", image: "https://i.pinimg.com/736x/cc/43/1a/cc431a026cb0a6e0119942fa5a85bc50.jpg" },
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
                    src={item.image || "/placeholder.svg"}
                    alt="Product"
                    width={60}
                    height={60}
                    className="md:ml-auto" />
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
                  src="https://i.pinimg.com/736x/cf/ee/8b/cfee8bbab9dc4c479271d838e7d14553.jpg"
                  alt="Electronics"
                  width={150}
                  height={150}
                  className="ml-auto" />
              </div>

              {[
                { name: "Smart watches", category: "wearables", price: "From USD 19", image:"https://i.pinimg.com/736x/20/29/d5/2029d51d3f51b028d6f0d4b7bab3c44d.jpg" },
                { name: "Cameras", category: "electronics", price: "From USD 19", image:"https://i.pinimg.com/736x/bd/2a/a7/bd2aa7ec4c03e5e10f497278e4d999b1.jpg" },
                { name: "Headphones", category: "audio", price: "From USD 19", image:"https://i.pinimg.com/736x/41/31/c0/4131c070168f5222a5601eae1014d1ee.jpg" },
                { name: "Smart watches", category: "wearables", price: "From USD 19", image:"https://i.pinimg.com/736x/06/9d/87/069d878908ddacd172e0a8976e1fedac.jpg" },
                { name: "Gaming set", category: "gaming", price: "From USD 19", image:"https://i.pinimg.com/736x/f8/0d/3e/f80d3ee7a40b55143afbd3e66a2161c8.jpg" },
                { name: "Laptops & PC", category: "computers", price: "From USD 19", image:"https://i.pinimg.com/736x/c2/56/29/c2562961b1e81fc60e748f9f0f2f0769.jpg" },
                { name: "Smartphones", category: "smartphones", price: "From USD 19", image:"https://i.pinimg.com/736x/d5/1b/0d/d51b0d8826063f245dc38e9ff6c5c263.jpg" },
                { name: "Electric kettle", category: "home-appliances", price: "From USD 19", image:"https://i.pinimg.com/736x/e8/6e/e6/e86ee672ce5dc746ab148cd49ea8ff4a.jpg" },
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
                    src={item.image || "/placeholder.svg"}
                    alt="Product"
                    width={60}
                    height={60}
                    className="md:ml-auto" />
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
                <Link key={i}
                  href={`/products/product-${i + 1}`} // Assuming product ID is based on index
                  className="bg-white border rounded-md overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Image
                    src={[{ name: "T-shirts with multiple colors, for men", image: "https://i.pinimg.com/736x/b3/de/a9/b3dea9e22059f172581946b257836cdb.jpg" },
                      { name: "Jeans shorts for men blue color", image: "https://i.pinimg.com/736x/fe/e1/2e/fee12e73032d8f37d099bf6a7eb1cbda.jpg" },
                      { name: "Brown winter coat medium size", image: "https://i.pinimg.com/736x/a6/44/04/a644040311618669e5a197ff4f0f8112.jpg" },
                      { name: "Jeans bag for travel for men", image: "https://i.pinimg.com/736x/99/1a/a6/991aa6d108eb39790164a5ba4c17a330.jpg" },
                      { name: "Leather wallet", image: "https://i.pinimg.com/736x/2c/fa/2a/2cfa2aa485c6430ceeedf2a5935cf798.jpg" },
                      { name: "Canon camera black, 100x zoom", image: "https://i.pinimg.com/736x/c0/fb/b1/c0fbb1bd5b5c6df0e87913927c987ea8.jpg" },
                      { name: "Headset for gaming with mic", image: "https://i.pinimg.com/736x/07/48/e3/0748e35be71734a6564ae57f769d4e91.jpg" },
                      { name: "Smartwatch silver color modern", image: "https://i.pinimg.com/736x/37/01/61/37016142141eb83fb20312686ba2f2b8.jpg" },
                      { name: "Blue wallet for men leather material", image: "https://i.pinimg.com/736x/0e/2c/14/0e2c145f1224ef907073d90c7ca2b06f.jpg" },
                      { name: "Jeans bag for travel for men", image: "https://i.pinimg.com/736x/50/7e/60/507e60816ff15d90467d67fb8a7569db.jpg" },
                    ][i].image}
                    alt="Product" // Added alt attribute
                    width={120}
                    height={120}
                    className="w-full h-24 md:h-32 object-cover" />
                  <div className="p-2 md:p-3">
                    <p className="font-semibold text-sm md:text-base">${(Math.random() * 100).toFixed(2)}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{[{ name: "T-shirts with multiple colors, for men", image: "https://i.pinimg.com/736x/b3/de/a9/b3dea9e22059f172581946b257836cdb.jpg" },
                      { name: "Jeans shorts for men blue color", image: "https://i.pinimg.com/736x/fe/e1/2e/fee12e73032d8f37d099bf6a7eb1cbda.jpg" },
                      { name: "Brown winter coat medium size", image: "https://i.pinimg.com/736x/a6/44/04/a644040311618669e5a197ff4f0f8112.jpg" },
                      { name: "Jeans bag for travel for men", image: "https://i.pinimg.com/736x/99/1a/a6/991aa6d108eb39790164a5ba4c17a330.jpg" },
                      { name: "Leather wallet", image: "https://i.pinimg.com/736x/2c/fa/2a/2cfa2aa485c6430ceeedf2a5935cf798.jpg" },
                      { name: "Canon camera black, 100x zoom", image: "https://i.pinimg.com/736x/c0/fb/b1/c0fbb1bd5b5c6df0e87913927c987ea8.jpg" },
                      { name: "Headset for gaming with mic", image: "https://i.pinimg.com/736x/07/48/e3/0748e35be71734a6564ae57f769d4e91.jpg" },
                      { name: "Smartwatch silver color modern", image: "https://i.pinimg.com/736x/37/01/61/37016142141eb83fb20312686ba2f2b8.jpg" },
                      { name: "Blue wallet for men leather material", image: "https://i.pinimg.com/736x/0e/2c/14/0e2c145f1224ef907073d90c7ca2b06f.jpg" },
                      { name: "Jeans bag for travel for men", image: "https://i.pinimg.com/736x/50/7e/60/507e60816ff15d90467d67fb8a7569db.jpg" },
                    ][i].name}</p>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </section>

        {/* Our extra services */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mb-4">Our extra services</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Source from Industry Hubs", image: "https://i.pinimg.com/736x/de/9c/e2/de9ce2b5561297eb17eac9b4e0fa8752.jpg" },
                { title: "Customize Your Products", image: "https://i.pinimg.com/736x/9a/41/59/9a41597467cd1e0bb75ef5b4dd0535cd.jpg" },
                { title: "Fast, reliable shipping", image: "https://i.pinimg.com/736x/b1/f2/0d/b1f20da62eb167c120ae6306d923935c.jpg" },
                { title: "Product monitoring", image: "https://i.pinimg.com/736x/8f/eb/49/8feb4950d0a83ec91e9596d179fd498c.jpg" },
              ].map((service, i) => (
                <Card key={i} className="relative">
                  <CardContent className="p-0">
                    <Image src={service.image} alt={service.title} width={150} height={150} className="w-full h-32 object-cover rounded-t-md" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-md">
                      <p className="text-white text-sm font-semibold text-center px-2">{service.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Suppliers by region */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mb-4">Suppliers by region</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { region: "Arabic Emirates", flag: "ae" },
                { region: "Australia", flag: "au" },
                { region: "United States", flag: "us" },
                { region: "Russia", flag: "ru" },
                { region: "Italy", flag: "it" },
                { region: "Denmark", flag: "dk" },
                { region: "France", flag: "fr" },
                { region: "Germany", flag: "de" },
                { region: "China", flag: "cn" },
                { region: "Great Britain", flag: "gb" },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2 text-sm">
<Image src={`https://flagcdn.com/w40/${item.flag}.png`} alt={item.region ?? 'Unknown region'} width={20} height={15} />
                  <span>{item.region}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe to newsletter */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold mb-2">Subscribe to our newsletter</h2>
            <p className="text-gray-600 mb-6">Get daily news on upcoming offers from many suppliers all over the world</p>
            <div className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email"
                className="flex-1 rounded-r-none" />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">
                Subscribe
              </Button>
            </div>
            </div>
            </section>
            </main>
       <Footer />
      </div>
      </> 
  )
}
