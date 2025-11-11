"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { motion } from "framer-motion"

const data = [
  { month: "Jan", uploads: 2100 },
  { month: "Feb", uploads: 3300 },
  { month: "Mar", uploads: 2900 },
  { month: "Apr", uploads: 3600 },
  { month: "May", uploads: 4200 },
  { month: "Jun", uploads: 5100 },
  { month: "Jul", uploads: 4800 },
  { month: "Aug", uploads: 5600 },
  { month: "Sep", uploads: 5900 },
  { month: "Oct", uploads: 6200 },
  { month: "Nov", uploads: 6700 },
  { month: "Dec", uploads: 7400 },
]

export default function UploadTrendChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100">
        <CardHeader>
          <CardTitle>Uploads Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#AD49E1"
                strokeWidth={3}
                dot={{ r: 4, fill: "#AD49E1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
