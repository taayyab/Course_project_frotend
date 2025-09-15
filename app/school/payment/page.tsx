import PaymentPage from "../../subscribe/payment/page";

export default function SchoolPaymentPage() {
  const schoolPlanId = "68ad607b9c3fc1d245db137f";
  const schoolPrice = 299.99;
  return <PaymentPage role="school" planId={schoolPlanId} planPrice={schoolPrice} />;
}
