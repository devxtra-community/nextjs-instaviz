import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#f8f4ff] to-white px-6 text-center">
      <CheckCircle className="primary w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold primary mb-2">Payment Successful!</h1>
      <p className="text-gray-700 max-w-md mb-6">
        Thank you for your purchase. Your payment has been successfully processed.
        You’ll receive a confirmation email shortly.
      </p>
      <Link
        href="/home"
        className="px-6 py-2 primarybg text-white font-semibold rounded-lg hover:brightness-110 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
}
