"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Authentication failed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          {decodeURIComponent(message)}
        </p>
        
        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full bg-[#AD49E1] text-white py-2 px-4 rounded-md hover:bg-[#9b34d1] transition"
          >
            Back to Login
          </Link>
          
          <Link
            href="/contact-support"
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}