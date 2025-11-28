"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

export default function ForgotPasswordFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/forgotPassword", { email });

      if (res.data.success) {
        toast.success(res.data.message || "OTP sent successfully");
        setStep(2);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/verifyForgotOtp", {
        email,
        otp,
      });

      if (res.data.success) {
        toast.success(res.data.message || "OTP verified");

        setStep(3);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/resetPassword", {
        email,
        newPassword,
        confirmPassword,
      });

      toast.success(res.data.message || "Password changed successfully!");

      if (res.data.success) {
        router.push("/login");
      }
    } catch (err: any) {
      console.log("catch in resetforgottpass worked");

      toast.error(`${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-purple-50 p-4 bg-dot-fade">
      <Toaster richColors position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border border-purple-100 rounded-2xl bg-white">
          <CardContent className="p-6 space-y-6">
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-semibold primary text-center">
                  Forgot Password
                </h1>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Enter your email
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="primary">Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <Button
                    className="w-full primarybg hoverBg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-2xl font-semibold primary text-center">
                  Verify OTP
                </h1>
                <p className="text-sm text-gray-500 text-center mb-4">
                  OTP sent to {email}
                </p>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="primary">OTP</Label>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                    />
                  </div>
                  <Button
                    className="w-full primarybg hoverBg"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="text-2xl font-semibold primary text-center">
                  Reset Password
                </h1>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Create a new password
                </p>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="primary">New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="primary">Confirm Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    className="w-full primarybg hoverBg"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Reset Password"}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
