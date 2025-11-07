import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  percentage: string
  isPositive?: boolean
  icon: React.ReactNode
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <>
   
     <Card className="rounded-xl bg-white h-25">
      <CardContent className="flex items-center justify-between p-4">
        
        
        <div className=" space-y-1">
          <p className=" text-sm text-gray-500 font-medium">{title}</p>
          <h2 className="text-xl font-bold text-gray-900">{value}</h2>
        </div>

        {/* Gradient icon box */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#AD49E1] text-white text-xl ">
          {icon}
        </div>
      </CardContent>
    </Card>
    </>
   
  )
}
