import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-50 to-white px-6 text-center">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
      <p className="text-gray-700 max-w-md mb-6">
        It looks like you cancelled the payment. Don’t worry, no charges were made.
        You can try again anytime.
      </p>
      <Link
        href="/ourplans"
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
      >
        Back to Plans
      </Link>
    </div>
  );
}
