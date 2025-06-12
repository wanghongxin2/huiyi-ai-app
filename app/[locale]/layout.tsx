import React from "react"
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  // 启用静态渲染
  setRequestLocale(locale);

  try {
    // 获取翻译消息
    const messages = await getMessages({locale});
    
    return (
      <html 
        lang={locale} 
        suppressHydrationWarning
      >
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error('布局渲染出错：', error);
    // 出错时返回最小内容
    return <>{children}</>;
  }
} 