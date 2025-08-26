import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "COURSUE",
  description: "Course management platform dashboard",
    generator: 'MOB'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#fcfcff]">
          <div className="">
            <main className="">
              <AuthProvider >
              {children}
              </AuthProvider>
              </main>
          </div>
        </div>
      </body>
    </html>
  )
}
