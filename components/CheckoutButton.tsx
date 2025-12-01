"use client";

import { useState } from "react";
import axios from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

interface CheckoutButtonProps {
  plan: string;
  highlight?: boolean;
  butto: string;
}

export default function CheckoutButton({
  plan,
  highlight,
  butto,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    const finalToken = localStorage.getItem("accessToken");

    console.log(finalToken);
    if (!finalToken) {
      toast.error("Please login to continue");
      setTimeout(() => {
        router.push(`/login?redirect=/ourplans`);
      }, 1500);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/payment/create-checkout-session", {
        plan,
      });
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to start checkout. Please try again.");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error.message || error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        richColors
        position="top-center"
        style={{
          marginTop: "60px",
          fontSize: "14px",
          zIndex: 9999,
        }}
        toastOptions={{
          style: {
            backgroundColor: "#ffecec",
            color: "#b00020",
            border: "1px solid #ff5c5c",
            borderRadius: "10px",
            padding: "10px 18px",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(255, 0, 0, 0.15)",
          },
          className: "transition-all duration-300",
        }}
      />

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
    </>
  );
}
