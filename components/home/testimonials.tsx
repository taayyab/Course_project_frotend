"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Hannah Schmitt",
    title: "Lead designer",
    image: "/testimonial2.png?height=80&width=80",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Software Engineer",
    image: "/testimonial1.png?height=80&width=80",
    content:
      "The apprenticeship program transformed my career completely. The hands-on experience combined with theoretical knowledge gave me the confidence to excel in my role. Highly recommend this platform!",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Data Analyst",
    image: "/testimonial3.png?height=80&width=80",
    content:
      "Exceptional learning experience with real-world projects. The mentorship and guidance provided helped me transition from a complete beginner to a confident professional in just 12 months.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    title: "UX Designer",
    image: "/testimonial1.png?height=80&width=80",
    content:
      "The structured curriculum and industry connections made all the difference. I landed my dream job within weeks of completing the program. The support system is incredible!",
  },
  {
    id: 5,
    name: "David Thompson",
    title: "Marketing Specialist",
    image: "/testimonial2.png?height=80&width=80",
    content:
      "What sets this platform apart is the practical approach to learning. Every module was designed with real industry needs in mind. The career guidance was invaluable for my professional growth.",
  },
  {
    id: 6,
    name: "Lisa Wang",
    title: "Project Manager",
    image: "/testimonial3.png?height=80&width=80",
    content:
      "From day one, I felt supported and challenged in the best possible way. The apprenticeship not only gave me technical skills but also the soft skills needed to succeed in today's workplace.",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  return (
    <section className="py-16  bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          What Our Learners Say About Us
        </h2>

        <div className="relative">
          {/* Testimonials Container */}
          <div className="flex justify-center items-center gap-8 mb-12">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`relative transition-all duration-500 ease-in-out ${
                  index === 1 ? "scale-110 z-10" : "scale-95 opacity-75"
                }`}
              >
                {/* Speech Bubble */}
                <div className="relative bg-white rounded-3xl p-8 shadow-lg max-w-sm">
                  {/* Blue curved accent */}
                  <div className="absolute -bottom-4 left-8 w-16 h-16">
                    <svg viewBox="0 0 64 64" className="w-full h-full">
                      <path
                        d="M8 56 C8 56, 32 40, 56 56"
                        stroke="#2563eb"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>

                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="text-blue-600 text-3xl font-serif">"</div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 text-sm leading-relaxed text-center">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
