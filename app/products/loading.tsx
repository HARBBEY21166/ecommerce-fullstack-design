export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-white rounded-md overflow-hidden border">
          <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
