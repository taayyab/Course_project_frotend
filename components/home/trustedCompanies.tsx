import Image from "next/image"

export default function TrustedCompanies() {
  const companies = [
    { name: "Zapier", logo: "/zapier.png?height=40&width=120" },
    { name: "Spotify", logo: "/spotify.png?height=40&width=120" },
    { name: "Zoom", logo: "/zoom.png?height=40&width=120" },
    { name: "Amazon", logo: "/amazon.png?height=40&width=120" },
    { name: "Adobe", logo: "/adobe.png?height=40&width=120" },
    { name: "Notion", logo: "/notion.png?height=40&width=120" },
    { name: "Netflix", logo: "/netflix.png?height=40&width=120" },
  ]

  return (
    <section className="py-26 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Trusted by Leading Training Institutes</h2>

        <div className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full mb-12">
          <p className="text-sm md:text-base">
            Fortune 500 companies and renowned global brands place their trust in our products, solutions, and bespoke
            software development services.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={company.logo || "/placeholder.svg"}
                width={32}          
  height={32} 
                alt={`${company.name} logo`}
                className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
