"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import CheckoutButton from "@/components/CheckoutButton";
import axiosInstance from "@/lib/axiosInstance";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/admin/plans");
        setPlans(res.data.plans || []);
      } catch (err) {
        console.log("Error fetching plans:", err);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-dot-fade py-8 px-2 sm:px-4 pt-24">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-1 primary">
        Our Plans
      </h1>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">

          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-stretch 
            gap-6 sm:gap-4 mt-6 overflow-visible">

            {plans.map((plan: any) => (
              <div
                key={plan._id}
                style={{ overflow: "visible" }}  // keep visible for safety
                className={`
                  relative flex flex-col items-center rounded-3xl
                  card-custom-top-right p-6 sm:p-8 transition
                  w-full min-w-[85vw] sm:min-w-[20rem] sm:w-80
                  hover:shadow-md cursor-pointer
                  ${plan.offerlabel
                    ? "bg-white border-2 border-[#AD49E1]"
                    : "bg-white border border-[#e8d7fa]"}
                `}
              >

                {plan.offerlabel && (
                  <span
                    className="
                      absolute -top-4 left-1/2 -translate-x-1/2
                      px-4 py-1 text-[11px] rounded-full font-semibold
                      bg-[#f5e8ff] primary shadow-md
                    "
                  >
                    {plan.offerlabel}
                  </span>
                )}

                {/* TITLE */}
                <div className="text-xl sm:text-2xl font-bold mb-2 primary">
                  {plan.title}
                </div>

                {/* PRICE */}
                <div className="text-2xl sm:text-3xl font-extrabold flex items-end space-x-1 primary">
                  <span>${plan.price}</span>
                  <span className="text-xs sm:text-base font-normal text-gray-500">
                    /mo
                  </span>
                </div>

                <div className="text-xs sm:text-sm primary mb-4">
                  {plan.billed}
                </div>

                {/* FEATURES */}
                <ul className="text-gray-800 text-xs sm:text-sm space-y-2 mb-4 w-full">
                  {plan.features?.map((f: string) => (
                    <li key={f} className="flex items-center">
                      <span className="mr-2 primary">✔</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <CheckoutButton
                  plan={plan.title}
                  highlight={!!plan.offerlabel}
                  butto={`Get ${plan.title}`}
                />
              </div>
            ))}

            {plans.length === 0 && (
              <p className="text-center text-gray-500">Loading plans...</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
