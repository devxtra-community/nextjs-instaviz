"use client";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-24">
        {/* Logo / Header */}
        <div className="lg:hidden mb-10 flex items-center">
          <h1 className="text-4xl font-semibold text-[#AD49E1]">Instaviz</h1>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-4xl font-semibold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-base text-[#AD49E1]">
            Please sign in to continue your analysis.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-[#AD49E1]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-[#AD49E1]"
              />
             
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#AD49E1] py-2.5 text-white font-medium hover:bg-purple-600 transition"
            >
              Sign in
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-[#AD49E1] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section (hidden on mobile) */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#AD49E1]">
        <img
          src="/analysis-illustration.png"
          alt="Data Visualization"
          className="max-w-md w-full object-contain"
        />
      </div>
    </div>
  );
}
