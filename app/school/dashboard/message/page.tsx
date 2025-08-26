"use client"

import { AppShell } from "@/components/institute/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/institute/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/institute/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/institute/ui/avatar"
import { Button } from "@/components/institute/ui/button"
import { Phone, Video, Info, Send } from 'lucide-react'
import { Input } from "@/components/institute/ui/input"
import { useState } from "react"

type ChatItem = { id: number; from: "me" | "them"; text: string; time: string }

const sampleChat: ChatItem[] = [
  { id: 1, from: "them", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
  { id: 2, from: "me", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
  { id: 3, from: "them", text: "Lorem Ipsum has been the industry's standard dummy", time: "8:00 PM" },
  { id: 4, from: "me", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
]

function ChatPane({ title }: { title: string }) {
  const [text, setText] = useState("")
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1e242c]">Messages</CardTitle>
          <p className="text-sm text-[#696984]">Connect with instructors and employer</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-[#e6e8ee] p-3">
              <Avatar><AvatarImage src="/placeholder.svg?height=40&width=40" /><AvatarFallback>JD</AvatarFallback></Avatar>
              <div className="text-sm">
                <div className="font-medium">Jone Deo</div>
                <div className="text-[#696984]">{title}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar><AvatarImage src="/placeholder.svg?height=40&width=40" /><AvatarFallback>JD</AvatarFallback></Avatar>
            <div>
              <div className="font-semibold">Jone Deo</div>
              <div className="text-sm text-[#696984]">{title}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5 text-[#0a60ff]" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5 text-[#0a60ff]" /></Button>
            <Button variant="ghost" size="icon"><Info className="h-5 w-5 text-[#0a60ff]" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sampleChat.map((m) => (
              <div key={m.id} className="flex flex-col">
                <div className={`max-w-[70%] rounded-lg border px-4 py-3 ${m.from === "me" ? "self-end bg-[#0a60ff] text-white border-[#0a60ff]" : "self-start border-[#cfe0ff] text-[#0a60ff] bg-white"}`}>
                  {m.text}
                </div>
                <span className={`mt-1 text-xs text-[#9e9e9e] ${m.from === "me" ? "self-end" : "self-start"}`}>{m.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#e6e8ee] p-2">
            <Input className="border-0 focus-visible:ring-0" placeholder="Digite a mensagem" value={text} onChange={(e) => setText(e.target.value)} />
            <Button size="icon" className="rounded-xl"><Send className="h-5 w-5" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MessagePage() {
  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <Tabs defaultValue="admin">
          <TabsList className="bg-transparent p-0">
            {["admin", "student", "employer"].map((t) => (
              <TabsTrigger key={t} value={t} className="mr-2 rounded-lg bg-[#eef5ff] text-[#0a60ff] data-[state=active]:bg-[#0a60ff] data-[state=active]:text-white capitalize">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="admin" className="mt-4">
            <ChatPane title="Harvard University" />
          </TabsContent>
          <TabsContent value="student" className="mt-4">
            <ChatPane title="Student" />
          </TabsContent>
          <TabsContent value="employer" className="mt-4">
            <ChatPane title="Employer" />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
