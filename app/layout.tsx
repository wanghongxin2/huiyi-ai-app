import { Inter } from "next/font/google"
import "./globals.css"

export const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
