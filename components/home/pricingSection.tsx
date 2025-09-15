"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const router = useRouter();

  const plans = [
    {
      id: "student-plan-id",
      name: "Learners",
      price: billingCycle === "monthly" ? 9.99 : 99.99,
      period: billingCycle === "monthly" ? "/one time" : "/year",
      features: [
        "Access to 500+ courses",
        "Progress tracking & certificates",
        "1-click job applications",
        "Career guidance & mentorship",
        "Mobile app access",
        "Community forums",
      ],
      buttonText: "Start Learning",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      role: "student",
    },
    {
      id: "school-plan-id",
      name: "Training Institutes",
      price: billingCycle === "monthly" ? 299.99 : 2999.99,
      period: billingCycle === "monthly" ? "/month" : "/year",
      isPopular: true,
      features: [
        "Unlimited job posts",
        "Access to verified candidates",
        "Advanced skill filtering",
        "Direct candidate messaging",
        "Hiring analytics",
        "Premium Employer badge",
        "Automated certification",
      ],
      buttonText: "Join as Institute",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      role: "school",
    },
  ];

  function handleSubscribe(plan: any) {
    if (plan.role === "student") {
      // route to student signup
      router.push("/student/signup");
    } else if (plan.role === "school") {
      router.push("/school/signup");
    }
  }

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Plans & Pricing</h2>
          <p className="text-gray-600 mb-8">Choose the plan that fits your needs.</p>

          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                billingCycle === "monthly" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                billingCycle === "yearly" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              YEARLY
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="p-8 border rounded-2xl bg-white shadow-md">
              <div className="text-center mb-8">
                <span className="text-4xl font-bold">£{plan.price}</span>
                <span className="text-sm ml-1">{plan.period}</span>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 px-6 rounded-4xl font-medium ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
