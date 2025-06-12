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
          className="border bg-white/90 border-gray-200 shadow-lg top-6 left-6 text-gray-700 z-50 fixed backdrop-blur-md hover:bg-white"
        >
          <Menu className="h-5 w-5" />
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
            <div className="bg-gradient-to-r rounded-xl flex from-purple-500 to-blue-500 h-10 shadow-lg w-10 items-center justify-center">
              <Brain className="h-6 text-white w-6" />
            </div>
            {(isOpen || isMobile) && <h1 className="font-bold text-2xl text-gray-800">慧翼</h1>}
            {!isOpen && !isMobile && <span className="font-medium text-xs text-center text-gray-700">慧翼</span>}
          </div>
          {(isOpen || isMobile) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="ml-auto text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              {isMobile ? <X className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          )}
          {!isOpen && !isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="border rounded-lg border-gray-200 h-8 shadow-sm ml-2 text-gray-600 w-8 hover:bg-gray-100 hover:text-gray-800"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-3 flex-1 px-4">
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
        <div className="border-t mt-auto border-gray-200/50 p-4">
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
                    <p className="font-medium text-sm text-gray-800">用户名</p>
                    <p className="text-xs text-gray-500">user@example.com</p>
                  </div>
                )}
                {!isOpen && !isMobile && (
                  <div className="text-center">
                    <p className="font-medium text-xs leading-tight text-gray-700">用户</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 border-gray-200 w-56 backdrop-blur-xl">
            <DropdownMenuItem
              className="hover:bg-gray-50"
              onClick={() => {
                if (onUserSettings) onUserSettings();
              }}
            >
              <Settings className="h-4 mr-2 w-4" />
              用户设置
            </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                <LogOut className="h-4 mr-2 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
