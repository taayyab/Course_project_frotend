import { Button } from "@/components/admin/ui/button"
import { CheckCircle, Filter, MessageSquare } from "lucide-react"
import forrecuriter from "@/public/forrecuriter.svg";
import Image from "next/image"
import Link from "next/link"
export default function ForRecruitersSection() {
  return (
    <section className="py-16  bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className=" flex-col items">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Employers</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Free access to pre-skilled candidates</span>
              </div>
              <div className="flex items-start space-x-3">
                <Filter className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Filter by course completion + skills</span>
              </div>
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Direct messaging with students</span>
              </div>
            </div>
<Link href="/employer/login" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 cursor-pointer">Join as Employers</Button></Link>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 relative overflow-hidden">
              <Image
                src={forrecuriter}     
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
