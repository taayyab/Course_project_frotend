import { Button } from "@/components/student/dashboard/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/student/dashboard/ui/card"
import { Input } from "@/components/student/dashboard/ui/input"
import { MapPin, BookOpen, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/student/dashboard/ui/select"
import Image from "next/image"

export default function SchoolsPage() {
  const schools = [
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA",
      courses: "28 Courses",
      description: "Premier institution offering world-class programs in tech, medicine, and business.",
      image: "/placeholder.svg?height=200&width=600&text=Harvard+Campus",
      logo: "/placeholder.svg?height=60&width=60&text=H",
    },
  ]

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
          <Input placeholder="Search your course here..." className="bg-gray-50 border-gray-200" />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Select defaultValue="all-levels">
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-levels">All levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-prices">
            <SelectTrigger className="w-full lg:w-32 bg-gray-50">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-prices">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-gray-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=200&width=600&text=Harvard+Campus"
                alt="Harvard University Campus"
                width={600}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    src="/placeholder.svg?height=40&width=40&text=H"
                    alt="Harvard Logo"
                    width={40}
                    height={40}
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Harvard University</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Cambridge, MA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">28 Courses</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Premier institution offering world-class programs in tech, medicine, and business.
              </p>
              <Link href="/student/dashboard/courses">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  View Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
