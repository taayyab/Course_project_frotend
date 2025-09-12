"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Filter, ChevronDown, Star } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/employer/ui/avatar"
import { getPotentialStudents } from "@/lib/employer.api"
import { useConversations } from "@/hooks/use-chat"
import { useRouter } from "next/navigation"

export default function CandidatesPage() {
  const [mounted, setMounted] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({ name: "All", experience: "All", grade: "All" })
  const [sortBy, setSortBy] = useState<"match" | "name">("match")
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalStudents: 0,
    limit: 10,
  })

  const { startConversation } = useConversations()
  const router = useRouter()

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await getPotentialStudents({
        page: pagination.currentPage,
        limit: pagination.limit,
        sortBy: sortBy === "match" ? "matchPercentage" : "name",
        sortOrder: sortBy === "match" ? "desc" : "asc",
      })

      setStudents(response.payload.students)
      setPagination(response.payload.pagination)
    } catch (error) {
      console.error("Failed to fetch students:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleContactSchool = async (student: any) => {
    try {
      // Get the first school ID from the student's schoolUserIds
      const schoolId = student.studentDetails?.schoolUserIds?.[0]?.userId

      if (!schoolId) {
        console.error("No school ID found for student")
        return
      }

      const conversationId = await startConversation(schoolId)
      router.push("/employer/message")
    } catch (error) {
      console.error("Failed to start conversation:", error)
    }
  }

  const filteredStudents = students.filter((student) => {
    const details = student.studentDetails || {}
    if (query.trim()) {
      const q = query.toLowerCase()
      const searchFields = [
        `${details.firstName ?? ""} ${details.lastName ?? ""}`,
        details.location ?? "",
        ...(details.skills ?? []),
      ]
      if (!searchFields.some((field) => field.toLowerCase().includes(q))) {
        return false
      }
    }
    if (filters.name !== "All" && !(details.firstName ?? "").toLowerCase().startsWith(filters.name.toLowerCase())) {
      return false
    }
    // Experience and grade can be added if present in details
    return true
  })

  useEffect(() => {
    fetchStudents()
  }, [sortBy, pagination.currentPage])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted
  if (!mounted) return null

  return (
    <div className="pt-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Talent Discovery</h1>
      <p className="text-muted-foreground mt-1">Find the perfect candidates for your open positions</p>

      <div className="mt-4 rounded-xl bg-card border p-3 flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, skills, or course…"
          className="bg-muted max-w-xl"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="ml-auto gap-2 bg-transparent">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[360px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <Label>By Name</Label>
                <Select value={filters.name} onValueChange={(v) => setFilters((s) => ({ ...s, name: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="A">A…</SelectItem>
                    <SelectItem value="S">S…</SelectItem>
                    <SelectItem value="M">M…</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>By Experience</Label>
                <Select value={filters.experience} onValueChange={(v) => setFilters((s) => ({ ...s, experience: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="0-1 year">0-1 year</SelectItem>
                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                    <SelectItem value="2-5 years">2-5 years</SelectItem>
                    <SelectItem value="5+ years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>By Grades</Label>
                <Select value={filters.grade} onValueChange={(v) => setFilters((s) => ({ ...s, grade: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="C+">C+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="ghost"
                className="mr-auto"
                onClick={() => setFilters({ name: "All", experience: "All", grade: "All" })}
              >
                Clear
              </Button>
              <Button>Done</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Separator orientation="vertical" className="hidden sm:block h-6" />
        <Button
          variant="outline"
          className="gap-1 bg-transparent"
          onClick={() => setSortBy((s) => (s === "match" ? "name" : "match"))}
        >
          Sort by {sortBy === "match" ? "Match Score" : "Name"} <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 text-sm text-muted-foreground">
        {loading ? "Loading..." : `${filteredStudents.length} Candidates Found`}
      </div>

      {loading ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={`skeleton-${i}`} className="animate-pulse">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-muted" />
                  <div className="mt-2 h-4 w-16 bg-muted rounded mx-auto" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-3/4 mx-auto" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="h-10 bg-muted rounded-full" />
                  <div className="h-10 bg-muted rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {filteredStudents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No students found.</div>
          ) : (
            filteredStudents.map((student) => (
              <CandidateCard
                key={student.id || student.studentId}
                student={student}
                onContactSchool={handleContactSchool}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function CandidateCard({ student, onContactSchool }: { student: any; onContactSchool: (student: any) => void }) {
  const details = student.studentDetails || {}
  const fullName = `${details.firstName ?? ""} ${details.lastName ?? ""}`.trim()

  return (
    <Card className="bg-card border shadow-sm">
      <CardContent className="p-6">
        <div className="text-center">
          <Avatar className="mx-auto h-20 w-20">
            <AvatarImage src={details.profilePicture || `/placeholder.svg?height=80&width=80`} alt={fullName} />
            <AvatarFallback>{fullName ? fullName[0] : "N"}</AvatarFallback>
          </Avatar>
          <div className="mt-2 inline-flex items-center gap-1 text-xs rounded-full bg-primary/10 px-2 py-0.5 text-primary">
            <Star className="h-3 w-3" />
            {student.matchPercentage}% match
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="text-lg font-semibold">{fullName}</div>
          <div className="text-sm text-muted-foreground">{details.location && <div>{details.location}</div>}</div>
        </div>
        {details.skills && details.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {details.skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
            {details.skills.length > 3 && (
              <Badge variant="secondary" className="rounded-full">
                +{details.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button className="h-10 rounded-full bg-primary hover:bg-primary/90" onClick={() => onContactSchool(student)}>
            Contact with school
          </Button>
          <Button variant="outline" asChild className="h-10 rounded-full bg-transparent">
            <Link href={`/employer/talent-discovery/${student.studentId}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
