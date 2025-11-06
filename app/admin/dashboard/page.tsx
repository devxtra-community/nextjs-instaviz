import StatsCard from "@/components/StatsCard"
import { DollarSign, Users, UserPlus, ShoppingCart } from "lucide-react"

export default function AdminDashboard() {
  return (
    <>
    <h1 className=" my-5 mx-10 text-2xl">Dashboard</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
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
    </>
    
   
  )
}
