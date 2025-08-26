import { Button } from "@/components/admin/ui/button"
import { CheckCircle, BookOpen, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
export default function ForStudentsSection() {
  return (
    <section className="py-16  bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 ">
            Built for Everyone in th<span className="">e</span> Learning
            Ecosystem
          </h2>
            <div className="absolute bottom-20 -left-4 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute top-32 right-8 w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-32 left-8 w-5 h-5 bg-green-400 rounded-full opacity-50"></div>
            <div className="absolute top-20 left-16 w-4 h-4 bg-orange-400 rounded-full opacity-40"></div>
            <div className="absolute bottom-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-30"></div>
          <p className="text-lg text-gray-600 mx-auto">
            Whether you're learning, teaching, or hiring, Skill Bridge has the tools you need to succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Browse 500+ accredited courses</span>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Track progress Coursera-style</span>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">1-click apply to jobs (LinkedIn-like)</span>
              </div>
            </div>
<Link href="/student/login" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 cursor-pointer">Start Learning Today</Button></Link>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 relative overflow-hidden">
              <Image
                src="/forStudents.svg"     
                alt="Logo"          
                width={600}          
                height={500}          
              />


            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
