"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, BookOpen, Briefcase, BarChartIcon as ChartBar, HelpCircle, Home, MessageSquareMore, Search, Settings, User, Users } from 'lucide-react'
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu"

const nav = [
  { href: "/school/dashboard", label: "Dashboard", icon: Home },
  { href: "/school/dashboard/student", label: "Student", icon: Users },
  { href: "/school/dashboard/employers", label: "Employers", icon: Briefcase },
  { href: "/school/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/school/dashboard/message", label: "Messages", icon: BookOpen },
  { href: "/school/dashboard/help-support", label: "Help & Support", icon: HelpCircle },
  { href: "/school/dashboard/profile/user", label: "Profile", icon: User },
]

function NotificationBell() {
  const items = [
    { id: 1, title: "Sarah Johnson requested Advanced Welding", time: "2m ago" },
    { id: 2, title: "New employer partnership added", time: "10m ago" },
    { id: 3, title: "3 new student signups today", time: "1h ago" },
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
          <Bell className="h-5 w-5 text-[#3f3f3f]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((n) => (
          <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1">
            <span className="text-sm text-[#1e242c]">{n.title}</span>
            <span className="text-xs text-[#9e9e9e]">{n.time}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-[#0a60ff]">View all</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout } = useAuth() // Get logout function
  return (
    <div className="min-h-screen bg-[#fcfcff]">
      <div className="mx-auto flex max-w-[1440px]">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-64 h-full flex-col border-r border-[#eef0f4] bg-white">
          <div className="px-6 py-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#0755e9] flex items-center justify-center text-white font-bold">★</div>
            <div className="text-[#1e242c] font-semibold">COURSUE</div>
          </div>
          <div className="px-6 text-xs font-semibold text-[#9e9e9e] tracking-wide">OVERVIEW</div>
          <nav className="mt-3 px-2 space-y-1">
            {nav.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm hover:bg-[#fcfcff]",
                    active ? "bg-[#f6f8ff] text-[#0755e9] font-medium" : "text-[#5f5f5f]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto">
            <div className="px-6 py-2 pt-2 text-xs font-semibold text-[#9e9e9e] tracking-wide">SETTINGS</div>
            <nav className="px-2 space-y-1">
              <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[#5f5f5f] hover:bg-[#fcfcff]">
                <Settings className="h-4 w-4" />
                Settings
              </a>
              <Button
                  variant="ghost"
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[#f13e3e] hover:bg-[#fff3f3] w-full justify-start"
                  onClick={() => logout()} // Call logout function
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="currentColor" d="M16 17v-1a4 4 0 0 0-8 0v1H5v2h14v-2h-3zm-4-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"/></svg>
                  Logout
                </Button>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-[#eef0f4]">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
              <div className="relative w-full max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-[#9e9e9e]" />
                </div>
                <Input
                  className="pl-9 rounded-xl bg-[#fcfcff] border-[#e9ebee] text-[#3f3f3f] placeholder:text-[#c4c4c4]"
                  placeholder="Search your course here...."
                  defaultValue=""
                />
              </div>
              {/* <div className="ml-4 flex items-center gap-2">
                <NotificationBell />
                <Avatar className="ml-2 h-8 w-8 ring-2 ring-[#e9ebee]">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div> */}
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}
