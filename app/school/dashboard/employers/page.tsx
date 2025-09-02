"use client"
import { AppShell } from "@/components/institute/app-shell"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Calendar, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { TalentRequestCard } from "@/components/institute/talent-request-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEmployersDirectory, getTalentRequests, type Employer, type Job } from "@/lib/school.api"

const INDUSTRIES = [
  "Information Technology",
  "Manufacturing",
  "Construction",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Engineering",
] as const

export default function EmployersPage() {
  // Employers state
  const [employers, setEmployers] = useState<Employer[]>([])
  const [employersLoading, setEmployersLoading] = useState(false)
  const [employersPagination, setEmployersPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  })

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobsLoading, setJobsLoading] = useState(false)
  const [jobsPagination, setJobsPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  // Filter states
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  // Add activeTab state
  const [activeTab, setActiveTab] = useState("directory");

  // Load employers
  const loadEmployers = async (page = 1) => {
    setEmployersLoading(true)
    try {
      const params = {
        page,
        limit: employersPagination.limit,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedIndustries.length > 0 && { industry: selectedIndustries.join(",") }),
        ...(locationFilter && { location: locationFilter }),
      }

      const response = await getEmployersDirectory(params)
      setEmployers(response.employers)
      setEmployersPagination(response.pagination)
    } catch (error) {
      console.error("Failed to load employers:", error)
    } finally {
      setEmployersLoading(false)
    }
  }

  // Load jobs
  const loadJobs = async (page = 1) => {
    setJobsLoading(true)
    try {
      const params = {
        page,
        limit: jobsPagination.limit,
      }

     const { jobs, pagination } = await getTalentRequests(params)
setJobs(jobs)
setJobsPagination(pagination)
    } catch (error) {
      console.error("Failed to load jobs:", error)
    } finally {
      setJobsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    const fetchEmployers = async () => {
      const { employers, pagination } = await getEmployersDirectory();
      setEmployers(employers);
      setEmployersPagination(pagination);
    };
    fetchEmployers();
  }, []);

  // Reload employers when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadEmployers(1)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedIndustries, locationFilter])

  // Update your existing useEffect or add this new one
  useEffect(() => {
    if (activeTab === "requests") {
      loadJobs();
    }
  }, [activeTab]);

  const uniqueLocations = useMemo(() => {
  const locations = (employers ?? []).map((emp) => emp.location);
    return [...new Set(locations)].filter(Boolean)
  }, [employers])

  return (
        <AppShell>

    <div className="px-4 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-[#1e242c]">Employers</h1>
      <p className="mt-1 text-[#696984]">Facilitate industry partnerships and manage employer relationships</p>

      <Tabs 
          defaultValue="directory" 
          className="mt-4"
          onValueChange={(value) => setActiveTab(value)}
        >
        <TabsList className="bg-transparent p-0">
          <TabsTrigger
            value="directory"
            className="rounded-lg bg-[#eef5ff] text-[#0a60ff] data-[state=active]:bg-[#0a60ff] data-[state=active]:text-white"
          >
            Employer Directory
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="ml-2 rounded-lg bg-[#eef5ff] text-[#0a60ff] data-[state=active]:bg-[#0a60ff] data-[state=active]:text-white"
          >
            Talent Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="mt-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1e242c]">Verified Employer Directory</CardTitle>
              <CardDescription>Manage industry partner relationships</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                <Input
                  className="max-w-xl rounded-xl bg-[#fcfcff] border-[#e9ebee]"
                  placeholder="Search employers by name, company, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-48 rounded-lg">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="rounded-lg bg-transparent">
                        <Filter className="mr-2 h-4 w-4" />
                        Industry {selectedIndustries.length > 0 && `(${selectedIndustries.length})`}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-60">
                      <div className="text-sm font-medium text-[#1e242c] mb-2">Industries</div>
                      <div className="space-y-2">
                        {INDUSTRIES.map((industry) => (
                          <label key={industry} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={selectedIndustries.includes(industry)}
                              onCheckedChange={(checked) => {
                                setSelectedIndustries((prev) =>
                                  checked ? [...prev, industry] : prev.filter((x) => x !== industry),
                                )
                              }}
                            />
                            <span>{industry}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          variant="secondary"
                          className="rounded-full bg-[#f3f6ff] text-[#0a60ff]"
                          onClick={() => setSelectedIndustries([])}
                        >
                          Clear
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Employers Table */}
              <div className="overflow-hidden rounded-xl border border-[#eef0f4]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f3f7ff]">
                      <TableHead>Name</TableHead>
                      <TableHead>website</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead className="w-28 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employersLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Loading employers...
                        </TableCell>
                      </TableRow>
                    ) : employers && employers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No employers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      (employers ?? []).map((employer) => (
                        <TableRow key={employer._id}>
                          <TableCell>
                            <div className="font-medium">{employer.company?.name ?? "N/A"}</div>
                           
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{employer.company?.website}</div>
                          </TableCell>
                          <TableCell>{employer.industry}</TableCell>
                          <TableCell>        {employer.size || employer.company?.size || "N/A"}
</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="icon" variant="outline" className="rounded-lg bg-transparent">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="outline" className="rounded-lg bg-transparent">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {employersPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-[#696984]">
                    Showing {(employersPagination.page - 1) * employersPagination.limit + 1} to{" "}
                    {Math.min(employersPagination.page * employersPagination.limit, employersPagination.total)} of{" "}
                    {employersPagination.total} employers
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadEmployers(employersPagination.page - 1)}
                      disabled={employersPagination.page === 1 || employersLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-[#696984]">
                      Page {employersPagination.page} of {employersPagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadEmployers(employersPagination.page + 1)}
                      disabled={employersPagination.page === employersPagination.totalPages || employersLoading}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#1e242c]">Talent Requests</h2>
            <p className="text-sm text-[#696984]">View and manage job postings from employers</p>
          </div>

          {jobsLoading ? (
            <div className="text-center py-8">Loading talent requests...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">No talent requests found</div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {jobs.map((job) => (
                  <TalentRequestCard key={job._id} job={job} />
                ))}
              </div>

              {/* Jobs Pagination */}
              {jobsPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-[#696984]">
                    Showing {(jobsPagination.page - 1) * jobsPagination.limit + 1} to{" "}
                    {Math.min(jobsPagination.page * jobsPagination.limit, jobsPagination.total)} of{" "}
                    {jobsPagination.total} jobs
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadJobs(jobsPagination.page - 1)}
                      disabled={jobsPagination.page === 1 || jobsLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-[#696984]">
                      Page {jobsPagination.page} of {jobsPagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadJobs(jobsPagination.page + 1)}
                      disabled={jobsPagination.page === jobsPagination.totalPages || jobsLoading}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
        </AppShell>

  )
}
