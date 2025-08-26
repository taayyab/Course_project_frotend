"use client"
import Link from "next/link"
import { ArrowLeft, Star, Clock, Users, Globe, Play, CheckCircle, Award } from "lucide-react"
import { Button } from "@/components/admin/ui/button"
import { useState } from "react"
import { CurriculumTab } from "../../../../components/student/curriculum-tab"
import { InstructorTab } from "../../../../components/student/instructor-tab"
import { ReviewsTab } from "../../../../components/student/reviews-tab"
import { Sidebar } from "../../../../components/student/sidebar"
import { Badge } from "@/components/student/ui/badge"

export default function Component() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderTabContent = () => {
    switch (activeTab) {
      case "curriculum":
        return <CurriculumTab />
      case "instructor":
        return <InstructorTab />
      case "reviews":
        return <ReviewsTab />
      default:
        return (
          <div className="space-y-8">
            {/* Course Description */}
            <section>
              <h2 className="text-[24px] font-bold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-600 leading-[1.6] text-[15px]">
                Master advanced Python programming techniques specifically designed for data science applications. This
                comprehensive course covers everything from advanced data manipulation to machine learning
                implementation, giving you the skills needed to excel in the data science field.
              </p>
            </section>

            {/* Learning Objectives */}
            <section>
              <h2 className="text-[24px] font-bold text-gray-900 mb-6">Learning Objectives</h2>
              <div className="space-y-4">
                {[
                  "Master advanced Python libraries like Pandas, NumPy, and Scikit-learn",
                  "Build end-to-end data science projects from data collection to deployment",
                  "Implement machine learning algorithms for real-world problems",
                  "Create interactive data visualizations using Plotly and Seaborn",
                  "Develop clean, maintainable code following best practices",
                ].map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-[15px] leading-[1.5]">{objective}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Prerequisites */}
            <section>
              <h2 className="text-[24px] font-bold text-gray-900 mb-6">Prerequisites</h2>
              <div className="space-y-3">
                {[
                  "Basic Python programming knowledge",
                  "Understanding of fundamental statistics concepts",
                  "Familiarity with Jupyter notebooks",
                  "High school level mathematics",
                ].map((prereq, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="text-[#2563eb] font-semibold text-sm min-w-[24px]">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-gray-600 text-[15px]">{prereq}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Who is This for */}
            <section>
              <h2 className="text-[24px] font-bold text-gray-900 mb-6">Who is This for?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Data Analysts looking to advance their skills",
                  "Software Developers transitioning to data science",
                  "Students pursuing data science careers",
                  "Business Professionals working with data",
                ].map((audience, index) => (
                  <div key={index} className="p-4 bg-[#FAF5FF] rounded-lg border border-[#dbeafe]">
                    <span className="text-[#9665BE] text-sm font-medium">{audience}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills You'll Learn */}
            <section>
              <h2 className="text-[24px] font-bold text-gray-900 mb-6">Skills You'll Learn</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Python",
                  "Pandas",
                  "Numpy",
                  "Scikit-learn",
                  "Data visualization",
                  "Feature Engineering",
                  "Statistical Analysis",
                ].map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#eff6ff] text-[#1d4ed8] hover:text-[#ffff] hover:bg-[#8096D2] border-[#bfdbfe] px-4 py-2 rounded-full font-medium text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Certificate */}
            <div className=" bg-[#FEF9EA] rounded-2xl p-6 border border-[#FDF6CB]/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FDF6CB] rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#BA9C76]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#BA9C76] text-[14px]">Certificate of Completion</h3>
                  <p className="text-[#CFB284] text-sm mt-1">
                    Earn a verified certificate upon successful completion of this course
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Header Section */}
      <div
        className="text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #2563eb 50%, #1d4ed8 75%, #1e40af 100%)",
          minHeight: "320px",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)",
            }}
          ></div>
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <Link href="/student/dashboard/courses">

            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium cursor-pointer">Back</span>
            </Link>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-[24px] sm:text-[32px] font-bold leading-[1.2] mb-4 sm:mb-6 tracking-[-0.02em]">
                ADVANCE PYTHON FOR DATA SCIENCE
              </h1>

              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48&text=SC"
                    alt="Dr Sara Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-[15px]">Dr Sara Chen</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-80" />
                  <span>8 Weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 opacity-80" />
                  <span>12,543 Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 opacity-80" />
                  <span>English + Closed Caption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                  <span>4.7 (2,341 Ratings)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-[28px] sm:text-[36px] font-bold text-gray-900 leading-none">$79</div>
                  <div className="text-sm text-gray-500 mt-1">Self-paced</div>
                </div>

                <Button className="w-full h-10 sm:h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium rounded-xl mb-3 shadow-sm text-sm sm:text-base">
                  Enroll Now
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-10 sm:h-12 bg-white border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Try Free Preview
                </Button>

                <p className="text-xs text-center text-gray-500 mt-3 sm:mt-4">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: "overview", label: "Overview" },
              { id: "curriculum", label: "Curriculum" },
              { id: "instructor", label: "Instructor" },
              { id: "reviews", label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 sm:py-4 px-4 sm:px-6 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#2563eb] text-[#2563eb]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">{renderTabContent()}</div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
