import Image from "next/image"
import { Bell, CalendarClock, ChevronRight, GraduationCap, Home, LogOut, Mail, MapPin, Medal, Menu, MessageSquare, Search, Settings, Users, Briefcase, BarChart3, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import { Badge } from "@/components/admin/ui/badge"
import { Button } from "@/components/admin/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Input } from "@/components/admin/ui/input"
import { Separator } from "@/components/admin/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/admin/ui/accordion"
import Link from "next/link"
import { AppShell } from "@/components/institute/app-shell"
import { StatCard } from "@/components/institute/stat-card"
import ProtectedRoute from "@/context/ProtectedRoute"

function CandidateCard() {
  return (
    
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Rodriguez" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-[15px] font-semibold text-[#1e242c]">Alex Rodriguez</div>
            <div className="text-sm text-[#696984]">Full Stack Development</div>
            <div className="text-sm text-[#696984]">CodeCraft Academy</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["React", "Node.js", "Python"].map((s) => (
            <span key={s} className="rounded-full bg-[#fcfcff] text-[#3f3f3f] border border-[#e9ebee] px-3 py-1 text-xs font-medium">
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Dashboard</h1>
        <p className="mt-1 text-[#696984]">Welcome back! Here&apos;s what&apos;s happening with your talent pipeline.</p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={<Users className="h-4 w-4 text-[#0755e9]" />} label="Active Candidates" value="2,847" delta="+12% from last month" />
          <StatCard icon={<Briefcase className="h-4 w-4 text-[#0755e9]" />} label="Open Positions" value="23" delta="+3 from last month" />
          <StatCard icon={<CalendarClock className="h-4 w-4 text-[#0755e9]" />} label="Interviews Scheduled" value="42" delta="-5% from last month" deltaColor="#f13e3e" />
          <StatCard icon={<BarChart3 className="h-4 w-4 text-[#0755e9]" />} label="Hiring Success Rate" value="68%" delta="+4% from last month" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="shadow-sm xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#1e242c]">AI‑Matched Candidates</CardTitle>
              <Button asChild variant="secondary" className="h-8 rounded-full bg-[#f6f8ff] text-[#0755e9] hover:bg-[#eef2ff]">
                <Link href="#">View All <ChevronRight className="ml-1 inline h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <CandidateCard />
                <CandidateCard />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#1e242c]">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-[#f6f8ff] p-4 ring-1 ring-[#e5e9ff]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-[#1e242c]">Sarah Chen</div>
                      <div className="text-sm text-[#696984]">Frontend Developer</div>
                    </div>
                    <span className="text-xs font-medium text-[#0755e9]">Today, 2:00 PM</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#e3e7ee] text-sm">
                    Technical Interview
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      </AppShell>
  )
}
