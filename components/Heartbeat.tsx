"use client";

import { useEffect } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import axiosInstance from "@/lib/axiosInstance";

export default function Heartbeat() {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startSession = async () => {
      try {
        await axiosInstance.post("/session/start");
      } catch (err) {
        console.error("startSession failed:", err);
      }
    };

    const sendHeartbeat = async () => {
      try {
        await axiosInstance.post("/session/heartbeat");
      } catch (err) {
        console.error("Heartbeat failed:", err);
      }
    };

    const passSession = async () => {
      await startSession();
      await sendHeartbeat();
      interval = setInterval(sendHeartbeat, 15000);
    };

    passSession()

    const handleBeforeUnload = () => {

      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_API ?? "http://localhost:5000"}/session/heartbeat`,
        new Blob([], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}
