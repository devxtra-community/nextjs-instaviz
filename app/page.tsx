import MetricCard from "@/components/metricCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex bg-dot-fade">
        {/* Sidebar */}
        <aside className="w-64 bg-violet-700 text-white flex flex-col py-6 px-5 shadow-lg">
          <div className="font-bold text-2xl mb-6 tracking-tight">DataVision</div>
          <nav className="flex flex-col gap-3 font-medium">
            <a className="hover:bg-violet-900 px-3 py-2 rounded" href="#">Dashboard</a>
            <a className="hover:bg-violet-900 px-3 py-2 rounded" href="#">History</a>
            <a className="hover:bg-violet-900 px-3 py-2 rounded" href="#">Pricing</a>
          </nav>
          <div className="mt-auto pt-6 text-xs text-gray-100">Logged in as Admin</div>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 flex flex-col py-10 px-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-violet-700">Dashboard</h1>
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg shadow">Download Report</button>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <MetricCard title="Total Uploads" value="12,430" icon="⬆️" />
            <MetricCard title="Active Users" value="1,239" icon="👥" />
            <MetricCard title="Sales Today" value="₹23,390" icon="💰" />
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Chart Area Placeholder */}
            <div className="bg-white rounded-xl shadow p-7 flex flex-col justify-center items-center min-h-[280px]">
              <div className="text-lg font-semibold text-gray-700 mb-2">Data Insights</div>
              <div className="w-full h-48 bg-violet-100 rounded" />
              <div className="mt-2 text-xs text-gray-400">Visualize your CSV uploads and user metrics here.</div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-xl shadow p-7 min-h-[280px]">
              <div className="text-lg font-semibold text-gray-700 mb-4">Recent CSV Uploads</div>
              <table className="w-full text-left border-spacing-0">
                <thead>
                  <tr className="text-violet-700 font-bold text-sm">
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
                  {/* Add more rows dynamically as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

    </>
  );
}