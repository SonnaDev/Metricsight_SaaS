export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <h1 className="font-medium text-lg">MetricSight</h1>
      </nav>
      <main className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-medium mt-1">1,284</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-medium mt-1">$8,340</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Active orgs</p>
            <p className="text-2xl font-medium mt-1">42</p>
          </div>
        </div>
        <p className="text-gray-400">More coming soon...</p>
      </main>
    </div>
  )
}