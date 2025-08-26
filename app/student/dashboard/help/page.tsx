import { Card, CardContent } from "@/components/student/dashboard/ui/card"
import { Button } from "@/components/student/dashboard/ui/button"
import { Input } from "@/components/student/dashboard/ui/input"
import { Textarea } from "@/components/student/dashboard/ui/textarea"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function HelpSupportPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">Facilitate industry partnerships and manage employer relationships</p>
      </div>

      {/* Support Options */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Support</h2>
          <p className="text-gray-600">
            If you have any questions or face issues with enrollment, classes, or certificates, we're here to help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">Email Support</h3>
                <p className="text-sm text-gray-600">support@trainingschool.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-orange-600">Call Support</h3>
                <p className="text-sm text-gray-600">support@trainingschool.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-600">Live Chat Support</h3>
                <p className="text-sm text-gray-600">support@trainingschool.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support Request Form */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">Need Help? Submit a Support Request</h2>
          <p className="text-gray-600">Fill out the form and we will get back to you with 24 hours</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <Input id="name" placeholder="Enter your Full Name" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email address" className="w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-900">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe your question and query"
                  className="w-full min-h-[120px] resize-none"
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
