"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import useRedirectIfLoggedIn from "@/components/hooks/useRedirectIfLoggedIn";

import axiosInstance from "@/lib/axiosInstance";
import GoogleButton from "@/components/GoogleButton";

export default function LoginPage() {
  useRedirectIfLoggedIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleLogin() {
    // Validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      
      const loginData = {
        email,
        password,
      };
      
      const LoginResponse = await axiosInstance.post("/auth/login", loginData);
      console.log(LoginResponse.data);
      
      if (LoginResponse.data.success) {
        localStorage.setItem("accessToken", LoginResponse.data.accessToken);
        localStorage.setItem("sessionId", LoginResponse.data.sessionId);
        
        toast.success("Login successful!");
        router.push("/home");
      }
    } catch (err: any) {
      console.error("login failed:", err);
      
      const errorMessage = err?.response?.data?.message || "Login failed";
      
      // If account is suspended (403 status)
      if (err?.response?.status === 403) {
        toast.error(errorMessage, {
          duration: 6000,
          description: "Your account is suspended. Please contact support if you believe this is an error."
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

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
                onKeyPress={handleKeyPress}
                placeholder="Enter your email"
                disabled={isLoading}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-purple-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                disabled={isLoading}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-purple-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute bottom-2 right-2 primary cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            
            <p className="text-right text-sm mt-1">
              <Link href="/forgot-password" className="primary hover:underline">
                Forgot Password?
              </Link>
            </p>

            <button
              onClick={handleLogin}
              type="button"
              disabled={isLoading}
              className="w-full rounded-md primarybg py-2.5 text-white font-medium cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <GoogleButton />

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
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