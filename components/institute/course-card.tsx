"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Badge } from "@/components/admin/ui/badge"

export function CourseCard({
  title = "Advanced Welding Techniques",
  updated = "Last updated 2 days ago",
  published = true,
  total = 200,
  onView,
}: {
  title?: string
  updated?: string
  published?: boolean
  total?: number
  onView?: () => void
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[#1e242c]">{title}</CardTitle>
        <div className="mt-1 text-sm text-[#696984]">• {updated}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className={`rounded-full px-3 py-1 ${published ? "bg-[#eef5ff] text-[#0a60ff]" : "bg-muted"}`}
            >
              {published ? "Published" : "Draft"}
            </Badge>
            <div className="text-sm text-[#3f3f3f]">45 students Notified</div>
            <div className="text-sm text-[#3f3f3f]">45 students Responded</div>
          </div>
          <div className="ml-auto">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-24 w-24">
                <circle cx="50" cy="50" r="42" stroke="#eef1f6" strokeWidth="12" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#0a60ff"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(total / 200) * 264} 264`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-[#1e242c]">
                {total}
              </div>
            </div>
            <div className="text-center text-sm text-[#696984]">Student View</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <button
          onClick={onView}
          className="w-full rounded-full bg-[#eef5ff] text-[#0a60ff] hover:bg-[#e3eeff] py-2 text-sm font-medium"
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  )
}
