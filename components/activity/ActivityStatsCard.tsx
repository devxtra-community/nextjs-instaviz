"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import axiosAdmin from "@/lib/axiosAdmin";  
import { Upload, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const icons: any = {
  total: <Upload size={40} />,
  success: <CheckCircle2 size={40} />,
  failed: <XCircle size={40} />,
  hour: <Clock size={40} />
};

export default function ActivityStatsCards() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosAdmin.get("/admin/uploadstats")
        const data = res.data;

        const formattedStats = [
          {
            title: "Total Uploads",
            value: data.total,
            icon: icons.total
          },
          {
            title: "Successful Uploads",
            value: data.success,
            icon: icons.success
          },
          {
            title: "Failed Uploads",
            value: data.failed,
            icon: icons.failed
          },
          {
            title: "Peak Upload Hour",
            value: data.peakHour,
            icon: icons.hour
          }
        ];

        setStats(formattedStats);
      } catch (err) {
        console.log("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-2">
              <div className="flex justify-between items-center">
                <p className="text-l text-gray-500">{s.title}</p>
                <div className="w-8 h-8 rounded-lg bg-[#AD49E1]/10 flex items-center justify-center text-[#AD49E1]">
                  {s.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{s.value}</h2>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
