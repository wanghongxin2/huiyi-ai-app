export interface Agent {
  id: number
  name: string
  description: string
  avatar: string
  category: string
  users: number
  conversations: number
  rating: number
}

export interface ChatMessage {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
  reasoning?: string
  sources?: string[]
  tokenUsage?: number
}

export interface ChatHistory {
  id: number
  title: string
  timestamp: string
  preview: string
}

export interface User {
  id: number
  name: string
  email: string
  avatar: string
}
