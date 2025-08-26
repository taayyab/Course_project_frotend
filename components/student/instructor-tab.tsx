import { Star, Users, BookOpen, ExternalLink } from "lucide-react"

export function InstructorTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-[24px] font-bold text-gray-900">Meet Your Instructor</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Instructor Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/placeholder.svg?height=80&width=80&text=SC"
              alt="Dr. Sarah Chen"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            {/* Name and Title */}
            <h3 className="text-lg sm:text-[20px] font-bold text-gray-900 mb-1">Dr. Sarah Chen</h3>
            <p className="text-[#2563eb] text-sm font-medium mb-3 sm:mb-4">Senior Data Scientist at TechCorp</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                <span className="text-sm font-semibold text-gray-900">4.9</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">12.7k students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">8 courses</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm sm:text-[15px] leading-[1.6] mb-4 sm:mb-6">
              Dr. Sarah Chen is a renowned data scientist with over 10 years of experience in machine learning and
              statistical analysis. She holds a PhD in Computer Science from Stanford University and has worked with
              Fortune 500 companies to implement data-driven solutions. Sarah is passionate about making complex data
              science concepts accessible to everyone.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button className="flex items-center gap-2 text-[#2563eb] hover:text-[#1d4ed8] text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </button>
              <button className="flex items-center gap-2 text-[#2563eb] hover:text-[#1d4ed8] text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                Twitter
              </button>
              <button className="flex items-center gap-2 text-[#2563eb] hover:text-[#1d4ed8] text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
