import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}
function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 min-w-[160px]">
      <div className="text-violet-600 text-3xl">{icon}</div>
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-violet-700 text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}

export default MetricCard;
