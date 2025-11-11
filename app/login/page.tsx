"use client";

import { Suspense } from "react";
import VerifyOtpPage from "../otp-verify/VerifyOtpPage";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-400">Loading...</p>}>
      <VerifyOtpPage />
    </Suspense>
  );
}
