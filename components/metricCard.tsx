import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}
function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-3 flex items-center border my-3 border-gray-300 gap-2  min-w-[120px]">
      <div className="text-violet-600 text-2xl">{icon}</div>
      <div>
        <div className="font-semibold text-gray-800 text-sm">{title}</div>
        <div className="text-violet-700 text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}


export default MetricCard;
