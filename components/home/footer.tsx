export default function FooterCTASection() {
  return (
    <footer className="bg-blue-600 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-4 h-4 bg-orange-400 rounded-full"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-white opacity-20 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-blue-400 rounded-full"></div>
      <div className="absolute bottom-8 right-8">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-blue-400">
          <path
            d="M20 5L25 15H35L27.5 22.5L30 35L20 27.5L10 35L12.5 22.5L5 15H15L20 5Z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
      <div className="absolute top-1/2 right-12">
        <svg width="30" height="30" viewBox="0 0 30 30" className="text-blue-300">
          <polygon
            points="15,2 18,12 28,12 20,18 23,28 15,22 7,28 10,18 2,12 12,12"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Transform Apprenticeships?</h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed max-w-md">
              Join thousands of students, institutes, and Employers who are already building the future of work
              together.
            </p>
                      <a href="#pricing" className="hover:text-blue-200 transition-colors">

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
              Join Now →
            </button></a>
          </div>

          {/* Right Navigation */}
          <div className="lg:text-right">
            <nav className="space-y-4">
              <a
                href="#"
                className="block text-white hover:text-blue-200 transition-colors duration-200 text-lg font-medium"
              >
                Home
              </a>
              <a
                href="#testimonials"
                className="block text-white hover:text-blue-200 transition-colors duration-200 text-lg font-medium"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block text-white hover:text-blue-200 transition-colors duration-200 text-lg font-medium"
              >
                Pricing
              </a>
              <a
                href="#faqs"
                className="block text-white hover:text-blue-200 transition-colors duration-200 text-lg font-medium"
              >
                FAQS
              </a>
              <a
                href="#"
                className="block text-white hover:text-blue-200 transition-colors duration-200 text-lg font-medium"
              >
                About Us
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="border-t border-blue-500 mt-16 pt-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-blue-100 font-medium">10,000+ Active Users</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H3.862a2 2 0 01-1.995-1.858L1 7m18 0l-2-4H3l-2 4m18 0v11a1 1 0 01-1 1H4a1 1 0 01-1-1V7" />
                </svg>
              </div>
              <span className="text-blue-100 font-medium">500+ Partner Institutes</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-blue-100 font-medium">80% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
