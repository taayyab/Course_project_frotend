import { Star, Users, Timer, Filter } from "lucide-react"
import { Button } from "@/components/student/ui/button"
import { Card, CardContent } from "@/components/student/ui/card"
import { Avatar, AvatarFallback } from "@/components/student/ui/avatar"
import { Badge } from "@/components/student/ui/badge"
import { Input } from "@/components/student/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/student/ui/select"
import Image from "next/image"
import Link from "next/link"

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development",
      instructor: "Sarah Johnson",
      academy: "Tech Academy",
      rating: 4.8,
      students: "12,500",
      duration: "40, Hours",
      price: "Free",
      tags: ["HTML", "CSS", "JavaScript", "+1"],
      image: "/placeholder.svg?height=200&width=400",
      avatar: "SJ",
    },
    {
      id: 2,
      title: "Advance Python For Data...",
      instructor: "Dr.Micheal Chen",
      academy: "Data Learn",
      rating: 4.9,
      students: "8,200",
      duration: "60, Hours",
      price: "€49.99",
      tags: ["Python", "Pandas", "Numpy", "+1"],
      image: "/placeholder.svg?height=200&width=400",
      avatar: "MC",
    },
    {
      id: 3,
      title: "Digital Marketing...",
      instructor: "Emma Wilson",
      academy: "Market Pro",
      rating: 4.8,
      students: "15,800",
      duration: "25, Hours",
      price: "€29.99",
      tags: ["SEO", "Social Media", "Analytics", "+1"],
      image: "/placeholder.svg?height=200&width=400",
      avatar: "EW",
    },
  ]

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

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...courses, ...courses].map((course, index) => (
          <Card key={`${course.id}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${course.price === "Free" ? "bg-blue-600" : "bg-blue-600"}`}>
                {course.price}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-orange-500 text-white text-xs">{course.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">by {course.instructor}</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {course.academy}
                </Badge>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {course.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                <Link href="/student/dashboard/course-preview">

                <Button variant="outline" className="flex-1 bg-transparent cursor-pointer">
                  Preview
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
