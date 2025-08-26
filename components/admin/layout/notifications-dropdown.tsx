"use client"

import { useState } from "react"
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/admin/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import { Badge } from "@/components/admin/ui/badge"

// Dummy notification data
const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Security Alert",
    message: "Suspicious login attempt detected",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Course Approved",
    message: "Advanced React Development has been approved",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "New User Registration",
    message: "5 new students registered today",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "alert",
    title: "Payment Failed",
    message: "Payment processing failed for 3 transactions",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 5,
    type: "info",
    title: "System Update",
    message: "Platform maintenance scheduled for tonight",
    time: "1 day ago",
    read: true,
  },
]

export function NotificationsDropdown() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-[#696984]">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          {notificationList.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex items-start space-x-3 p-3 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                  {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />}
                </div>
                <p className="text-sm text-gray-500 truncate">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-800">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
