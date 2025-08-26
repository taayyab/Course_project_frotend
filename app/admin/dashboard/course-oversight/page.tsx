"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Input } from "@/components/admin/ui/input"
import { Textarea } from "@/components/admin/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/admin/ui/dialog"
import { Search, Eye, Play, FileText, Users } from "lucide-react"

// Dummy data
const pendingCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    institute: "TechSkills Academy",
    category: "Web Development",
    duration: "12 weeks",
    price: "£1,299",
    status: "Pending",
    university: "Harvard University",
    email: "oliviarhyne@gmail.com",
    contact: "066-7778-9",
    learningObjects: ["HTML", "CSS", "Node.js", "JavaScript"],
    skills: ["App Development", "React Development", "Web Development", "Application Development"],
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    institute: "DataLearn Institute",
    category: "Data Science",
    duration: "16 weeks",
    price: "£1,599",
    status: "Pending",
    university: "MIT",
    email: "contact@datalearnins.com",
    contact: "066-7778-10",
    learningObjects: ["Python", "SQL", "Machine Learning", "Statistics"],
    skills: ["Data Analysis", "Python Programming", "Statistical Analysis", "ML Implementation"],
  },
]

const approvedCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    institute: "TechSkills Academy",
    category: "Web Development",
    duration: "12 weeks",
    price: "£1,299",
    status: "Approved",
  },
  {
    id: 2,
    title: "Python for Beginners",
    institute: "CodeMaster Institute",
    category: "Programming",
    duration: "8 weeks",
    price: "£899",
    status: "Approved",
  },
]

export default function CourseOversight() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  const handleApprove = () => {
    // Handle course approval
    setIsDialogOpen(false)
    setMessage("")
  }

  const handleDecline = () => {
    // Handle course decline
    setIsDialogOpen(false)
    setMessage("")
  }

  const filterCourses = (courses: any[]) => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.institute.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e242c]">Course & Content Oversight</h1>
        <p className="text-[#696984] mt-1">Review and moderate course content and curriculum</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-transparent p-0 h-auto space-x-0 ">
          <TabsTrigger
            value="pending"
            className="bg-[#0755e9] cursor-pointer text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2 mr-2"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="bg-[#0755e9] cursor-pointer text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#696984] rounded-md px-4 py-2"
          >
            Approved
          </TabsTrigger>
        </TabsList>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#696984] w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Courses Pending (2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Institute</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Duration</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterCourses(pendingCourses).map((course) => (
                      <tr key={course.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{course.title}</div>
                            <div className="flex space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Play className="w-3 h-3 mr-1" />
                                Videos
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <FileText className="w-3 h-3 mr-1" />
                                Quizzes
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                Projects
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#696984]">{course.institute}</td>
                        <td className="py-4 px-4 text-[#696984]">{course.category}</td>
                        <td className="py-4 px-4 text-[#696984]">{course.duration}</td>
                        <td className="py-4 px-4 text-[#696984]">{course.price}</td>
                        <td className="py-4 px-4">
                          <Badge className="bg-[#ff9500] text-white hover:bg-[#ff9500]/90 cursor-pointer">{course.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="outline" size="sm" onClick={() => handleViewCourse(course)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Courses Approved (2)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f5f5f5]">
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Institute</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Duration</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#696984]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterCourses(approvedCourses).map((course) => (
                      <tr key={course.id} className="border-b border-[#f5f5f5]">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-[#1e242c]">{course.title}</div>
                            <div className="flex space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Play className="w-3 h-3 mr-1" />
                                Videos
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <FileText className="w-3 h-3 mr-1" />
                                Quizzes
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                Projects
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#696984]">{course.institute}</td>
                        <td className="py-4 px-4 text-[#696984]">{course.category}</td>
                        <td className="py-4 px-4 text-[#696984]">{course.duration}</td>
                        <td className="py-4 px-4 text-[#696984]">{course.price}</td>
                        <td className="py-4 px-4">
                          <Badge className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90">{course.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="outline" size="sm" onClick={() => handleViewCourse(course)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Course Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1e242c]">{selectedCourse?.university}</DialogTitle>
          </DialogHeader>

          {selectedCourse && (
            <div className="space-y-6">
              {/* University Info */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#dc2626] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">H</span>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#696984]">Email Address</p>
                      <p className="text-[#1e242c]">{selectedCourse.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#696984]">Contact</p>
                      <p className="text-[#1e242c]">{selectedCourse.contact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1e242c]">{selectedCourse.title}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-[#696984]">Category: </span>
                    <span className="text-[#1e242c] font-medium">{selectedCourse.category}</span>
                  </div>
                  <div>
                    <span className="text-[#696984]">Duration: </span>
                    <span className="text-[#1e242c] font-medium">{selectedCourse.duration}</span>
                  </div>
                  <div>
                    <span className="text-[#696984]">Price: </span>
                    <span className="text-[#1e242c] font-medium">{selectedCourse.price}</span>
                  </div>
                </div>
              </div>

              {/* Learning Objects */}
              <div>
                <h4 className="font-medium text-[#1e242c] mb-3">Learning Objects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.learningObjects?.map((obj: string, index: number) => (
                    <Badge key={index} className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90">
                      {obj}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-medium text-[#1e242c] mb-3">Skills You'll Learn</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-[#696984]">
                  {selectedCourse.skills?.map((skill: string, index: number) => (
                    <div key={index}>• {skill}</div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <h4 className="font-medium text-[#1e242c] mb-3">Message</h4>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="text-[#696984] border-[#696984] bg-transparent"
            >
              Declined
            </Button>
            <Button onClick={handleApprove} className="bg-[#0755e9] text-white hover:bg-[#0755e9]/90">
              Approved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
