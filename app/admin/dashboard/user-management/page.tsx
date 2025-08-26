"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Search, Eye, Edit, Mail, Phone, MapPin } from "lucide-react"

// Dummy data
const studentsData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "(555) 123-4567",
    location: "TechCorp Industries",
    city: "Chicago, IL",
    status: "Active",
    remarks: "Excellent",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@techcorp.com",
    phone: "(555) 123-4568",
    location: "TechCorp Industries",
    city: "Chicago, IL",
    status: "Active",
    remarks: "Good",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@techcorp.com",
    phone: "(555) 123-4569",
    location: "TechCorp Industries",
    city: "Chicago, IL",
    status: "Inactive",
    remarks: "Needs Improvement",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@techcorp.com",
    phone: "(555) 123-4570",
    location: "TechCorp Industries",
    city: "Chicago, IL",
    status: "Active",
    remarks: "Excellent",
  },
]

const recruitersData = [
  {
    id: 1,
    name: "TechCorp Inc.",
    size: "100-500 employees",
    website: "https://techcorp.com",
    industry: "Technology",
    status: "Active",
  },
  {
    id: 2,
    name: "InnovateTech",
    size: "50-100 employees",
    website: "https://innovatetech.com",
    industry: "Software",
    status: "Active",
  },
  {
    id: 3,
    name: "DataSolutions",
    size: "200-500 employees",
    website: "https://datasolutions.com",
    industry: "Data Analytics",
    status: "Pending",
  },
  {
    id: 4,
    name: "CloudTech",
    size: "500+ employees",
    website: "https://cloudtech.com",
    industry: "Cloud Services",
    status: "Active",
  },
]

const institutesData = [
  {
    id: 1,
    name: "TechCorp",
    email: "john.smith@techcorp.com",
    phone: "(555) 123-4567",
    location: "TechCorp Industries",
    city: "Chicago, IL",
    status: "Active",
    courses: 6,
  },
  {
    id: 2,
    name: "CodeAcademy",
    email: "info@codeacademy.com",
    phone: "(555) 123-4568",
    location: "CodeAcademy Center",
    city: "New York, NY",
    status: "Active",
    courses: 12,
  },
  {
    id: 3,
    name: "DataSchool",
    email: "admin@dataschool.com",
    phone: "(555) 123-4569",
    location: "DataSchool Campus",
    city: "San Francisco, CA",
    status: "Pending",
    courses: 8,
  },
  {
    id: 4,
    name: "WebDev Institute",
    email: "contact@webdevinstitute.com",
    phone: "(555) 123-4570",
    location: "WebDev Building",
    city: "Austin, TX",
    status: "Active",
    courses: 15,
  },
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filterData = (data: any[]) => {
    return data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e242c]">User Management & KYC Verification</h1>
        <p className="text-[#696984] mt-1">Manage user accounts and verify identity documents</p>
      </div>

      <Tabs defaultValue="student" className="space-y-6">
        <TabsList className="bg-transparent p-0 h-auto space-x-0">
          <TabsTrigger
            value="student"
            className="bg-[#0755e9] cursor-pointer text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Student
          </TabsTrigger>
          <TabsTrigger
            value="recruiter"
            className="bg-[#0755e9] cursor-pointer text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Employer
          </TabsTrigger>
          <TabsTrigger
            value="institute"
            className="bg-[#0755e9] cursor-pointer text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2"
          >
            Institute
          </TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#696984] w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Remarks</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(studentsData).map((student) => (
                      <tr key={student.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{student.name}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {student.email}
                            </div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {student.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{student.location}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {student.city}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              student.status === "Active"
                                ? "bg-[#e0f0e4] text-[#377e36] hover:bg-[#e0f0e4]"
                                : "bg-[#fef2f2] text-[#dc2626] hover:bg-[#fef2f2]"
                            }
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-[#1e242c]">{student.remarks}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#696984]">Rows per page</span>
                  <Select defaultValue="25">
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#696984]">1-10 of 10</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                      ‹‹
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      ‹
                    </Button>
                    <Button variant="outline" size="sm">
                      ›
                    </Button>
                    <Button variant="outline" size="sm">
                      ››
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruiter">
          <Card>
            <CardHeader>
              <CardTitle>Employer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Size</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Website</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Industry</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(recruitersData).map((recruiter) => (
                      <tr key={recruiter.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{recruiter.name}</td>
                        <td className="py-4 px-4 text-[#696984]">{recruiter.size}</td>
                        <td className="py-4 px-4 text-[#696984]"><a href="https://techcorp.com " target="_blank">{recruiter.website}</a></td>
                        <td className="py-4 px-4 text-[#696984]">{recruiter.industry}</td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              recruiter.status === "Active"
                                ? "bg-[#e0f0e4] text-[#377e36] hover:bg-[#e0f0e4]"
                                : "bg-[#fef2f2] text-[#dc2626] hover:bg-[#fef2f2]"
                            }
                          >
                            {recruiter.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#696984]">Rows per page</span>
                  <Select defaultValue="25">
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#696984]">1-10 of 10</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                      ‹‹
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      ‹
                    </Button>
                    <Button variant="outline" size="sm">
                      ›
                    </Button>
                    <Button variant="outline" size="sm">
                      ››
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="institute">
          <Card>
            <CardHeader>
              <CardTitle>Institute Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Courses</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(institutesData).map((institute) => (
                      <tr key={institute.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{institute.name}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {institute.email}
                            </div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {institute.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{institute.location}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {institute.city}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              institute.status === "Active"
                                ? "bg-[#e0f0e4] text-[#377e36] hover:bg-[#e0f0e4]"
                                : "bg-[#fef2f2] text-[#dc2626] hover:bg-[#fef2f2]"
                            }
                          >
                            {institute.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-[#1e242c] font-medium">{institute.courses}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#696984]">Rows per page</span>
                  <Select defaultValue="25">
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#696984]">1-10 of 10</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" disabled>
                      ‹‹
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      ‹
                    </Button>
                    <Button variant="outline" size="sm">
                      ›
                    </Button>
                    <Button variant="outline" size="sm">
                      ››
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
