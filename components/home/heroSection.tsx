import { Button } from "@/components/admin/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-4 h-4 bg-orange-400 rounded-full opacity-60"></div>
      <div className="absolute top-32 right-32 w-2 h-2 bg-white rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-300 rounded-full opacity-50"></div>
      <div className="absolute top-18 left-50 w-13 h-13 bg-[#FF9500] rounded-full opacity-70"></div>
      <div className="absolute top-42 right-32 w-2 h-2 bg-white rounded-full opacity-40"></div>
      <div className="absolute bottom-50 left-20 w-3 h-3 bg-blue-300 rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Text Content - Now at the top */}
          <div className="max-w-4xl">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              From Learning to Earning-Your
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Digital Apprenticeship Hub
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              SkillBridge connects students with top training programs and employers in one platform. Build skills, get
              certified, and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="#pricing" passHref>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 cursor-pointer">
                  Explore Courses →
                </Button>
              </Link>
              <Link href="#pricing" passHref>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 bg-transparent cursor-pointer"
                >
                  List Your Institute
                </Button>
              </Link>
              <Link href="#pricing" passHref>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 bg-transparent cursor-pointer"
                >
                  Hire Talent
                </Button>
              </Link>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center px-3">
                  <div className="text-2xl font-bold">120+</div>
                  <div className="text-sm text-blue-200">Courses</div>
                </div>
              </div>
            </div>

            {/* Stats */}

          </div>

          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
                {/* Video thumbnail grid */}
                <div className="grid grid-cols-3 gap-1 h-full">
                  <img
                    src="/hero (1).png?height=200&width=300"
                    alt="Student learning"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (6).png?height=200&width=300"
                    alt="Teacher in classroom"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (3).png?height=200&width=300"
                    alt="Business meeting"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (4).png?height=200&width=300"
                    alt="Woman teaching"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (5).png?height=200&width=300"
                    alt="Man coding"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (6).png?height=200&width=300"
                    alt="Computer lab"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (7).png?height=200&width=300"
                    alt="Online learning"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (6).png?height=200&width=300"
                    alt="Graduation"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src="/hero (7).png?height=200&width=300"
                    alt="Professional working"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
