"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, Heart, Grid, List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getProducts } from "@/lib/service/products"

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [sortOption, setSortOption] = useState("featured")

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [condition, setCondition] = useState("any")
  const [selectedRatings, setSelectedRatings] = useState([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  // Categories
  const categories = [
    { id: "all", name: "All categories" },
    { id: "mobile-accessory", name: "Mobile accessory" },
    { id: "electronics", name: "Electronics" },
    { id: "smartphones", name: "Smartphones" },
    { id: "modern-tech", name: "Modern tech" },
    { id: "computers", name: "Computers" },
    { id: "audio", name: "Audio" },
    { id: "wearables", name: "Wearables" },
  ]

  // Brands
  const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"]

  // Features
  const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"]

  // Conditions
  const conditions = ["any", "refurbished", "brand-new", "old-items"]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    // Apply all filters whenever any filter changes
    applyFilters()
  }, [selectedCategory, selectedBrands, selectedFeatures, condition, selectedRatings, verifiedOnly, sortOption])

  // Update active filters display
  useEffect(() => {
    const filters = []

    if (selectedCategory && selectedCategory !== "all") {
      filters.push({ type: "category", value: getCategoryName(selectedCategory) })
    }

    selectedBrands.forEach((brand) => {
      filters.push({ type: "brand", value: brand })
    })

    selectedFeatures.forEach((feature) => {
      filters.push({ type: "feature", value: feature })
    })

    if (condition !== "any") {
      filters.push({ type: "condition", value: condition })
    }

    selectedRatings.forEach((rating) => {
      filters.push({ type: "rating", value: `${rating} star` })
    })

    setActiveFilters(filters)
  }, [selectedCategory, selectedBrands, selectedFeatures, condition, selectedRatings])

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  const applyFilters = () => {
    let result = [...products]

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase() ||
          product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      )
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.some(
          (brand) => product.name.includes(brand) || (product.brand && product.brand.includes(brand)),
        ),
      )
    }

    // Filter by features (this is a mock since we don't have feature data)
    if (selectedFeatures.length > 0) {
      // In a real app, you would filter by actual product features
      // This is just a simulation
      result = result.filter((product) =>
        selectedFeatures.some((feature) => product.description && product.description.includes(feature)),
      )
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by condition (mock)
    if (condition !== "any") {
      // In a real app, you would filter by actual product condition
      // This is just a simulation
      const conditionMap = {
        refurbished: "refurbished",
        "brand-new": "new",
        "old-items": "used",
      }

      if (conditionMap[condition]) {
        result = result.filter(
          (product) => product.description && product.description.toLowerCase().includes(conditionMap[condition]),
        )
      }
    }

    // Filter by ratings (mock)
    if (selectedRatings.length > 0) {
      // In a real app, you would filter by actual product ratings
      // This is just a simulation that keeps some products for each rating
      const highestRating = Math.max(...selectedRatings)
      result = result.filter((_, index) => index % (6 - highestRating) === 0)
    }

    // Sort products
    switch (sortOption) {
      case "newest":
        // In a real app, you would sort by date
        result = [...result].reverse()
        break
      case "price-low-high":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      default: // featured
        // Keep default order
        break
    }

    setFilteredProducts(result)
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    // Update URL
    router.push(`/products?category=${categoryId}`)
  }

  const handleBrandChange = (brand, checked) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleFeatureChange = (feature, checked) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature])
    } else {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    }
  }

  const handlePriceRangeChange = (values) => {
    setPriceRange(values)
  }

  const handleApplyPriceRange = () => {
    applyFilters()
  }

  const handleConditionChange = (value) => {
    setCondition(value)
  }

  const handleRatingChange = (rating, checked) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating])
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating))
    }
  }

  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case "category":
        setSelectedCategory("all")
        router.push("/products")
        break
      case "brand":
        setSelectedBrands(selectedBrands.filter((b) => b !== value))
        break
      case "feature":
        setSelectedFeatures(selectedFeatures.filter((f) => f !== value))
        break
      case "condition":
        setCondition("any")
        break
      case "rating":
        const rating = Number.parseInt(value.split(" ")[0])
        setSelectedRatings(selectedRatings.filter((r) => r !== rating))
        break
    }
  }

  const handleClearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedBrands([])
    setSelectedFeatures([])
    setPriceRange([0, 1000])
    setCondition("any")
    setSelectedRatings([])
    setVerifiedOnly(false)
    router.push("/products")
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
            {selectedCategory !== "all" && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-700">{getCategoryName(selectedCategory)}</span>
              </>
            )}
          </nav>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-md p-4 mb-4">
                <h3 className="font-semibold mb-3">Category</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`cursor-pointer ${selectedCategory === category.id ? "text-blue-500 font-medium" : ""}`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-md p-4 mb-4">
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand.toLowerCase()}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                      />
                      <label htmlFor={`brand-${brand.toLowerCase()}`} className="ml-2 text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                  <p className="text-blue-500 text-sm cursor-pointer">See all</p>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 mb-4">
                <h3 className="font-semibold mb-3">Features</h3>
                <div className="space-y-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Checkbox
                        id={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, checked)}
                      />
                      <label htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`} className="ml-2 text-sm">
                        {feature}
                      </label>
                    </div>
                  ))}
                  <p className="text-blue-500 text-sm cursor-pointer">See all</p>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 mb-4">
                <h3 className="font-semibold mb-3">Price range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={2000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mt-6"
                  />
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Min</p>
                      <p className="font-medium">${priceRange[0]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Max</p>
                      <p className="font-medium">${priceRange[1]}</p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleApplyPriceRange}>
                    Apply
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 mb-4">
                <h3 className="font-semibold mb-3">Condition</h3>
                <div className="space-y-2">
                  {conditions.map((conditionOption) => (
                    <div key={conditionOption} className="flex items-center">
                      <input
                        type="radio"
                        id={conditionOption}
                        name="condition"
                        className="text-blue-500"
                        checked={condition === conditionOption}
                        onChange={() => handleConditionChange(conditionOption)}
                      />
                      <label htmlFor={conditionOption} className="ml-2 text-sm">
                        {conditionOption === "any"
                          ? "Any"
                          : conditionOption === "brand-new"
                            ? "Brand new"
                            : conditionOption === "old-items"
                              ? "Old items"
                              : conditionOption.charAt(0).toUpperCase() + conditionOption.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-md p-4">
                <h3 className="font-semibold mb-3">Ratings</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => handleRatingChange(rating, checked)}
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Listing */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-md p-4 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h1 className="text-lg font-semibold">
                      {filteredProducts.length} items in{" "}
                      <span className="text-blue-500">{getCategoryName(selectedCategory)}</span>
                    </h1>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0 space-x-4">
                    <div className="flex items-center">
                      <Checkbox id="verified-only" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                      <label htmlFor="verified-only" className="ml-2 text-sm">
                        Verified only
                      </label>
                    </div>
                    <div>
                      <select
                        className="border rounded-md p-1 text-sm"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                      </select>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <div className="bg-white rounded-md p-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {filter.value}
                        <button className="ml-1" onClick={() => handleRemoveFilter(filter.type, filter.value)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <Button variant="link" size="sm" className="text-blue-500" onClick={handleClearAllFilters}>
                      Clear all filter
                    </Button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-md p-8 text-center">
                      <h3 className="text-lg font-semibold mb-2">No products found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                      <Button onClick={handleClearAllFilters}>Clear all filters</Button>
                    </div>
                  ) : (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}>
                      {filteredProducts.map((product) =>
                        viewMode === "grid" ? (
                          <div key={product.id} className="bg-white rounded-md overflow-hidden border">
                            <div className="relative">
                              <Link href={`/products/${product.id}`}>
                                <Image
                                  src={product.image || "/placeholder.svg?height=200&width=200"}
                                  alt={product.name}
                                  width={200}
                                  height={200}
                                  className="w-full h-48 object-cover"
                                />
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="p-3">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                                  <p className="text-xs text-gray-400 line-through">
                                    ${(product.price * 1.2).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <Link href={`/products/${product.id}`} className="block mt-2">
                                <h3 className="font-medium text-sm">{product.name}</h3>
                              </Link>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-1">7.5</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div key={product.id} className="bg-white rounded-md overflow-hidden border p-4">
                            <div className="flex gap-4">
                              <div className="w-32 h-32 flex-shrink-0">
                                <Link href={`/products/${product.id}`}>
                                  <Image
                                    src={product.image || "/placeholder.svg?height=128&width=128"}
                                    alt={product.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                </Link>
                              </div>
                              <div className="flex-1">
                                <Link href={`/products/${product.id}`}>
                                  <h3 className="font-medium">{product.name}</h3>
                                </Link>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-1">7.5</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                                <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${product.price.toFixed(2)}</p>
                                <p className="text-xs text-gray-400 line-through">
                                  ${(product.price * 1.2).toFixed(2)}
                                </p>
                                <Button size="sm" className="mt-2">
                                  <Heart className="h-4 w-4 mr-1" /> Watch
                                </Button>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </>
              )}

              {filteredProducts.length > 0 && (
                <div className="flex justify-center mt-6">
                  <nav className="flex items-center space-x-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                      3
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
