import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 w-full lg:max-w-md">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
