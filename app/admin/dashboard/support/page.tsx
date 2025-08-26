"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Search, MessageSquare, Users, Building, GraduationCap, AlertTriangle } from "lucide-react"

// Dummy data for student queries
const studentQueries = [
  {
    id: 1,
    name: "John Smith",
    type: "Student's Message",
    message: "I'm having trouble accessing my course materials. Can you help me resolve this issue?",
    priority: "medium",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "John Smith",
    type: "Student's Message",
    message: "My payment was processed but I still don't have access to the premium features.",
    priority: "high",
    time: "4 hours ago",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    type: "Student's Message",
    message: "Can you provide more information about the certification process?",
    priority: "low",
    time: "1 day ago",
  },
  {
    id: 4,
    name: "Mike Chen",
    type: "Student's Message",
    message: "I need help with resetting my password and updating my profile information.",
    priority: "medium",
    time: "2 days ago",
  },
]

// Dummy data for recruiter queries
const recruiterQueries = [
  {
    id: 1,
    name: "Alex Rodriguez",
    type: "Employer's Message",
    message: "Seeking cloud computing specialists for full-time positions.",
    priority: "high",
    time: "1 hour ago",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    type: "Employer's Message",
    message: "We need React developers with 3+ years experience for our startup.",
    priority: "medium",
    time: "3 hours ago",
  },
  {
    id: 3,
    name: "Lisa Wang",
    type: "Employer's Message",
    message: "Looking for data scientists with Python and ML experience.",
    priority: "high",
    time: "5 hours ago",
  },
  {
    id: 4,
    name: "David Brown",
    type: "Employer's Message",
    message: "Need mobile app developers for iOS and Android projects.",
    priority: "medium",
    time: "1 day ago",
  },
]

// Dummy data for institute queries
const instituteQueries = [
  {
    id: 1,
    name: "Alex Rodriguez",
    type: "Employer's Message",
    message: "We want to partner with your platform to offer specialized courses.",
    priority: "high",
    time: "30 minutes ago",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    type: "Employer's Message",
    message: "Can we get bulk pricing for our corporate training programs?",
    priority: "medium",
    time: "2 hours ago",
  },
  {
    id: 3,
    name: "Cambridge Institute",
    type: "Institute's Message",
    message: "We need help setting up our course catalog and pricing structure.",
    priority: "high",
    time: "4 hours ago",
  },
  {
    id: 4,
    name: "Oxford Academy",
    type: "Institute's Message",
    message: "How can we integrate our existing LMS with your platform?",
    priority: "medium",
    time: "1 day ago",
  },
]

export default function QueriesSupport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filterQueries = (queries: any[]) => {
    return queries.filter((query) => {
      const matchesSearch =
        query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.message.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = priorityFilter === "all" || query.priority === priorityFilter
      return matchesSearch && matchesPriority
    })
  }

  const handleReply = (queryId: number) => {
    console.log("Replying to query:", queryId)
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") {
      return <AlertTriangle className="w-4 h-4 text-red-500" />
    }
    return <AlertTriangle className="w-4 h-4 text-orange-500" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e242c]">Queries & Support</h1>
        <p className="text-[#696984] mt-1">Monitor security threats and ensure regulatory Compliance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-[#f8fafc] border-[#e2e8f0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Students Queries</p>
                <p className="text-[#1e242c] text-2xl font-bold">02</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#f8fafc] border-[#e2e8f0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Employer Queries</p>
                <p className="text-[#1e242c] text-2xl font-bold">04</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#f8fafc] border-[#e2e8f0]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#696984] text-sm">Institute Queries</p>
                <p className="text-[#1e242c] text-2xl font-bold">01</p>
              </div>
              <div className="w-10 h-10 bg-[#f2efff] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#5832e6]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="student" className="space-y-6">
        <TabsList className="bg-transparent p-0 h-auto space-x-0">
          <TabsTrigger
            value="student"
            className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Student
          </TabsTrigger>
          <TabsTrigger
            value="recruiter"
            className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Employer
          </TabsTrigger>
          <TabsTrigger
            value="institute"
            className="bg-[#0755e9] text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2"
          >
            Institute
          </TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#696984] w-4 h-4" />
            <Input
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="student">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filterQueries(studentQueries).map((query) => (
              <Card key={query.id} className="bg-[#ffffff] border-[#f5f5f5]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(query.priority)}
                      <h3 className="font-semibold text-[#1e242c]">{query.name}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReply(query.id)}
                      className="text-[#0755e9] border-[#0755e9]"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-[#696984]">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {query.type}
                    </div>
                    <div className="bg-[#f8fafc] border-l-4 border-[#0755e9] p-3 rounded">
                      <p className="text-[#696984] text-sm">{query.message}</p>
                    </div>
                    <div className="text-xs text-[#696984] text-right">{query.time}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recruiter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filterQueries(recruiterQueries).map((query) => (
              <Card key={query.id} className="bg-[#ffffff] border-[#f5f5f5]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(query.priority)}
                      <h3 className="font-semibold text-[#1e242c]">{query.name}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReply(query.id)}
                      className="text-[#0755e9] border-[#0755e9]"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-[#696984]">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {query.type}
                    </div>
                    <div className="bg-[#f8fafc] border-l-4 border-[#0755e9] p-3 rounded">
                      <p className="text-[#696984] text-sm">{query.message}</p>
                    </div>
                    <div className="text-xs text-[#696984] text-right">{query.time}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="institute">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filterQueries(instituteQueries).map((query) => (
              <Card key={query.id} className="bg-[#ffffff] border-[#f5f5f5]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(query.priority)}
                      <h3 className="font-semibold text-[#1e242c]">{query.name}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReply(query.id)}
                      className="text-[#0755e9] border-[#0755e9]"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-[#696984]">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {query.type}
                    </div>
                    <div className="bg-[#f8fafc] border-l-4 border-[#0755e9] p-3 rounded">
                      <p className="text-[#696984] text-sm">{query.message}</p>
                    </div>
                    <div className="text-xs text-[#696984] text-right">{query.time}</div>
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
