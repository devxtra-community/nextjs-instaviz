"use client";

import React, { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Plan {
  _id: string;
  title: string;
  price: string | number;
  billed: string;
  features: string | string[] | null | undefined;
  offerlabel?: string;
}

const normalizeFeaturesToString = (features: Plan["features"]) => {
  if (typeof features === "string") return features;
  if (Array.isArray(features)) return features.join("\n");
  return "";
};

const featuresStringToArray = (value: string | undefined | null) =>
  (value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyPlanForForm = {
    title: "",
    price: "",
    billed: "",
    features: "",
    offerlabel: "",
  };

  const [addForm, setAddForm] = useState({ ...emptyPlanForForm });
  const [editForm, setEditForm] = useState<any>(null);

  // ⭐ ADD MOBILE TITLE SUPPORT
  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent =
      "Manage Pricing Plans";
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await axiosAdmin.get("/admin/plans");
      const incoming = res.data?.plans || [];

      setPlans(
        incoming.map((p: Plan) => ({
          ...p,
          features: normalizeFeaturesToString(p.features),
        }))
      );
    } catch (err) {
      alert("Failed to load plans");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const addPlanHandler = async () => {
    try {
      const payload = {
        title: addForm.title,
        price: Number(addForm.price),
        billed: addForm.billed,
        features: featuresStringToArray(addForm.features),
        ...(addForm.offerlabel?.trim() && { offerlabel: addForm.offerlabel }),
      };

      await axiosAdmin.post("/admin/plans", payload);

      setShowAddModal(false);
      setAddForm({ ...emptyPlanForForm });
      fetchPlans();
    } catch (err) {
      console.error(err);
      alert("Failed to add plan");
    }
  };

  const startEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setEditForm({
      ...plan,
      features: normalizeFeaturesToString(plan.features),
    });
    setShowEditModal(true);
  };

  const updatePlanHandler = async () => {
    if (!selectedPlan) return;

    try {
      const payload = {
        title: editForm.title,
        price: Number(editForm.price),
        billed: editForm.billed,
        features: featuresStringToArray(editForm.features),
        ...(editForm.offerlabel?.trim() && { offerlabel: editForm.offerlabel }),
      };

      await axiosAdmin.put(`/admin/plans/${selectedPlan._id}`, payload);

      setShowEditModal(false);
      setSelectedPlan(null);
      setEditForm(null);
      fetchPlans();
    } catch (err) {
      console.error(err);
      alert("Failed to update plan");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await axiosAdmin.delete(`/admin/plans/${deleteId}`);

      if (res.data?.success) {
        setPlans((prev) => prev.filter((p) => p._id !== deleteId));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete plan.");
    }

    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>

      {/* DESKTOP TITLE */}
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">
        Manage Pricing Plans
      </h1>

      {/* MOBILE TITLE */}
      <h1 id="mobile-page-title" className="md:hidden text-xl font-bold mb-4"></h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
      >
        <Plus size={16} /> Add New Plan
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && <p className="col-span-full text-gray-500">Loading...</p>}
        {!loading && plans.length === 0 && (
          <p className="col-span-full text-gray-500">No plans found.</p>
        )}

        {plans.map((plan) => {
          const featureList = featuresStringToArray(plan.features as any);

          return (
            <div
              key={plan._id}
              className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{plan.title}</h2>
                  {plan.offerlabel && (
                    <span className="inline-block mt-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      {plan.offerlabel}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(plan)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(plan._id);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-purple-600 font-bold text-3xl">${plan.price}</p>
              <p className="text-gray-500 text-sm mb-4">{plan.billed}</p>

              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                {featureList.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Plan"
          submitLabel="Delete"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={confirmDelete}
        >
          <p className="text-gray-600 text-sm mb-5">
            Are you sure you want to delete this plan?
          </p>
        </Modal>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          title="Add New Plan"
          submitLabel="Save"
          onClose={() => {
            setShowAddModal(false);
            setAddForm({ ...emptyPlanForForm });
          }}
          onSubmit={addPlanHandler}
        >
          <PlanForm plan={addForm} setPlan={setAddForm} />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && editForm && (
        <Modal
          title={`Edit: ${selectedPlan?.title}`}
          submitLabel="Update"
          onClose={() => {
            setShowEditModal(false);
            setEditForm(null);
            setSelectedPlan(null);
          }}
          onSubmit={updatePlanHandler}
        >
          <PlanForm plan={editForm} setPlan={setEditForm} />
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = "Save",
}: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 max-w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {children}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanForm({ plan, setPlan }: any) {
  const update = (field: string, value: any) =>
    setPlan((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div>
      <label className="block mb-1 font-medium text-sm">Title</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        value={plan.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">Price</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        value={plan.price}
        onChange={(e) => update("price", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">Billed</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        value={plan.billed}
        onChange={(e) => update("billed", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">
        Features (one per line)
      </label>
      <textarea
        className="border w-full px-3 py-2 rounded-lg mb-3"
        rows={4}
        value={plan.features}
        onChange={(e) => update("features", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">Offer Label</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        value={plan.offerlabel}
        onChange={(e) => update("offerlabel", e.target.value)}
      />
    </div>
  );
}
