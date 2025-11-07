"use client";

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
    setTimeout(() => router.push("/home"), 1500);
  } 
  catch (error: any) {
    console.log("Error verifying OTP:", error);

  
    const errorMessage =
      error.response?.data?.message || "Something went wrong. Try again.";

    toast.error(errorMessage);
  }
    
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-purple-200 text-white px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md text-center border border-purple-400/30">
        <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>
        <p className="text-purple-200 mb-8 text-sm">Enter the 6-digit code sent to your email</p>

        <div className="flex justify-center mb-8">
          <Toaster richColors position="top-center" />
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
        onClick={verifyOtp}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
        >
          Verify
        </Button>
      </div>

      <p className="text-purple-200 mt-6 text-xs">
        Didn’t receive a code? <span className="underline cursor-pointer text-white hover:text-purple-200">Resend</span>
      </p>
    </div>
  );
}
