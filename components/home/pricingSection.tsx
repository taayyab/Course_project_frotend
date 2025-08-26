"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Learners",
      price: billingCycle === "monthly" ? "9.99" : "99.99",
      period: billingCycle === "monthly" ? "/one time" : "/year",
      features: [
        "Access to 500+ courses",
        "Progress tracking & certificates",
        "1-click job applications",
        "Career guidance & mentorship",
        "Career guidance & mentorship",
        "Mobile app access",
        "Community forums",
      ],
      buttonText: "Start Learning",
      buttonStyle: "bg-[#0755E91A] text-blue-600 border border-blue-600 cursor-pointer hover:bg-blue-50",
    },
    {
      name: "Employees",
      price: "0",
      period: "/month",
      features: [
        "1 month free trial",
        "100 student slots included",
        "Course creation & management",
        "Performance analytics dashboard",
        "Employer partnership network",
        "Automated certification",
        "Priority support",
      ],
      buttonText: "Get a Free Trial",
      buttonStyle: "bg-[#0755E91A] text-blue-600 border border-blue-600 hover:bg-blue-50 cursor-pointer rounded-4xl",
    },
    {
      name: "Training Institutes",
      price: billingCycle === "monthly" ? "299.99" : "2999.99",
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
      buttonStyle: "bg-[#FFFFFF] text-[#0755E9] hover:bg-[#EFF6FF] cursor-pointer",
    },
  ]

  return (
    <section className="py-16  bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Plans & Pricing</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether your time-saving automation needs are large or small, we're here to help you scale.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === "monthly" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === "yearly" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              YEARLY
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-200 hover:scale-105 ${
                plan.isPopular ? "bg-blue-600 text-white shadow-xl" : "bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Badge for middle plan
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center px-2 text-white font-bold text-sm">
                    {plan.badge}
                  </div>
                </div>
              )} */}

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">£{plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.isPopular ? "text-blue-100" : "text-gray-600"}`}>
                    {plan.period}
                  </span>
                </div>
                <h3 className={`text-xl font-semibold ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.isPopular ? "bg-blue-500" : "bg-blue-100"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${plan.isPopular ? "text-white" : "text-blue-600"}`} />
                    </div>
                    <span className={`text-sm ${plan.isPopular ? "text-blue-50" : "text-gray-700"}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-4xl font-medium transition-all duration-200 ${
                  plan.isPopular ? plan.buttonStyle : plan.buttonStyle
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
