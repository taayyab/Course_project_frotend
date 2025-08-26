import type React from "react"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/student/dashboard/sidebar"
import { Header } from "@/components/student/dashboard/header"
import ProtectedRoute from "@/context/ProtectedRoute"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
  )
}

export const metadata = {
  generator: "MOb",
}
