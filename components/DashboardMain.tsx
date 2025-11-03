// components/DashboardMain.tsx
import React from "react";
import MetricCard from "@/components/metricCard";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"


type DashboardMainProps = {
  showData: boolean;
};
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
export const DashboardMain: React.FC<DashboardMainProps> = ({ showData }) => {
  if (!showData)
    return (
      <main className="flex-1 flex flex-col bg-gray-50 min-h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm  p-8 space-y-6 w-full h-full"
          style={{ minHeight: 0, minWidth: 0 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -10, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          >
            <FiUploadCloud size={60} className="text-violet-400 drop-shadow" />
          </motion.div>
          <h2 className="text-2xl font-bold text-violet-700 text-center">Ready to Visualize?</h2>
          <p className="text-md text-gray-500 text-center max-w-md">
            Start by uploading your CSV data! InstaviZ instantly turns your uploads into beautiful dashboards and insights.
          </p>
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#a78bfa" }}
            className="px-7 py-3 bg-violet-700 text-white rounded-xl font-semibold shadow hover:bg-violet-600 transition"
          >
            Upload CSV to Get Started
          </motion.button>
        </motion.div>
      </main>

    );
  return (
    <main className="flex-1 flex flex-col bg-gray-50 h-full min-h-0 py-5 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <MetricCard title="Total Uploads" value="12,430" icon="⬆️" />
        <MetricCard title="Active Users" value="1,239" icon="👥" />
        <MetricCard title="Sales Today" value="₹23,390" icon="💰" />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
        <div className="bg-white rounded-xl shadow p-4 md:p-7 min-h-[220px] flex flex-col justify-center items-center ">
          <div className="text-base md:text-lg font-semibold text-gray-700 mb-2">Data Insights</div>
          <div className="w-full h-32 md:h-48 bg-violet-100 rounded" />
          <div className="mt-2 text-xs text-gray-400">Visualize your CSV uploads and user metrics here.</div>
        </div>
      </div> */}
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>

    </main>
  )
};
