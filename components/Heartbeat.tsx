"use client";

import { useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function Heartbeat() {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const init = async () => {
      // const token = localStorage.getItem("token");
      // console.log(token)
      // if (!token) {
      //   console.log("No access token found → skipping session tracking.");
      //   return;
      // }

      try {
        const response = await axiosInstance.post("/session/start");

        console.log("Session start response:", response?.data);
      } catch (err) {
        console.error("Session start failed:", err);
      }

      // heartbeat every 15 seconds
      // interval = setInterval(() => {
      //   axiosInstance
      //     .post("/session/heartbeat")
      //     .catch((err) => console.error("Heartbeat error:", err));
      // }, 15000);
    };

    init();
  }, []);

  return <></>;
}
