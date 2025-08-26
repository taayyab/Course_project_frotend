"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = {
  Student: [
    {
      question: "Can student cancel their subscription?",
      answer:
        "Yes, students can cancel their subscription at any time with 1-month notice. We also offer 30-day money-back guarantee for new subscribers.",
    },
    {
      question: "How do I access my courses after enrollment?",
      answer:
        "Once enrolled, you'll receive login credentials via email. You can access all your courses through our learning management system 24/7.",
    },
    {
      question: "What support is available for students?",
      answer:
        "We provide comprehensive support including dedicated mentors, peer forums, technical help desk, and career guidance counselors.",
    },
    {
      question: "Are certificates provided upon completion?",
      answer:
        "Yes, all students receive industry-recognized certificates upon successful completion of their apprenticeship programs.",
    },
  ],
  "Training Institutes": [
    {
      question: "How are training institutes vetted?",
      answer:
        "All training institutes undergo a rigorous vetting process including credential verification, curriculum review, and quality assessments.",
    },
    {
      question: "What are the requirements to become a partner institute?",
      answer:
        "Partner institutes must have accredited programs, qualified instructors, proven track record, and meet our quality standards.",
    },
    {
      question: "How do institutes track student progress?",
      answer:
        "Our platform provides comprehensive analytics dashboard to monitor student engagement, progress, and performance metrics.",
    },
    {
      question: "What commission structure do you offer?",
      answer:
        "We offer competitive commission rates based on student enrollment and completion rates. Contact us for detailed pricing.",
    },
  ],
  Recruiters: [
    {
      question: "How do I post job opportunities?",
      answer:
        "Simply create a Employers account, verify your company details, and use our intuitive job posting interface to list opportunities.",
    },
    {
      question: "What is the cost for accessing candidates?",
      answer:
        "We offer flexible pricing plans including pay-per-hire and subscription models. Contact our sales team for custom packages.",
    },
    {
      question: "How do you ensure candidate quality?",
      answer:
        "All candidates complete verified skill assessments, portfolio reviews, and background checks before being listed on our platform.",
    },
    {
      question: "Can I filter candidates by specific skills?",
      answer:
        "Yes, our advanced filtering system allows you to search by skills, experience level, location, availability, and more.",
    },
  ],
}

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof faqData>("Student")
  const [openQuestions, setOpenQuestions] = useState<number[]>([])

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const handleTabChange = (tab: keyof typeof faqData) => {
    setActiveTab(tab)
    setOpenQuestions([]) // Close all questions when switching tabs
  }

  return (
    <section className="py-16 bg-white" id="faqs">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus
              maecenas.
            </p>

            {/* Tab Navigation */}
            <div className="space-y-2">
              {Object.keys(faqData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab as keyof typeof faqData)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">{tab}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === tab ? "rotate-180" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {faqData[activeTab].map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center transition-transform duration-200 ${
                        openQuestions.includes(index) ? "rotate-180" : ""
                      }`}
                    >
                      {openQuestions.includes(index) ? (
                        <ChevronUp className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openQuestions.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
