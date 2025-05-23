import Header from "@/components/header"
import Footer from "@/components/footer"
import SeedDatabase from "@/scripts/seed-database"

export default function SeedDatabasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Database Management</h1>
          <SeedDatabase />
        </div>
      </main>
      <Footer />
    </div>
  )
}
