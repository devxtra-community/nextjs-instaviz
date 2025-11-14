"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import PlanForm from "./PlanForm";


const initialPlans = [
  {
    id: 1,
    title: "Starter",
    price: 15,
    features: ["2 Data sources", "Basic export", "Community support"],
  },
  {
    id: 2,
    title: "Pro",
    price: 29,
    features: ["10 Data sources", "PDF export", "Team access", "Advanced charts"],
  },
  {
    id: 3,
    title: "Enterprise",
    price: 59,
    features: ["Unlimited data", "White-label", "Dedicated support"],
  },
];

export default function AdminPlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent = "Manage Plans";
  }, []);

  const deletePlan = (id: number) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  return (
    <>
      {/* Title for Desktop */}
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">Manage Pricing Plans</h1>

      {/* Add Plan Button */}
      <button
        onClick={() => setEditingPlan({})}
        className="bg-[#AD49E1] text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6 hover:bg-[#9334c7] transition"
      >
        <Plus size={18} /> Add New Plan
      </button>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{plan.title}</h2>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPlan(plan)}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-[#AD49E1] font-bold text-lg mb-2">${plan.price}/mo</p>

            <ul className="text-sm text-gray-700 space-y-1">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Plan */}
      {editingPlan && (
        <PlanForm
          plan={editingPlan}
          close={() => setEditingPlan(null)}
          save={(newPlan: any) => {
            if (newPlan.id) {
              setPlans(plans.map((p) => (p.id === newPlan.id ? newPlan : p)));
            } else {
              setPlans([...plans, { ...newPlan, id: Date.now() }]);
            }
            setEditingPlan(null);
          }}
        />
      )}
    </>
  );
}
