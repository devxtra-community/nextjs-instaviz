"use client";

import { useState } from "react";
import axios from "@/lib/axiosInstance";

interface CheckoutButtonProps {
  plan: string;
  highlight?: boolean;
  butto: string;
}

export default function CheckoutButton({ plan, highlight, butto }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/payment/create-checkout-session", { plan });
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error.message || error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`mt-auto px-6 py-2 text-xs sm:text-base rounded-xl font-semibold shadow cursor-pointer w-full transition
        ${
          highlight
            ? "primarybg text-white hover:brightness-110 disabled:opacity-70"
            : "bg-[#f3e8ff] primary hover:bg-[#ead6ff] disabled:opacity-60"
        }`}
    >
      {loading ? "Redirecting..." : butto}
    </button>
  );
}
