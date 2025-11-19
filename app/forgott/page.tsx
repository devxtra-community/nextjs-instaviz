"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    // CALL API → /forgot-password
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleOtpSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    // CALL API → verify OTP
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handlePasswordSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    // CALL API → reset-password
    setTimeout(() => {
      setLoading(false);
      alert("Password changed successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50 p-4">
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
                <h1 className="text-2xl font-semibold text-purple-700 text-center">Forgot Password</h1>
                <p className="text-sm text-gray-500 text-center mb-4">Enter your email</p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-700">Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-2xl font-semibold text-purple-700 text-center">Verify OTP</h1>
                <p className="text-sm text-gray-500 text-center mb-4">OTP sent to {email}</p>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-700">OTP</Label>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="text-2xl font-semibold text-purple-700 text-center">Reset Password</h1>
                <p className="text-sm text-gray-500 text-center mb-4">Create a new password</p>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-700">New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-700">Confirm Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
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
