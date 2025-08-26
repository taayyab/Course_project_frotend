"use client"

import Link from "next/link"
import { AppShell } from "@/components/institute/app-shell"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/institute/ui/card"
import { Button } from "@/components/institute/ui/button"
import { CourseCard } from "@/components/institute/course-card"

export default function CoursesPage() {
  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#1e242c]">Courses</h1>
            <p className="mt-1 text-[#696984]">Manage curriculum, resources, and accreditation requirements</p>
          </div>
          <Button asChild className="rounded-lg bg[#0755E9]">
            <Link href="/school/dashboard/courses/create">Create Course</Link>
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCard key={i} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
