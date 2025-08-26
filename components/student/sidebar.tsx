import { Clock,Medal } from "lucide-react"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"

export function Sidebar() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Learning Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 text-base sm:text-[18px] mb-4 sm:mb-6">Your Learning Progress</h3>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="font-medium text-gray-900 text-xs sm:text-sm">Advanced Python For Data Science</span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-[#2563eb] h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>

          <div className="bg-[#eff6ff] rounded-xl p-3 sm:p-4 border border-[#dbeafe]">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Next: Quiz 2 (Due Dec 15)</span>
            </div>
            <Button className="w-full h-8 sm:h-10 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium rounded-lg text-xs sm:text-sm">
              Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Completed Courses */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 text-base sm:text-[18px] mb-4 sm:mb-6">Completed Courses</h3>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="font-medium text-gray-900 text-xs sm:text-sm">Python Fundamentals</span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 sm:mb-3">
              <div className="bg-[#2563EB] h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-[#dcfce7] text-[#166534] border-[#bbf7d0] px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                Complete<Medal></Medal>
              </Badge>
              <Badge className="bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe] px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                Certificate
              </Badge>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-8 sm:h-10 bg-white border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-xs sm:text-sm"
          >
            Review Course
          </Button>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 text-base sm:text-[18px] mb-4 sm:mb-6">Course Statistics</h3>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs sm:text-sm">Total Students</span>
            <span className="font-bold text-[#2563eb] text-xs sm:text-sm">12,543</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs sm:text-sm">Average Rating</span>
            <span className="font-bold text-[#2563eb] text-xs sm:text-sm">4.7</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs sm:text-sm">Completion Rate</span>
            <span className="font-bold text-[#2563eb] text-xs sm:text-sm">87%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs sm:text-sm">Certificate Issued</span>
            <span className="font-bold text-[#2563eb] text-xs sm:text-sm">9,234</span>
          </div>
        </div>
      </div>
    </div>
  )
}
