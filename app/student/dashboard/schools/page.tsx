"use client"

import { Button } from "@/components/student/dashboard/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/student/dashboard/ui/card"
import { Input } from "@/components/student/dashboard/ui/input"
import { MapPin, BookOpen, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/student/dashboard/ui/select"
import Image from "next/image"
import { useState, useEffect } from "react"
import { studentApi, type School } from "@/lib/student.api"

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchSchools = async () => {
    try {
      setLoading(true)
      const response = await studentApi.getSchools({
        page: currentPage,
        limit: 8,
        search: searchTerm,
        location: locationFilter,
        category: categoryFilter,
      })

      setSchools(response.payload.data ?? [])
      setTotalPages(response.payload.pagination.page ?? 1)
      setTotal(response.payload.pagination.total ?? 0)
    } catch (error) {
      console.error("Error fetching schools:", error)
      setSchools([])
      setTotalPages(1)
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchools()
  }, [currentPage, searchTerm, locationFilter, categoryFilter])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleLocationFilter = (value: string) => {
    setLocationFilter(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Schools</h1>
        <p className="text-gray-600">Expand your skill expert-led courses</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 w-full lg:max-w-md">
          <Input
            placeholder="Search schools by name..."
            className="bg-gray-50 border-gray-200"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Select value={locationFilter || "all"} onValueChange={handleLocationFilter}>
            <SelectTrigger className="w-full lg:w-40 bg-gray-50">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="cambridge">Cambridge</SelectItem>
              <SelectItem value="boston">Boston</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="california">California</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter || "all"} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="w-full lg:w-40 bg-gray-50">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-gray-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {schools.length} of {total} schools
      </div>

      {/* Schools Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-16 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schools.map((school) => (
            <Card key={school._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={school.picture || "/placeholder.svg?height=200&width=600&text=School+Campus"}
                  alt={`${school.name} Campus`}
                  width={600}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Image
                      src={school.picture || "/placeholder.svg?height=40&width=40&text=" + school.name.charAt(0)}
                      alt={`${school.name} Logo`}
                      width={40}
                      height={40}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{school.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{school.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">{school.courses.length} Courses</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{school.about}</p>
                <Link href={`/student/dashboard/courses?providerId=${school._id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">View Courses</Button>
                </Link>
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
