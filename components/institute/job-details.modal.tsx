"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Job } from "@/lib/school.api"
import { MapPin, Clock, DollarSign, Calendar, Building2 } from "lucide-react"

interface JobDetailsModalProps {
  job: Job | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JobDetailsModal({ job, open, onOpenChange }: JobDetailsModalProps) {
  if (!job) return null

  const formatSalary = (salary?: Job["salary"]) => {
    if (!salary) return "Not specified"
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1e242c]">{job.jobTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-[#696984]">
              <Building2 className="h-4 w-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#696984]">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#696984]">
              <Clock className="h-4 w-4" />
              <span>{job.employmentType}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2 text-sm text-[#696984]">
                <DollarSign className="h-4 w-4" />
                <span>{formatSalary(job.salary)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Job Description */}
          {job.jobDescription && (
            <div>
              <h3 className="font-semibold text-[#1e242c] mb-2">Job Description</h3>
              <p className="text-sm text-[#696984] leading-relaxed">{job.jobDescription}</p>
            </div>
          )}

          {/* Skills Required */}
          {job.skillsRequired && job.skillsRequired.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#1e242c] mb-3">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="rounded-full bg-[#eef5ff] text-[#0a60ff]">
                    {skill.skill} ({skill.proficiency})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div>
              <h3 className="font-semibold text-[#1e242c] mb-2">Benefits</h3>
              <p className="text-sm text-[#696984]">{job.benefits}</p>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#f6f8ff] rounded-lg">
            <div>
              <span className="text-sm font-medium text-[#1e242c]">Category:</span>
              <p className="text-sm text-[#696984]">{job.category}</p>
            </div>
            {job.applicationDeadline && (
              <div>
                <span className="text-sm font-medium text-[#1e242c]">Application Deadline:</span>
                <p className="text-sm text-[#696984] flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(job.applicationDeadline)}
                </p>
              </div>
            )}
            {job.status && (
              <div>
                <span className="text-sm font-medium text-[#1e242c]">Status:</span>
                <Badge variant={job.status === "active" ? "default" : "secondary"} className="ml-2 capitalize">
                  {job.status}
                </Badge>
              </div>
            )}
            <div>
              <span className="text-sm font-medium text-[#1e242c]">Posted:</span>
              <p className="text-sm text-[#696984]">{formatDate(job.createdAt)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" className="rounded-full bg-[#eef5ff] text-[#0a60ff]">
              Match Students
            </Button>
            <Button className="rounded-full">Contact Employer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
