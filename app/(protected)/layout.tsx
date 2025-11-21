"use client";

import Heartbeat from "@/components/Heartbeat";

export default function ProtectedLayout({ children }: any) {
  return (
    <>
      {/* <Heartbeat /> */}
      {children}
    </>
  );
}
