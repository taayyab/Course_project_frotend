import Navbar from "@/components/home/navbar"
import HeroSection from "@/components/home/heroSection"
import HowApprenticeshipsWorks from "@/components/home/howItWorks"
import ForStudentsSection from "@/components/home/forStudentSection"
import TrustedCompanies from "@/components/home/trustedCompanies"
import HowTrainingInstitutesWorks from "@/components/home/howInstitutesWorks"
import ForRecruitersSection from "@/components/home/forRecuriterSection"
import ForTrainingInstitutesSection from "@/components/home/forTrainingInstitutes"
import StatisticsSection from "@/components/home/statsSection"
import HowRecruitersWorks from "@/components/home/howRecuriterWorks"
import TestimonialsSection from "@/components/home/testimonials"
import FAQSection from "@/components/home/faq"
import PricingSection from "@/components/home/pricingSection"
import FooterCTASection from "@/components/home/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden p-0 m-0">
      <Navbar />
      <HeroSection />
      <ForStudentsSection />
      <HowApprenticeshipsWorks />
      <ForTrainingInstitutesSection />
      <HowTrainingInstitutesWorks />
      <ForRecruitersSection />
      <HowRecruitersWorks />
      <StatisticsSection />
      <TestimonialsSection />
      <TrustedCompanies />
      <PricingSection />
      <FAQSection />
      <FooterCTASection />
    </main>
  )
}
