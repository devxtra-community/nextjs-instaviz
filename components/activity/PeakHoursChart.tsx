"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const hours = [
  { time: "1 AM", value: 10 },
  { time: "4 AM", value: 20 },
  { time: "8 AM", value: 45 },
  { time: "12 PM", value: 75 },
  { time: "4 PM", value: 95 },
  { time: "8 PM", value: 60 },
  { time: "11 PM", value: 28 },
]

export default function PeakHoursChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100">
        <CardHeader>
          <CardTitle>Peak Upload Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8A2BE2" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
