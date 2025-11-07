"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle2, XCircle, Clock } from "lucide-react";

const stats = [
  { title: "Total Uploads", value: "14.2K", change: "+12%", icon: <Upload size={20}/> },
  { title: "Successful Uploads", value: "13.8K", change: "98%", icon: <CheckCircle2 size={20}/> },
  { title: "Failed Uploads", value: "120", change: "-1.3%", icon: <XCircle size={20}/> },
  { title: "Peak Upload Hour", value: "4 PM", icon: <Clock size={20}/> }
];

export default function ActivityStatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{s.title}</p>
                <div className="w-8 h-8 rounded-lg bg-[#AD49E1]/10 flex items-center justify-center text-[#AD49E1]">
                  {s.icon}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-1">{s.value}</h2>
              {s.change && <p className="text-xs font-medium text-green-500">{s.change}</p>}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
