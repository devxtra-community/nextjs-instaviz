"use client";

import React, { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import { Pencil, Trash2, Plus } from "lucide-react";

/* -----------------------------
   Types
----------------------------- */
interface Plan {
  _id: string;
  title: string;
  price: string | number;
  billed: string;
  features: string | string[] | null | undefined;
  offerlabel?: string;
}

/* ----------------------------- */
/* Helpers                       */
/* ----------------------------- */

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

/* ----------------------------- */
/* Page Component                */
/* ----------------------------- */

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const emptyForm = {
    title: "",
    price: "",
    billed: "",
    features: "",
    offerlabel: "",
  };

  const [addForm, setAddForm] = useState({ ...emptyForm });
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent =
      "Manage Pricing Plans";
  }, []);

  /* ----------------------------- */
  /* Fetch Plans                   */
  /* ----------------------------- */

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

  /* ----------------------------- */
  /* Add Plan                      */
  /* ----------------------------- */

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
      setAddForm({ ...emptyForm });
      fetchPlans();
    } catch (err) {
      alert("Failed to add plan");
    }
  };

  /* ----------------------------- */
  /* Edit Plan                     */
  /* ----------------------------- */

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
      setEditForm(null);
      setSelectedPlan(null);
      fetchPlans();
    } catch (err) {
      alert("Failed to update");
    }
  };

  /* ----------------------------- */
  /* Delete Plan                   */
  /* ----------------------------- */

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await axiosAdmin.delete(`/admin/plans/${deleteId}`);

      if (res.data?.success) {
        setPlans((prev) => prev.filter((p) => p._id !== deleteId));
      }
    } catch (err) {
      alert("Failed to delete plan");
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  /* ----------------------------- */
  /* Render                        */
  /* ----------------------------- */

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">
        Manage Pricing Plans
      </h1>

      <h1 id="mobile-page-title" className="md:hidden text-xl font-bold mb-4"></h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--text-on-primary)",
        }}
      >
        <Plus size={16} className="stroke-current" /> Add New Plan
      </button>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {loading && <p className="text-[var(--muted-foreground)]">Loading...</p>}

        {!loading && plans.length === 0 && (
          <p className="text-[var(--muted-foreground)]">No plans found.</p>
        )}

        {plans.map((plan) => {
          const featureList = featuresStringToArray(plan.features as any);

          return (
            <div
              key={plan._id}
              className="rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{plan.title}</h2>

                  {plan.offerlabel && (
                    <span
                      className="inline-block mt-2 text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--text-on-primary)",
                      }}
                    >
                      {plan.offerlabel}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(plan)}
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: "var(--card)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(plan._id);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: "var(--card)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p
                className="font-bold text-3xl"
                style={{ color: "var(--primary)" }}
              >
                ${plan.price}
              </p>

              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {plan.billed}
              </p>

              <ul
                className="text-sm mt-4 space-y-1"
                style={{ color: "var(--foreground)" }}
              >
                {featureList.map((f, i) => (
                  <li key={i} className="list-disc ml-5">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <Modal
          title="Delete Plan"
          submitLabel="Delete"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={confirmDelete}
        >
          <p style={{ color: "var(--muted-foreground)" }}>
            Are you sure you want to delete this plan?
          </p>
        </Modal>
      )}

      {/* ADD PLAN MODAL */}
      {showAddModal && (
        <Modal
          title="Add New Plan"
          submitLabel="Save"
          onClose={() => {
            setShowAddModal(false);
            setAddForm({ ...emptyForm });
          }}
          onSubmit={addPlanHandler}
        >
          <PlanForm plan={addForm} setPlan={setAddForm} />
        </Modal>
      )}

      {/* EDIT PLAN MODAL */}
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

/* ----------------------------- */
/* Modal Component               */
/* ----------------------------- */

function Modal({ title, onClose, onSubmit, children, submitLabel = "Save" }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className="p-6 rounded-2xl w-96 max-w-full shadow-lg"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
        }}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {children}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* Plan Form Component           */
/* ----------------------------- */

function PlanForm({ plan, setPlan }: any) {
  const update = (field: string, value: any) =>
    setPlan((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div>
      <label className="block mb-1 font-medium text-sm">Title</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
        }}
        value={plan.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">Price</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
        }}
        value={plan.price}
        onChange={(e) => update("price", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">Billed</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-3"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
        }}
        value={plan.billed}
        onChange={(e) => update("billed", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">
        Features (one per line)
      </label>
      <textarea
        className="border w-full px-3 py-2 rounded-lg mb-3"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
        }}
        rows={4}
        value={plan.features}
        onChange={(e) => update("features", e.target.value)}
      />

      <label className="block mb-1 font-medium text-sm">Offer Label</label>
      <input
        className="border w-full px-3 py-2 rounded-lg mb-1"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
        }}
        value={plan.offerlabel}
        onChange={(e) => update("offerlabel", e.target.value)}
      />
    </div>
  );
}
