"use client"
import { Link, usePathname } from "@/i18n/routing"
import { Menu, Compass, MessageCircle, Settings, LogOut, ChevronLeft, Brain, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  isMobile?: boolean
  onUserSettings: () => void 
}



export function Sidebar({ isOpen, onToggle, isMobile = false,onUserSettings }: SidebarProps) {
  const pathname = usePathname()
  const t = useTranslations('nav');
  const navigation = [
    { name: t('home'), href: "/", icon: Compass },
    { name: t('chat'), href: "/chat", icon: MessageCircle },
  ]
  return (
    <>
      {/* 移动端菜单按钮 */}
      {isMobile && !isOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="fixed top-6 left-6 z-50 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg hover:bg-white text-gray-700"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      {/* 侧边栏 - 浅灰白色背景，参考设计图配色 */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out flex flex-col",
          isMobile
            ? cn(
                "bg-white/98 backdrop-blur-xl shadow-xl border-r border-gray-100",
                isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full",
              )
            : cn("bg-white/95 backdrop-blur-sm border-r border-gray-100", isOpen ? "w-64" : "w-20"),
        )}
      >
        {/* Header */}
        <div className={cn("flex items-center p-6", !isOpen && !isMobile && "justify-between")}>
          <div className={cn("flex items-center space-x-3", !isOpen && !isMobile && "flex-col space-x-0 space-y-2")}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {(isOpen || isMobile) && <h1 className="text-2xl font-bold text-gray-800">慧翼</h1>}
            {!isOpen && !isMobile && <span className="text-xs font-medium text-gray-700 text-center">慧翼</span>}
          </div>
          {(isOpen || isMobile) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="ml-auto text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              {isMobile ? <X className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
          )}
          {!isOpen && !isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="ml-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 w-8 h-8 rounded-lg border border-gray-200 shadow-sm"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} onClick={() => isMobile && onToggle()}>
                <div
                  className={cn(
                    "flex items-center rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    isOpen || isMobile
                      ? "space-x-4 px-4 py-4"
                      : "flex-col space-y-2 px-2 py-3 items-center justify-center",
                  )}
                >
                  <item.icon className={cn("flex-shrink-0", isOpen || isMobile ? "w-6 h-6" : "w-7 h-7")} />
                  <span
                    className={cn(
                      "font-medium transition-all duration-200",
                      isOpen || isMobile ? "text-base" : "text-xs text-center leading-tight",
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div className="p-4 mt-auto border-t border-gray-200/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full rounded-lg transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                  isOpen || isMobile
                    ? "justify-start space-x-3 h-auto p-4"
                    : "flex-col space-y-2 h-auto p-3 items-center justify-center",
                )}
              >
                <Avatar className={cn("ring-2 ring-gray-200", isOpen || isMobile ? "w-10 h-10" : "w-12 h-12")}>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    用户
                  </AvatarFallback>
                </Avatar>
                {(isOpen || isMobile) && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-800">用户名</p>
                    <p className="text-xs text-gray-500">user@example.com</p>
                  </div>
                )}
                {!isOpen && !isMobile && (
                  <div className="text-center">
                    <p className="text-xs font-medium leading-tight text-gray-700">用户</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-gray-200">
            <DropdownMenuItem
              className="hover:bg-gray-50"
              onClick={() => {
                if (onUserSettings) onUserSettings();
              }}
            >
              <Settings className="w-4 h-4 mr-2" />
              用户设置
            </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}
