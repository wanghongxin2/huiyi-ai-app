import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["zh", "en", "ja"];
export const defaultLocale = "zh";

export const routing = defineRouting({
  // 支持的所有语言
  locales,

  // 当没有匹配的语言时使用
  defaultLocale,
});

// 轻量级的Next.js导航API封装，会考虑路由配置
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
