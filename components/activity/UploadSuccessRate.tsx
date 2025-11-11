"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export default function UploadSuccessRate() {
  const successRate = 98

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100 flex flex-col h-full">
        <CardHeader>
          <CardTitle>Upload Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-[#AD49E1]">{successRate}%</h2>
            <p className="text-gray-500 text-sm">overall success rate</p>
          </div>
          <Progress value={successRate} className="h-3" />
        </CardContent>
      </Card>
    </motion.div>
  )
}
