"use client";

import { useEffect, useState } from "react";
import { BookOpen, Award, Briefcase, Clock, Star, Users, Timer } from "lucide-react";
import { Button } from "@/components/student/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/student/ui/card";
import { Avatar, AvatarFallback } from "@/components/student/ui/avatar";
import { Badge } from "@/components/student/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getDashboardStats, getCurrentlyEnrolledCourses, getCourses } from "@/lib/student.api";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [browseCourses, setBrowseCourses] = useState<any[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats(token);
        setStats(statsData);

        const enrolledData = await getCurrentlyEnrolledCourses(token);
        setEnrolledCourses(enrolledData);

        const browseData = await getCourses(token);
setBrowseCourses(browseData.slice(0, 2));
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchData();
  }, [token]);

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
                  <p className="text-sm text-gray-600">totalCoursesEnrolled</p>
                  <p className="text-2xl font-bold">{stats?.totalCoursesEnrolled ?? 0}</p>
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
                  <p className="text-sm text-gray-600">completedCourses</p>
                  <p className="text-2xl font-bold">{stats?.completedCourses ?? 0}</p>
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
                  <p className="text-sm text-gray-600">currentlyEnrolled</p>
                  <p className="text-2xl font-bold">{stats?.currentlyEnrolled ?? 0}</p>
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
                  <p className="text-sm text-gray-600">activeCourses</p>
                  <p className="text-2xl font-bold">{stats?.activeCourses ?? 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Currently Enrolled */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Currently Enrolled In</CardTitle>
            <p className="text-gray-600">Pick up where you left off</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(enrolledCourses ?? []).map((item) => (
                <div key={item.enrollmentId} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{item.course.title}</h3>
                      <p className="text-sm text-gray-600">{item.course.description}</p>
                      <p className="text-xs text-gray-500">Instructor: {item.course.instructor}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Status: {item.enrollmentStatus}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Browse New Courses */}
        <Card>
          <CardHeader>
            <Link href="/dashboard/all-Courses">
              <CardTitle className="text-xl cursor-pointer">Browse New Courses</CardTitle>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(browseCourses ?? []).map((course) => (
                <div key={course._id} className="bg-white border rounded-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src={course.coverImage || "/placeholder.svg?height=200&width=400"}
                      alt="Course thumbnail"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-blue-600">
                      {course.price === 0 ? "Free" : `$${course.price}`}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-orange-500 text-white text-xs">
                          {course.instructor?.[0] ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">by {course.instructor}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {course.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.language}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {(course.skills ?? []).slice(0, 3).map((skill: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {(course.skills?.length ?? 0) > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar stays unchanged */}
      <div className="space-y-6">
<Card> <CardHeader> <CardTitle className="text-lg">Quick Actions</CardTitle> </CardHeader> <CardContent className="space-y-3"> <Link href="/student/dashboard/all-courses"> <Button variant="ghost" className="w-full justify-start text-gray-600 cursor-pointer"> Browse New Courses </Button></Link> <Link href="/student/dashboard/profile"> <Button variant="ghost" className="w-full justify-start text-gray-600 cursor-pointer"> Update Profile </Button></Link> <Link href="/student/dashboard/job-board"> <Button variant="ghost" className="w-full justify-start text-gray-600 cursor-pointer"> Find Jobs </Button></Link> </CardContent> </Card>      </div>
    </div>
  );
}
