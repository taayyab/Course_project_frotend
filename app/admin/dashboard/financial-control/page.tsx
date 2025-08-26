"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Search, Mail, DollarSign, Users, Building, CreditCard } from "lucide-react"

// Dummy data for students
const studentsData = [
  {
    id: 1,
    transactionId: "STU12345",
    studentName: "John Smith",
    email: "john.smith@techcorp.com",
    planType: "One-Time",
    date: "2024-01-15",
    amount: "£9.99",
    paymentDate: "2025-08-04",
  },
  {
    id: 2,
    transactionId: "STU12346",
    studentName: "Jane Doe",
    email: "jane.doe@techcorp.com",
    planType: "Monthly",
    date: "2024-01-14",
    amount: "£19.99",
    paymentDate: "2025-08-04",
  },
  {
    id: 3,
    transactionId: "STU12347",
    studentName: "Mike Johnson",
    email: "mike.johnson@techcorp.com",
    planType: "Annual",
    date: "2024-01-13",
    amount: "£199.99",
    paymentDate: "2025-08-04",
  },
  {
    id: 4,
    transactionId: "STU12348",
    studentName: "Sarah Wilson",
    email: "sarah.wilson@techcorp.com",
    planType: "One-Time",
    date: "2024-01-12",
    amount: "£9.99",
    paymentDate: "2025-08-04",
  },
  {
    id: 5,
    transactionId: "STU12349",
    studentName: "David Brown",
    email: "david.brown@techcorp.com",
    planType: "One-Time",
    date: "2024-01-11",
    amount: "£9.99",
    paymentDate: "2025-08-04",
  },
]

// Dummy data for recruiters
const recruitersData = [
  {
    id: 1,
    transactionId: "SR1001",
    studentName: "Ahmed Raza",
    email: "ahmed@email.com",
    planType: "Monthly",
    paymentDate: "2024-01-15",
    amount: "£99.99",
    trialUsed: "Yes",
  },
  {
    id: 2,
    transactionId: "SR1002",
    studentName: "Sarah Johnson",
    email: "sarah@email.com",
    planType: "Monthly",
    paymentDate: "2024-01-15",
    amount: "£99.99",
    trialUsed: "No",
  },
  {
    id: 3,
    transactionId: "SR1003",
    studentName: "Mike Chen",
    email: "mike@email.com",
    planType: "Annual",
    paymentDate: "2024-01-14",
    amount: "£999.99",
    trialUsed: "Yes",
  },
  {
    id: 4,
    transactionId: "SR1004",
    studentName: "Lisa Wang",
    email: "lisa@email.com",
    planType: "Monthly",
    paymentDate: "2024-01-13",
    amount: "£99.99",
    trialUsed: "Yes",
  },
  {
    id: 5,
    transactionId: "SR1005",
    studentName: "David Smith",
    email: "david@email.com",
    planType: "Monthly",
    paymentDate: "2024-01-12",
    amount: "£99.99",
    trialUsed: "No",
  },
]

// Dummy data for training institutes
const institutesData = [
  {
    id: 1,
    transactionId: "TI5001",
    instituteName: "Oxford Skills Hub",
    email: "info@oxford.com",
    planType: "Monthly",
    date: "2024-01-15",
    amount: "£199.99",
    status: "Completed",
    candidatesAccessed: 130,
  },
  {
    id: 2,
    transactionId: "STU12345",
    instituteName: "Cambridge Learning Center",
    email: "admin@cambridge.com",
    planType: "Annual",
    date: "2024-01-14",
    amount: "£1999.99",
    status: "Completed",
    candidatesAccessed: 250,
  },
  {
    id: 3,
    transactionId: "STU12346",
    instituteName: "London Tech Institute",
    email: "contact@londontech.com",
    planType: "Monthly",
    date: "2024-01-13",
    amount: "£199.99",
    status: "Failed",
    candidatesAccessed: 85,
  },
  {
    id: 4,
    transactionId: "STU12347",
    instituteName: "Manchester Skills Academy",
    email: "info@manchester.com",
    planType: "Quarterly",
    date: "2024-01-12",
    amount: "£499.99",
    status: "Failed",
    candidatesAccessed: 120,
  },
  {
    id: 5,
    transactionId: "STU12348",
    instituteName: "Birmingham Training Hub",
    email: "admin@birmingham.com",
    planType: "Monthly",
    date: "2024-01-11",
    amount: "£199.99",
    status: "Failed",
    candidatesAccessed: 95,
  },
]

