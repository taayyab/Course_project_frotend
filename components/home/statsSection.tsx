import { Users, Building, TrendingUp, Star } from "lucide-react"

export default function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Active Students",
    },
    {
      icon: Building,
      number: "500+",
      label: "Partner Institutes",
    },
    {
      icon: TrendingUp,
      number: "80%",
      label: "Hiring Success Rate",
    },
    {
      icon: Star,
      number: "95%",
      label: "Student Satisfaction",
    },
  ]

  return (
    <section className="py-16 mx-8 rounded-xl  bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
