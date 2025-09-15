"use client"

import { AppShell } from "@/components/institute/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/institute/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/institute/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/institute/ui/avatar"
import { Button } from "@/components/institute/ui/button"
import { Phone, Video, Info, Send ,MessageCircle } from 'lucide-react'
import { Input } from "@/components/institute/ui/input"
import { useState, useEffect, useCallback, useRef } from "react"
import io from "socket.io-client"
import { chatApiService, type Message } from "@/lib/chat.api"

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
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [conversations, setConversations] = useState<any[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [employers, setEmployers] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const socketRef = useRef<ReturnType<typeof io> | null>(null)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  // Connect socket
  useEffect(() => {
    if (!token) return
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      auth: { token },
      transports: ["websocket", "polling"],
      timeout: 20000,
      forceNew: true,
    })
    socketRef.current = socket
    return () => { socket.disconnect() }
  }, [token])

  // Fetch employers and students for directory (replace with your API calls)
  useEffect(() => {
    // TODO: Replace with real API calls
    setEmployers([
      { _id: "emp1", fullName: "Employer One" },
      { _id: "emp2", fullName: "Employer Two" },
    ])
    setStudents([
      { _id: "stu1", fullName: "Student One" },
      { _id: "stu2", fullName: "Student Two" },
    ])
  }, [])

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    setLoading(true)
    try {
      const response = await chatApiService.getConversations()
      setConversations(response.payload.conversations || [])
    } catch {
      setConversations([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchConversations() }, [fetchConversations])

  // Fetch messages for selected conversation
  const fetchMessages = useCallback(async () => {
    if (!selectedConversationId) return
    setLoading(true)
    try {
      const response = await chatApiService.getAllConversationMessages(selectedConversationId)
      const mapped = (response.payload.messages || []).map((msg: any) => ({
        id: msg._id || msg.id,
        conversationId: msg.conversationId,
        senderId: msg.sender?._id || msg.senderId,
        senderType: msg.sender?.role || msg.senderType,
        message: typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text),
        timestamp: msg.createdAt || msg.timestamp,
        status: msg.status || "sent",
      }))
      setMessages(mapped)
    } catch {
      setMessages([])
    } finally {
      setLoading(false)
    }
  }, [selectedConversationId])

  useEffect(() => {
    fetchMessages()
    if (socketRef.current && selectedConversationId) {
      socketRef.current.emit("conversation:join", selectedConversationId)
      socketRef.current.off("message:new")
      socketRef.current.on("message:new", (data: any) => {
        setMessages((prev) => [...prev, {
          id: data.message._id || data.message.id,
          conversationId: data.message.conversationId,
          senderId: data.message.sender?._id || data.message.senderId,
          senderType: data.message.sender?.role || data.message.senderType,
          message: data.message.message || data.message.text,
          timestamp: data.message.timestamp || data.message.createdAt,
          status: data.message.status || "sent",
        }])
      })
    }
  }, [fetchMessages, selectedConversationId])

  // Start conversation with target user
  const handleContact = async (targetUserId: string) => {
    try {
      const response = await chatApiService.startConversation(targetUserId)
      const conversationId = response.payload.conversation._id
      setSelectedConversationId(conversationId)
      fetchConversations()
    } catch {
      // Handle error
    }
  }

  // Send message via socket
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversationId) return
    if (socketRef.current) {
      socketRef.current.emit(
        "message:send",
        {
          conversationId: selectedConversationId,
          text: messageText,
        },
        (response: any) => {
          if (response.success) setMessageText("")
        }
      )
    }
  }

  // Layout
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

        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Messages</h1>
          <p className="text-muted-foreground mt-1">Contact employers and students</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Employer Directory */}
            <Card>
              <CardHeader>Employers</CardHeader>
              <CardContent>
                {employers.map((emp) => (
                  <div key={emp._id} className="flex items-center justify-between py-2">
                    <span>{emp.fullName}</span>
                    <Button size="sm" onClick={() => handleContact(emp._id)}>Contact</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Student Directory */}
            <Card>
              <CardHeader>Students</CardHeader>
              <CardContent>
                {students.map((stu) => (
                  <div key={stu._id} className="flex items-center justify-between py-2">
                    <span>{stu.fullName}</span>
                    <Button size="sm" onClick={() => handleContact(stu._id)}>Contact</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Chat Sidebar & Window */}
            <Card className="col-span-1 md:col-span-1 flex flex-col">
              <CardHeader>Conversations</CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-1/3 border-r pr-2">
                    {loading ? (
                      <div>Loading...</div>
                    ) : conversations.length === 0 ? (
                      <div className="text-muted-foreground">No conversations yet</div>
                    ) : (
                      <div>
                        {conversations.map((conv: any) => (
                          <div
                            key={conv._id}
                            className={`p-2 cursor-pointer rounded ${selectedConversationId === conv._id ? "bg-muted" : ""}`}
                            onClick={() => setSelectedConversationId(conv._id)}
                          >
                            <div className="font-medium">{
                              Array.isArray(conv.participantUsers)
                                ? conv.participantUsers.map((u: any) => typeof u.fullName === "string" ? u.fullName : JSON.stringify(u.fullName)).join(", ")
                                : typeof conv.participantUsers === "string"
                                  ? conv.participantUsers
                                  : JSON.stringify(conv.participantUsers)
                            }</div>
                            <div className="text-xs text-muted-foreground">{
                              typeof conv.lastMessage === "string"
                                ? conv.lastMessage
                                : conv.lastMessage
                                  ? JSON.stringify(conv.lastMessage)
                                  : "No messages yet"
                            }</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Chat Window */}
                  <div className="w-2/3 pl-2 flex flex-col h-[400px]">
                    <div className="flex-1 overflow-y-auto space-y-4">
                      {loading ? (
                        <div>Loading...</div>
                      ) : messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>No messages yet</p>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <MessageBubble key={message.id} message={message} />
                        ))
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1 border-0 focus-visible:ring-0 bg-transparent"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage() }}
                      />
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function MessageBubble({ message }: { message: Message }) {
  // School sent messages on right, others on left
  const isFromSchool = message.senderType === "school"
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
  let content: string | number = ""
  if (typeof message.message === "string" || typeof message.message === "number") {
    content = message.message
  } else {
    content = JSON.stringify(message.message)
  }
  return (
    <div className={`flex ${isFromSchool ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[60%] rounded-lg p-3 ${isFromSchool ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <div className="text-sm">{content}</div>
        <div className={`text-xs mt-1 ${isFromSchool ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{time}</div>
      </div>
    </div>
  )
}
