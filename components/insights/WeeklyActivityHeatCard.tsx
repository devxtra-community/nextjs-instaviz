"use client";

const activity = [20, 45, 60, 80, 50, 70, 30]; 

export default function WeeklyActivityChart() {
  const maxValue = Math.max(...activity);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="font-semibold mb-4 text-gray-900">Weekly Activity</h2>

      <div className="flex items-end gap-3 h-40"> 
        {activity.map((value, idx) => (
          <div
            key={idx}
            className="bg-purple-300 rounded-md transition-all"
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: "40px"
            }}
          ></div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>
  );
}
