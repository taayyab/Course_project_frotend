"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/admin/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import { Sidebar } from "./sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { NotificationsDropdown } from "./notifications-dropdown"

export function Header() {
  const isMobile = useIsMobile()

  return (
    <header className="bg-[#ffffff] border-b border-[#f5f5f5] px-6 py-4">
      
      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-4">{isMobile && <Sidebar />}</div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#696984] w-4 h-4" />
            <Input
              placeholder="Search your course here..."
              className="pl-10 bg-[#f9f9f9] border-[#e5e5e5] text-[#696984]"
            />
          </div>
        </div>

        {/* <div className="flex items-center space-x-4">
          <NotificationsDropdown />
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-[#ff9500] text-white">U</AvatarFallback>
          </Avatar>
        </div> */}
      </div>
    </header>
  )
}
