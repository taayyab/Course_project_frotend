"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/student/dashboard/ui/card";
import { Button } from "@/components/student/dashboard/ui/button";
import { BookOpen, MessageSquare, X, Check } from "lucide-react";

const allNotifications = [
  {
    id: 1,
    type: "module",
    icon: BookOpen,
    title: "New module available",
    description: "Module 9: Advanced Hooks is now available in your React course",
    time: "2 hours ago",
    unread: true,
    color: "blue",
  },
  {
    id: 2,
    type: "message",
    icon: MessageSquare,
    title: "New message from Employer",
    description: "Module 9: Advanced Hooks is now available in your React course",
    time: "2 hours ago",
    unread: true,
    color: "red",
  },
  {
    id: 3,
    type: "module",
    icon: BookOpen,
    title: "New module available",
    description: "Module 9: Advanced Hooks is now available in your React course",
    time: "2 hours ago",
    unread: false,
    color: "blue",
  },
  {
    id: 4,
    type: "message",
    icon: MessageSquare,
    title: "New message from employer",
    description: "Module 9: Advanced Hooks is now available in your React course",
    time: "2 hours ago",
    unread: false,
    color: "red",
  },
];

const unreadNotifications = [
  {
    id: 1,
    type: "module",
    icon: BookOpen,
    title: "New module available",
    description: "Module 9: Advanced Hooks is now available in your React course",
    time: "2 hours ago",
    unread: true,
    color: "blue",
  },
  {
    id: 2,
    type: "module",
    icon: BookOpen,
    title: "New module available",
    description: "Module 9: Advanced Hooks is now available in your React course",
    time: "2 hours ago",
    unread: true,
    color: "blue",
  },
];

export default function NotificationsPage() {
  const [tab, setTab] = useState<"all" | "unread" | "courses">("all");

  let notifications =
    tab === "all"
      ? allNotifications
      : tab === "unread"
      ? unreadNotifications
      : allNotifications.filter((n) => n.type === "module");

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={tab === "all" ? "default" : "outline"}
            className={tab === "all" ? "bg-blue-600 text-white" : "text-blue-600 bg-transparent border-gray-300"}
            onClick={() => setTab("all")}
          >
            All
          </Button>
          <Button
            variant={tab === "unread" ? "default" : "outline"}
            className={tab === "unread" ? "bg-blue-600 text-white" : "text-blue-600 bg-transparent border-gray-300"}
            onClick={() => setTab("unread")}
          >
            Unread ({unreadNotifications.length})
          </Button>
          <Button
            variant={tab === "courses" ? "default" : "outline"}
            className={tab === "courses" ? "bg-blue-600 text-white" : "text-blue-600 bg-transparent border-gray-300"}
            onClick={() => setTab("courses")}
          >
            Courses
          </Button>
        </div>
        <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
          Mark All as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card
              key={notification.id}
              className={`border-l-4 ${
                notification.color === "blue" ? "border-l-blue-500" : "border-l-red-500"
              } shadow-sm`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notification.color === "blue" ? "bg-blue-100" : "bg-red-100"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        notification.color === "blue" ? "text-blue-600" : "text-red-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{notification.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Check className="w-4 h-4 mr-1" />
                        Mark as Read
                      </Button>
                      <Button size="sm" variant="outline" className="text-gray-600 bg-transparent">
                        <X className="w-4 h-4 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
