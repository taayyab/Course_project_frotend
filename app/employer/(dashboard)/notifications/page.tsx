"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { notifications as initial } from "@/lib/data"
import { Badge } from "@/components/employer/ui/badge"
import { Button } from "@/components/employer/ui/button"
import { Card } from "@/components/employer/ui/card"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  return <NotificationsInner filter="all" />
}

export function NotificationsInner({ filter }: { filter: "all" | "unread" }) {
  const router = useRouter()
  const pathname = usePathname()
  const [items, setItems] = useState(initial)
  const unreadCount = items.filter(i => !i.read).length
  const list = useMemo(
    () => (filter === "unread" ? items.filter(i => !i.read) : items),
    [items, filter],
  )

  function markAllRead() {
    setItems((arr) => arr.map(n => ({ ...n, read: true })))
  }
  function markRead(id: string) {
    setItems((arr) => arr.map(n => (n.id === id ? { ...n, read: true } : n)))
  }
  function dismiss(id: string) {
    setItems((arr) => arr.filter(n => n.id !== id))
  }

  return (
    <div className="pt-6">
      <h1 className="text-3xl font-semibold">Notifications</h1>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Tab href="/employer/notifications" active={pathname === "/notifications"}>All</Tab>
          <Tab href="/employer/notifications/unread" active={pathname === "/notifications/unread"}>Unread ({unreadCount})</Tab>
        </div>
        <button onClick={markAllRead} className="text-sm text-[#0f5ff2]">Mark  All as read</button>
      </div>

      <div className="mt-4 space-y-6">
        {list.map(n => (
          <Card key={n.id} className="border-[#e6e7ef] bg-white overflow-hidden">
            <div className="flex">
              <div className={cn("w-1", n.type === "module" ? "bg-[#0f5ff2]" : "bg-[#ff6961]")} />
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{n.title}</div>
                    <div className="text-[#5f5f5f] mt-1">{n.body}</div>
                  </div>
                  <div className="text-xs text-[#5f5f5f] flex items-center gap-2">
                    {!n.read && <span className="h-2 w-2 rounded-full bg-[#0f5ff2]" aria-hidden />} {n.timeAgo}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Button size="sm" className="bg-[#0f5ff2] hover:bg-[#0d4fe0]" onClick={() => markRead(n.id)}>✓ Mark as Read</Button>
                  <Button size="sm" variant="secondary" className="bg-[#f0f2f8]" onClick={() => dismiss(n.id)}>✕ Dismiss</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn("px-3 py-2 rounded-md text-sm", active ? "bg-[#0f5ff2] text-white" : "bg-[#eef2ff] text-[#0f5ff2]")}>
      {children}
    </Link>
  )
}
