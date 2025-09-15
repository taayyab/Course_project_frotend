"use client";

import { usePathname } from "next/navigation";

export default function SuccessPage() {
  const pathname = usePathname();
  const role = pathname.includes("student") ? "student" : "school";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600">Your {role} plan is now active.</p>
        <p className="mt-2 font-medium">Redirecting to {role} dashboard...</p>
      </div>
    </div>
  );
}
