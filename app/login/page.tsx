"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import axiosInstance from "@/lib/axiosInstance";
import GoogleButton from "@/components/GoogleButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    try {

      const res = await axiosInstance.post("/auth/login", { email, password });
      const loginData = {
        email,
        password,
      };
      const LoginResponse = await axiosInstance.post("/auth/login", loginData);


      if (!res.data?.success) return;

      localStorage.removeItem("sessionId");

      localStorage.setItem("accessToken", res.data.accessToken);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      if (res.data.sessionId) {
        localStorage.setItem("sessionId", res.data.sessionId);
      } else {
        console.warn("login response missing sessionId");
      }

      router.push("/home");
    } catch (err: any) {
      console.error("login failed:", err);
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Toaster richColors position="top-center" />

      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-4xl font-semibold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-base primary">
            Please sign in to continue your analysis.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-purple-400"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute bottom-2 right-2 primary cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              type="button"
              className="w-full rounded-md primarybg py-2.5 text-white font-medium cursor-pointer transition"
            >
              Sign in
            </button>

            <GoogleButton />

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center relative bg-linear-to-br from-[#AD49E1] via-purple-500 to-[#AD49E1] overflow-hidden">
        <motion.img
          src="/giphy.gif"
          alt="Data Visualization"
          className="relative z-10 max-w-md w-full md:h-1/3 object-contain drop-shadow-2xl rounded-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute bottom-12 text-center px-4 z-20">
          <h2 className="text-white text-3xl font-semibold drop-shadow-lg">
            Visualize. Analyze. Grow.
          </h2>
          <p className="text-gray-200 text-sm mt-2">
            Transform your data into clear, meaningful insights.
          </p>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-0" />
      </div>
    </div>
  );
}