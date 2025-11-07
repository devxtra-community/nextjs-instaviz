import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="flex items-center justify-between ">
        
        {/* Left Text Block */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {value}
          </h2>
        </div>

        {/* Icon Box */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#AD49E1]/90 text-white text-xl shadow-sm">
          {icon}
        </div>

      </CardContent>
    </Card>
  )
}
