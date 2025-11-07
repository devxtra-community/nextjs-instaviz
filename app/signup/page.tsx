"use client";

import { useState } from "react";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { Toaster,toast } from "sonner";


export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|string[]>("");
  const [success, setSuccess] = useState<string|string[]>("");


  function validateForm() {
  if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
    setError("All fields are required.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
    return false;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return false;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return false;
  }

  setError("");
  return true;
}


async function handleSubmit() {


  if (!validateForm()) return;

 try {
  setIsLoading(true);
  const response = await axiosInstance.post("/user/register", formData);
  setSuccess(response.data.message);
  console.log(response.data);
  if(response.data.otp===true){
    toast("OTP has been sent your Email")
    setTimeout(()=>{
      router.push(`/otp-verify?email=${formData.email}`)
    },2000)
  }
} catch (err:any) {
  console.error("Registration error:", err.response?.data || err.message);

  const data = err.response?.data;

  if (data?.errors && Array.isArray(data.errors)) {
    setError(data.errors); 
  } else {
    setError([data?.message || "Something went wrong. Please try again."]);
  }
} finally {
  setIsLoading(false);
}
}

 

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white text-gray-900">
      {/* ---------- LEFT PANEL ---------- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#AD49E1] via-purple-500 to-[#AD49E1] text-white">
        {/* Glow Blurs */}
        <div className="absolute top-16 left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-14">
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
            InstaviZ
          </h1>
          <h2 className="text-3xl font-semibold mb-4 leading-tight">
            Transform Your Data Into Powerful Insights
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
            Turn your raw data into beautiful visual stories powered by AI
            analytics.
          </p>

          {/* Glass Card */}
          <div className="relative bg-linear-to-r from-[#9B5DE0] to-[#b188fc] backdrop-blur-md border border-gray-400 rounded-2xl p-6 w-[430px]  transition">
            <div className="p-4 flex justify-center">
              <img
                src="/violet.gif"
                alt="AI Data Visualization"
                className="w-full h-auto opacity-90 rounded-xl shadow-lg"
              />
            </div>
          </div>

          <p className="mt-10 text-white/70 text-sm">
            Join <span className="text-white font-semibold">5,000+</span> teams
            turning data into insights 🚀
          </p>
        </div>
      </div>

      {/* ---------- RIGHT PANEL ---------- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-center px-6 sm:px-12 py-6 bg-white overflow-y-auto">
        <div className="max-w-md w-full mt-8 sm:mt-6 mb-6">
           <Toaster richColors position="top-center" />
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Create your account</h2>
            <p className="text-[#9B5DE0] text-base">
              Let's get started with your 30-day free trial.
            </p>
          </div>

          {/* Form */}
          <div  className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold">
                NAME
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                  className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e)=>{setFormData({...formData,confirmPassword:e.target.value})}}
                  className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I agree to the{" "}
                <a href="#" className="text-[#AD49E1] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#AD49E1] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
            onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#AD49E1] text-white font-semibold rounded-md hover:bg-purple-600 transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            {error && (
  <p className="text-red-500 text-sm font-medium text-center mt-2">{error}</p>
)}
{success && (
  <p className="text-green-600 text-sm font-medium text-center mt-2">{success}</p>
)}
          </div>

          {/* Sign In */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Sign Up */}
          <div className="w-full mb-4">
            <button
              type="button"
              className="h-11 border border-gray-300 rounded-md w-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img src="./google.png" className="w-5 h-5 mr-1" alt="" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
