"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Badge } from "@/components/admin/ui/badge"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Search, Users, Briefcase, CheckCircle, TrendingUp, Building, MessageSquare } from "lucide-react"

// Dummy data
const statsData = {
  activeJobPostings: 127,
  studentsInPipeline: 1234,
  placementsThisMonth: 34,
  conversionRate: "78%",
}

const pendingJobs = [
  {
    id: 1,
    company: "CloudTech Innovations",
    school: "TechMaster College",
    date: "2024-01-11",
    status: "Pending",
    recruiterMessage: "Seeking cloud computing specialists for full-time positions.",
    schoolReply: null,
  },
  {
    id: 2,
    company: "DataFlow Systems",
    school: "CodeAcademy Institute",
    date: "2024-01-10",
    status: "Pending",
    recruiterMessage: "Looking for data engineers with Python experience.",
    schoolReply: null,
  },
]

const approvedJobs = [
  {
    id: 1,
    company: "CloudTech Innovations",
    school: "TechMaster College",
    date: "2024-01-11",
    status: "Approved",
    recruiterMessage: "Seeking cloud computing specialists for full-time positions.",
    schoolReply: "Great opportunity! We have several interested students.",
  },
  {
    id: 2,
    company: "WebDev Solutions",
    school: "Frontend Academy",
    date: "2024-01-09",
    status: "Approved",
    recruiterMessage: "Need React developers for exciting projects.",
    schoolReply: "Perfect timing! Our React cohort just graduated.",
  },
]

const rejectedJobs = [
  {
    id: 1,
    company: "CloudTech Innovations",
    school: "TechMaster College",
    date: "2024-01-11",
    status: "Rejected",
    recruiterMessage: "Seeking cloud computing specialists for full-time positions.",
    schoolReply: "Currently, we are not accepting new Employer collaborations.",
  },
  {
    id: 2,
    company: "StartupTech",
    school: "Innovation Institute",
    date: "2024-01-08",
    status: "Rejected",
    recruiterMessage: "Looking for junior developers for startup environment.",
    schoolReply: "Our students prefer established companies at this time.",
  },
]

export default function HiringSupervision() {
  const [searchTerm, setSearchTerm] = useState("")
  const [schoolFilter, setSchoolFilter] = useState("all")
  const [recruiterFilter, setRecruiterFilter] = useState("all")
  const [rejectedFilter, setRejectedFilter] = useState("all")

  const filterJobs = (jobs: any[]) => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.school.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e242c]">Hiring Process Supervision</h1>
        <p className="text-[#696984] mt-1">Monitor recruitment activities and placement analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Active Job Postings</p>
                <p className="text-[#1e242c] text-2xl font-bold">{statsData.activeJobPostings}</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Students in Pipeline</p>
                <p className="text-[#1e242c] text-2xl font-bold">{statsData.studentsInPipeline}</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Placements This Month</p>
                <p className="text-[#1e242c] text-2xl font-bold">{statsData.placementsThisMonth}</p>
              </div>
              <div className="w-10 h-10 bg-[#e0f0e4] rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#377e36]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Conversion Rate</p>
                <p className="text-[#1e242c] text-2xl font-bold">{statsData.conversionRate}</p>
              </div>
              <div className="w-10 h-10 bg-[#e0f0e4] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#377e36]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <TabsList className="bg-transparent p-0 h-auto space-x-0">
            <TabsTrigger
              value="pending"
              className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
            >
              Approved
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2"
            >
              Rejected
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All School</SelectItem>
                <SelectItem value="techmaster">TechMaster College</SelectItem>
                <SelectItem value="codeacademy">CodeAcademy Institute</SelectItem>
              </SelectContent>
            </Select>

            <Select value={recruiterFilter} onValueChange={setRecruiterFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Employers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employer's</SelectItem>
                <SelectItem value="cloudtech">CloudTech</SelectItem>
                <SelectItem value="dataflow">DataFlow</SelectItem>
              </SelectContent>
            </Select>

            <Select value={rejectedFilter} onValueChange={setRejectedFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Rejected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rejected</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="older">Older</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#696984] w-4 h-4" />
          <Input
            placeholder="Search companies or schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <TabsContent value="pending">
          <div className="space-y-6">
            {filterJobs(pendingJobs).map((job) => (
              <Card key={job.id} className="bg-[#ffffff] border-[#f5f5f5]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-[#5832e6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1e242c]">{job.company}</h3>
                        <p className="text-sm text-[#696984] flex items-center mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {job.school}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#696984]">{job.date}</p>
                      <Badge className="bg-[#ff9500] text-white hover:bg-[#ff9500]/90 mt-1">{job.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-sm text-[#696984] mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Employer's Message
                      </div>
                      <div className="bg-[#f8fafc] border-l-4 border-[#0755e9] p-3 rounded">
                        <p className="text-[#696984]">{job.recruiterMessage}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="space-y-6">
            {filterJobs(approvedJobs).map((job) => (
              <Card key={job.id} className="bg-[#ffffff] border-[#f5f5f5]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-[#5832e6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1e242c]">{job.company}</h3>
                        <p className="text-sm text-[#696984] flex items-center mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {job.school}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#696984]">{job.date}</p>
                      <Badge className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90 mt-1">{job.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-sm text-[#696984] mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Employer's Message
                      </div>
                      <div className="bg-[#f8fafc] border-l-4 border-[#0755e9] p-3 rounded">
                        <p className="text-[#696984]">{job.recruiterMessage}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-[#696984] mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        School Reply
                      </div>
                      <div className="bg-[#fff7ed] border-l-4 border-[#ff9500] p-3 rounded">
                        <p className="text-[#696984]">{job.schoolReply}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected">
          <div className="space-y-6">
            {filterJobs(rejectedJobs).map((job) => (
              <Card key={job.id} className="bg-[#ffffff] border-[#f5f5f5]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-[#5832e6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1e242c]">{job.company}</h3>
                        <p className="text-sm text-[#696984] flex items-center mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {job.school}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#696984]">{job.date}</p>
                      <Badge className="bg-[#dc2626] text-white hover:bg-[#dc2626]/90 mt-1">{job.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-sm text-[#696984] mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Employer's Message
                      </div>
                      <div className="bg-[#f8fafc] border-l-4 border-[#0755e9] p-3 rounded">
                        <p className="text-[#696984]">{job.recruiterMessage}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-[#696984] mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        School Reply
                      </div>
                      <div className="bg-[#fef2f2] border-l-4 border-[#dc2626] p-3 rounded">
                        <p className="text-[#696984]">{job.schoolReply}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
