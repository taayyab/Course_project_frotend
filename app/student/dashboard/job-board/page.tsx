import { Card, CardContent } from "@/components/student/ui/card"
import { Button } from "@/components/student/ui/button"
import { Badge } from "@/components/student/ui/badge"
import { MapPin, Clock, Building, DollarSign } from "lucide-react"

export default function JobBoardPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Ltd",
      location: "London, UK",
      type: "Full-time",
      salary: "£60,000 - £80,000",
      posted: "2 days ago",
      description: "We're looking for an experienced frontend developer to join our growing team...",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataCorp Solutions",
      location: "Manchester, UK",
      type: "Contract",
      salary: "£45,000 - £55,000",
      posted: "1 week ago",
      description: "Join our data team to help drive insights and business decisions...",
      skills: ["Python", "SQL", "Tableau", "Excel"],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
        <p className="text-gray-600">Find your next career opportunity</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{job.salary}</span>
                  </div>
                  <Badge className="mb-3">{job.type}</Badge>
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Save Job
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
