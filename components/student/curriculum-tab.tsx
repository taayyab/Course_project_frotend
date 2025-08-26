"use client"

import { ChevronDown, ChevronRight, Play, FileText, CheckCircle } from "lucide-react"
import { useState } from "react"

export function CurriculumTab() {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([2])

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekNumber) ? prev.filter((w) => w !== weekNumber) : [...prev, weekNumber],
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-[24px] font-bold text-gray-900">Course Curriculum</h2>

      <div className="space-y-3 sm:space-y-4">
        {/* Week 1 - Completed */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between p-3 sm:p-4 bg-[#dcfce7] cursor-pointer"
            onClick={() => toggleWeek(1)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#16a34a]" />
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                Week 1: Python Fundamentals Review
              </span>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </div>
        </div>

        {/* Week 2 - Current/Active */}
        <div className="border border-[#2563eb] rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between p-3 sm:p-4 bg-[#eff6ff] cursor-pointer"
            onClick={() => toggleWeek(2)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#2563eb] bg-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563eb]"></div>
              </div>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                Week 2: Data Manipulation with Pandas
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-gray-500">60% COMPLETE</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-3 sm:px-4 pb-2 bg-[#eff6ff]">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-[#2563eb] h-1 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          {/* Expanded content */}
          {expandedWeeks.includes(2) && (
            <div className="bg-white">
              {/* Lesson items */}
              <div className="border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-gray-50">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-[#16a34a]" />
                  <span className="text-xs sm:text-sm text-gray-900">Introduction to Pandas</span>
                  <div className="ml-auto">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#16a34a]" />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-gray-50">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-[#16a34a]" />
                  <span className="text-xs sm:text-sm text-gray-900">Data Cleaning Techniques</span>
                  <div className="ml-auto">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#16a34a]" />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-gray-50">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm text-gray-900">Advanced Data Operations</span>
                  <div className="ml-auto">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-gray-50">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm text-gray-900">Pandas Mastery Quiz</span>
                  <div className="ml-auto">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Week 3 - Locked */}
        <div className="border border-gray-200 rounded-xl overflow-hidden opacity-60">
          <div
            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleWeek(3)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 bg-white"></div>
              <span className="font-semibold text-gray-600 text-sm sm:text-base">Week 3: Statistical Analysis</span>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        </div>

        {/* Week 4 - Locked */}
        <div className="border border-gray-200 rounded-xl overflow-hidden opacity-60">
          <div
            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleWeek(4)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 bg-white"></div>
              <span className="font-semibold text-gray-600 text-sm sm:text-base">Week 4: Data Visualization</span>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
