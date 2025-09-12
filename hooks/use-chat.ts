"use client"

import { useState, useEffect, useCallback } from "react"
import { chatApiService, type Message, type ChatResponse } from "@/lib/chat.api"
import { useToast } from "@/hooks/use-toast"

export function useConversations() {
  // Redefine Conversation type to match API response
  type Conversation = {
    _id: string;
    participantUsers: Array<{ _id: string; fullName: string; email: string; role: string; avatar?: string }>;
    lastMessage?: string;
    unreadCount?: number;
    // ...other fields as needed
  };
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response: ChatResponse<{ conversations: any[] }> = await chatApiService.getConversations()
      // Map lastMessage to be the text of the last message for sidebar display
      const mappedConversations = response.payload.conversations.map((conv: any) => ({
        ...conv,
        lastMessage: conv.lastMessage?.text || "No messages yet",
      }))
      setConversations(mappedConversations)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch conversations"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const startConversation = async (schoolId: string) => {
    try {
      const response = await chatApiService.startConversation(schoolId)
      await fetchConversations() // Refresh conversations
      return response.payload.conversationId
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to start conversation"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    }
  }

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    startConversation,
  }
}

export function useMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return

    try {
      setLoading(true)
      setError(null)
      const response = await chatApiService.getConversationMessages(conversationId)
      // Extract messages from payload.conversation
      const conv = response.payload.conversation
      let rawMessages = []
      if (Array.isArray(conv.messages)) {
        rawMessages = conv.messages
      } else if (conv.lastMessage) {
        rawMessages = [conv.lastMessage]
      }
      const mappedMessages = rawMessages.map((msg: any) => ({
        id: msg._id || msg.id,
        conversationId: msg.conversationId,
        senderId: typeof msg.sender === "string" ? msg.sender : (msg.sender?._id || msg.senderId),
        senderType: msg.role || (msg.senderData?.role || msg.senderType),
        message: msg.text,
        timestamp: msg.createdAt || msg.timestamp,
        status: msg.status || "sent",
      }))
      setMessages(mappedMessages)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch messages"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [conversationId, toast])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const sendMessage = async (conversationIdToSend: string | null, text: string) => {
    if (!conversationIdToSend || !text.trim()) return

    try {
      const response = await chatApiService.sendMessage(conversationIdToSend, text)
      // Add the new message to the local state immediately
      const newMessage: Message = {
        id: response.payload.messageId || Date.now().toString(),
        conversationId: conversationIdToSend,
        senderId: "current-user", // This should come from auth context
        senderType: "employer",
        message: text,
        timestamp: new Date().toISOString(),
        status: "sent",
      }
      setMessages((prev) => [...prev, newMessage])
      return newMessage
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to send message"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    }
  }

  return {
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage,
  }
}
