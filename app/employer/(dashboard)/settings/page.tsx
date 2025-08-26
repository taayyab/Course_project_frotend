"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/employer/ui/card"
import { Button } from "@/components/employer/ui/button"
import { Input } from "@/components/employer/ui/input"
import { Label } from "@/components/employer/ui/label"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const pathname = usePathname()
  return (
    <div>
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-[#696984] mt-1">Manage your account and platform preferences</p>

      <div className="mt-4 flex gap-2">
        <Tab href="/employer/settings" active={pathname === "/settings"}>Company Profile</Tab>
        <Tab href="/employer/settings/notifications" active={pathname === "/settings/notifications"}>Notifications</Tab>
      </div>

      <Card className="mt-5 bg-white border-[#e6e7ef]">
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Company Name">
              <Input placeholder="TechCorp Inc." />
            </Field>
            <Field label="Company Size">
              <Input placeholder="100-500 employees" />
            </Field>
            <Field label="Industry">
              <Input placeholder="Technology" />
            </Field>
            <Field label="Website">
              <Input placeholder="https://techcorp.com" />
            </Field>
          </div>
          <Button className="w-fit bg-[#0f5ff2] hover:bg-[#0d4fe0]">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn("px-3 py-2 rounded-md text-sm", active ? "bg-[#0f5ff2] text-white" : "bg-[#e9eefb] text-[#0f5ff2]")}>
      {children}
    </Link>
  )
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
