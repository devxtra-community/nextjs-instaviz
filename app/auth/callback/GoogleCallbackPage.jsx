"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const sessionId = searchParams.get("sessionId");
    if (sessionId) {
      localStorage.setItem("sessionId", sessionId);
    }

    if (token) {
      localStorage.setItem("accessToken", token);

      // this prevent the user from go back and login again (the main issue) 
      const cleanUrl = window.location.origin + "/auth/callback";
      window.history.replaceState({}, "", cleanUrl)

      router.push("/home");
    } else {
      router.push("/signup");
    }
  }, [router, searchParams]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">You are now login into InstaviZ...</p>
    </div>
  );
}
