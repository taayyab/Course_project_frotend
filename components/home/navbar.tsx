"use client"
import Logo from "@/public/logo.png";
import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    // fixed w-full z-50
    <nav className="bg-blue-600 text-white  py-4 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-18 h-18  rounded-full flex items-center justify-center">
            <Image
              src={Logo}      // Path to your image
              alt="Logo"           // Alt text for accessibility
              width={132}           // Width in pixels
              height={132}          // Height in pixels
            />          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-blue-200 transition-colors">
            Home
          </a>
          <a href="#testimonials" className="hover:text-blue-200 transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="hover:text-blue-200 transition-colors">
            Pricing
          </a>
          <a href="#faqs" className="hover:text-blue-200 transition-colors">
            FAQS
          </a>

        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-blue-700 hover:text-white">
            Login
          </Button>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            <a href="#" className="hover:text-blue-200 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Courses
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Careers
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Blog
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              About Us
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="text-white hover:bg-blue-700 hover:text-white justify-start">
                Login
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 justify-start">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
