"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/student/dashboard/ui/card"
import { Button } from "@/components/student/dashboard/ui/button"
import { Input } from "@/components/student/dashboard/ui/input"
import { Label } from "@/components/student/dashboard/ui/label"
import { Textarea } from "@/components/student/dashboard/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/student/dashboard/ui/avatar"
import { Badge } from "@/components/student/dashboard/ui/badge"
import { Switch } from "@/components/student/dashboard/ui/switch"
import { Checkbox } from "@/components/student/dashboard/ui/checkbox"
import { MapPin, Briefcase, Upload, User, Calendar, Trophy, FileText } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile Information" },
    { id: "skills", label: "Skills & Certifications" },
    { id: "privacy", label: "Privacy Settings" },
    { id: "verify", label: "Verify" },
    { id: "gcse", label: "GCSE Results" },
  ]

  const skills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "Git"]

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-transparent hover:bg-gray-100 text-gray-600"
            }
            variant={activeTab === tab.id ? "default" : "ghost"}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Profile Information Tab */}
      {activeTab === "profile" && (
        <>
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">My Profile</CardTitle>
              <p className="text-gray-600">Manage your professional profile and visibility settings</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-orange-500 text-white text-2xl">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">John Doe</h2>
                      <p className="text-gray-600">Full Stack Developer | React & Python Enthusiast</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 w-fit">Pro Member</Badge>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>London, UK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>London, UK</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Open to Work</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <p className="text-gray-600">Update your personal details</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+44 7123 456789" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="London, UK" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://johndoe.dev" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue="Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and Python. Always eager to learn new technologies and solve complex problems."
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Skills & Certifications Tab */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {/* Skills Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Skills</CardTitle>
                <p className="text-gray-600">Showcase your technical and professional skills</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">+ Add Skill</Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                    {skill}
                    <button className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Certifications</CardTitle>
                <p className="text-gray-600">Display your earned certificates and achievements</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">+ Upload</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Trophy className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">JavaScript Essentials</h4>
                    <p className="text-sm text-gray-600">CodeAcademy • Issued Dec 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Trophy className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">JavaScript Essentials</h4>
                    <p className="text-sm text-gray-600">CodeAcademy • Issued Dec 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Experience Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Work Experience</CardTitle>
                <p className="text-gray-600">Add your professional experience</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">+ Add Work Experience</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-600 pl-4">
                  <h4 className="font-semibold text-lg">Senior Frontend Developer</h4>
                  <p className="text-gray-600">TechCorp Ltd • 2022 - Present</p>
                  <p className="mt-2 text-gray-700">
                    Leading frontend development for enterprise applications using React and TypeScript.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GCSE Result Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Gcse Result</CardTitle>
                <p className="text-gray-600">Add your gcse result</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">+ Add Gcse Result</Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No GCSE results added yet.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Privacy Settings Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          {/* Profile Visibility */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Visibility</CardTitle>
              <p className="text-gray-600">Control who can see your profile and information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Public Profile</h4>
                  <p className="text-sm text-gray-600">Make your profile visible to verified employers</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Open to Work Status</h4>
                  <p className="text-sm text-gray-600">
                    Show employers that you're actively looking for opportunities
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Contact Information</h4>
                  <p className="text-sm text-gray-600">Allow employers to see your email and phone number</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Course Progress</h4>
                  <p className="text-sm text-gray-600">Show your learning progress to potential employers</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Communication Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communication Preferences</CardTitle>
              <p className="text-gray-600">Choose how you want to be contacted</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Course Recommendations</h4>
                  <p className="text-sm text-gray-600">Get personalized course suggestions based on your goals</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Communications</h4>
                  <p className="text-sm text-gray-600">Receive updates about new features and platform news</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Verify Tab */}
      {activeTab === "verify" && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">Verify Your Identity</CardTitle>
            <p className="text-gray-600">We need to verify your identity to ensure account security</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name</Label>
                <Input id="fullName" placeholder="Full Legal Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Input id="dateOfBirth" placeholder="mm/dd/yyyy" />
                  <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalInsurance">National Insurance number</Label>
              <Input id="nationalInsurance" placeholder="Enter your national insurance number" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Proof of address</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Choose Files</p>
                  <p className="text-sm text-gray-600">Drag and Drop files here</p>
                  <p className="text-xs text-gray-500 mt-2">Confirm your original address</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Government ID</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Choose Files</p>
                  <p className="text-sm text-gray-600">Drag and Drop files here</p>
                  <p className="text-xs text-gray-500 mt-2">Upload your passport, driving license or national ID</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Electricity Bill e.g.</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Choose Files</p>
                  <p className="text-sm text-gray-600">Drag and Drop files here</p>
                  <p className="text-xs text-gray-500 mt-2">Upload your (e.g. Electricity Bill)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bank Statement</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Choose Files</p>
                  <p className="text-sm text-gray-600">Drag and Drop files here</p>
                  <p className="text-xs text-gray-500 mt-2">Upload your Bank Statement</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Educational Qualifications</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="gcse" defaultChecked />
                  <Label htmlFor="gcse">High School Diploma/GCSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="alevels" />
                  <Label htmlFor="alevels">A-Levels</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bachelor" />
                  <Label htmlFor="bachelor">Bachelor's Degree</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="master" />
                  <Label htmlFor="master">Master's Degree</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="professional" />
                  <Label htmlFor="professional">Professional Diploma</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trade" />
                  <Label htmlFor="trade">Trade Certification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Educational Certificates (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-medium text-lg">Choose Files</p>
                <p className="text-gray-600">Drag and Drop files here</p>
                <p className="text-sm text-gray-500 mt-2">Upload your Educational Certificates and Diploma</p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline">Back</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Verify</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* GCSE Results Tab */}
      {activeTab === "gcse" && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">Your Gcse result</CardTitle>
            <p className="text-gray-600">Add your gcse result with details</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subjectName">Subject Name</Label>
                <Input id="subjectName" placeholder="Enter your subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marks">Marks</Label>
                <Input id="marks" placeholder="Enter your marks" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" placeholder="Enter your grade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Percentage</Label>
                <Input id="percentage" placeholder="Enter your percentage" />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline">Back</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
