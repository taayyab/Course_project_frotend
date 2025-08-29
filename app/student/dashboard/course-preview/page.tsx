"use client"

import Link from "next/link"
import { ArrowLeft, Star, Clock, Users, Globe, Play, CheckCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { studentApi, type Course } from "@/lib/student.api"

export default function CoursePreviewPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")
  const providerId = searchParams.get("providerId")

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return

      try {
        setLoading(true)
        const response = await studentApi.getCourseDetails(courseId)
        setCourse(response.payload.course)
      } catch (error) {
        console.error("Error fetching course details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseDetails()
  }, [courseId])

  const handleEnroll = async () => {
    if (!courseId) return

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] animate-pulse">
        <div className="h-80 bg-gray-200"></div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-4">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link
            href={providerId ? `/student/dashboard/courses?providerId=${providerId}` : "/student/dashboard/courses"}
          >
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Header Section */}
      <div
        className="text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #2563eb 50%, #1d4ed8 75%, #1e40af 100%)",
          minHeight: "320px",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)",
            }}
          ></div>
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Link
              href={providerId ? `/student/dashboard/courses?providerId=${providerId}` : "/student/dashboard/courses"}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium cursor-pointer">Back</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-[24px] sm:text-[32px] font-bold leading-[1.2] mb-4 sm:mb-6 tracking-[-0.02em]">
                {course.title}
              </h1>

              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{getInitials(course.instructor)}</span>
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-[15px]">{course.instructor}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-80" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 opacity-80" />
                  <span>{course.currentEnrollments} Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 opacity-80" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                  <span>4.8 (2,341 Ratings)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-[28px] sm:text-[36px] font-bold text-gray-900 leading-none">
                    {formatPrice(course.price)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{course.type}</div>
                </div>

                <Button
                  className="w-full h-10 sm:h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium rounded-xl mb-3 shadow-sm text-sm sm:text-base"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-10 sm:h-12 bg-white border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Try Free Preview
                </Button>

                <p className="text-xs text-center text-gray-500 mt-3 sm:mt-4">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {/* Course Image */}
              {course.coverImage && (
                <section>
                  <img
                    src={course.coverImage || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </section>
              )}

              {/* Course Description */}
              <section>
                <h2 className="text-[24px] font-bold text-gray-900 mb-4">Course Description</h2>
                <p className="text-gray-600 leading-[1.6] text-[15px]">{course.description}</p>
              </section>

              {/* Learning Objectives */}
              <section>
                <h2 className="text-[24px] font-bold text-gray-900 mb-6">Learning Objectives</h2>
                <div className="space-y-4">
                  {course.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-[15px] leading-[1.5]">{objective}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Course Details */}
              <section>
                <h2 className="text-[24px] font-bold text-gray-900 mb-6">Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF5FF] rounded-lg border border-[#dbeafe]">
                    <span className="text-[#9665BE] text-sm font-medium">Duration: {course.duration}</span>
                  </div>
                  <div className="p-4 bg-[#FAF5FF] rounded-lg border border-[#dbeafe]">
                    <span className="text-[#9665BE] text-sm font-medium">Language: {course.language}</span>
                  </div>
                  <div className="p-4 bg-[#FAF5FF] rounded-lg border border-[#dbeafe]">
                    <span className="text-[#9665BE] text-sm font-medium">Type: {course.type}</span>
                  </div>
                  <div className="p-4 bg-[#FAF5FF] rounded-lg border border-[#dbeafe]">
                    <span className="text-[#9665BE] text-sm font-medium">Category: {course.category}</span>
                  </div>
                </div>
              </section>

              {/* Skills You'll Learn */}
              <section>
                <h2 className="text-[24px] font-bold text-gray-900 mb-6">Skills You'll Learn</h2>
                <div className="flex flex-wrap gap-3">
                  {course.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-[#eff6ff] text-[#1d4ed8] hover:text-[#ffff] hover:bg-[#8096D2] border-[#bfdbfe] px-4 py-2 rounded-full font-medium text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Certificate */}
              <div className="bg-[#FEF9EA] rounded-2xl p-6 border border-[#FDF6CB]/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FDF6CB] rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#BA9C76]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#BA9C76] text-[14px]">Certificate of Completion</h3>
                    <p className="text-[#CFB284] text-sm mt-1">
                      Earn a verified certificate upon successful completion of this course
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{formatPrice(course.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrolled:</span>
                  <span className="font-medium">{course.currentEnrollments} students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
