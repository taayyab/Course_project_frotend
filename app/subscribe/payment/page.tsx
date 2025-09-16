"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createSubscription, createPaymentIntent, confirmPayment } from "@/lib/subscriptions.api";
import { useAuth } from "@/context/AuthContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({
    role,
    planPrice,
    subscriptionId,
    clientSecret,
  }: {
    role: string;
    planPrice: number;
    subscriptionId: string;
    clientSecret: string;
  }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements || !clientSecret) {
      setError("Stripe not ready");
      return;
    }

    setLoading(true);

    // 🔹 Confirm payment on Stripe side using clientSecret from props
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      setSuccess(true);
      try {
        // 🔹 Confirm with backend
        await confirmPayment(result.paymentIntent.id, subscriptionId, token!);
        // Show success message for 2 seconds before redirecting
        setTimeout(() => {
          router.push(`/${role}/dashboard`);
        }, 2000);
      } catch (err: any) {
        setError(err.message || "Subscription activation failed");
      }
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Payment details above the card */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Plan:</span>
          <span className="font-medium"> {role ? role.charAt(0).toUpperCase() + role.slice(1) : "N/A"}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Amount:</span>
          <span className="font-medium">£{planPrice}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Status:</span>
          <span className="font-medium">{success ? "Paid" : "Pending"}</span>
        </div>
      </div>
      <div className="p-3 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm font-semibold text-center mb-2">Payment successful! Redirecting to dashboard...</div>
      )}
      <button
        type="submit"
        disabled={loading || success}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Processing..." : `Pay £${planPrice}`}
      </button>
    </form>
  );
}

export default function PaymentPage({
  role: initialRole,
  planId: initialPlanId,
  planPrice: initialPlanPrice,
}: {
  role?: string;
  planId?: string;
  planPrice?: number;
}) {
  const router = useRouter();
  const { token } = useAuth();

  // Use state for role, planId, planPrice
  const [role, setRole] = useState<string | undefined>(initialRole);
  const [planId, setPlanId] = useState<string | undefined>(initialPlanId);
  const [planPrice, setPlanPrice] = useState<number | undefined>(initialPlanPrice);

  useEffect(() => {
    // Save to localStorage if present
    if (initialRole) localStorage.setItem("userRole", initialRole);
    if (initialPlanId) localStorage.setItem("planId", initialPlanId);
    if (initialPlanPrice !== undefined) localStorage.setItem("planPrice", initialPlanPrice.toString());

    // Restore from localStorage if missing
    if (!role) {
      const storedRole = localStorage.getItem("userRole");
      if (storedRole) setRole(storedRole);
    }
    if (!planId) {
      const storedPlanId = localStorage.getItem("planId");
      if (storedPlanId) setPlanId(storedPlanId);
    }
    if (!planPrice) {
      const storedPlanPrice = localStorage.getItem("planPrice");
      if (storedPlanPrice) setPlanPrice(Number(storedPlanPrice));
    }
  }, [initialRole, initialPlanId, initialPlanPrice, role, planId, planPrice]);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        if (!token) {
          router.push(`/${role}/signup`);
          return;
        }

        // Try to get subscriptionId from localStorage first
        let subId = localStorage.getItem("subscriptionId");

        if (!subId) {
          // If not found, create subscription and save to localStorage
          const subRes = await createSubscription(planId, token);
          const subscriptionObj = subRes?.payload?.subscription;
          console.log("Subscription object:", subscriptionObj);

          subId = subscriptionObj?._id || subscriptionObj?.id;
          if (!subId) {
            console.error("No subscriptionId found in:", subscriptionObj);
            throw new Error("No subscriptionId returned");
          }
          localStorage.setItem("subscriptionId", subId);
        }

        setSubscriptionId(subId);

        // Always create payment intent with the subscriptionId
        const intentRes = await createPaymentIntent(subId, token);
        const secret =
          intentRes?.payload?.clientSecret || intentRes?.clientSecret;
        if (!secret) throw new Error("No clientSecret returned");
        setClientSecret(secret);
      } catch (err: any) {
        console.error("Payment init error:", err);
        setError(err.message || "Failed to initialize payment");
      }
    }

    init();
  }, [role, planId, token, router]);

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  if (!clientSecret || !subscriptionId) {
    return <div className="text-center py-8">Preparing payment...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>
        <CheckoutForm role={role} planPrice={planPrice} subscriptionId={subscriptionId} clientSecret={clientSecret} />
      </div>
    </Elements>
  );
}
