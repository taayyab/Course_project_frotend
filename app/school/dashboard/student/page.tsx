"use client"

import { AppShell } from "@/components/institute/app-shell"
import { StudentFilter, StudentFilterDrawer } from "@/components/institute/student-filter-drawer"
import { Button } from "@/components/admin/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/admin/ui/card"
import { Input } from "@/components/admin/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { Badge } from "@/components/admin/ui/badge"
import { Download, Filter, Upload } from 'lucide-react'
import { useMemo, useState } from "react"

type StudentRow = {
  id: number
  name: string
  email: string
  phone: string
  course: string
  status: "Active" | "Completed" | "At Risk"
}

const allData: StudentRow[] = Array.from({ length: 60 }).map((_, i) => {
  const courses = ["Advanced Welding", "OSHA Safety", "Electrical Fundamentals"]
  const statuses: StudentRow["status"][] = ["Active", "Completed", "At Risk"]
  return {
    id: i + 1,
    name: i % 5 === 0 ? "Adam" : i % 3 === 0 ? "Alex" : "John Smith",
    email: `john.smith${i}@email.com`,
    phone: "+92302 000000000",
    course: courses[i % courses.length],
    status: statuses[i % statuses.length],
  }
})

export default function StudentPage() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<StudentFilter>({ name: "", course: "", status: "" })
  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = allData
    if (query) {
      const q = query.toLowerCase()
      rows = rows.filter((r) => [r.name, r.email, r.course].some((v) => v.toLowerCase().includes(q)))
    }
    if (filter.name) rows = rows.filter((r) => r.name.includes(filter.name as string))
    if (filter.course) rows = rows.filter((r) => r.course === filter.course)
    if (filter.status) rows = rows.filter((r) => r.status === filter.status)
    return rows
  }, [query, filter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize)

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
                <StudentFilterDrawer value={filter} onChange={(f) => { setPage(1); setFilter(f) }} />
                <Button variant="outline" className="rounded-lg"><Upload className="h-4 w-4 mr-2" /> Import</Button>
                <Button variant="outline" className="rounded-lg"><Download className="h-4 w-4 mr-2" /> Export</Button>
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
                    <TableHead className="w-10 text-right">...</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.phone}</TableCell>
                      <TableCell>{r.course}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            r.status === "Active"
                              ? "bg-[#dfffe0] text-[#0a7a25] rounded-full"
                              : r.status === "Completed"
                              ? "bg-[#e9f0ff] text-[#0a60ff] rounded-full"
                              : "bg-[#fff1cc] text-[#b57500] rounded-full"
                          }
                          variant="secondary"
                        >
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">•••</TableCell>
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
                  onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)) }}
                >
                  {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="text-sm text-[#696984]">
                {filtered.length === 0 ? "0-0 of 0" : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, filtered.length)} of ${filtered.length}`}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" disabled={page === 1} onClick={() => setPage(1)} aria-label="First">⏮</Button>
                <Button variant="ghost" size="icon" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Prev">‹</Button>
                <Button variant="ghost" size="icon" disabled={page === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))} aria-label="Next">›</Button>
                <Button variant="ghost" size="icon" disabled={page === pageCount} onClick={() => setPage(pageCount)} aria-label="Last">⏭</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
