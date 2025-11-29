"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function useRedirectAdmin() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("adminAccessToken");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, []);
}
