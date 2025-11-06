export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar here
      <aside className="w-64 bg-gray-900 text-white px-4 py-6">Admin Sidebar</aside> */}
      

      <main className="flex-1 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}
