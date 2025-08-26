"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/employer/ui/card"
import { Button } from "@/components/employer/ui/button"
import { Switch } from "@/components/employer/ui/switch"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function SettingsNotificationsPage() {
  const pathname = usePathname()
  const [prefs, setPrefs] = useState({
    email: true,
    application: true,
    interview: true,
    weekly: false,
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-[#696984] mt-1">Manage your account and platform preferences</p>

      <div className="mt-4 flex gap-2">
        <Tab href="/employer/settings" active={pathname === "/settings"}>Company Profile</Tab>
        <Tab href="/employer/settings/notifications" active={pathname === "/settings/notifications"}>Notifications</Tab>
      </div>

      <Card className="mt-5 bg-white border-[#e6e7ef]">
        <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <PrefRow label="Email Notifications" desc="Receive email updates about platform activity" checked={prefs.email} onChange={v => setPrefs(p => ({ ...p, email: v }))} />
          <PrefRow label="Application Alerts" desc="Get notified when new applications are received" checked={prefs.application} onChange={v => setPrefs(p => ({ ...p, application: v }))} />
          <PrefRow label="Interview Reminders" desc="Receive reminders about upcoming interviews" checked={prefs.interview} onChange={v => setPrefs(p => ({ ...p, interview: v }))} />
          <PrefRow label="Weekly Reports" desc="Get weekly summary of hiring activity" checked={prefs.weekly} onChange={v => setPrefs(p => ({ ...p, weekly: v }))} />
          <Button className="mt-2 w-fit bg-[#0f5ff2] hover:bg-[#0d4fe0]">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function PrefRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#e6e7ef] p-4">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-[#5f5f5f]">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
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
