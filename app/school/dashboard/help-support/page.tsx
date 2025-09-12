"use client"
import { Card, CardContent } from "@/components/student/dashboard/ui/card"
import { Button } from "@/components/student/dashboard/ui/button"
import { Input } from "@/components/student/dashboard/ui/input"
import { Textarea } from "@/components/student/dashboard/ui/textarea"
import { Mail, Phone, MessageCircle } from "lucide-react"
import { useState } from "react";
import { sendContactEmail } from "@/lib/school.api";
import { AppShell } from "@/components/institute/app-shell"


export default function HelpSupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await sendContactEmail({
        email: form.email,
        name: form.name,
        subject: form.subject || "Support Request",
        text: form.message,
        html: `<p>${form.message}</p>`,
      });
      setSuccess("Your message has been sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <Input id="name" placeholder="Enter your Full Name" className="w-full" value={form.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email address" className="w-full" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-900">
                  Subject
                </label>
                <Input id="subject" placeholder="Subject" className="w-full" value={form.subject} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-900">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe your question and query"
                  className="w-full min-h-[120px] resize-none"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              {success && <div className="text-green-600 text-sm">{success}</div>}
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </AppShell>
  )
}
