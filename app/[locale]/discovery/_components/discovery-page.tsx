"use client"

import { cn } from "@/lib/utils"
import { Plus, Search, TrendingUp, Users, MessageSquare, FileText, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Updated mock data with Dify-style applications
const featuredAgents = [
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
  {
    id: 3,
    name: "多语言翻译助手",
    description: "专业级翻译服务，支持100+语言，保持语境和专业术语准确性",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "语言服务",
    users: 2341,
    conversations: 5678,
    rating: 9.7,
  },
]

const agentTemplates = [
  {
    id: 1,
    name: "SQL查询生成器",
    description: "自然语言转SQL查询，支持复杂数据库操作",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "数据分析",
    users: 567,
    conversations: 1234,
    rating: 9.4,
  },
  {
    id: 2,
    name: "API文档生成器",
    description: "自动生成标准化API文档，支持OpenAPI规范",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "开发工具",
    users: 423,
    conversations: 987,
    rating: 9.2,
  },
  {
    id: 3,
    name: "内容创作助手",
    description: "AI驱动的内容创作，支持文章、广告文案等多种形式",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "营销工具",
    users: 1156,
    conversations: 2890,
    rating: 9.5,
  },
  {
    id: 4,
    name: "数据可视化助手",
    description: "将复杂数据转换为直观的图表和可视化报告",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "数据分析",
    users: 789,
    conversations: 1567,
    rating: 9.3,
  },
  {
    id: 5,
    name: "邮件智能回复",
    description: "智能分析邮件内容，生成专业的回复建议",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "办公助手",
    users: 634,
    conversations: 1345,
    rating: 9.1,
  },
  {
    id: 6,
    name: "会议纪要生成器",
    description: "自动整理会议录音，生成结构化的会议纪要",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "办公助手",
    users: 445,
    conversations: 892,
    rating: 9.0,
  },
  {
    id: 7,
    name: "竞品分析助手",
    description: "深度分析竞争对手，提供市场洞察和策略建议",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "商业分析",
    users: 356,
    conversations: 678,
    rating: 9.2,
  },
  {
    id: 8,
    name: "学习路径规划师",
    description: "个性化学习计划制定，适合技能提升和职业发展",
    avatar: "/placeholder.svg?height=60&width=60",
    category: "教育培训",
    users: 723,
    conversations: 1456,
    rating: 9.4,
  },
]

const categories = ["全部", "文档处理", "开发工具", "数据分析", "营销工具", "办公助手", "商业分析", "教育培训"]

export function DiscoveryPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 lg:space-y-8 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">发现</h1>
          <p className="text-sm lg:text-base text-gray-600 mt-2">探索优质AI Agent模板，快速构建您的智能助手</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          创建Agent
        </Button>
      </div>

      {/* Featured Section */}
      <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200/50 shadow-lg">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-xl lg:text-2xl font-bold text-purple-900">企业级 "PDF翻译助手" 重磅上线！</h2>
              <p className="text-sm lg:text-base text-purple-700">
                支持多语言文档翻译，保持格式完整，专业术语精准翻译 🎉
              </p>
              <Button
                variant="outline"
                className="mt-4 border-purple-300 text-purple-700 hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
              >
                了解更多 →
              </Button>
            </div>
            <div className="flex justify-center space-x-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FileText className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Languages className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI应用 Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">AI应用</h2>
          <span className="text-sm text-gray-500">精选推荐</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer border-purple-100/50 bg-white/70 backdrop-blur-sm hover:bg-white/90"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12 lg:w-14 lg:h-14 ring-2 ring-purple-100">
                    <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base lg:text-lg font-semibold truncate">{agent.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2 text-xs bg-purple-50 text-purple-700">
                      {agent.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {agent.description}
                </CardDescription>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {agent.users}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {agent.conversations}
                    </span>
                  </div>
                  <span className="flex items-center text-orange-500 font-medium">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {agent.rating}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Agent 模板 Section */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Agent 模板</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 4).map((category) => (
                <Button
                  key={category}
                  variant={category === "全部" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs transition-all duration-200",
                    category === "全部"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-md hover:shadow-lg"
                      : "hover:bg-purple-50 hover:border-purple-300",
                  )}
                >
                  {category}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="text-xs hover:bg-purple-50">
                更多...
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索Agent名称"
                className="pl-10 text-sm bg-white/70 backdrop-blur-sm border-purple-100"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {agentTemplates.map((agent) => (
            <Card
              key={agent.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer border-purple-100/50 bg-white/70 backdrop-blur-sm hover:bg-white/90"
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-14 h-14 lg:w-16 lg:h-16 ring-2 ring-purple-100">
                    <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <h3 className="font-semibold text-sm lg:text-base mb-2 truncate">{agent.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{agent.description}</p>
                    <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">
                      {agent.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between w-full text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {agent.users}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {agent.conversations}
                      </span>
                    </div>
                    <span className="flex items-center text-orange-500 font-medium">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {agent.rating}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
