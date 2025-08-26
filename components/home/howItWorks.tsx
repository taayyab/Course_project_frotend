import { CheckCircle, BookOpen, Briefcase } from "lucide-react"
import Image from "next/image"
export default function HowApprenticeshipsWorks() {
  return (
    <section className="py-16  bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-orange-500">Apprenticeships Hub</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're learning, teaching, or hiring, Skill Bridge has the tools you need to succeed.
          </p>
        </div>

        <div className="relative min-h-[600px]">
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-6 h-6 bg-orange-400 rounded-full opacity-60"></div>
          <div className="absolute top-40 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 right-32 w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
          <div className="absolute top-60 left-40 w-5 h-5 bg-pink-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-40 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Staircase steps */}
            <div className="relative ">
              {/* Step 1: Sign Up - Top Left */}
              <div className="absolute top-0 left-0 max-w-xs">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
                      <p className="text-gray-600 text-sm">Create your profile and set your learning goals</p>
                    </div>
                  </div>
                </div>
                {/* Connecting line */}
              </div>

              {/* Step 2: Take Courses - Middle Center */}
              <div className="absolute top-42 left-1/2 transform -translate-x-1/2 max-w-xs">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Take Courses</h3>
                      <p className="text-gray-600 text-sm">Enroll in industry-leading training programs</p>
                    </div>
                  </div>
                </div>
                {/* Connecting line */}
              </div>

              {/* Step 3: Get Hired - Bottom Right */}
              <div className="absolute top-84 right-0 max-w-xs">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Hired</h3>
                      <p className="text-gray-600 text-sm">Apply to jobs with verified skills and certificates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Large illustration */}
            <div className=" flex justify-center lg:justify-end ">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-orange-400 rounded-2xl p-8 max-w-md">
                  <Image
                    src="/howitworks.svg"
                    width={400}
                    height={350}
                    alt="Apprenticeship journey illustration"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
                {/* Additional decorative elements around illustration */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full opacity-70"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Mobile layout - stacked vertically */}
          <div className="lg:hidden space-y-8 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
                  <p className="text-gray-600">Create your profile and set your learning goals</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Take Courses</h3>
                  <p className="text-gray-600">Enroll in industry-leading training programs</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Hired</h3>
                  <p className="text-gray-600">Apply to jobs with verified skills and certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
