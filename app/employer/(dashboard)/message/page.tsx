"use client"

import { conversations, chatThread } from "@/lib/data"
import { Card, CardContent, CardHeader } from "@/components/employer/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/employer/ui/avatar"
import { Button } from "@/components/employer/ui/button"
import { Input } from "@/components/employer/ui/input"
import { Phone, Video, Info, Send, Check, Paperclip } from 'lucide-react'
import { useState } from "react"

export default function MessagePage() {
  const [messages, setMessages] = useState(chatThread)
  const [text, setText] = useState("")

  function onSend() {
    if (!text.trim()) return
    setMessages((m) => [...m, { id: Date.now().toString(), side: "right", text, time: "8:01 PM" }])
    setText("")
  }

  return (
    <div className="pt-6">
      <h1 className="text-3xl font-semibold">Messages</h1>
      <p className="text-[#696984] mt-1">Connect with instructors and Employers</p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[340px_1fr]">
        <Card className="bg-white border-[#e6e7ef]">
          <CardContent className="p-3 space-y-3">
            {conversations.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-lg border border-[#e6e7ef] p-3 hover:bg-[#f7f8ff]">
                <img src="/placeholder.svg?height=40&width=40" alt="" className="h-10 w-10 rounded-full" />
                <div className="text-sm">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-[#5f5f5f]">{c.subtitle}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border-[#e6e7ef]">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Jone Deo</div>
                <div className="text-sm text-[#5f5f5f]">Harvard University</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Phone className="h-4 w-4 text-[#0f5ff2]" /></Button>
              <Button variant="ghost" size="icon"><Video className="h-4 w-4 text-[#0f5ff2]" /></Button>
              <Button variant="ghost" size="icon"><Info className="h-4 w-4 text-[#0f5ff2]" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-6">
              {messages.map(m => (
                <Bubble key={m.id} side={m.side} text={m.text} time={m.time} />
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-[#e6e7ef] p-2 flex items-center gap-2">
              <Input placeholder="Digite a mensagem" className="flex-1 border-0 focus-visible:ring-0" value={text} onChange={e => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSend()} />
              <Button variant="ghost" size="icon"><Check className="h-4 w-4 text-[#0f5ff2]" /></Button>
              <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4 text-[#0f5ff2]" /></Button>
              <Button onClick={onSend} className="bg-[#0f5ff2] hover:bg-[#0d4fe0]"><Send className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Bubble({ side, text, time }: { side: "left" | "right"; text: string; time: string }) {
  const right = side === "right"
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[60%] rounded-lg ${right ? "bg-[#0f5ff2] text-white" : "bg-transparent border border-[#e6e7ef]"} p-3`}>
        <div className="text-sm">{text}</div>
        <div className={`text-[10px] mt-1 ${right ? "text-white/80" : "text-[#5f5f5f]"}`}>{time}</div>
      </div>
    </div>
  )
}