export default function FinancialControl() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filterStudentsData = (data: any[]) => {
    return data.filter((item) => {
      const matchesSearch =
        item.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPlan = planFilter === "all" || item.planType.toLowerCase() === planFilter.toLowerCase()
      return matchesSearch && matchesPlan
    })
  }

  const filterRecruitersData = (data: any[]) => {
    return data.filter((item) => {
      const matchesSearch =
        item.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPlan = planFilter === "all" || item.planType.toLowerCase() === planFilter.toLowerCase()
      return matchesSearch && matchesPlan
    })
  }

  const filterInstitutesData = (data: any[]) => {
    return data.filter((item) => {
      const matchesSearch =
        item.instituteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPlan = planFilter === "all" || item.planType.toLowerCase() === planFilter.toLowerCase()
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesPlan && matchesStatus
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e242c]">Financial & Subscription Control</h1>
        <p className="text-[#696984] mt-1">Monitor payments, subscriptions, and revenue streams</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Monthly Revenue</p>
                <p className="text-[#1e242c] text-2xl font-bold">£132,268</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Student Revenue</p>
                <p className="text-[#1e242c] text-2xl font-bold">£85,470</p>
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
                <p className="text-[#696984] text-sm">Institute Revenue</p>
                <p className="text-[#1e242c] text-2xl font-bold">£46,798</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff] border-[#f5f5f5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Failed Payment</p>
                <p className="text-[#1e242c] text-2xl font-bold">23</p>
              </div>
              <div className="w-10 h-10 bg-[#fef2f2] rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#dc2626]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="bg-transparent p-0 h-auto space-x-0">
          <TabsTrigger
            value="students"
            className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Students
          </TabsTrigger>
          <TabsTrigger
            value="recruiter"
            className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Employer
          </TabsTrigger>
          <TabsTrigger
            value="institutes"
            className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2"
          >
            Training Institutes
          </TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#696984] w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="one-time">One-Time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Job Postings Compliance Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Student Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Plan Type</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterStudentsData(studentsData).map((student) => (
                      <tr key={student.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{student.transactionId}</td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{student.studentName}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {student.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#696984]">{student.planType}</td>
                        <td className="py-4 px-4 text-[#696984]">{student.date}</td>
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{student.amount}</td>
                        <td className="py-4 px-4 text-[#696984]">{student.paymentDate}</td>
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
              <CardTitle>Job Postings Compliance Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Student Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Plan Type</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Payment Date</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Trial Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterRecruitersData(recruitersData).map((recruiter) => (
                      <tr key={recruiter.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{recruiter.transactionId}</td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{recruiter.studentName}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {recruiter.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#696984]">{recruiter.planType}</td>
                        <td className="py-4 px-4 text-[#696984]">{recruiter.paymentDate}</td>
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{recruiter.amount}</td>
                        <td className="py-4 px-4 text-[#696984]">{recruiter.trialUsed}</td>
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

        <TabsContent value="institutes">
          <Card>
            <CardHeader>
              <CardTitle>Job Postings Compliance Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Institute Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Plan Type</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Candidates Accessed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterInstitutesData(institutesData).map((institute) => (
                      <tr key={institute.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{institute.transactionId}</td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{institute.instituteName}</div>
                            <div className="flex items-center text-sm text-[#696984] mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {institute.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#696984]">{institute.planType}</td>
                        <td className="py-4 px-4 text-[#696984]">{institute.date}</td>
                        <td className="py-4 px-4 font-medium text-[#1e242c]">{institute.amount}</td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              institute.status === "Completed"
                                ? "bg-[#e0f0e4] text-[#377e36] hover:bg-[#e0f0e4]"
                                : "bg-[#fef2f2] text-[#dc2626] hover:bg-[#fef2f2]"
                            }
                          >
                            {institute.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-[#696984]">{institute.candidatesAccessed}</td>
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
