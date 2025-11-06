import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-white px-6 text-center">
      <CheckCircle className="text-violet-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-violet-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-700 max-w-md mb-6">
         Thank you for your purchase. Your payment has been successfully processed.
        You’ll receive a confirmation email shortly.
      </p>
      <Link         
        href="/home"
        className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition"
      >
        Go back to Home
      </Link>
    </div>                      
  );
}
