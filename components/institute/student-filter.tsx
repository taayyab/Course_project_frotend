"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

export interface StudentFilter {
  name: string
  course: string
  status: string
}

interface StudentFilterDrawerProps {
  value: StudentFilter
  onChange: (filter: StudentFilter) => void
}

export function StudentFilterDrawer({ value, onChange }: StudentFilterDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-lg bg-transparent">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Students</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              placeholder="Filter by name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={value.course}
              onChange={(e) => onChange({ ...value, course: e.target.value })}
              placeholder="Filter by course"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={value.status} onValueChange={(status) => onChange({ ...value, status })}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => onChange({ name: "", course: "", status: "all" })}>Clear Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
