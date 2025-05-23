import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
                <span className="text-xl font-bold">B</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-blue-500">Brand</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex space-x-2">
              <Link href="#" className="p-2 bg-gray-200 rounded-full">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Find store</Link>
              </li>
              <li>
                <Link href="#">Categories</Link>
              </li>
              <li>
                <Link href="#">Blogs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Partnership</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Find store</Link>
              </li>
              <li>
                <Link href="#">Categories</Link>
              </li>
              <li>
                <Link href="#">Blogs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">Help Center</Link>
              </li>
              <li>
                <Link href="#">Money Refund</Link>
              </li>
              <li>
                <Link href="#">Shipping</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For users</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#">Login</Link>
              </li>
              <li>
                <Link href="#">Register</Link>
              </li>
              <li>
                <Link href="#">Settings</Link>
              </li>
              <li>
                <Link href="#">My Orders</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get app</h3>
            <div className="space-y-2">
              <Link href="#" className="block">
                <img src="/placeholder.svg?height=40&width=120" alt="App Store" className="h-10" />
              </Link>
              <Link href="#" className="block">
                <img src="/placeholder.svg?height=40&width=120" alt="Google Play" className="h-10" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2023 Ecommerce.</p>
          <div className="flex items-center mt-2 md:mt-0">
            <img src="/placeholder.svg?height=20&width=30" alt="English" className="h-5 mr-1" />
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
