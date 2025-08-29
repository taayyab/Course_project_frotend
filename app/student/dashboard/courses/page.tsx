"use client"

import { Star, Users, Timer, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { studentApi, type Course } from "@/lib/student.api"

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const providerId = searchParams.get("providerId")

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [priceFilter, setPriceFilter] = useState("")
  const [durationFilter, setDurationFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchCourses = async () => {
    if (!providerId) return

    try {
      setLoading(true)
      const response = await studentApi.getCoursesByProvider(providerId, {
        page: currentPage,
        limit: 9,
        search: searchTerm,
        category: categoryFilter,
        skill: skillFilter,
        priceType: priceFilter as "free" | "paid",
        duration: durationFilter,
      })

      setCourses(response.payload.courses)
      setTotalPages(response.payload.pagination.totalPages)
      setTotal(response.payload.pagination.total)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [currentPage, searchTerm, categoryFilter, skillFilter, priceFilter, durationFilter, providerId])

  const handleEnroll = async (courseId: string) => {
    try {
      await studentApi.enrollInCourse(courseId)
      alert("Successfully enrolled in the course!")
    } catch (error) {
      console.error("Error enrolling in course:", error)
      alert("Failed to enroll in the course. Please try again.")
    }
  }

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price}`
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Courses</h1>
        <p className="text-gray-600">Expand your skill expert-led courses</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 w-full lg:max-w-md">
          <Input
            placeholder="Search courses by title..."
            className="bg-gray-50 border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto flex-wrap">
          <Select
            value={categoryFilter || "all"}
            onValueChange={(value) => setCategoryFilter(value === "all" ? "" : value)}
          >
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

          <Select value={skillFilter || "all"} onValueChange={(value) => setSkillFilter(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="Frontend Development">Frontend</SelectItem>
              <SelectItem value="Backend Development">Backend</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Machine Learning">ML</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter || "all"} onValueChange={(value) => setPriceFilter(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={durationFilter || "all"}
            onValueChange={(value) => setDurationFilter(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="1-4 weeks">1-4 weeks</SelectItem>
              <SelectItem value="5-8 weeks">5-8 weeks</SelectItem>
              <SelectItem value="9+ weeks">9+ weeks</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="bg-gray-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {courses.length} of {total} courses
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={course.coverImage || "/placeholder.svg?height=200&width=400&text=Course"}
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
                      {getInitials(course.instructor)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">by {course.instructor}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {course.category}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.currentEnrollments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {course.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{course.skills.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleEnroll(course._id)}>
                    Enroll Now
                  </Button>
                  <Link href={`/student/dashboard/course-preview?courseId=${course._id}&providerId=${providerId}`}>
                    <Button variant="outline" className="flex-1 bg-transparent cursor-pointer">
                      Preview
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
