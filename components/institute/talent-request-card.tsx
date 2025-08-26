"use client"

import { Badge } from "@/components/admin/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Button } from "@/components/admin/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/admin/ui/dialog"

import { useState } from "react"

export type TalentRequest = {
  id: string
  title: string
  company: string
  tags: string[]
  applicants: number
  priority: "High" | "Medium" | "Low"
  posted: string
}

export function TalentRequestCard({ item }: { item: TalentRequest }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-[#1e242c]">{item.title}</CardTitle>
              <div className="text-sm text-[#696984]">{item.company}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full bg-white ring-1 ring-[#e6e8ee] text-[#3f3f3f]">
                {item.applicants} Applicants
              </Badge>
              <Badge variant="secondary" className="rounded-full bg-white ring-1 ring-[#e6e8ee] text-[#3f3f3f]">
                {item.priority} Priority
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full bg-[#eef5ff] text-[#0a60ff]">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-4 h-px w-full bg-[#eef0f4]" />
          <div className="mt-3 text-sm text-[#696984]">Posted {item.posted} ago</div>
        </CardContent>
        <CardFooter className="justify-end gap-3">
          <Button variant="secondary" className="rounded-full bg-[#eef5ff] text-[#0a60ff]">
            Match Students
          </Button>
          <Button className="rounded-full" onClick={() => setOpen(true)}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{item.title} – Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-[#3f3f3f]">
            <p className="text-[#696984]">{item.company}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full bg-[#eef5ff] text-[#0a60ff]">
                  {t}
                </Badge>
              ))}
            </div>
            <ul className="list-disc pl-5">
              <li>Applicants: {item.applicants}</li>
              <li>Priority: {item.priority}</li>
              <li>Posted: {item.posted} ago</li>
            </ul>
            <div className="rounded-lg bg-[#f6f8ff] p-3 text-[#1e242c]">
              This modal mirrors the “Talent Request – View Details” concept in your Employer page design.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
