"use client"

import { Star, Users, Timer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/student/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { studentApi, type Course } from "@/lib/student.api"
import { useToast } from "@/hooks/use-toast"

export default function AllCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [skill, setSkill] = useState("all")
  const [priceType, setPriceType] = useState<"all" | "free" | "paid">("all")
  const [duration, setDuration] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0)
  const { toast } = useToast()

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true)
      const params: any = {
        page: currentPage,
        limit: 9,
      }

      if (searchTerm.trim()) params.search = searchTerm.trim()
      if (category !== "all") params.category = category
      if (skill !== "all") params.skill = skill
      if (priceType !== "all") params.priceType = priceType
      if (duration !== "all") params.duration = duration

      const response = await studentApi.getAllCourses(params)

      if (response.success) {
        setCourses(response.payload.courses)
        setTotalPages(response.payload.pagination.pages)
        setTotalCourses(response.payload.pagination.total)
      }
    } catch (error) {
      console.error("Error fetching courses:", error)
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchTerm, category, skill, priceType, duration, toast])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleEnroll = async (courseId: string) => {
    try {
      setEnrolling(courseId)
      await studentApi.enrollInCourse(courseId)
      toast({
        title: "Success",
        description: "Successfully enrolled in the course!",
      })
    } catch (error) {
      console.error("Error enrolling in course:", error)
      toast({
        title: "Error",
        description: "Failed to enroll in course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setEnrolling(null)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case "category":
        setCategory(value)
        break
      case "skill":
        setSkill(value)
        break
      case "priceType":
        setPriceType(value as "all" | "free" | "paid")
        break
      case "duration":
        setDuration(value)
        break
    }
  }

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `€${price.toFixed(2)}`
  }

  const getInstructorInitials = (instructor: string) => {
    return instructor
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading && courses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Courses</h1>
          <p className="text-gray-600">Expand your skills with expert-led courses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Courses</h1>
        <p className="text-gray-600">Expand your skills with expert-led courses</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 w-full lg:max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-gray-50 border-gray-200 pl-10"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Select value={category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={skill} onValueChange={(value) => handleFilterChange("skill", value)}>
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="React">React</SelectItem>
              <SelectItem value="Node.js">Node.js</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priceType} onValueChange={(value) => handleFilterChange("priceType", value)}>
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          <Select value={duration} onValueChange={(value) => handleFilterChange("duration", value)}>
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Duration</SelectItem>
              <SelectItem value="1-4 weeks">1-4 weeks</SelectItem>
              <SelectItem value="5-8 weeks">5-8 weeks</SelectItem>
              <SelectItem value="9+ weeks">9+ weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {courses.length} of {totalCourses} courses
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={course.coverImage || "/placeholder.svg?height=200&width=400"}
                alt={course.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${course.price === 0 ? "bg-green-600" : "bg-blue-600"}`}>
                {formatPrice(course.price)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-orange-500 text-white text-xs">
                    {getInstructorInitials(course.instructor)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">by {course.instructor}</span>
                {course.trainingProvider && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {typeof course.trainingProvider === "string"
                      ? course.trainingProvider
                      : course.trainingProvider.name // or another property like .email
                    }
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 line-clamp-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.currentEnrollments || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {course.skills?.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {course.skills?.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{course.skills.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleEnroll(course._id)}
                  disabled={enrolling === course._id}
                >
                  {enrolling === course._id ? "Enrolling..." : "Enroll Now"}
                </Button>
                <Link href={`/student/dashboard/course-preview?courseId=${course._id}`}>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Preview
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <div className="flex gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
              if (pageNum > totalPages) return null
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  disabled={loading}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </div>
      )}

      {/* No results */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}
