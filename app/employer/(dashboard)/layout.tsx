import type { ReactNode } from "react"
import { Shell } from "@/components/employer/shell"
import ProtectedRoute from "@/context/ProtectedRoute"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Shell>{children}</Shell>
    </ProtectedRoute>
  )
}
