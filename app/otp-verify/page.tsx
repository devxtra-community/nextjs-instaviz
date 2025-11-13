"use client";

<<<<<<< HEAD
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Toaster,toast } from "sonner"; 
export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email")
  const [otp, setOtp] = useState("");
  async function verifyOtp() {
    console.log("reached verifyOtp");
  console.log(otp);

   if (!email) {
      toast.error("Email not found. Please register again.");
      router.push("/sign-up");
      return;
    }
  if (!otp) {
    toast.warning("Please enter the OTP");
    return;
  }


  try {
    const verifyData = await axiosInstance.post(`/user/verifyOtp?email=${email}`, { otp });

    toast.success( "Account created successfully!");
    setTimeout(() => router.push("/login"), 1500);
  } 
  catch (error: any) {
    console.log("Error verifying OTP:", error);

  
    const errorMessage =
      error.response?.data?.message || "Something went wrong. Try again.";

    toast.error(errorMessage);
  }
    
    
  }
=======
import { Suspense } from "react";
import VerifyOtpPage from "./VerifyOtpPage";
>>>>>>> dev

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-400">Loading...</p>}>
      <VerifyOtpPage />
    </Suspense>
  );
}
