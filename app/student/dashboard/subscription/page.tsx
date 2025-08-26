import { Card, CardContent, CardHeader, CardTitle } from "@/components/student/dashboard/ui/card"
import { Button } from "@/components/student/dashboard/ui/button"
import { Badge } from "@/components/student/dashboard/ui/badge"
import { Check, Download } from "lucide-react"

export default function SubscriptionPage() {
  const benefits = [
    "Everything included in your current plan",
    "Unlimited course access",
    "Priority job applications",
    "Direct messaging with Employers",
    "Advanced profile visibility",
    "Progress analytics",
    "Email support",
    "Mobile app access",
  ]

  const billingHistory = [
    { date: "Jan 15, 2024", amount: "$99.99" },
    { date: "Jan 15, 2024", amount: "$99.99" },
    { date: "Jan 15, 2024", amount: "$99.99" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription & Billing</h1>
        <p className="text-gray-600">Manage your subscription and payment details</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">Pro Membership</h2>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-gray-600 mb-4">Full access to all courses and job features</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Next Billing Date</p>
                  <p className="font-medium">February 15, 2024</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                </div>
                <div>
                  <p className="text-gray-500">Auto-Renewal</p>
                  <p className="font-medium">Enabled</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">£59.99</div>
              <p className="text-gray-500">One time payment</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">Update Payment Method</Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage</CardTitle>
          <p className="text-gray-600">Your activity this billing period</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">12</span>
                  <span className="text-xs text-gray-500">Unlimited</span>
                </div>
              </div>
              <p className="font-medium">Courses Accessed</p>
            </div>

            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">24</span>
                  <span className="text-xs text-gray-500">Unlimited</span>
                </div>
              </div>
              <p className="font-medium">Job Applications</p>
            </div>

            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">154</span>
                  <span className="text-xs text-gray-500">views</span>
                </div>
              </div>
              <p className="font-medium">Profile Views</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Membership Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Pro Membership Benefits</CardTitle>
          <p className="text-gray-600">Everything included in your current plan</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Billing History</CardTitle>
              <p className="text-gray-600">Your recent payments and invoices</p>
            </div>
            <Button variant="outline" className="text-blue-600 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  </div>
                  <div>
                    <p className="font-medium">Pro Membership</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{item.amount}</span>
                  <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
