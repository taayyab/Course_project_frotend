import { Button } from "@/components/admin/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Checkbox } from "@/components/admin/ui/checkbox"
import { Calendar, CreditCard } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Confirm Your Purchase</h1>
          <p className="text-gray-600">Review your order before completing payment</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Pro Plan</h3>
                <p className="text-sm text-blue-600">Renews monthly</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">$29.99</div>
                <div className="text-sm text-gray-600">/month</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Start Date: August 13, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Card ending in 2222</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-900">Subtotal</span>
                <span className="font-medium">$29.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-600">$2.40</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">$32.39</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" className="border-blue-600 data-[state=checked]:bg-blue-600" />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Terms of Service and Refund Policy
          </label>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium">
          Continue to Confirmation
        </Button>
      </div>
    </div>
  )
}
