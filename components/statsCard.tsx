import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="rounded-xl bg-[var(--card-bg)] shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="flex items-center justify-between p-4">

        {/* Left Text Block */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-[var(--text-light)]">{title}</p>
          <h2 className="text-2xl font-bold text-[var(--text-dark)] leading-tight">
            {value}
          </h2>
        </div>

        {/* Icon Box — THEME APPLIED */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl shadow-sm"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--text-on-primary)",
          }}
        >
          {/* force lucide icon to inherit stroke color */}
          <div className="[&>*]:stroke-current text-[var(--text-on-primary)]">
            {icon}
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
