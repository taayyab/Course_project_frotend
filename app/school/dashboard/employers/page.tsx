"use client"

import { AppShell } from "@/components/institute/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/institute/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/institute/ui/tabs"
import { Input } from "@/components/institute/ui/input"
import { Button } from "@/components/institute/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/institute/ui/table"
import { MessageSquare, Calendar, Filter } from 'lucide-react'
import { useMemo, useState } from "react"
import { TalentRequest, TalentRequestCard } from "@/components/institute/talent-request-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/institute/ui/popover"
import { Checkbox } from "@/components/institute/ui/checkbox"

type Employer = {
  id: number
  name: string
  email: string
  phone: string
  company: string
  location: string
  industry: string
  hireRate: string
}

const EMP_INDUSTRIES = ["Manufacturing", "Construction", "Healthcare"] as const

const employers: Employer[] = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: "John Smith",
  email: "john.smith@techcorp.com",
  phone: "(555) 123-4567",
  company: "TechCorp Industries",
  location: "Chicago, IL",
  industry: EMP_INDUSTRIES[i % EMP_INDUSTRIES.length],
  hireRate: "12%",
}))

const requests: TalentRequest[] = [
  { id: "1", title: "Junior Welder", company: "TechCorp Industries", tags: ["MIG Welding", "Blueprint Reading", "Safety Protocols"], applicants: 5, priority: "High", posted: "2 days" },
  { id: "2", title: "Junior Welder", company: "TechCorp Industries", tags: ["MIG Welding", "Blueprint Reading", "Safety Protocols"], applicants: 5, priority: "High", posted: "2 days" },
  { id: "3", title: "Junior Welder", company: "TechCorp Industries", tags: ["MIG Welding", "Blueprint Reading", "Safety Protocols"], applicants: 5, priority: "High", posted: "2 days" },
  { id: "4", title: "Junior Welder", company: "TechCorp Industries", tags: ["MIG Welding", "Blueprint Reading", "Safety Protocols"], applicants: 5, priority: "High", posted: "2 days" },
]

export default function EmployersPage() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [term, setTerm] = useState("")

  const filtered = useMemo(() => {
    return employers.filter((e) => {
      const inIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(e.industry)
      const searchMatch = [e.name, e.company, e.location, e.email].some((v) =>
        v.toLowerCase().includes(term.toLowerCase())
      )
      return inIndustry && searchMatch
    })
  }, [selectedIndustries, term])

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Employers</h1>
        <p className="mt-1 text-[#696984]">Facilitate industry partnerships and manage employer relationships</p>

        <Tabs defaultValue="directory" className="mt-4">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger value="directory" className="rounded-lg bg-[#eef5ff] text-[#0a60ff] data-[state=active]:bg-[#0a60ff] data-[state=active]:text-white">Employer Directory</TabsTrigger>
            <TabsTrigger value="requests" className="ml-2 rounded-lg bg-[#eef5ff] text-[#0a60ff] data-[state=active]:bg-[#0a60ff] data-[state=active]:text-white">Talent Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="mt-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1e242c]">Verified Employer Directory</CardTitle>
                <CardDescription>Manage industry partner relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <Input className="max-w-xl rounded-xl bg-[#fcfcff] border-[#e9ebee]" placeholder="Search employers by name, industry, or location ..." value={term} onChange={(e) => setTerm(e.target.value)} />
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="rounded-lg"><Filter className="mr-2 h-4 w-4" /> Filter by Industry</Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-60">
                        <div className="text-sm font-medium text-[#1e242c] mb-2">Industries</div>
                        <div className="space-y-2">
                          {EMP_INDUSTRIES.map((ind) => (
                            <label key={ind} className="flex items-center gap-2 text-sm">
                              <Checkbox
                                checked={selectedIndustries.includes(ind)}
                                onCheckedChange={(v) => {
                                  setSelectedIndustries((prev) =>
                                    v ? [...prev, ind] : prev.filter((x) => x !== ind)
                                  )
                                }}
                              />
                              <span>{ind}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Button variant="secondary" className="rounded-full bg-[#f3f6ff] text-[#0a60ff]" onClick={() => setSelectedIndustries([])}>Clear</Button>
                          <Button className="rounded-full">Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-[#eef0f4]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#f3f7ff]">
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Hire Rate</TableHead>
                        <TableHead className="w-28 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((e) => (
                        <TableRow key={e.id}>
                          <TableCell>
                            <div className="font-medium">{e.name}</div>
                            <div className="text-sm text-[#696984]">{e.email}</div>
                            <div className="text-sm text-[#696984]">{e.phone}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{e.company}</div>
                            <div className="text-sm text-[#696984]">{e.location}</div>
                          </TableCell>
                          <TableCell>{e.industry}</TableCell>
                          <TableCell>{e.hireRate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="icon" variant="outline" className="rounded-lg"><MessageSquare className="h-4 w-4" /></Button>
                              <Button size="icon" variant="outline" className="rounded-lg"><Calendar className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {requests.map((r) => <TalentRequestCard key={r.id} item={r} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
