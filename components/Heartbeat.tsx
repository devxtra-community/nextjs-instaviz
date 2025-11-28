"use client";

import { useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function Heartbeat() {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const init = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("No access token, stopping heartbeat.");
        return;
      }

      try {
        const res = await axiosInstance.post("/admin/start", {
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        });
        console.log("Session started:", res.data);
      } catch (err) {
        console.error("Session start failed:", err);
      }

      interval = setInterval(() => {
        axiosInstance.post("/admin/heartbeat").catch((err) => {
          console.error("Heartbeat error:", err);
        });
      }, 15000);
    };

    init();

    const endSession = () => {
      axiosInstance.post("/admin/end").catch(() => {});
    };

    window.addEventListener("beforeunload", endSession);

    return () => {
      if (interval) clearInterval(interval);
      endSession();
      window.removeEventListener("beforeunload", endSession);
    };
  }, []);

  return null;
}
