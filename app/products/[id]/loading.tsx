export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>

      <div className="bg-white rounded-md p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <div className="border rounded-md overflow-hidden">
                <div className="w-full h-[400px] bg-gray-200 animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-md overflow-hidden">
                  <div className="w-full h-[80px] bg-gray-200 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-md p-3">
                  <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="bg-gray-50 rounded-md p-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 rounded-full h-10 w-10 animate-pulse"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
