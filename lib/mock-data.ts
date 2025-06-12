import type { Agent, ChatHistory, User } from "./types"

export const mockAgents: Agent[] = [
  {
    id: 1,
    name: "智能文档助手",
    description: "专业的文档处理和分析工具，支持PDF、Word等多种格式的智能解析",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "文档处理",
    users: 1247,
    conversations: 3521,
    rating: 9.8,
  },
  {
    id: 2,
    name: "代码审查专家",
    description: "AI驱动的代码质量检测和优化建议，支持多种编程语言",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "开发工具",
    users: 892,
    conversations: 2156,
    rating: 9.6,
  },
]

export const mockChatHistory: ChatHistory[] = [
  {
    id: 1,
    title: "企业文档翻译咨询",
    timestamp: "2024-01-15 14:30",
    preview: "如何批量处理PDF文档翻译...",
  },
  {
    id: 2,
    title: "API文档生成",
    timestamp: "2024-01-14 16:20",
    preview: "帮我生成RESTful API文档...",
  },
]

export const mockUser: User = {
  id: 1,
  name: "用户名",
  email: "user@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
}
