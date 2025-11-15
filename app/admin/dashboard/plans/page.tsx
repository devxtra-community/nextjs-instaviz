"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState([]);


  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch("/admin/dashboard/plans/showplans");
        const data = await res.json();
        setPlans(data.plans || []);
      } catch (error) {
        console.error("Failed to load plans:", error);
      }
    };

    loadPlans();
  }, []);

  useEffect(() => {
    const titleEl = document.getElementById("mobile-page-title");
    if (titleEl) titleEl.textContent = "Manage Plans";
  }, []);

  return (
    <>

      <h1 className="text-2xl font-semibold mb-6 hidden md:block">
        Manage Pricing Plans
      </h1>

      
      <button className="bg-[#AD49E1] text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6 hover:bg-[#9334c7] transition">
        <Plus size={18} /> Add New Plan
      </button>

 
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan: any) => (
          <div
            key={plan._id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
        
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{plan.title}</h2>
            </div>

            <p className="text-[#AD49E1] font-bold text-lg mb-2">
              ${plan.price}/mo
            </p>

         
            <ul className="text-sm text-gray-700 space-y-1">
              {(plan.features
                ?.split("•")
                ?.filter((f: string) => f.trim().length > 0) || []
              ).map((f: string, i: number) => (
                <li key={i}>• {f.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
