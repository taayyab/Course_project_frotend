"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { useAuth } from "@/context/AuthContext"
import { Sheet, SheetContent, SheetTrigger } from "@/components/admin/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Users,
  BookOpen,
  Briefcase,
  DollarSign,
  Shield,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  BarChart3,
  FileText,
} from "lucide-react"

const navigationItems = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
      { name: "User Management", href: "/admin/dashboard/user-management", icon: Users },
      { name: "Course Oversight", href: "/admin/dashboard/course-oversight", icon: BookOpen },
      { name: "Hiring Supervision", href: "/admin/dashboard/hiring-supervision", icon: Briefcase },
      { name: "Financial Control", href: "/admin/dashboard/financial-control", icon: DollarSign },
      { name: "Security & Compliance", href: "/admin/dashboard/security", icon: Shield },
      { name: "Communication", href: "/admin/dashboard/communication", icon: MessageSquare },
      { name: "Queries & Support", href: "/admin/dashboard/support", icon: HelpCircle },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
      { name: "Logout", href: "/admin/login", icon: LogOut, className: "text-[#f13e3e]" },
    ],
  },
]

function SidebarContent() {
  const pathname = usePathname()
  const { logout } = useAuth() // Get logout function

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-[#0755e9] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-[#1e242c] text-lg">COURSUE</span>
        </div>

        <div className="space-y-8">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-[#696984] text-xs font-medium uppercase tracking-wider mb-4">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  if (item.name === "Logout") {
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start cursor-pointer",
                          item.className,
                        )}
                        onClick={() => logout()} // Call logout function
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Button>
                    )
                  }

                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start cursor-pointer", 
                          isActive
                            ? "text-[#0755e9] bg-[#f2efff]"
                            : "text-[#696984] hover:text-[#0755e9] hover:bg-[#f2efff]",
                          item.className,
                        )}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside className="w-64 bg-[#ffffff] border-r border-[#f5f5f5] min-h-screen">
      <SidebarContent />
    </aside>
  )
}
