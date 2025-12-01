"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import CheckoutButton from "@/components/CheckoutButton";
import axiosInstance from "@/lib/axiosInstance";

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/admin/plans");
        setPlans(res.data.plans || []);
      } catch (err) {
        console.log("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dot-fade py-8 px-2 sm:px-4 pt-24">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AD49E1]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dot-fade py-8 px-2 sm:px-4 pt-24">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-1 primary">Our Plans</h1>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-stretch gap-6 sm:gap-4 mt-6 overflow-x-auto">
            {plans.map((plan, idx) => (
              <div
                key={plan._id || plan.title}
                className={`
                  flex flex-col items-center rounded-3xl card-custom-top-right p-6 sm:p-8 transition
                  w-full min-w-[85vw] sm:min-w-[20rem] sm:w-80
                  hover:shadow-md cursor-pointer
                  ${
                    plan.highlight || plan.offerlabel
                      ? "bg-white border-2 border-[#AD49E1] relative"
                      : "bg-white border border-[#e8d7fa]"
                  }
                  ${idx === 0 ? "opacity-95" : ""}
                  ${idx === 2 ? "border-2 border-[#9929D5] relative" : ""}
                `}
                style={idx === 1 ? { zIndex: 2 } : { zIndex: 1 }}
              >
                {(plan.label || plan.offerlabel) && (
                  <span
                    className={`absolute top-6 right-6 px-3 py-1 text-xs rounded-full font-semibold

                      ${plan.highlight || plan.offerlabel
                        ? "bg-[#f5e8ff] primary"
                        : idx === 2
                        ? "primarybg text-white"
                        : "bg-[#f5e8ff] primary"}
                    `}

                 

                  >
                    {plan.label || plan.offerlabel}
                  </span>
                )}

                <div className="text-xl sm:text-2xl font-bold mb-2 primary">
                  {plan.title}
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold flex items-end space-x-1 sm:space-x-2 primary">
                  {plan.oldPrice && (
                    <span className="line-through text-base sm:text-lg text-gray-400">
                      ${plan.oldPrice}
                    </span>
                  )}
                  <span>${plan.price}</span>
                  <span className="text-xs sm:text-base font-normal text-gray-500">
                    /mo
                  </span>
                </div>

                <div className="text-xs sm:text-sm primary mb-4">
                  {plan.billed}
                </div>

                <ul className="text-gray-800 text-xs sm:text-sm space-y-2 mb-4 w-full">
                  {plan.features?.map((f: string) => (
                    <li key={f} className="flex items-center">
                      <span className="mr-2 primary">✔</span> <span>{f}</span>
                    </li>
                  ))}


                  {plan.unavailable?.map((f: string) => (
                    <li key={f} className="flex items-center opacity-60">
                      <span className="mr-2 text-gray-400">✘</span>
                      <span>{f}</span>
                    </li>
                  ))}

                  

                </ul>

                <CheckoutButton
                  plan={plan.title}
                  highlight={plan.highlight || !!plan.offerlabel}
                  butto={plan.button || `Get ${plan.title}`}
                />
              </div>
            ))}

            {plans.length === 0 && (
              <p className="text-center text-gray-500 w-full">
                No plans available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
