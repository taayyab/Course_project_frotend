"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Briefcase, Home, Layers, LogOut, Mail, Search, Settings } from 'lucide-react'
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/employer/ui/avatar"
import { Button } from "@/components/employer/ui/button"
import { Input } from "@/components/employer/ui/input"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "260px"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8ff]">
      {/* Fixed Sidebar */}
      <AppSidebar />

      {/* Main content area shifted by sidebar width */}
      <main className="ml-[260px]">
        <Topbar />
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 pb-10">
          {children}
        </div>
      </main>
    </div>
  )
}

function AppSidebar() {
  const pathname = usePathname()
  const link = (href: string) => pathname === href
  const { logout } = useAuth()
  return (
    <aside
      className="fixed left-0 top-0 z-30 h-svh w-[260px] border-r border-[#e6e7ef] bg-white"
      aria-label="Primary"
    >
      <div className="p-5 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-[#0f5ff2] flex items-center justify-center text-white font-bold">★</div>
        <div className="font-semibold">COURSUE</div>
      </div>

      <nav className="px-3">
        <SectionLabel>OVERVIEW</SectionLabel>
        <SidebarLink href="/employer/dashboard" active={link("/dashboard")} icon={<Home className="h-4 w-4 cursor-pointer " />} label="Dashboard" />
        <SidebarLink href="/employer/talent-discovery" active={link("/talent-discovery")} icon={<Layers className="h-4 w-4 cursor-pointer" />} label="Talent Discovery" />
        <SidebarLink href="/employer/job-posts" active={link("/job-posts")} icon={<Briefcase className="h-4 w-4 cursor-pointer" />} label="Job Posts" />
        <SidebarLink href="/employer/message" active={link("/message")} icon={<Briefcase className="h-4 w-4 cursor-pointer" />} label="message" />

        <SidebarLink href="/employer/notifications" active={pathname?.startsWith("/notifications") || false} icon={<Bell className="h-4 w-4 cursor-pointer" />} label="Notifications" />
      </nav>

      <div className="px-3 mt-8">
        <SectionLabel>SETTINGS</SectionLabel>
        <SidebarLink href="/employer/settings" active={pathname?.startsWith("/Profile") || false} icon={<Settings className="h-4 w-4 cursor-pointer" />} label="Settings" />
        <Button
          variant="ghost"
          className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-[#f13e3e] hover:bg-[#e9eefb] w-full justify-start"
          onClick={() => logout()} // Call logout function
        >
          <LogOut className="h-4 w-4 text-[#f13e3e] cursor-pointer" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 py-2 text-[11px] uppercase tracking-wide text-[#9e9e9e]">
      {children}
    </div>
  )
}

function SidebarLink({
  href,
  icon,
  label,
  active = false,
  danger = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  danger?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-2 py-2 text-sm",
        active
          ? "bg-[#0f5ff2]/10 text-[#0f5ff2] font-medium"
          : danger
            ? "text-[#f13e3e]"
            : "text-[#333] hover:bg-[#e9eefb]",
      )}
      aria-current={active ? "page" : undefined}
    >
      <span className="text-[#5f5f5f]">{icon}</span>
      {label}
    </Link>
  )
}

function Topbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-[#e6e7ef]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-3 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" aria-hidden />
          <Input
            className="pl-9 h-10 rounded-lg border-[#e6e7ef] bg-[#fcfcff] placeholder:text-[#9e9e9e]"
            placeholder="Search your course here..."
            aria-label="Search"
          />
        </div>
        {/* <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-[#3f3f3f]" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="h-9 w-9 ring-2 ring-[#e6e7ef]">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  )
}
