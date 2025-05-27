import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AddToCartButton from "@/components/add-to-cart-button"
import { getProductById, getRelatedProducts } from "@/lib/service/products"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Await the params to ensure they're ready to be used
  const { id } = await params; // Awaiting here may not be necessary if 'params' is already resolved
  const product = await getProductById(id);
  const relatedProducts = await getRelatedProducts(product?.category || "")

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-4">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
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
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/products" className="hover:text-blue-500">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700">{product.category}</span>
          </nav>

          <div className="bg-white rounded-md p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div>
                <div className="mb-4">
                  <div className="border rounded-md overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=400"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border rounded-md overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg?height=80&width=80"}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <span className="text-green-500 text-sm font-medium">✓ In stock</span>
                  </div>
                  <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">9.3</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">32 reviews</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">154 sold</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="border rounded-md p-3 text-center">
                    <p className="text-red-500 font-semibold">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">50-100 pcs</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <p className="font-semibold">${(product.price * 0.9).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">100-700 pcs</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <p className="font-semibold">${(product.price * 0.8).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">700+ pcs</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Price:</div>
                    <div className="col-span-2">Negotiable</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Type:</div>
                    <div className="col-span-2">Classic shoes</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Material:</div>
                    <div className="col-span-2">Plastic material</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Design:</div>
                    <div className="col-span-2">Modern nice</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Customization:</div>
                    <div className="col-span-2">Customized logo and design custom packages</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Protection:</div>
                    <div className="col-span-2">Refund Policy</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm text-gray-500">Warranty:</div>
                    <div className="col-span-2">2 years full warranty</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <AddToCartButton product={product} className="flex-1" />
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save for later
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-lg font-semibold">
                      R
                    </div>
                    <div>
                      <h3 className="font-semibold">Supplier</h3>
                      <p className="text-sm">Guanjoi Trading LLC</p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🇩🇪</span>
                      <span className="text-sm">Germany, Berlin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">Verified Seller</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">🌐</span>
                      <span className="text-sm">Worldwide shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-6">
            <div className="border-b">
              <div className="flex">
                <button className="px-4 py-2 border-b-2 border-blue-500 font-medium text-blue-500">Description</button>
                <button className="px-4 py-2 text-gray-500">Reviews</button>
                <button className="px-4 py-2 text-gray-500">Shipping</button>
                <button className="px-4 py-2 text-gray-500">About seller</button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-md mt-4">
              <p className="text-sm text-gray-600 mb-4">
                {product.description ||
                  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <table className="w-full text-sm mt-6">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Model</td>
                    <td className="py-2">#8786867</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Style</td>
                    <td className="py-2">Classic style</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Certificate</td>
                    <td className="py-2">ISO-898921212</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Size</td>
                    <td className="py-2">34mm x 450mm x 19mm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Memory</td>
                    <td className="py-2">36GB RAM</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 space-y-2">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-sm">Some great feature name here</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-sm">Lorem ipsum dolor sit amet, consectetur</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-sm">Duis aute irure dolor in reprehenderit</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-sm">Some great feature name here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Related products</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white border rounded-md overflow-hidden">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.image || "/placeholder.svg?height=120&width=120"}
                      alt={relatedProduct.name}
                      width={120}
                      height={120}
                      className="w-full h-32 object-cover"
                    />
                  </Link>
                  <div className="p-3">
                    <p className="font-semibold text-sm">${relatedProduct.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">${(relatedProduct.price * 1.2).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
