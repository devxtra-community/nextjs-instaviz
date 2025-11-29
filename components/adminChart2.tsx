"use client"
import { useEffect, useState } from "react"
import { Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import axiosAdmin from "@/lib/axiosAdmin"

// Color palette based on global theme variables
const COLORS = [
  "var(--primary-color)",
  "var(--primary-light)"
]

// Label function updated to use theme (no fixed white)
const renderLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value } = props
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) / 2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="var(--text-on-primary)"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
    >
      {value}
    </text>
  )
}

export function ChartPieStacked() {
  const [chartData, setChartData] = useState([
    { device: "Desktop", value: 0, color: COLORS[0] },
    { device: "Mobile", value: 0, color: COLORS[1] },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosAdmin.get("/admin/dashboard/useruploads")
        setChartData([
          { device: "Desktop", value: res.data.desktop, color: COLORS[0] },
          { device: "Mobile", value: res.data.mobile, color: COLORS[1] },
        ])
      } catch (err) {
        console.log("Pie chart stats error:", err)
      }
    }

    fetchStats()
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0 text-center">
        <CardTitle>Upload Device Split</CardTitle>
        <CardDescription>Uploads this month — Desktop vs Mobile</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 pt-4">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="device"
            outerRadius={95}
            innerRadius={60}
            label={renderLabel}
            labelLine={false}
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        {/* Legend */}
        <div className="flex gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[0] }}
            ></div>
            <span className="text-sm font-medium">Desktop</span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[1] }}
            ></div>
            <span className="text-sm font-medium">Mobile</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
