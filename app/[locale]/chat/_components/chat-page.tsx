"use client"

import { useState, useEffect } from "react"
import { Send, Paperclip, Settings, RotateCcw, ChevronDown, Menu, Zap, Globe, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"

import { fetchUserInfo, serverLogin } from "../actions"


const promptTemplates = [
  {"title":"帮我分析这份数据报告", "text": "{temp1}帮我分析这份数据报告{temp2}"},
  {"title":"生成API接口文档", "text": "{temp1}生成API接口文档{temp2}"},
  {"title":"翻译这份技术文档", "text": "{temp1}翻译这份技术文档{temp2}"},
  {"title":"优化这段代码逻辑", "text": "{temp1}优化这段代码逻辑{temp2}"},
  {"title":"制定项目计划", "text": "{temp1}制定项目计划{temp2}"},
  {"title":"分析竞品策略", "text": "{temp1}分析竞品策略{temp2}"},
]

type MessageType = {
  id: number;
  role: string;
  content: string;
  timestamp: string;
  reasoning?: string;
  sources?: string[];
  tokenUsage?: number;
};

// 定义对话历史的类型
type ConversationHistoryItem = {
  id: number;
  title: string;
  preview: string;
  timestamp: string;
  messages: MessageType[]; // 保存完整的消息历史
};

export function ChatPage() {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("qwen-turbo-latest")
  const [searchMode, setSearchMode] = useState("think")
  const [showReasoning, setShowReasoning] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState("")
  const [originalTemplate, setOriginalTemplate] = useState("")
  const isMobile = useMobile()

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 初始消息只包含AI助手的欢迎语
  const initialMessages: MessageType[] = [
    {
      id: 1,
      role: "assistant",
      content: "您好，慧翼AI助手为您服务",
      timestamp: new Date().toISOString(),
    },
  ];

  // 对话消息状态
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);

  // 对话历史状态，从 localStorage 加载
  const [conversationHistory, setConversationHistory] = useState<ConversationHistoryItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("chat_conversation_history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });

  // 当前激活的对话历史ID，用于从历史中加载特定对话
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

  // 保存当前对话到历史记录
  const saveCurrentConversationToHistory = () => {
    // 如果只有初始欢迎语或没有用户消息，则不保存
    if (messages.length <= 1) {
      return;
    }

    const firstUserMessage = messages.find(msg => msg.role === "user");
    const conversationTitle = firstUserMessage ? firstUserMessage.content.substring(0, 30) : "新对话";
    const previewContent = messages[messages.length - 1].content.substring(0, 50) || "无预览";

    const newOrUpdatedItem: ConversationHistoryItem = {
      // 如果 activeConversationId 存在，则重用它；否则，创建一个新的 ID
      id: activeConversationId !== null ? activeConversationId : Date.now(),
      title: conversationTitle,
      preview: previewContent,
      timestamp: messages[messages.length - 1]?.timestamp || new Date().toISOString(),
      messages: messages, // 保存当前所有消息
    };

    setConversationHistory((prevHistory) => {
      let updatedHistory;
      // 检查是否正在更新现有对话
      if (activeConversationId !== null) {
        const existingIndex = prevHistory.findIndex(item => item.id === activeConversationId);
        if (existingIndex > -1) {
          // 如果找到现有对话，则更新它并将其移动到顶部
          updatedHistory = [newOrUpdatedItem, ...prevHistory.filter(item => item.id !== activeConversationId)];
        } else {
          // 如果 activeConversationId 存在但未找到对应历史项（异常情况，如刚刷新页面），则作为新对话添加
          updatedHistory = [newOrUpdatedItem, ...prevHistory];
        }
      } else {
        // 如果没有 activeConversationId，说明是新对话，直接添加到顶部
        updatedHistory = [newOrUpdatedItem, ...prevHistory];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("chat_conversation_history", JSON.stringify(updatedHistory));
      }
      return updatedHistory;
    });
  };

  // 处理新对话按钮点击
  const handleNewChat = () => {
    saveCurrentConversationToHistory(); // 保存当前对话
    setMessages(initialMessages); // 重置为初始消息
    setActiveConversationId(null); // 清除激活的对话ID
    if (isMobile) {
      setShowHistory(false); // 移动端关闭侧边栏
    }
  };

  // 从历史中加载对话
  const loadConversationFromHistory = (historyItem: ConversationHistoryItem) => {
    saveCurrentConversationToHistory(); // 在加载新对话前保存当前对话
    setMessages(historyItem.messages);
    setActiveConversationId(historyItem.id);
    if (isMobile) {
      setShowHistory(false); // 移动端关闭侧边栏
    }
  };

  // 处理删除对话功能
  const handleDeleteConversation = (idToDelete: number) => {
    setConversationHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter(item => item.id !== idToDelete);
      if (typeof window !== "undefined") {
        localStorage.setItem("chat_conversation_history", JSON.stringify(updatedHistory));
      }
      // 如果删除的是当前激活的对话，则重置聊天区域
      if (activeConversationId === idToDelete) {
        setMessages(initialMessages);
        setActiveConversationId(null);
      }
      return updatedHistory;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 先插入一个空的AI消息
    const aiMsgId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: aiMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      },
    ]);
    // 请求后端，带上apiKey
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          history: messages,
          apikey: localStorage.getItem("bailian_api_key") || "",
          think: searchMode
        })
      });
  
      if (!res.ok) {
        // 这里可以根据后端返回的错误信息进一步处理
        throw new Error(`请求失败: ${res.status}`);
      }
  
      if (!res.body) throw new Error("无响应内容");
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            const content = data?.output?.text;
            if (content) {
              aiText += content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMsgId ? { ...msg, content: aiText } : msg
                )
              );
            }
          } catch (e) {
            continue;
          }
        }
      }
    } catch (err: any) {
      // 这里可以用 toast、alert 或直接在AI消息里显示错误
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId ? { ...msg, content: `请求失败：${err.message || err}` } : msg
        )
      );
    }
  };
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
              <Button size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-200" onClick={handleNewChat}>
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
            {/* 循环渲染对话历史 */}
            {conversationHistory.map((chat) => (
              <Card
                key={chat.id}
                className={cn(
                  "cursor-pointer hover:bg-purple-50/70 transition-all duration-200 border-purple-100/50 bg-white/50 backdrop-blur-sm hover:shadow-md",
                  activeConversationId === chat.id && "ring-2 ring-purple-500 ring-opacity-50"
                )}
                onClick={() => loadConversationFromHistory(chat)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm text-gray-900 mb-2 truncate">{chat.title}</h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{chat.preview}</p>
                      <span className="text-xs text-gray-400">{mounted ? new Date(chat.timestamp).toLocaleString() : ''}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡到 Card 的 onClick
                        handleDeleteConversation(chat.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Prompt Templates */}
          <div className="mt-6 border-t border-purple-100/50 pt-6">
            <h3 className="font-medium text-sm text-gray-900 mb-4">提示模板</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
              {/* 还原 promptTemplates 循环渲染逻辑 */}
              {promptTemplates.map((template, index) => (
                <Dialog key={index} open={dialogOpen && originalTemplate === template.text} onOpenChange={(open) => {
                  setDialogOpen(open)
                  if (!open) {
                    setEditingTemplate("")
                    setOriginalTemplate("")
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3 text-xs hover:bg-purple-50/70 transition-all duration-200"
                      onClick={() => {
                        setEditingTemplate(template.text)
                        setOriginalTemplate(template.text)
                        setDialogOpen(true)
                      }}
                    >
                      {template.title}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>编辑提示模板</DialogTitle>
                    </DialogHeader>
                    <Textarea
                      className="min-h-[120px] mt-2"
                      value={editingTemplate}
                      onChange={e => setEditingTemplate(e.target.value)}
                      autoFocus
                    />
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setEditingTemplate(originalTemplate)}
                        className="mr-auto"
                      >
                        还原模板
                      </Button>
                      <Button
                        onClick={() => {
                          setInput(editingTemplate)
                          setDialogOpen(false)
                        }}
                      >
                        使用模板
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

                    {message.role === "assistant" && message.reasoning && (
                      <div className="space-y-3">
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
                      </div>
                    )}

                    {(message.sources || message.tokenUsage) && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                        <div className="flex flex-wrap items-center gap-2">
                          {message.sources && (
                            <div className="flex items-center space-x-1">
                              <span>来源:</span>
                              {message.sources.map((source: any, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs bg-white/70">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.tokenUsage && <span>Token: {message.tokenUsage}</span>}
                      </div>
                    )}

                    <span className="text-xs text-gray-400">{mounted ? new Date(message.timestamp).toLocaleString() : ''}</span>
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
                    <SelectItem value="qwen-turbo-latest">qwen-turbo-latest</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={searchMode} onValueChange={setSearchMode}>
                  <SelectTrigger className="w-32 h-8 text-xs bg-white/70 backdrop-blur-sm border-purple-100/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl">
                    <SelectItem value="think">
                      <div className="flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        深度思考
                      </div>
                    </SelectItem>
                    <SelectItem value="search">
                      <div className="flex items-center">
                        <Globe className="w-3 h-3 mr-1" />
                        联网搜索
                      </div>
                    </SelectItem>
                    <SelectItem value="default">快速回复</SelectItem>
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
