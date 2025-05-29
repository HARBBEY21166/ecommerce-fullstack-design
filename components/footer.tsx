import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import logo from '@/public/box-64.png';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8">
          {/* Brand Info and Social Links */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
                {/*<span className="text-xl font-bold">B</span>*/}
                <Image src={logo} alt="Logo" />
              </div>
              <span className="ml-2 text-xl font-semibold text-blue-500">Brand</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex space-x-2">
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <Facebook className="h-4 w-4 text-gray-600" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <Twitter className="h-4 w-4 text-gray-600" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <Linkedin className="h-4 w-4 text-gray-600" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <Instagram className="h-4 w-4 text-gray-600" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Find store</Link></li>
              <li><Link href="#">Categories</Link></li>
              <li><Link href="#">Blogs</Link></li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h3 className="font-semibold mb-4">Partnership</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Find store</Link></li>
              <li><Link href="#">Categories</Link></li>
              <li><Link href="#">Blogs</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Money Refund</Link></li>
              <li><Link href="#">Shipping</Link></li>
              <li><Link href="#">Contact us</Link></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="font-semibold mb-4">For users</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">Login</Link></li>
              <li><Link href="#">Register</Link></li>
              <li><Link href="#">Settings</Link></li>
              <li><Link href="#">My Orders</Link></li>
            </ul>
          </div>

          {/* Get App */}
          <div className="col-span-1 md:col-start-4 md:col-span-3 lg:col-start-auto lg:col-span-1">
            <h3 className="font-semibold mb-4">Get app</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2">
              <Link href="#" className="block">
                <Image
                  src="https://img.icons8.com/color/48/apple-app-store--v3.png"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="#" className="block">
                <Image
                  src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/external-google-play-logotype-for-app-store-in-android-marketplace-logo-color-tal-revivo.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 Ecommerce.</p>
          <div className="flex items-center mt-2 md:mt-0">
            <Image
              src="https://img.icons8.com/emoji/48/united-kingdom-emoji.png"
              alt="English flag"
              width={30}
              height={20}
              className="h-5 w-auto mr-1"
            />
            <span>English</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  )
}
