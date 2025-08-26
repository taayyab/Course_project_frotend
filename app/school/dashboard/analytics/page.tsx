"use client"

import { useMemo, useState } from "react"
import { AppShell } from "@/components/institute/app-shell"
import { StatCard } from "@/components/institute/stat-card"
import { Users, GraduationCap, BookOpen, Building2, CalendarIcon, Download } from 'lucide-react'
import { Button } from "@/components/institute/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/institute/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/admin/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover"
import { Calendar } from "@/components/admin/ui/calendar"
import { type DateRange } from "react-day-picker"
import { endOfDay, format, isWithinInterval } from "date-fns"

// Build 12 months of demo data for the current year with an actual Date per month.
const now = new Date()
const year = now.getFullYear()
const baseBarData = [
  { month: "Jan", signups: 45, completed: 30 },
  { month: "Feb", signups: 60, completed: 40 },
  { month: "Mar", signups: 85, completed: 55 },
  { month: "Apr", signups: 50, completed: 36 },
  { month: "May", signups: 65, completed: 44 },
  { month: "Jun", signups: 70, completed: 46 },
  { month: "Jul", signups: 58, completed: 41 },
  { month: "Aug", signups: 77, completed: 49 },
  { month: "Sep", signups: 62, completed: 45 },
  { month: "Oct", signups: 68, completed: 47 },
  { month: "Nov", signups: 55, completed: 39 },
  { month: "Dec", signups: 61, completed: 42 },
].map((d, i) => ({
  ...d,
  date: new Date(year, i, 1),
}))

const pieData = [
  { name: "18-25", value: 35, color: "#ff4d4f" },
  { name: "26-35", value: 25, color: "#ff9800" },
  { name: "36-45", value: 15, color: "#0a60ff" },
  { name: "46+", value: 5, color: "#6c8cff" },
  { name: "Other", value: 20, color: "#e6e9f2" },
]

export default function AnalyticsPage() {
  // Default range = last 6 months up to today
  const defaultFrom = new Date(year, Math.max(0, now.getMonth() - 5), 1)
  const defaultTo = now
  const [range, setRange] = useState<DateRange | undefined>({ from: defaultFrom, to: defaultTo })

  const filteredBarData = useMemo(() => {
    if (!range?.from) return baseBarData
    const from = range.from
    const to = endOfDay(range.to ?? range.from)
    return baseBarData.filter((d) => isWithinInterval(d.date, { start: from, end: to }))
  }, [range])

  const rangeLabel = range?.from
    ? range.to
      ? `${format(range.from, "MMM d, yyyy")} - ${format(range.to, "MMM d, yyyy")}`
      : `${format(range.from, "MMM d, yyyy")}`
    : "Pick a date"

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#1e242c]">Analytics</h1>
            <p className="mt-1 text-[#696984]">Monitor institutional performance and track key metrics</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-lg">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {rangeLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="range"
                  numberOfMonths={2}
                  selected={range}
                  defaultMonth={range?.from}
                  onSelect={setRange}
                />
              </PopoverContent>
            </Popover>

            <Button className="rounded-lg">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users className="h-4 w-4 text-[#0755e9]" />}
            label="Total Students"
            value="1,247"
            delta="+12% from last month"
          />
          <StatCard
            icon={<GraduationCap className="h-4 w-4 text-[#0755e9]" />}
            label="Avg. Grade"
            value="87%"
            delta="+2.1% from last month"
          />
          <StatCard
            icon={<BookOpen className="h-4 w-4 text-[#0755e9]" />}
            label="Active Courses"
            value="23"
            delta="+2 new this month"
          />
          <StatCard
            icon={<Building2 className="h-4 w-4 text-[#0755e9]" />}
            label="Employer Partners"
            value="156"
            delta="+8 new partnerships"
          />
        </div>

        <Card className="mt-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">Request From Students</CardTitle>
            <CardDescription>Monthly signups and completions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                signups: { label: "Signups", color: "hsl(var(--chart-1))" },
                completed: { label: "Completed", color: "hsl(var(--chart-2))" },
              }}
              className="h-[340px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Legend />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="signups" fill="var(--color-signups)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="completed" fill="var(--color-completed)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1e242c]">Student Demographics</CardTitle>
              <CardDescription>Age distribution of enrolled students</CardDescription>
            </CardHeader>
            <CardContent className="grid place-items-center">
              <ChartContainer
                config={{ demographics: { label: "Students", color: "hsl(var(--chart-1))" } }}
                className="h-[320px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#1e242c]">Recent Notifications</CardTitle>
              <Button variant="secondary" className="rounded-full bg-[#f6f8ff] text-[#0755e9]">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[#eef0f4] p-3"
                >
                  <div className="text-sm text-[#3f3f3f]">
                    Sarah Johnson request for this course (Advanced Welding)
                  </div>
                  <div className="text-xs text-[#9e9e9e]">2 minutes ago</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
