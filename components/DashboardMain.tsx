// components/DashboardMain.tsx
import React from "react";
import MetricCard from "@/components/metricCard";

type DashboardMainProps = {
  showData: boolean;
};

export const DashboardMain: React.FC<DashboardMainProps> = ({ showData }) => {
  if (!showData)
    return (
      <main className="flex-1 flex flex-col py-10 px-2 md:px-10 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <span className="text-lg text-violet-400">Upload data to see dashboard...</span>
        </div>
      </main>
    );
  return (
    <main className="flex-1 flex flex-col py-10 px-2 md:px-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-violet-700">Dashboard</h1>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-5 py-2 rounded-lg shadow text-xs md:text-base">
          Download Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <MetricCard title="Total Uploads" value="12,430" icon="⬆️" />
        <MetricCard title="Active Users" value="1,239" icon="👥" />
        <MetricCard title="Sales Today" value="₹23,390" icon="💰" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
        <div className="bg-white rounded-xl shadow p-4 md:p-7 min-h-[220px] flex flex-col justify-center items-center ">
          <div className="text-base md:text-lg font-semibold text-gray-700 mb-2">Data Insights</div>
          <div className="w-full h-32 md:h-48 bg-violet-100 rounded" />
          <div className="mt-2 text-xs text-gray-400">Visualize your CSV uploads and user metrics here.</div>
        </div>
        {/* <div className="bg-white rounded-xl shadow p-4 md:p-7 min-h-[220px] overflow-auto">
          <div className="text-base md:text-lg font-semibold text-gray-700 mb-4">Recent CSV Uploads</div>
          <table className="w-full text-left border-spacing-0 text-xs md:text-base">
            <thead>
              <tr className="text-violet-700 font-bold">
                <th className="py-2">File Name</th>
                <th className="py-2">Rows</th>
                <th className="py-2">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 font-medium">sales_oct.csv</td>
                <td className="py-2">590</td>
                <td className="py-2">27 Oct 2025</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 font-medium">users_data.csv</td>
                <td className="py-2">1234</td>
                <td className="py-2">26 Oct 2025</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </main>
  );
};
