import type React from "react"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/admin/layout/sidebar"
import { Header } from "@/components/admin/layout/header"
import ProtectedRoute from "@/context/ProtectedRoute"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex justify-end">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header />
          <main className="">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export const metadata = {
  generator: "mobeen.dev",
}
