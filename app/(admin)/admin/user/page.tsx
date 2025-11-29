"use client";
import { useEffect } from "react";
import Userstatscard from "@/components/userCard&Chart";

export default function User() {
   useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent = "  User Management";
  }, []);
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">
        User Management
      </h1>

      <div className="max-w-9xl mx-auto">
        <Userstatscard />
      </div>
    </>
  );
}
