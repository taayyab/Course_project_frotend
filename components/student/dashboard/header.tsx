import { Search, Bell } from "lucide-react"
import { Input } from "@/components/admin/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"

export function Header() {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search your course here..." className="pl-10 bg-gray-50 border-gray-200" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
