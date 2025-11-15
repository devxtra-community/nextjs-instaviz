"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const loginData = { email, password };

      const res = await axiosInstance.post(
        "/admin/login",
        loginData,
        { withCredentials: true }
      );

      if (res.data.success) {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-24">
        
        <div className="lg:hidden mb-6 flex items-center">
          <h1 className="text-4xl font-semibold primary">Admin Panel</h1>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="text-4xl font-semibold text-gray-900">Admin Login</h2>

          <Toaster richColors position="top-center" />

          <p className="mt-1 text-base text-gray-600">
            Sign in to access system controls.
          </p>

          <div className="mt-8 space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-[#AD49E1]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-[#AD49E1]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-md primarybg py-2.5 text-white font-medium hover:bg-purple-200 transition"
            >
              Sign in as Admin
            </button>

            <p className="text-center text-sm text-gray-600">
              Access restricted to authorized administrators only.
            </p>

          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center relative 
        bg-gradient-to-br from-[#AD49E1] via-purple-500 to-[#AD49E1] overflow-hidden">

        <div className="absolute inset-0 opacity-20 
          bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] 
          bg-[size:20px_20px]" />

        <motion.img
          src="/admin-secure.gif"
          alt="Admin Security"
          className="relative z-10 max-w-md w-full object-contain drop-shadow-2xl rounded-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute bottom-12 text-center px-4 z-20">
          <h2 className="text-white text-3xl font-semibold drop-shadow-lg">
            Secure Admin Access
          </h2>
          <p className="text-gray-200 text-sm mt-2">
            Manage users, insights and system controls.
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />

      </div>
    </div>
  );
}
