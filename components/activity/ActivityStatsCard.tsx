"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import axiosAdmin from "@/lib/axiosAdmin";  
import { Upload, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

/* ICONS auto-adapt to theme */
const icons: any = {
  total: <Upload size={26} strokeWidth={2} className="stroke-current text-[var(--text-on-primary)]" />,
  success: <CheckCircle2 size={26} strokeWidth={2} className="stroke-current text-[var(--text-on-primary)]" />,
  failed: <XCircle size={26} strokeWidth={2} className="stroke-current text-[var(--text-on-primary)]" />,
  hour: <Clock size={26} strokeWidth={2} className="stroke-current text-[var(--text-on-primary)]" />
};

export default function ActivityStatsCards() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosAdmin.get("/admin/activities/uploadstats");
        const data = res.data;

        const formattedStats = [
          { title: "Total Uploads", value: data.total, icon: icons.total },
          { title: "Successful Uploads", value: data.success, icon: icons.success },
          { title: "Failed Uploads", value: data.failed, icon: icons.failed },
          { title: "Peak Upload Hour", value: data.peakHour, icon: icons.hour }
        ];

        setStats(formattedStats);
      } catch (err) {
        console.log("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
            <CardContent className="p-5 flex justify-between items-center">

              {/* LEFT TEXT */}
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {s.title}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  {s.value}
                </h2>
              </div>

              {/* THEME ICON BOX */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                style={{
                  background: "var(--primary-color)",
                  color: "var(--text-on-primary)"
                }}
              >
                {s.icon}
              </div>

            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
