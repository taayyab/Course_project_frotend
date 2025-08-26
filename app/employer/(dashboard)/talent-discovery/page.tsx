"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/employer/ui/button"
import { Card, CardContent } from "@/components/employer/ui/card"
import { Input } from "@/components/employer/ui/input"
import { Badge } from "@/components/employer/ui/badge"
import { Separator } from "@/components/employer/ui/separator"
import { candidates as allCandidates, type Candidate } from "@/lib/data"
import { MapPin, Medal, Filter, ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/employer/ui/sheet"
import { Label } from "@/components/employer/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/employer/ui/select"

export default function TalentDiscoveryPage() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({ name: "All", experience: "All", grade: "All" })
  const [sortBy, setSortBy] = useState<"match" | "name">("match")

  const filtered = useMemo(() => {
    let data = [...allCandidates]
    if (query.trim()) {
      const q = query.toLowerCase()
      data = data.filter(c =>
        [c.name, c.title, c.institute, c.location, ...c.skills].some(v => v.toLowerCase().includes(q)),
      )
    }
    if (filters.name !== "All") data = data.filter(c => c.name.toLowerCase().startsWith(filters.name.toLowerCase()))
    if (filters.experience !== "All") data = data.filter(c => c.experience.includes(filters.experience))
    if (filters.grade !== "All") data = data.filter(c => c.grade === filters.grade)
    if (sortBy === "match") data.sort((a, b) => b.match - a.match)
    if (sortBy === "name") data.sort((a, b) => a.name.localeCompare(b.name))
    return data
  }, [query, filters, sortBy])

  return (
    <div className="pt-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Talent Discovery</h1>
      <p className="text-[#696984] mt-1">Find the perfect candidates for your open positions</p>

      <div className="mt-4 rounded-xl bg-white/80 border border-[#e6e7ef] p-3 flex flex-wrap items-center gap-3">
        <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, skills, or course…" className="bg-[#f7f8ff] border-[#e6e7ef] max-w-xl" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="ml-auto gap-2 border-[#e6e7ef]">
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
                <Select value={filters.name} onValueChange={(v) => setFilters(s => ({ ...s, name: v }))}>
                  <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
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
                <Select value={filters.experience} onValueChange={(v) => setFilters(s => ({ ...s, experience: v }))}>
                  <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
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
                <Select value={filters.grade} onValueChange={(v) => setFilters(s => ({ ...s, grade: v }))}>
                  <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
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
              <Button variant="ghost" className="mr-auto" onClick={() => setFilters({ name: "All", experience: "All", grade: "All" })}>Clear</Button>
              <Button>Done</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Separator orientation="vertical" className="hidden sm:block h-6 bg-[#e6e7ef]" />
        <Button variant="outline" className="gap-1 border-[#e6e7ef]" onClick={() => setSortBy(s => (s === "match" ? "name" : "match"))}>
          Sort by {sortBy === "match" ? "Match Score" : "Name"} <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 text-sm text-[#5f5f5f]">{filtered.length} Candidates Found</div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {filtered.map(c => <CandidateCard key={c.id} c={c} />)}
      </div>
    </div>
  )
}

function CandidateCard({ c }: { c: Candidate }) {
  return (
    <Card className="bg-white border-[#e6e7ef] shadow-sm">
      <CardContent className="p-6">
        <div className="text-center">
          <img alt={c.name} src="/placeholder.svg?height=80&width=80" className="mx-auto h-20 w-20 rounded-full object-cover" />
          <div className="mt-2 inline-flex items-center gap-1 text-xs rounded-full bg-[#0f5ff2]/10 px-2 py-0.5 text-[#0f5ff2]">{c.match}% match</div>
        </div>

        <div className="mt-3 text-center">
          <div className="text-lg font-semibold">{c.name}</div>
          <div className="text-sm text-[#5f5f5f]">{c.title}<br />{c.institute}</div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            className="h-10 rounded-full bg-[#0f5ff2] hover:bg-[#0d4fe0] shadow-[0_6px_16px_rgba(15,95,242,0.25)]"
          >
            Contact with school
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-10 rounded-full border-[#dce2f5] bg-white text-[#344054] hover:bg-[#f7f8ff]"
          >
            <Link href={`/employer/talent-discovery/${c.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
