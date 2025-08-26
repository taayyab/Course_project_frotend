"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/employer/ui/card"
import { Badge } from "@/components/employer/ui/badge"
import { Button } from "@/components/employer/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/employer/ui/avatar"
import { Separator } from "@/components/employer/ui/separator"
import { BarChart3, Briefcase, CalendarClock, MapPin, Medal, Star, Users2 } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"

function StatCard({
  icon,
  title,
  value,
  delta,
  deltaColor = "neutral",
}: {
  icon: React.ReactNode
  title: string
  value: string
  delta: string
  deltaColor?: "positive" | "warning" | "neutral"
}) {
  const badgeBg =
    deltaColor === "positive"
      ? "text-[#0f5ff2]"
      : deltaColor === "warning"
        ? "text-[#ff9500]"
        : "text-[#5f5f5f]"
  return (
    <Card className="bg-white/90 border-[#e6e7ef] shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#0f5ff2]/10 flex items-center justify-center">{icon}</div>
          <span className="text-sm text-[#696984]">{title}</span>
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
        <div className={cn("mt-1 text-xs", badgeBg)}>{delta}</div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div>
      <section className="mt-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-[#696984] mt-1">
          {"Welcome back! Here's what's happening with your talent pipeline."}
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users2 className="h-4 w-4 text-[#0f5ff2]" />} title="Active Candidates" value="2,847" delta="+12% from last month" deltaColor="positive" />
        <StatCard icon={<Briefcase className="h-4 w-4 text-[#0f5ff2]" />} title="Open Positions" value="23" delta="+3 from last month" deltaColor="positive" />
        <StatCard icon={<CalendarClock className="h-4 w-4 text-[#0f5ff2]" />} title="Interviews Scheduled" value="42" delta="-5% from last month" deltaColor="warning" />
        <StatCard icon={<BarChart3 className="h-4 w-4 text-[#0f5ff2]" />} title="Hiring Success Rate" value="68%" delta="+4% from last month" deltaColor="positive" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="bg-white/90 border-[#e6e7ef] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">AI‑Matched Candidates</CardTitle>
            <Button variant="outline" className="h-8 text-sm border-[#e6e7ef]">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 md:grid-cols-2">
              <CandidateCard />
              <CandidateCard />
            </div>
          </CardContent>
        </Card>

        <UpcomingInterviews />
      </section>
    </div>
  )
}

function CandidateCard() {
  return (
    <Card className="border-[#e6e7ef] bg-white">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=60&width=60" alt="Candidate avatar" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">Alex Rodriguez</div>
            <div className="text-sm text-[#5f5f5f]">Full Stack Development<br />CodeCraft Academy</div>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-[#3f3f3f]">
          <div className="flex items-center gap-2">
            <Medal className="h-4 w-4 text-[#0f5ff2]" />
            <span className="text-[#5f5f5f]">A+</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#0f5ff2]" />
            <span className="text-[#5f5f5f]">San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#ff9500]/15 px-2 py-1 text-xs text-[#3f3f3f]">
              <Star className="h-3 w-3 text-[#ff9500]" />95% match
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full bg-[#f5f7ff] text-[#3f3f3f] border border-[#e6e7ef]">React</Badge>
          <Badge variant="secondary" className="rounded-full bg-[#f5f7ff] text-[#3f3f3f] border border-[#e6e7ef]">Node.js</Badge>
          <Badge variant="secondary" className="rounded-full bg-[#f5f7ff] text-[#3f3f3f] border border-[#e6e7ef]">Python</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingInterviews() {
  return (
    <Card className="bg-white/90 border-[#e6e7ef] shadow-sm">
      <CardHeader><CardTitle className="text-xl">Upcoming Interviews</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <InterviewItem name="Sarah Chen" role="Frontend Developer" when="Today, 2:00 PM" type="Technical Interview" />
        <Separator className="bg-[#e6e7ef]" />
        <InterviewItem name="Sarah Chen" role="Frontend Developer" when="Today, 2:00 PM" type="Technical Interview" />
      </CardContent>
    </Card>
  )
}

function InterviewItem({ name, role, when, type }: { name: string; role: string; when: string; type: string }) {
  return (
    <div className="rounded-lg bg-[#f7f8ff] p-4 border border-[#e6e7ef]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-[#5f5f5f]">{role}</div>
        </div>
        <span className="text-xs text-[#0f5ff2]">{when}</span>
      </div>
      <div className="mt-3">
        <Badge className="bg-[#0f5ff2]/10 text-[#0f5ff2] hover:bg-[#0f5ff2]/15">{type}</Badge>
      </div>
    </div>
  )
}
