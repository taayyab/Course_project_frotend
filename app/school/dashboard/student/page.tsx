"use client"

import { AppShell } from "@/components/institute/app-shell"
import { type StudentFilter, StudentFilterDrawer } from "@/components/institute/student-filter-drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload } from "lucide-react"
import { useMemo, useState, useEffect } from "react"
import { schoolApi, type Student } from "@/lib/school.api"
import { useToast } from "@/hooks/use-toast"

export default function StudentPage() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<StudentFilter>({ name: "", course: "", status: "" })
  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(1)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const { toast } = useToast()

  // Get token from localStorage (runs only on client)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [])

  const fetchStudents = async () => {
    if (!token) return
    try {
      setLoading(true)
      const response = await schoolApi.getStudentsDirectory(token, page, pageSize)
      if (response.success) {
        setStudents(response.payload.students)
        setTotal(response.payload.pagination.total)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
      toast({
        title: "Error",
        description: "Failed to fetch students data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, token])

  const filtered = useMemo(() => {
    let rows = students
    if (query) {
      const q = query.toLowerCase()
      rows = rows.filter((r) =>
        [
          r.name,
          r.email,
          (r.enrolledCourses || []).map((c) => c.courseName).join(" "),
        ]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(q))
      )
    }
    if (filter.name)
      rows = rows.filter((r) =>
        r.name.toLowerCase().includes(filter.name.toLowerCase())
      )
    if (filter.course)
      rows = rows.filter((r) =>
        (r.enrolledCourses || []).some((course) => course.courseId === filter.course)
      )
    if (filter.status) rows = rows.filter((r) => r.status === filter.status)
    return rows
  }, [students, query, filter])

  // Update Student type in your API file if needed:
  // enrolledCourses: { enrollmentId: string; courseId: string; courseName: string; status: Student["status"] }[]

  // Flatten students by course, including enrollmentId and courseStatus
  const studentsByCourse = useMemo(() => {
    const rows: Array<Student & { courseName: string; enrollmentId?: string; courseStatus: Student["status"] }> = []
    for (const student of filtered) {
      if (Array.isArray(student.enrolledCourses) && student.enrolledCourses.length > 0) {
        for (const course of student.enrolledCourses) {
          rows.push({
            ...student,
            courseName: course.courseName,
            enrollmentId: course.enrollmentId,
            courseStatus: course.status ?? student.status,
          })
        }
      } else {
        rows.push({ ...student, courseName: "No courses", courseStatus: student.status })
      }
    }
    return rows
  }, [filtered])

  const handleStatusChange = async (
    studentId: string,
    enrollmentId: string,
    newStatus: Student["status"]
  ) => {
    try {
      await schoolApi.updateStudentStatus(token, enrollmentId, newStatus)

      setStudents((prev) =>
        prev.map((student) =>
          student.studentId === studentId
            ? {
                ...student,
                enrolledCourses: student.enrolledCourses.map((course) =>
                  course.enrollmentId === enrollmentId
                    ? { ...course, status: newStatus }
                    : course
                ),
              }
            : student
        )
      )

      toast({
        title: "Success",
        description: "Student course status updated successfully",
      })
    } catch (error) {
      console.error("Error updating student status:", error)
      toast({
        title: "Error",
        description: "Failed to update student status",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeClass = (status: Student["status"]) => {
    switch (status) {
      case "enrolled":
        return "bg-[#dfffe0] text-[#0a7a25] rounded-full"
      case "in-progress":
        return "bg-[#e9f0ff] text-[#0a60ff] rounded-full"
      case "completed":
        return "bg-[#e9f0ff] text-[#0a60ff] rounded-full"
      case "withdrawn":
        return "bg-[#fff1cc] text-[#b57500] rounded-full"
      case "suspended":
        return "bg-[#ffe6e6] text-[#d32f2f] rounded-full"
      default:
        return "bg-gray-100 text-gray-800 rounded-full"
    }
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  if (loading) {
    return (
      <AppShell>
        <div className="px-4 lg:px-8 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading students...</div>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Students</h1>
        <p className="mt-1 text-[#696984]">Manage apprentice lifecycle and track progress</p>

        <Card className="mt-5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Student Directory</CardTitle>
            <CardDescription>Search and manage all students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-lg">
                <Input
                  placeholder="Search students by name, course, or email ..."
                  className="rounded-xl bg-[#fcfcff] border-[#e9ebee]"
                  value={query}
                  onChange={(e) => {
                    setPage(1)
                    setQuery(e.target.value)
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <StudentFilterDrawer
                  value={filter}
                  onChange={(f) => {
                    setPage(1)
                    setFilter(f)
                  }}
                />
                <Button variant="outline" className="rounded-lg bg-transparent">
                  <Upload className="h-4 w-4 mr-2" /> Import
                </Button>
                <Button variant="outline" className="rounded-lg bg-transparent">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#eef0f4]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f3f7ff]">
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Numbers</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsByCourse.map((student, idx) => (
                    <TableRow key={student.studentId + "-" + idx}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.courseName}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(student.courseStatus)} variant="secondary">
                          {student.courseStatus.charAt(0).toUpperCase() + student.courseStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {student.enrollmentId ? (
                          <Select
                            value={student.courseStatus}
                            onValueChange={(newStatus: Student["status"]) =>
                              handleStatusChange(student.studentId, student.enrollmentId!, newStatus)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="enrolled">Enrolled</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="withdrawn">Withdrawn</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Footer */}
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#696984]">Rows per page</span>
                <select
                  className="rounded-md border border-[#e9ebee] bg-white px-2 py-1 text-sm"
                  value={pageSize}
                  onChange={(e) => {
                    setPage(1)
                    setPageSize(Number(e.target.value))
                  }}
                >
                  {[10, 25, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-[#696984]">
                {total === 0
                  ? "0-0 of 0"
                  : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} of ${total}`}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" disabled={page === 1} onClick={() => setPage(1)} aria-label="First">
                  ⏮
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Prev"
                >
                  ‹
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page === pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  aria-label="Next"
                >
                  ›
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page === pageCount}
                  onClick={() => setPage(pageCount)}
                  aria-label="Last"
                >
                  ⏭
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
