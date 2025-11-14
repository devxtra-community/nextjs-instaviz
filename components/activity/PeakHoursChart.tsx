"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function PeakHoursChart() {
  const [hours, setHours] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeakHours = async () => {
      try {
        const res = await axiosInstance.get("/admin/peakhours");
        setHours(res.data); 
      } catch (err) {
        console.log("Peak Hours Fetch Error:", err);
        setError("Failed to load chart data");
      }
    };

    fetchPeakHours();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100">
        <CardHeader>
          <CardTitle>Peak Upload Hours</CardTitle>
        </CardHeader>

        <CardContent>
          {error ? (
            <p className="text-red-500 text-sm text-center">{error}</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={hours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8A2BE2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
