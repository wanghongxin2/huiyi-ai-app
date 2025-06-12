"use client"

import { useState } from "react"
import { Send, Paperclip, Settings, RotateCcw, ChevronDown, Menu, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

// Mock chat history
const chatHistory = [
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
  {
    id: 3,
    title: "数据分析报告",
    timestamp: "2024-01-13 10:15",
    preview: "分析销售数据趋势...",
  },
]

// Mock messages
const messages = [
  {
    id: 1,
    role: "user",
    content: "你好，我想了解如何使用AI助手提升工作效率",
    timestamp: "14:30",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "您好！AI助手可以在多个方面显著提升工作效率：\n\n1. **文档处理自动化**\n   - 智能翻译和格式转换\n   - 自动摘要和关键信息提取\n   - 批量文档分析\n\n2. **代码开发辅助**\n   - 代码审查和优化建议\n   - API文档自动生成\n   - 测试用例生成\n\n3. **数据分析支持**\n   - SQL查询自动生成\n   - 数据可视化建议\n   - 报告自动生成\n\n4. **日常办公优化**\n   - 邮件智能回复\n   - 会议纪要整理\n   - 任务优先级排序\n\n您希望我详细介绍哪个方面的应用呢？",
    timestamp: "14:31",
    reasoning:
      "用户询问AI助手如何提升工作效率，这是一个广泛的话题。我需要提供结构化的回答，涵盖文档处理、开发、数据分析和办公等核心应用场景...",
    sources: ["AI工作效率指南", "企业数字化转型最佳实践"],
    tokenUsage: 256,
  },
]

const promptTemplates = [
  "帮我分析这份数据报告",
  "生成API接口文档",
  "翻译这份技术文档",
  "优化这段代码逻辑",
  "制定项目计划",
  "分析竞品策略",
]

export function ChatPage() {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [searchMode, setSearchMode] = useState("深度思考")
  const [showReasoning, setShowReasoning] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const isMobile = useMobile()

  const handleSend = () => {
    if (input.trim()) {
      // Handle message sending
      setInput("")
    }
  }

  return (
    <div className="flex h-full">
      {/* Chat History Sidebar */}
      <div
        className={cn(
          "bg-white/70 backdrop-blur-xl border-r border-purple-100/50 transition-all duration-300 ease-in-out",
          isMobile
            ? cn(
                "absolute left-0 top-0 z-30 h-full shadow-xl",
                showHistory ? "w-80 translate-x-0" : "w-80 -translate-x-full",
              )
            : "w-80 relative",
        )}
      >
        <div className="p-4 lg:p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900 text-lg">对话历史</h2>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-200">
                <RotateCcw className="w-4 h-4 mr-2" />
                新对话
              </Button>
              {isMobile && (
                <Button size="sm" variant="ghost" onClick={() => setShowHistory(false)}>
                  ×
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
            {chatHistory.map((chat) => (
              <Card
                key={chat.id}
                className="cursor-pointer hover:bg-purple-50/70 transition-all duration-200 border-purple-100/50 bg-white/50 backdrop-blur-sm hover:shadow-md"
              >
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm text-gray-900 mb-2 truncate">{chat.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{chat.preview}</p>
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Prompt Templates */}
          <div className="mt-6 border-t border-purple-100/50 pt-6">
            <h3 className="font-medium text-sm text-gray-900 mb-4">提示模板</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
              {promptTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3 text-xs hover:bg-purple-50/70 transition-all duration-200"
                  onClick={() => setInput(template)}
                >
                  {template}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 移动端遮罩层 */}
      {isMobile && showHistory && (
        <div className="absolute inset-0 bg-black/50 z-20" onClick={() => setShowHistory(false)} />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-purple-100/50 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={() => setShowHistory(true)} className="hover:bg-purple-50">
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">AI 对话</h1>
            </div>

            <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 lg:p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="space-y-4">
              <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex space-x-3 max-w-full lg:max-w-4xl ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0 ring-2 ring-purple-100">
                    <AvatarImage
                      src={
                        message.role === "user"
                          ? "/placeholder.svg?height=32&width=32"
                          : "/placeholder.svg?height=32&width=32"
                      }
                    />
                    <AvatarFallback
                      className={message.role === "user" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}
                    >
                      {message.role === "user" ? "用" : "AI"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-3 min-w-0 flex-1">
                    <Card
                      className={`shadow-md ${message.role === "user" ? "bg-blue-50/80 border-blue-200/50" : "bg-white/80 border-purple-100/50"} backdrop-blur-sm`}
                    >
                      <CardContent className="p-4 lg:p-5">
                        <div className="prose prose-sm max-w-none text-sm lg:text-base">
                          {message.content.split("\n").map((line, index) => (
                            <p key={index} className="mb-2 last:mb-0">
                              {line}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {message.role === "assistant" && (
                      <div className="space-y-3">
                        {/* Reasoning */}
                        {message.reasoning && (
                          <Card className="bg-gray-50/80 border-gray-200/50 backdrop-blur-sm shadow-sm">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">思考过程</CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => setShowReasoning(!showReasoning)}>
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform ${showReasoning ? "rotate-180" : ""}`}
                                  />
                                </Button>
                              </div>
                            </CardHeader>
                            {showReasoning && (
                              <CardContent className="pt-0">
                                <p className="text-sm text-gray-600">{message.reasoning}</p>
                              </CardContent>
                            )}
                          </Card>
                        )}

                        {/* Sources and Token Usage */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                          <div className="flex flex-wrap items-center gap-2">
                            {message.sources && (
                              <div className="flex items-center space-x-1">
                                <span>来源:</span>
                                {message.sources.map((source, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-white/70">
                                    {source}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.tokenUsage && <span>Token: {message.tokenUsage}</span>}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">评价:</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors">
                                ⭐
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white/70 backdrop-blur-xl border-t border-purple-100/50 p-4 lg:p-6">
          <div className="space-y-4">
            {/* Input and Send Button */}
            <div className="flex items-end space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Paperclip className="w-4 h-4" />
              </Button>

              <div className="flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入您的问题..."
                  className="min-h-[60px] resize-none text-sm lg:text-base bg-white/80 backdrop-blur-sm border-purple-100/50 shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-200"
                size={isMobile ? "sm" : "default"}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Model and Mode Selection - v0 style */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-gray-500">
              <div className="flex flex-wrap items-center gap-3">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-28 h-8 text-xs bg-white/70 backdrop-blur-sm border-purple-100/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl">
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={searchMode} onValueChange={setSearchMode}>
                  <SelectTrigger className="w-32 h-8 text-xs bg-white/70 backdrop-blur-sm border-purple-100/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl">
                    <SelectItem value="深度思考">
                      <div className="flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        深度思考
                      </div>
                    </SelectItem>
                    <SelectItem value="联网搜索">
                      <div className="flex items-center">
                        <Globe className="w-3 h-3 mr-1" />
                        联网搜索
                      </div>
                    </SelectItem>
                    <SelectItem value="快速回复">快速回复</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-right">
                <span>按 Enter 发送，Shift + Enter 换行</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
