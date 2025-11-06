import Sidebar from "@/components/admindashbordsidebar"
import StatsCard from "@/components/StatsCard"
import { DollarSign, Users, UserPlus, ShoppingCart } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar stays fixed on left */}
      <div className="w-64 bg-white shadow-md fixed h-full">
        <Sidebar />
      </div>

      {/* ✅ Page content shifts right */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Today's Money"
            value="$53,000"
            percentage="+55%"
            icon={<DollarSign size={22} />}
            isPositive
          />

          <StatsCard
            title="Today's Users"
            value="2,300"
            percentage="+3%"
            icon={<Users size={22} />}
            isPositive
          />

          <StatsCard
            title="New Clients"
            value="+3,462"
            percentage="-2%"
            icon={<UserPlus size={22} />}
            isPositive={false}
          />

          <StatsCard
            title="Sales"
            value="$103,430"
            percentage="+5%"
            icon={<ShoppingCart size={22} />}
            isPositive
          />
        </div>
      </div>
    </div>
  );
}
