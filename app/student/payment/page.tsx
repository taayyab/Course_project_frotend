import { Button } from "@/components/admin/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Shield } from "lucide-react"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Enter Payment Details</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Plan Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Pro Plan</h3>
                <p className="text-sm text-gray-600">Monthly Billing</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">$29.99</div>
                <div className="text-sm text-gray-600">/month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-3">
              <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">AMEX</span>
              </div>
              <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">DISC</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-base" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" className="text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" className="text-base" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address (Optional)</Label>
              <Input id="billingAddress" placeholder="123 Main St, City, State, ZIP" className="text-base" />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium">
          Continue to Confirmation
        </Button>
      </div>
    </div>
  )
}
