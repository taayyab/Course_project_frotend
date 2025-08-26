"use client"

import { useParams, useRouter } from "next/navigation"
import { candidates } from "@/lib/data"
import { Badge } from "@/components/employer/ui/badge"
import { Button } from "@/components/employer/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/employer/ui/card"
import { Textarea } from "@/components/employer/ui/textarea"
import { Heart, Share2, Download, Star } from 'lucide-react'

export default function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const c = candidates.find(x => x.id === id) ?? candidates[0]

  return (
    <div className="pt-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Talent Discovery</h1>
      <p className="text-[#696984] mt-1">Find the perfect candidates for your open positions</p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="bg-white border-[#e6e7ef]">
          <CardContent className="p-6">
            <div className="text-center">
              <img alt={c.name} src="/placeholder.svg?height=96&width=96" className="mx-auto h-24 w-24 rounded-full object-cover" />
              <div className="mt-3 font-semibold">{c.name}</div>
              <div className="text-sm text-[#5f5f5f]">{c.title}<br />{c.institute}</div>
              <div className="mt-3 flex justify-center gap-2">
                <Button variant="outline" size="icon" className="border-[#e6e7ef]"><Heart className="h-4 w-4 text-[#0f5ff2]" /></Button>
                <Button variant="outline" size="icon" className="border-[#e6e7ef]"><Share2 className="h-4 w-4 text-[#0f5ff2]" /></Button>
                <Button variant="outline" size="icon" className="border-[#e6e7ef]"><Download className="h-4 w-4 text-[#0f5ff2]" /></Button>
              </div>

              <div className="mt-4 space-y-2">
                <Badge className="bg-[#0f5ff2] hover:bg-[#0d4fe0]">Top Performer</Badge>
                <Badge variant="outline" className="border-[#e6e7ef]">Available Now</Badge>
              </div>

              <div className="mt-6">
                <div className="mx-auto h-24 w-40 rounded-md bg-gradient-to-t from-[#0f5ff2] to-[#7ab1ff] p-2 flex items-end justify-between">
                  {[20, 35, 45, 55, 65, 80].map((h, i) => (
                    <div key={i} className="w-4 bg-white/70 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#ff9500]/15 px-2 py-0.5 text-xs text-[#3f3f3f]">
                  <Star className="h-3 w-3 text-[#ff9500]" /> {c.match}% Match
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card className="bg-white border-[#e6e7ef]">
            <CardHeader><CardTitle className="text-base md:text-lg">About {c.name}</CardTitle></CardHeader>
            <CardContent className="text-[#3f3f3f]">
              Passionate Full-Stack Developer with a strong foundation in modern web technologies and a keen eye for user experience.
            </CardContent>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="bg-white border-[#e6e7ef]">
              <CardHeader><CardTitle className="text-base md:text-lg">Technical Skills</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {c.skills.concat(["TypeScript", "AWS", "Git"]).slice(0, 9).map(s => (
                  <Badge key={s} variant="secondary" className="rounded-full bg-[#f5f7ff] border border-[#e6e7ef] text-[#3f3f3f]">{s}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e6e7ef]">
              <CardHeader><CardTitle className="text-base md:text-lg">Certifications</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                <img src="/images/cert-1.png" alt="Certificate 1" className="rounded-md border border-[#e6e7ef]" />
                <img src="/images/cert-2.png" alt="Certificate 2" className="rounded-md border border-[#e6e7ef]" />
                <img src="/images/cert-3.png" alt="Certificate 3" className="rounded-md border border-[#e6e7ef]" />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-[#e6e7ef]">
            <CardHeader><CardTitle className="text-base md:text-lg">Featured Projects</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {[1,2].map(i => (
                <div key={i} className="rounded-lg border border-[#e6e7ef] p-4">
                  <div className="font-medium">E-Commerce Platform</div>
                  <div className="text-xs text-[#5f5f5f]">Full-Stack E-Commerce Solution With Payment Integration</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["React","Node.js","MongoDB"].map(s => <Badge key={s} variant="secondary" className="rounded-full bg-[#f5f7ff] border border-[#e6e7ef] text-[#3f3f3f]">{s}</Badge>)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white border-[#e6e7ef]">
            <CardHeader><CardTitle className="text-base md:text-lg">Message For School</CardTitle></CardHeader>
            <CardContent>
              <Textarea placeholder="Type Your message for school..." className="min-h-[120px] bg-[#f7f8ff] border-[#e6e7ef]" />
              <div className="mt-4 flex gap-3 justify-end">
                <Button variant="outline" className="border-[#e6e7ef]" onClick={() => router.back()}>Back</Button>
                <Button className="bg-[#0f5ff2] hover:bg-[#0d4fe0]">Notify The Training Institute</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
