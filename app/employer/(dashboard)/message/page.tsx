"use client"
import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Video, Info, Send, Paperclip, MessageCircle } from "lucide-react"
import { useConversations } from "@/hooks/use-chat"
import { chatApiService, type Message } from "@/lib/chat.api"
import { cn } from "@/lib/utils"
import { useState, useEffect, useCallback, useRef } from "react"
import io, { Socket } from "socket.io-client"
export default function MessagePage() {
  // Socket.IO setup
  const socketRef = useRef<ReturnType<typeof io> | null>(null)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (!token) return
    const socket = io(process.env.REACT_APP_SOCKET_URL || "https://talnet-bridge.vercel.app", {
      auth: { token },
      transports: ["websocket", "polling"],
      timeout: 20000,
      forceNew: true,
    })
    socketRef.current = socket

    socket.on("connect", () => {
      console.log("Connected to chat server")
    })
    socket.on("disconnect", (reason: any) => {
      console.log("Disconnected:", reason)
    })
    socket.on("connect_error", (error: any) => {
      console.error("Connection error:", error)
    })

    return () => {
      socket.disconnect()
    }
  }, [token])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")

  // Redefine Conversation type to match API response
  type Conversation = {
    _id: string;
    participantUsers: Array<{ _id: string; fullName: string; email: string; role: string; avatar?: string }>;
    lastMessage?: string;
    unreadCount?: number;
  };
  const { conversations, loading: conversationsLoading } = useConversations()
  const [messages, setMessages] = useState<Message[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)

  const fetchAllMessages = useCallback(async () => {
    if (!selectedConversationId) return
    setMessagesLoading(true)
    try {
      const response = await chatApiService.getAllConversationMessages(selectedConversationId)
      // response.payload.messages is expected
      const mappedMessages = (response.payload?.messages || []).map((msg: any) => ({
        id: msg._id || msg.id,
        conversationId: msg.conversationId,
        senderId: msg.sender?._id || msg.senderId,
        senderType: msg.sender?.role || msg.senderType,
        message: msg.message || msg.text,
        timestamp: msg.timestamp || msg.createdAt,
        status: msg.status || "sent",
      }))
      setMessages(mappedMessages)
    } catch (err) {
      setMessages([])
    } finally {
      setMessagesLoading(false)
    }
  }, [selectedConversationId])

  // Join conversation room and listen for new messages
  useEffect(() => {
    fetchAllMessages()
    if (socketRef.current && selectedConversationId) {
      socketRef.current.emit("conversation:join", selectedConversationId)
      socketRef.current.off("message:new")
  socketRef.current.on("message:new", (data: any) => {
        // Add new message to UI
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
  }, [fetchAllMessages, selectedConversationId])

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0]._id)
    }
  }, [conversations, selectedConversationId])

  const selectedConversation = conversations.find((c) => c._id === selectedConversationId)

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversationId) return
    if (socketRef.current) {
      socketRef.current.emit(
        "message:send",
        {
          conversationId: selectedConversationId,
          text: messageText,
        },
        (response: any) => {
          if (response.success) {
            setMessageText("")
            // Optionally, you can optimistically add the message or rely on message:new event
          } else {
            console.error("Socket send error:", response.error)
          }
        }
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="pt-6" style={{ height: "60vh", maxHeight: "100dvh", minHeight: "400px", display: "flex", flexDirection: "column" }}>
      <h1 className="text-3xl font-semibold">Messages</h1>
      <p className="text-muted-foreground mt-1">Connect with schools and instructors</p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[340px_1fr] flex-1" style={{ height: "100%" }}>
        {/* Conversations Sidebar */}
        <Card className="bg-card border">
          <CardHeader className="pb-3">
            <h3 className="font-semibold">Conversations</h3>
          </CardHeader>
          <CardContent className="p-0">
            {conversationsLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No conversations yet</p>
                <p className="text-sm">Start chatting with schools from the talent discovery page</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation._id}
                    conversation={conversation}
                    isSelected={selectedConversationId === conversation._id}
                    onClick={() => setSelectedConversationId(conversation._id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="bg-card border flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="flex flex-row items-center justify-between gap-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={getSchool(selectedConversation)?.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={getSchool(selectedConversation)?.fullName || "School"}
                    />
                    <AvatarFallback student={{ name: getSchool(selectedConversation)?.fullName || "School" }}>
                      {(getSchool(selectedConversation)?.fullName?.charAt(0) || "U").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{getSchool(selectedConversation)?.fullName || "School"}</div>
                    <div className="text-sm text-muted-foreground">School Representative</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                {messagesLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                        <div className="max-w-[60%] space-y-2">
                          <div className="h-4 bg-muted rounded w-32 animate-pulse" />
                          <div className="h-12 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start the conversation!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1 border-0 focus-visible:ring-0 bg-transparent"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p>Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function getSchool(conversation: any) {
  // Find the school participant from participantUsers
  return conversation.participantUsers?.find((u: any) => u.role === "school") || null;
}

function ConversationItem({
  conversation,
  isSelected,
  onClick,
}: {
  conversation: any;
  isSelected: boolean;
  onClick: () => void;
}) {
  const school = getSchool(conversation);
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors",
        "hover:bg-muted/50",
        isSelected && "bg-muted",
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={school?.avatar || "/placeholder.svg?height=40&width=40"}
          alt={school?.fullName || "School"}
        />
        <AvatarFallback student={{ name: school?.fullName || "School" }}>
          {(school?.fullName?.charAt(0) || "U").toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{typeof school?.fullName === "string" ? school.fullName : "School"}</div>
        <div className="text-sm text-muted-foreground truncate">{typeof conversation.lastMessage === "string" ? conversation.lastMessage : "No messages yet"}</div>
      </div>
      {conversation.unreadCount && conversation.unreadCount > 0 && (
        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {conversation.unreadCount}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  // Employer receives message: senderType !== 'employer' (right side)
  // Employer sends message: senderType === 'employer' (left side)
  const isReceivedByEmployer = message.senderType !== "employer"
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={`flex ${isReceivedByEmployer ? "justify-end" : "justify-start"}`}>
      <div
        className={cn("max-w-[60%] rounded-lg p-3", isReceivedByEmployer ? "bg-primary text-primary-foreground" : "bg-muted")}
      >
        <div className="text-sm">{message.message}</div>
        <div className={cn("text-xs mt-1", isReceivedByEmployer ? "text-primary-foreground/80" : "text-muted-foreground")}> 
          {time}
        </div>
      </div>
    </div>
  )
}
