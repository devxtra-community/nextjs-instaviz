"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axiosAdmin from "@/lib/axiosAdmin";   
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function UploadSuccessRate() {
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const fetchSuccessRate = async () => {
      try {
        const res = await axiosAdmin.get("/admin/activities/uploadsuccess");
        setSuccessRate(res.data.successRate);
      } catch (err) {
        console.log("Error fetching rate:", err);
      }
    };
    fetchSuccessRate();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100 flex flex-col h-full">
        <CardHeader>
          <CardTitle>Upload Success Rate</CardTitle>
        </CardHeader>

        <CardContent>
          {/* SUCCESS RATE NUMBER */}
          <div className="text-center mb-4">
            <h2
              className="text-4xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              {successRate}%
            </h2>
            <p className="text-gray-500 text-sm">overall success rate</p>
          </div>

          {/* PROGRESS BAR */}
          <Progress
            value={successRate}
            className="h-3"
            style={{
              // Tailwind wrapper needs inline CSS for theme variables
              "--tw-bg-opacity": "1",
              backgroundColor: "var(--primary-light)",
            } as React.CSSProperties}
          />

          <style jsx>{`
            /* Override the progress indicator to use theme color */
            .h-3 > div {
              background-color: var(--primary-color) !important;
            }
          `}</style>
        </CardContent>
      </Card>
    </motion.div>
  );
}
