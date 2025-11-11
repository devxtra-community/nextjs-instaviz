"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PlanForm({ mode, plan, setPlans }: any) {
  const [form, setForm] = useState(
    plan || { title: "", price: "", dashboards: "", users: "" }
  );

  const save = () => {
    setPlans((prev: any) => {
      if (mode === "edit") {
        return prev.map((p: any) => (p.title === plan.title ? form : p));
      }
      return [...prev, form];
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{mode === "add" ? "Add New Plan" : "Edit Plan"}</h2>

      <Input placeholder="Plan Title" value={form.title} onChange={(e:any) => setForm({...form, title: e.target.value})} />
      <Input placeholder="Price / month" value={form.price} onChange={(e:any) => setForm({...form, price: e.target.value})} />
      <Input placeholder="Dashboards" value={form.dashboards} onChange={(e:any) => setForm({...form, dashboards: e.target.value})} />
      <Input placeholder="Users Allowed" value={form.users} onChange={(e:any) => setForm({...form, users: e.target.value})} />

      <Button className="w-full bg-purple-600 text-white hover:bg-purple-700" onClick={save}>
        Save
      </Button>
    </div>
  );
}
