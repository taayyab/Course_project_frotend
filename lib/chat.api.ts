import axios from "axios"
import { API_BASE_URL } from "./auth.api";


// Base API configuration

// Create axios instance with default config
const chatApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
chatApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Chat API functions
export const chatApiService = {
  // Get all previous messages for a conversation
  async getAllConversationMessages(conversationId: string) {
    const response = await chatApi.get(`/api/v1/chat/messages/all/${conversationId}`)
    return response.data
  },
  // Start a new conversation with school
  async startConversation(targetUserId: string) {
    console.log("Starting conversation with user ID:", targetUserId);
    // Send targetUserId directly in the request body
    const response = await chatApi.post("/api/v1/chat/conversations/start", { targetUserId });
    return response.data;
  },

  // Get all conversations for the employer
  async getConversations() {
    const response = await chatApi.get("/api/v1/chat/conversations")
    return response.data
  },

  // Get messages for a specific conversation
  async getConversationMessages(conversationId: string) {
    const response = await chatApi.get(`/api/v1/chat/conversations/${conversationId}`)
    return response.data
  },

  // Send a message in a conversation
  async sendMessage(conversationId: string, text: string) {
    const response = await chatApi.post("/api/v1/chat/messages", {
      conversationId,
      text,
    })
    return response.data
  },

  // Get conversation details
  async getConversation(conversationId: string) {
    const response = await chatApi.get(`/api/v1/chat/conversations/${conversationId}`)
    return response.data
  },
}

// Types for chat system
export interface Conversation {
  id: string
  schoolId: string
  schoolName: string
  schoolAvatar?: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  status: "active" | "archived"
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderType: "employer" | "school" | "student"
  message: string
  timestamp: string
  status: "sent" | "delivered" | "read"
}

export interface ChatResponse<T> {
  status: number
  message: string
  payload: T
  success: boolean
  timestamp: string
}
