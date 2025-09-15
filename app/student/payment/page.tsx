import PaymentPage from "../../subscribe/payment/page";

export default function StudentPaymentPage() {
  // planId must match the one used in backend SubscriptionPlan
  const studentPlanId = "68ad60119c3fc1d245db136e"; // <-- replace with real planId from DB
  const studentPrice = 9.99; // optional: informational for UI
  return <PaymentPage role="student" planId={studentPlanId} planPrice={studentPrice} />;
}
