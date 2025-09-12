"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/employer/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/employer/ui/card"
import { Badge } from "@/components/employer/ui/badge"
import { MapPin, Users, CalendarDays } from 'lucide-react'
import employerApi from "@/lib/employer.api"

interface Job {
  _id: string
  jobTitle: string
  department: string
  location: string
  employmentType: string
  salary: {
    min: number
    max: number
    currency: string
  }
  jobDescription: string
  status: string
  createdAt: string
  // optionally include skills, benefits, etc.
}

export default function JobPostsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await employerApi.getMyJobPosts()
        setJobs(data)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => { setMounted(true); }, []);

  // Only render after mount and loading is complete
  if (!mounted || loading) return null;

  return (
    <div className="pt-6">
      <h1 className="text-3xl font-semibold">Job Posts</h1>
      <p className="text-[#696984] mt-1">Manage your open positions and track applications</p>

      <Card className="mt-4 bg-white/80 border-[#e6e7ef]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg md:text-xl">Active Job Posts</CardTitle>
          </div>
          <Button asChild className="bg-[#0f5ff2] hover:bg-[#0d4fe0]">
            <Link href="/employer/job-posts/create">+ Create Job Post</Link>
          </Button>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          {jobs.length === 0 && (
            <p className="text-[#696984]">No job posts found.</p>
          )}
          {jobs.length > 0 && jobs.map((j) => (
            <Card key={j._id} className="border-[#e6e7ef]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="font-semibold">{j.jobTitle}</div>
                  <Badge
                    variant="secondary"
                    className={
                      j.status.toLowerCase() === "active"
                        ? "bg-[#eef4ff] text-[#0f5ff2]"
                        : "bg-[#fff5e6] text-[#ff9500]"
                    }
                  >
                    {j.status}
                  </Badge>
                </div>
                <p className="mt-2 text-[#5f5f5f]">{j.jobDescription}</p>
                <div className="mt-3 grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <div className="text-[#5f5f5f]">Department</div>
                    <div className="font-medium">{j.department}</div>
                  </div>
                  <div>
                    <div className="text-[#5f5f5f]">Location</div>
                    <div className="font-medium inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-[#0f5ff2]" /> {j.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#5f5f5f]">Employment</div>
                    <div className="font-medium">{j.employmentType}</div>
                  </div>
                  <div>
                    <div className="text-[#5f5f5f]">Compensation</div>
                    <div className="font-medium text-[#0f5ff2]">
                      {j.salary.min.toLocaleString()} - {j.salary.max.toLocaleString()} {j.salary.currency}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-6 text-sm text-[#5f5f5f]">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-4 w-4" /> {/* If API returns applications count, display here */}
                    0 applications
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" /> Posted{" "}
                    {new Date(j.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
