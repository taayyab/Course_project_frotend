"use client"

import { AppShell } from "@/components/institute/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/institute/ui/card"
import { Button } from "@/components/institute/ui/button"
import { Input } from "@/components/institute/ui/input"
import { Textarea } from "@/components/institute/ui/textarea"
import { Mail, Phone, MessageSquare } from 'lucide-react'

export default function HelpSupportPage() {
  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Help & Support</h1>
        <p className="mt-1 text-[#696984]">Facilitate industry partnerships and manage employer relationships</p>

        <Card className="mt-5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Support</CardTitle>
            <CardDescription>If you have any questions or face issues with enrollment, classes, or certificates, we’re here to help</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#e6e8ee] p-4">
              <div className="flex items-center gap-2 text-[#0a60ff]"><Mail className="h-4 w-4" /> Email Support</div>
              <div className="mt-2 text-sm text-[#696984]">support@trainingschool.com</div>
            </div>
            <div className="rounded-xl border border-[#e6e8ee] p-4">
              <div className="flex items-center gap-2 text-[#ff9800]"><Phone className="h-4 w-4" /> Call Support</div>
              <div className="mt-2 text-sm text-[#696984]">support@trainingschool.com</div>
            </div>
            <div className="rounded-xl border border-[#e6e8ee] p-4">
              <div className="flex items-center gap-2 text-[#6c8cff]"><MessageSquare className="h-4 w-4" /> Live Chat Support</div>
              <div className="mt-2 text-sm text-[#696984]">support@trainingschool.com</div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Need Help? Submit a Support Request</CardTitle>
            <CardDescription>Fill out the form and we will get back to you within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input placeholder="Enter your Full Name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input placeholder="Enter your email address" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">Message</label>
              <Textarea rows={6} placeholder="Describe your question and query" />
            </div>
            <div className="mt-4">
              <Button className="rounded-full px-8">Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
