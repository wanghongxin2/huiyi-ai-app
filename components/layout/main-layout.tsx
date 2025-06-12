"use client"

import React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import LanguageSwitcher from "@/components/language-switcher"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userApiKey, setUserApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bailian_api_key") || "";
    }
    return "";
  });
  const [tempApiKey, setTempApiKey] = useState("");
  const isMobile = useMobile()

  // 在移动端默认关闭侧边栏
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  // 打开弹窗时同步当前API Key
  React.useEffect(() => {
    if (userDialogOpen) {
      setTempApiKey(userApiKey)
    }
  }, [userDialogOpen, userApiKey])

  const handleSaveApiKey = () => {
    setUserApiKey(tempApiKey);
    if (typeof window !== "undefined") {
      localStorage.setItem("bailian_api_key", tempApiKey);
    }
    setUserDialogOpen(false);
  };

  return (
    <div className="bg-gradient-to-br min-h-screen from-purple-100 via-blue-100 to-indigo-200 relative">
      {/* 背景装饰层 */}
      <div className="inset-0 absolute">
        <div className="rounded-full bg-purple-300/20 h-96 top-20 left-1/3 w-96 absolute blur-3xl" />
        <div className="rounded-full bg-blue-300/20 h-96 right-1/3 bottom-20 w-96 absolute blur-3xl" />
        <div className="bg-gradient-to-r rounded-full from-purple-200/10 to-blue-200/10 h-[600px] transform top-1/2 left-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 absolute blur-3xl" />
      </div>

      {/* 左侧菜单栏 - 浅灰白色背景，深色文字 */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} onUserSettings={() => setUserDialogOpen(true)} />

      {/* 移动端遮罩层 */}
      {isMobile && sidebarOpen && (
        <div className="bg-black/20 inset-0 z-30 fixed" onClick={() => setSidebarOpen(false)} />
      )}

      {/* 语言切换器 - 固定在右上角 */}
      <div className="top-4 right-4 z-50 fixed">
        <LanguageSwitcher />
      </div>

      {/* 右侧主内容区域 - 更大的悬浮矩形，最小边距 */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 transition-all duration-300 ease-in-out",
          !isMobile && sidebarOpen ? "left-64" : !isMobile ? "left-20" : "left-0",
        )}
      >
        {/* 最小边距，最大化悬浮面板 */}
        <div className="h-full p-2">
          <div className="border rounded-lg flex flex-col h-full bg-white/95 border-white/50 shadow-xl backdrop-blur-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto scrollbar-hide">{children}</div>
          </div>
        </div>
      </div>

      {/* 用户API Key弹窗 */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>用户设置</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="font-medium text-sm block">阿里百炼 API Key</label>
            <Input
              type="text"
              value={tempApiKey}
              onChange={e => setTempApiKey(e.target.value)}
              placeholder="请输入阿里百炼API Key"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveApiKey}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
