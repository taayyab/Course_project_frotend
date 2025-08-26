"use client"

import { useEffect, useMemo, useState } from "react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/admin/ui/sheet"
import { Button } from "@/components/admin/ui/button"
import { ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

export type StudentFilter = {
  name?: string
  course?: string
  status?: "Active" | "Completed" | "At Risk" | ""
}

const names = ["Adam", "Alex", "Ava", "Ben", "Chloe", "John Smith"]
const courses = ["Advanced Welding", "OSHA Safety", "Electrical Fundamentals"]
const statuses: StudentFilter["status"][] = ["Active", "Completed", "At Risk"]

export function StudentFilterDrawer({
  value,
  onChange,
}: {
  value: StudentFilter
  onChange: (next: StudentFilter) => void
}) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<StudentFilter>(value)

  useEffect(() => setDraft(value), [value])

  const section = (title: string, children: React.ReactNode) => (
    <div className="rounded-xl border border-[#eef0f4]">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-[#1e242c]"
      >
        {title}
        <ChevronDown className="h-4 w-4 text-[#9e9e9e]" />
      </button>
      <div className="p-2">{children}</div>
    </div>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-lg">
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {section(
            "By Name",
            <div className="space-y-1">
              {names.map((n) => (
                <button
                  key={n}
                  onClick={() => setDraft((d) => ({ ...d, name: n }))}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm",
                    draft.name === n ? "bg-[#e9f0ff] text-[#0a60ff]" : "bg-white text-[#1e242c] hover:bg-[#f7f9fc]"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
          {section(
            "By Course",
            <div className="space-y-1">
              {courses.map((c) => (
                <button
                  key={c}
                  onClick={() => setDraft((d) => ({ ...d, course: c }))}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm",
                    draft.course === c ? "bg-[#e9f0ff] text-[#0a60ff]" : "bg-white text-[#1e242c] hover:bg-[#f7f9fc]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {section(
            "By Status",
            <div className="space-y-1">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setDraft((d) => ({ ...d, status: s }))}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm",
                    draft.status === s ? "bg-[#e9f0ff] text-[#0a60ff]" : "bg-white text-[#1e242c] hover:bg-[#f7f9fc]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="mt-6 flex w-full items-center justify-between">
          <Button
            variant="secondary"
            className="rounded-full bg-[#f3f6ff] text-[#0a60ff]"
            onClick={() => setDraft({ name: "", course: "", status: "" })}
          >
            Clear
          </Button>
          <Button
            className="rounded-full bg-[#0a60ff]"
            onClick={() => {
              onChange(draft)
              setOpen(false)
            }}
          >
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
