"use client";
import { useEffect } from "react";

export default function Heartbeat() {
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    let isActive = true; // Track if tab is active

    const sendHeartbeat = () => {
      if (!isActive) return; // ❗ Don't send heartbeat when tab not active

      fetch("http://localhost:5000/session/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionId })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Active for:", data.totalActiveSeconds, "seconds");
        });
    };

    // ▶ Start immediately
    sendHeartbeat();

    // ▶ Send every 15 seconds ONLY when active
    const interval = setInterval(sendHeartbeat, 15000);

    // 📌 TAB VISIBILITY (user switches tab)
    const handleVisibilityChange = () => {
      isActive = !document.hidden;
    };

    // 📌 WINDOW FOCUS / BLUR
    const handleFocus = () => (isActive = true);
    const handleBlur = () => (isActive = false);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return null;
}
