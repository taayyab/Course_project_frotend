"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/institute/app-shell";
import { Button } from "@/components/institute/ui/button";
import { CourseCard } from "@/components/institute/course-card";
import { getCoursesByProvider } from "@/lib/school.api";

interface Course {
  _id: string;
  coverImage?: string;
  title: string;
  instructor: string;
  duration: string;
  price: number;
  language: string;
  category: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const providerId = "68ad837071168afacae78e2c"; // Replace with dynamic ID if needed

    const fetchCourses = async () => {
      setLoading(true);
      const data = await getCoursesByProvider(providerId);
      setCourses(data);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#1e242c]">Courses</h1>
            <p className="mt-1 text-[#696984]">
              Manage curriculum, resources, and accreditation requirements
            </p>
          </div>
          <Button asChild className="rounded-lg bg[#0755E9]">
            <Link href="/school/dashboard/courses/create">Create Course</Link>
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course} // Pass props properly
              />
            ))
          ) : (
            <p className="text-gray-500">No courses available.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
