import { Button } from "@/components/admin/ui/button"
import { Users, TrendingUp, Award } from "lucide-react"
import fortraining from "@/public/fortraining.svg";
import Image from "next/image"
import Link from "next/link"
export default function ForTrainingInstitutesSection() {
  return (
    <section className="py-16  bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 relative overflow-hidden">
              <Image
                src={fortraining}      // Path to your image
                alt="Logo"           // Alt text for accessibility
                width={600}           // Width in pixels
                height={500}          // Height in pixels
              />


            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Training Institutes</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Digital enrollment + performance tracking</span>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Showcase students to 1000+ employers</span>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Automated certificate generation</span>
              </div>
            </div>
<Link href="/school/login" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 cursor-pointer">Join as Institute</Button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
