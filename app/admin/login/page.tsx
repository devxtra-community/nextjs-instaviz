"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import useRedirectAdmin from "@/components/hooks/useRedirectAdmin";

export default function AdminLoginPage() {
  useRedirectAdmin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    try {
      const res = await axiosAdmin.post(
        "/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("adminAccessToken", res.data.accessToken);
        document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=900`;
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-[var(--secondary-color)] text-[var(--text-dark)]">
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-4xl font-semibold text-[var(--text-dark)]">
            Admin Login
          </h2>

          <Toaster richColors position="top-center" />

          <p className="mt-1 text-base text-[var(--text-light)]">
            Sign in to access system controls.
          </p>

          <div className="mt-8 space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-dark)]">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="
                  mt-1 w-full rounded-md border border-[var(--card-border)]
                  bg-[var(--card-bg)] px-3 py-2 text-sm 
                  outline-none focus:ring-2 focus:ring-[var(--primary-light)]
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-dark)]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="
                  mt-1 w-full rounded-md border border-[var(--card-border)]
                  bg-[var(--card-bg)] px-3 py-2 text-sm 
                  outline-none focus:ring-2 focus:ring-[var(--primary-light)]
                "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-2 text-[var(--primary-color)] hover:text-[var(--primary-hover)]"
                >
                  {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="
                w-full rounded-md py-2.5 text-white font-medium
                bg-[var(--primary)] hover:bg-[var(--primary)]
                transition cursor-pointer
              "
            >
              Sign in as Admin
            </button>

            <p className="text-center text-sm text-[var(--text-light)]">
              Access restricted to authorized administrators only.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE ILLUSTRATION */}
      <div
        className="
          hidden md:flex flex-1 items-center justify-center relative
          text-white overflow-hidden
          bg-gradient-to-br
          from-[color-mix(in_srgb,var(--primary)_100%,white_10%)]
          via-[color-mix(in_srgb,var(--primary)_80%,white_20%)]
          to-[color-mix(in_srgb,var(--primary)_60%,white_30%)]
        "
      >
        {/* DOT GRID OVERLAY */}
        <div
          className="absolute inset-0 opacity-20 
            bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)]
            bg-[size:20px_20px]"
        />

        {/* FLOATING IMAGE */}
        <motion.img
          src="/giphy.gif"
          alt="Admin Security"
          className="relative z-10 max-w-md w-full object-contain drop-shadow-2xl rounded-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* TEXT */}
        <div className="absolute bottom-12 text-center px-4 z-20">
          <h2 className="text-3xl font-semibold drop-shadow-lg">
            Secure Admin Access
          </h2>
          <p className="text-sm mt-2 opacity-90">
            Manage users, insights and system controls.
          </p>
        </div>

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />
      </div>
    </div>
  );
}
