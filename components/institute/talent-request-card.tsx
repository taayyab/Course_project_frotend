"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Job } from "@/lib/school.api"
import { useState } from "react"
import { JobDetailsModal } from "./job-details.modal"
import { MapPin } from "lucide-react"

interface TalentRequestCardProps {
  job: Job
}

export function TalentRequestCard({ job }: TalentRequestCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-[#1e242c]">{job.jobTitle}</CardTitle>
              <div className="text-sm text-[#696984]">{job.department}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full bg-white ring-1 ring-[#e6e8ee] text-[#3f3f3f]">
                {job.employmentType}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-[#696984]">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="mt-4 h-px w-full bg-[#eef0f4]" />
            <div className="mt-3 text-sm text-[#696984]">Posted {getTimeAgo(job.createdAt)}</div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-3">
          <Button variant="secondary" className="rounded-full bg-[#eef5ff] text-[#0a60ff]">
            Match Students
          </Button>
          <Button className="rounded-full" onClick={() => setShowDetails(true)}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      <JobDetailsModal job={job} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}
