export default function HowTrainingInstitutesWorks() {
  return (
    <section className="py-16  bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-orange-500">Training Institutes</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're learning, teaching, or hiring, Skill Bridge has the tools you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* Step 1 */}
          <div className="text-center flex flex-col items-center p-4 shadow-lg border-1 rounded-lg">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 flex  justify-end">01</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Onboard</h3>
            <p className="text-gray-600 text-sm md:text-base max-w-xs">
              Get verified and set up your institute profile
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center flex flex-col items-center p-4 shadow-lg border-1 rounded-lg">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">02</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 ">List Courses</h3>
            <p className="text-gray-600 text-sm md:text-base ">Upload courses and manage student enrollments</p>
          </div>

          {/* Step 3 */}
          <div className=" flex flex-col items-center p-4 shadow-lg border-1 rounded-lg">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">03</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Connect Employers</h3>
            <p className="text-gray-600 text-sm md:text-base max-w-xs">Showcase graduates to hiring partners</p>
          </div>
        </div>
      </div>
    </section>
  )
}
