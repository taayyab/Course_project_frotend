"use client"

import { BookOpen, Plus, User, Settings, LogOut, Bell, MessageSquare, Briefcase, Menu, X } from "lucide-react"
import { Button } from "@/components/admin/ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { logout } from "@/lib/auth.api"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth(); // Get logout function here

  const isActive = (path: string) => pathname === path

  const navigationItems = [
    {
      section: "OVERVIEW",
      items: [
        { icon: BookOpen, label: "Dashboard", href: "/student/dashboard" },
        { icon: BookOpen, label: "Schools", href: "/student/dashboard/schools" },
        { icon: Briefcase, label: "All Courses", href: "/student/dashboard/all-courses" },
        { icon: MessageSquare, label: "Messages", href: "/student/dashboard/messages" },
        { icon: User, label: "Profile", href: "/student/dashboard/profile" },
      ],
    },
    {
      section: "ACCOUNT",
      items: [
        { icon: BookOpen, label: "Help & Support", href: "/student/dashboard/help" },
      ],
    },
    {
      section: "SETTINGS",
      items: [
       
        { icon: LogOut, label: "Logout", href: ""  },
      ],
    },
  ]

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 ">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-blue-600">COURSUE</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto ">
        {navigationItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{section.section}</h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item?.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start cursor-pointer `}
                      onClick={() => {
                        if (item.label === "Logout") {
                          console.log("Logging Out", item.label)
                          logout(); // Call logout function
                        }
                        setIsMobileOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  )
}
