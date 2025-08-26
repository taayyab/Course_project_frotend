import { Card, CardContent } from "@/components/admin/ui/card"

export function StatCard({
  icon,
  label,
  value,
  delta,
  deltaColor = "#0755e9",
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  delta: string
  deltaColor?: string
}) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#fcfcff] ring-1 ring-[#e9ebee] p-2.5">{icon}</div>
          <span className="text-sm font-medium text-[#5f5f5f]">{label}</span>
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight text-[#1e242c]">{value}</div>
        <div className="mt-1 text-xs" style={{ color: deltaColor }}>
          {delta}
        </div>
      </CardContent>
    </Card>
  )
}
