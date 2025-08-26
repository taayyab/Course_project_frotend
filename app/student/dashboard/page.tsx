import { BookOpen, Award, Briefcase, Clock, Star, Users, Timer } from "lucide-react"
import { Button } from "@/components/student/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/student/ui/card"
import { Avatar, AvatarFallback } from "@/components/student/ui/avatar"
import { Badge } from "@/components/student/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Courses Enrolled</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Certificates Earned</p>
                  <p className="text-2xl font-bold">08</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Job Applications</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Learning Hours</p>
                  <p className="text-2xl font-bold">150</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Continue Learning</CardTitle>
            <p className="text-gray-600">Pick up where you left off</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">Advanced React Development</h3>
                    <p className="text-sm text-gray-600">Module 8: State Management with Redux</p>
                  </div>
                  <div className="relative w-26 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="75, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center mr-9">
                      <span className="text-xs font-semibold text-blue-600">75%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Complete</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">Advanced React Development</h3>
                    <p className="text-sm text-gray-600">Module 8: State Management with Redux</p>
                  </div>
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="75, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600">75%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Browse New Courses */}
        <Card>
          <CardHeader>
            <Link href="/dashboard/courses">
            <CardTitle className="text-xl cursor-pointer">Browse New Courses</CardTitle></Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Course thumbnail"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600">Free</Badge>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-orange-500 text-white text-xs">SJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">by Sarah Johnson</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Tech Academy
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">Complete Web Development</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>12,500</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span>40, Hours</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      HTML
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      CSS
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      +1
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Course thumbnail"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-blue-600">$49.99</Badge>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">MC</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">by Dr.Micheal Chen</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Data Learn
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">Advance Python For Data...</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>8,200</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span>60, Hours</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Pandas
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Numpy
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      +1
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/student/dashboard/courses">
            <Button variant="ghost" className="w-full justify-start text-gray-600 cursor-pointer">
              Browse New Courses
            </Button></Link>
            <Link href="/student/dashboard/profile">
            <Button variant="ghost" className="w-full justify-start text-gray-600 cursor-pointer">
              Update Profile
            </Button></Link>
            <Link href="/student/dashboard/job-board">
            <Button variant="ghost" className="w-full justify-start text-gray-600 cursor-pointer">
              Find Jobs
            </Button></Link>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Junior Frontend Developer</p>
                <p className="text-sm text-gray-600">TechCorp Ltd</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Interview</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Data Analyst Apprentice</p>
                <p className="text-sm text-gray-600">DataCorp Solutions</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Applied</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="67, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">8h / 12h</span>
                  <span className="text-xs text-gray-500">Study Time</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">4 hours</span> left to reach your weekly goal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
