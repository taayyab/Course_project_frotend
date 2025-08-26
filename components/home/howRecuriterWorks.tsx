import { Shield, Briefcase, Users } from "lucide-react"

export default function HowRecruitersWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-orange-500">Employers</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're learning, teaching, or hiring, Skill Bridge has the tools you need to succeed.
          </p>
        </div>

        <div className="relative min-h-[500px] mb-16">
          {/* Decorative elements */}
          <div className="absolute top-10 right-20 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
          <div className="absolute top-40 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-400 rounded-full opacity-50"></div>
          <div className="absolute top-60 right-40 w-3 h-3 bg-green-400 rounded-full opacity-60"></div>

          {/* Staircase steps */}
          <div className="relative hidden lg:block">
            {/* Step 1: Verify Account - Top Left */}
            <div className="absolute top-0 left-30 max-w-xs">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Account</h3>
                    <p className="text-gray-600 text-sm">Quick company verification and profile setup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Post Jobs - Middle Center */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 max-w-xs">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Jobs</h3>
                    <p className="text-gray-600 text-sm">Create job listings with skill requirements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Hire Talent - Bottom Right */}
            <div className="absolute top-64 right-30 max-w-xs">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire Talent</h3>
                    <p className="text-gray-600 text-sm">Connect with pre-skilled candidates instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout - stacked vertically */}
          <div className="lg:hidden space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Account</h3>
                  <p className="text-gray-600">Quick company verification and profile setup</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Jobs</h3>
                  <p className="text-gray-600">Create job listings with skill requirements</p>
                </div>
              </div>
              {/* Bottom illustration */}
        <div className=" ">
          <div className="relative max-w-2xl">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Recruitment process illustration"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>

            {/* Decorative geometric shapes around illustration */}
            <div className="absolute top-10 -right-4 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-20 -left-4 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute top-32 right-8 w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-32 left-8 w-5 h-5 bg-green-400 rounded-full opacity-50"></div>
            <div className="absolute top-20 left-16 w-4 h-4 bg-orange-400 rounded-full opacity-40"></div>
            <div className="absolute bottom-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-30"></div>
          </div>
        </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire Talent</h3>
                  <p className="text-gray-600">Connect with pre-skilled candidates instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
