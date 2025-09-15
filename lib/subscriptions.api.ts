import axios from "axios";
import { API_BASE_URL } from "./auth.api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token dynamically
function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// --- API Calls ---

// Get all subscriptions (admin only)
export async function getSubscriptions(token: string) {
  const res = await api.get("/api/v1/subscriptions", {
    headers: authHeaders(token),
  });
  return res.data;
}

// Create subscription record (status -> pending)
export async function createSubscription(planId: string, token: string) {
  const res = await api.post(
    "/api/v1/subscriptions",
    { planId },
    { headers: authHeaders(token) }
  );
  return res.data;
}

// Create payment intent (or activate immediately if free)
export async function createPaymentIntent(subscriptionId: string, token: string) {
  const res = await api.post(
    "/api/v1/payments/create-intent",
    { subscriptionId },
    { headers: authHeaders(token) }
  );
  return res.data;
}

// Confirm payment and activate subscription
export async function confirmPayment(
  paymentIntentId: string,
  subscriptionId: string,
  token: string
) {
  const res = await api.post(
    "/api/v1/subscriptions/confirm-payment",
    { paymentIntentId, subscriptionId },
    { headers: authHeaders(token) }
  );
  return res.data;
}

// Get current user's subscription
export async function getMySubscription(token: string) {
  const res = await api.get("/api/v1/subscriptions/my-subscription", {
    headers: authHeaders(token),
  });
  return res.data;
}

// Cancel current user's subscription
export async function cancelSubscription(token: string) {
  const res = await api.post(
    "/api/v1/subscriptions/cancel",
    {},
    { headers: authHeaders(token) }
  );
  return res.data;
}
