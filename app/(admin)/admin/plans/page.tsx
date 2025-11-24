"use client";

import axiosAdmin from "@/lib/axiosAdmin";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Plan {
  _id: string;
  title: string;
  price: string;
  billed: string;
  features: string;
  offerlabel: string;
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [addPlan, setAddPlan] = useState({
    title: "",
    price: "",
    billed: "",
    features: "",
    offerlabel: "",
  });

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const res = await axiosAdmin.get("/admin/plans");
      setPlans(res.data.plans || []);
    } catch {
      alert("Failed to load plans");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Add Plan
  const addPlanHandler = async () => {
    try {
      await axiosAdmin.post("/admin/plans", addPlan);
      setShowAddModal(false);
      setAddPlan({ title: "", price: "", billed: "", features: "", offerlabel: "" });
      fetchPlans();
      alert("Plan added successfully!");
    } catch {
      alert("Failed to add plan");
    }
  };

  // Update Plan
  const updatePlanHandler = async () => {
    try {
      await axiosAdmin.put(`/admin/plans/${selectedPlan?._id}`, selectedPlan);
      setShowEditModal(false);
      setSelectedPlan(null);
      fetchPlans();
      alert("Plan updated successfully!");
    } catch {
      alert("Failed to update plan");
    }
  };

  // Delete plan
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await axiosAdmin.delete(`/admin/plans/${deleteId}`);

      if (res.data.success) {
        setPlans(plans.filter((p) => p._id !== deleteId));
        alert("Plan deleted successfully!");
      } else {
        alert("Failed to delete plan.");
      }
    } catch {
      alert("Failed to delete plan.");
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Pricing Plans</h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
      >
        <Plus size={18} /> Add New Plan
      </button>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const featureList = plan.features.split("\n").filter((line) => line.trim() !== "");

          return (
            <div key={plan._id} className="bg-white border rounded-xl p-6 shadow">
              <div className="flex justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold">{plan.title}</h2>
                  {plan.offerlabel && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded mt-1 inline-block">
                      {plan.offerlabel}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setShowEditModal(true);
                    }}
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(plan._id);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-purple-600 font-bold text-2xl">${plan.price}</p>
              <p className="text-gray-500 text-sm mb-3">{plan.billed}</p>

              <ul className="text-sm text-gray-700 list-disc pl-5">
                {featureList.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-3">Delete Plan?</h2>
            <p className="text-gray-600 text-sm mb-5">
              Are you sure you want to delete this plan? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <Modal title="Add New Plan" onClose={() => setShowAddModal(false)} onSubmit={addPlanHandler}>
          <PlanForm plan={addPlan} setPlan={setAddPlan} />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEditModal && selectedPlan && (
        <Modal title="Edit Plan" onClose={() => setShowEditModal(false)} onSubmit={updatePlanHandler}>
          <PlanForm plan={selectedPlan} setPlan={setSelectedPlan} />
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, onSubmit, children }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onSubmit} className="px-4 py-2 bg-purple-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanForm({ plan, setPlan }: any) {
  return (
    <>
      <input
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Title"
        value={plan.title}
        onChange={(e) => setPlan({ ...plan, title: e.target.value })}
      />

      <input
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Price"
        value={plan.price}
        onChange={(e) => setPlan({ ...plan, price: e.target.value })}
      />

      <input
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Billed (/year)"
        value={plan.billed}
        onChange={(e) => setPlan({ ...plan, billed: e.target.value })}
      />

      <textarea
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Features (one per line)"
        rows={4}
        value={plan.features}
        onChange={(e) => setPlan({ ...plan, features: e.target.value })}
      />

      <input
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Offer Label"
        value={plan.offerlabel}
        onChange={(e) => setPlan({ ...plan, offerlabel: e.target.value })}
      />
    </>
  );
}
