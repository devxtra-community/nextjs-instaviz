"use client";

import { useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function Heartbeat() {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const init = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("🔴 No access token, stopping heartbeat.");
        return;
      }

      try {
        const res = await axiosInstance.post("/admin/start", {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        });
        console.log("🟢 Session started:", res.data);
      } catch (err) {
        console.error("Session start failed:", err);
      }

      // ✅ HEARTBEAT LOOP (only runs when token exists)
      interval = setInterval(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.log("⛔ Token removed — stopping heartbeat.");
          if (interval) clearInterval(interval);
          return;
        }

        axiosInstance.post("/admin/heartbeat").catch((err) => {
          console.error("Heartbeat error:", err);
        });
      }, 15000);
    };

    init();

    // END SESSION (called on logout, unmount, before unload)
    const endSession = () => {
      if (interval) clearInterval(interval);
      interval = null;

      const token = localStorage.getItem("accessToken");
      if (!token) return; // Don't call /end after logout

      axiosInstance.post("/admin/end").catch(() => {});
    };

    // 🔥 Listen for custom logout event
    const onLogout = () => {
      console.log("⚠ Logout detected, stopping heartbeat");
      endSession();
    };

    window.addEventListener("logout", onLogout);
    window.addEventListener("beforeunload", endSession);

    return () => {
      console.log("Component unmounted, cleaning heartbeat...");
      endSession();
      window.removeEventListener("logout", onLogout);
      window.removeEventListener("beforeunload", endSession);
    };
  }, []);

  return null;
}
