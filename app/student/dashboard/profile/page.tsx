"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/student/dashboard/ui/card"
import { Button } from "@/components/student/dashboard/ui/button"
import { Input } from "@/components/student/dashboard/ui/input"
import { Label } from "@/components/student/dashboard/ui/label"
import { Textarea } from "@/components/student/dashboard/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/student/dashboard/ui/avatar"
import { Badge } from "@/components/student/dashboard/ui/badge"
import { Switch } from "@/components/student/dashboard/ui/switch"
import { Checkbox } from "@/components/student/dashboard/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Briefcase, Upload, User, Calendar, Trophy, FileText } from "lucide-react"
import { studentApiData } from "@/lib/student.api"

interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
  location: string
  website: string
  skills: string[]
  certifications: Array<{
    name: string
    issuedBy: string
    issueDate: string
  }>
  experience: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  gsceResult: Array<{
    subject: string
    marks: string
    grade: string
  }>
  idKycApproved: boolean
   kycVerification?: {
    _id: string
    status: "pending" | "approved" | string
  }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false)
  const [isCertificationOpen, setIsCertificationOpen] = useState(false)
  const [isExperienceOpen, setIsExperienceOpen] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [kycSubmitted, setKycSubmitted] = useState(false)

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
  })

  const [certificationForm, setCertificationForm] = useState({
    name: "",
    issuedBy: "",
    issueDate: "",
    image: null as File | null,
  })

  const [experienceForm, setExperienceForm] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const [kycForm, setKycForm] = useState({
    fullLegalName: "",
    dateOfBirth: "",
    nationallnsuranceNumber: "",
    educationalQualifications: [] as string[],
    addressProof: null as File | null,
    govtId: null as File | null,
    electricityBill: null as File | null,
    bankStatement: null as File | null,
    educationalCertificates: null as File | null,
  })

  const [gcseForm, setGcseForm] = useState({
    subject: "",
    marks: "",
    grade: "",
  })

  const tabs = [
    { id: "profile", label: "Profile Information" },
    { id: "skills", label: "Skills & Certifications" },
    { id: "privacy", label: "Privacy Settings" },
    { id: "verify", label: "Verify" },
    { id: "gcse", label: "GCSE Results" },
  ]

  useEffect(() => {
    fetchProfileData()
  }, [])

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      const data = await studentApiData.getMyProfile()
      const profile = data.payload || data
      setProfileData(profile)
      setPersonalInfo({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
        location: data.location || "",
        website: data.website || "",
      })
      setKycSubmitted(data.idKycApproved)
    } catch (error) {
      console.error("Failed to fetch profile data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePersonalInfoSubmit = async () => {
    try {
      await studentApiData.updatePersonalInfo(personalInfo)
      await fetchProfileData()
      alert("Personal information updated successfully!")
    } catch (error) {
      console.error("Failed to update personal info:", error)
      alert("Failed to update personal information")
    }
  }

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return

  try {
    // Send only the new skill
    await studentApiData.updateSkills([newSkill.trim()])
    await fetchProfileData()
    setNewSkill("")
    setIsAddSkillOpen(false)
  } catch (error) {
    console.error("Failed to add skill:", error)
    alert("Failed to add skill")
  }
}

  const handleDeleteSkill = async (skill: string) => {
    try {
      await studentApiData.deleteSkill(skill)
      await fetchProfileData()
    } catch (error) {
      console.error("Failed to delete skill:", error)
      alert("Failed to delete skill")
    }
  }

  const handleCertificationSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("name", certificationForm.name)
      formData.append("issuedBy", certificationForm.issuedBy)
      formData.append("issueDate", certificationForm.issueDate)
      if (certificationForm.image) {
        formData.append("image", certificationForm.image)
      }

      await studentApiData.addCertification(formData)
      await fetchProfileData()
      setCertificationForm({ name: "", issuedBy: "", issueDate: "", image: null })
      setIsCertificationOpen(false)
      alert("Certification added successfully!")
    } catch (error) {
      console.error("Failed to add certification:", error)
      alert("Failed to add certification")
    }
  }

  const handleExperienceSubmit = async () => {
    try {
      await studentApiData.addExperience(experienceForm)
      await fetchProfileData()
      setExperienceForm({ title: "", company: "", startDate: "", endDate: "", description: "" })
      setIsExperienceOpen(false)
      alert("Work experience added successfully!")
    } catch (error) {
      console.error("Failed to add experience:", error)
      alert("Failed to add work experience")
    }
  }

  const handleKycSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("fullLegalName", kycForm.fullLegalName)
      formData.append("dateOfBirth", kycForm.dateOfBirth)
      formData.append("nationallnsuranceNumber", kycForm.nationallnsuranceNumber)
      formData.append("educationalQualifications", JSON.stringify(kycForm.educationalQualifications))

      if (kycForm.addressProof) formData.append("addressProof", kycForm.addressProof)
      if (kycForm.govtId) formData.append("govtld", kycForm.govtId)
      if (kycForm.electricityBill) formData.append("electricityBill", kycForm.electricityBill)
      if (kycForm.bankStatement) formData.append("bankStatement", kycForm.bankStatement)
      if (kycForm.educationalCertificates) formData.append("educationalCertificates", kycForm.educationalCertificates)

      await studentApiData.submitKyc(formData)
      setKycSubmitted(true)
      alert("KYC submitted successfully!")
    } catch (error) {
      console.error("Failed to submit KYC:", error)
      alert("Failed to submit KYC")
    }
  }

  const handleGcseSubmit = async () => {
    try {
      const existingResults = profileData?.gsceResult || []
      const updatedResults = [...existingResults, gcseForm]
      await studentApiData.updateGcseResults({ gsceResult: updatedResults })
      await fetchProfileData()
      setGcseForm({ subject: "", marks: "", grade: "" })
      alert("GCSE result added successfully!")
    } catch (error) {
      console.error("Failed to add GCSE result:", error)
      alert("Failed to add GCSE result")
    }
  }

  const handleEducationalQualificationChange = (qualification: string, checked: boolean) => {
    if (checked) {
      setKycForm((prev) => ({
        ...prev,
        educationalQualifications: [...prev.educationalQualifications, qualification],
      }))
    } else {
      setKycForm((prev) => ({
        ...prev,
        educationalQualifications: prev.educationalQualifications.filter((q) => q !== qualification),
      }))
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

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
                  <AvatarFallback className="bg-orange-500 text-white text-2xl">
                    {profileData?.firstName?.[0]}
                    {profileData?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {profileData?.firstName} {profileData?.lastName}
                      </h2>
                      <p className="text-gray-600">
                        {profileData?.skills?.slice(0, 3).join(" | ") || "No skills added"}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 w-fit">Pro Member</Badge>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData?.location || "Location not set"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{profileData?.experience?.[0]?.title || "No experience added"}</span>
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
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={personalInfo.website}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handlePersonalInfoSubmit}>
                Save Changes
              </Button>
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
              <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">+ Add Skill</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newSkill">Skill Name</Label>
                      <Input
                        id="newSkill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter skill name"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddSkillOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddSkill} className="bg-blue-600 hover:bg-blue-700">
                        Add Skill
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData?.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                    {skill}
                    <button className="ml-2 text-blue-600 hover:text-blue-800" onClick={() => handleDeleteSkill(skill)}>
                      ×
                    </button>
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
              <Dialog open={isCertificationOpen} onOpenChange={setIsCertificationOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">+ Upload</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Certification</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certName">Certification Name</Label>
                      <Input
                        id="certName"
                        value={certificationForm.name}
                        onChange={(e) => setCertificationForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter certification name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issuedBy">Issued By</Label>
                      <Input
                        id="issuedBy"
                        value={certificationForm.issuedBy}
                        onChange={(e) => setCertificationForm((prev) => ({ ...prev, issuedBy: e.target.value }))}
                        placeholder="Enter issuing organization"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={certificationForm.issueDate}
                        onChange={(e) => setCertificationForm((prev) => ({ ...prev, issueDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certImage">Certificate Image</Label>
                      <Input
                        id="certImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setCertificationForm((prev) => ({
                            ...prev,
                            image: e.target.files?.[0] || null,
                          }))
                        }
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCertificationOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCertificationSubmit} className="bg-blue-600 hover:bg-blue-700">
                        Add Certification
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData?.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                    <Trophy className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-gray-600">
                        {cert.issuedBy} • Issued {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
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
              <Dialog open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">+ Add Work Experience</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Work Experience</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={experienceForm.title}
                        onChange={(e) => setExperienceForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter job title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={experienceForm.startDate}
                          onChange={(e) => setExperienceForm((prev) => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={experienceForm.endDate}
                          onChange={(e) => setExperienceForm((prev) => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your role and achievements"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsExperienceOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleExperienceSubmit} className="bg-blue-600 hover:bg-blue-700">
                        Add Experience
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData?.experience?.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-600 pl-4">
                    <h4 className="font-semibold text-lg">{exp.title}</h4>
                    <p className="text-gray-600">
                      {exp.company} • {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {new Date(exp.endDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GCSE Result Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">GCSE Results</CardTitle>
                <p className="text-gray-600">Your GCSE examination results</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData?.gsceResult?.map((result, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold">{result.subject}</h4>
                    <p className="text-sm text-gray-600">Grade: {result.grade}</p>
                    <p className="text-sm text-gray-600">Marks: {result.marks}</p>
                  </div>
                ))}
              </div>
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
                  <p className="text-sm text-gray-600">Show employers that you're actively looking for opportunities</p>
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
          {/* Show KYC status heading */}
          {profileData?.kycVerification?.status === "pending" && (
            <CardHeader className="text-center">
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">KYC status is pending</h2>
            </CardHeader>
          )}
          {profileData?.kycVerification?.status === "approved" && (
            <CardHeader className="text-center">
              <h2 className="text-xl font-semibold text-green-600 mb-2">KYC status is approved</h2>
            </CardHeader>
          )}
          {/* Existing KYC content */}
          {(kycSubmitted || profileData?.idKycApproved) ? (
            <CardContent className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">KYC Approved!</h2>
              <p className="text-gray-600">Your identity verification has been successfully completed.</p>
            </CardContent>
          ) : (
            <>
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
                    <Input
                      id="fullName"
                      placeholder="Full Legal Name"
                      value={kycForm.fullLegalName}
                      onChange={(e) => setKycForm((prev) => ({ ...prev, fullLegalName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={kycForm.dateOfBirth}
                        onChange={(e) => setKycForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                      />
                      <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalInsurance">National Insurance number</Label>
                  <Input
                    id="nationalInsurance"
                    placeholder="Enter your national insurance number"
                    value={kycForm.nationallnsuranceNumber}
                    onChange={(e) => setKycForm((prev) => ({ ...prev, nationallnsuranceNumber: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Proof of address</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        className="hidden"
                        id="addressProof"
                        onChange={(e) => setKycForm((prev) => ({ ...prev, addressProof: e.target.files?.[0] || null }))}
                      />
                      <label htmlFor="addressProof" className="cursor-pointer">
                        <p className="font-medium">
                          {kycForm.addressProof ? kycForm.addressProof.name : "Choose Files"}
                        </p>
                        <p className="text-sm text-gray-600">Drag and Drop files here</p>
                        <p className="text-xs text-gray-500 mt-2">Confirm your original address</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Government ID</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        className="hidden"
                        id="govtId"
                        onChange={(e) => setKycForm((prev) => ({ ...prev, govtld: e.target.files?.[0] || null }))}
                      />
                      <label htmlFor="govtId" className="cursor-pointer">
                        <p className="font-medium">
                          {kycForm.govtId ? kycForm.govtId.name : "Choose Files"}
                        </p>
                        <p className="text-sm text-gray-600">Drag and Drop files here</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Upload your passport, driving license or national ID
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Electricity Bill e.g.</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        className="hidden"
                        id="electricityBill"
                        onChange={(e) =>
                          setKycForm((prev) => ({ ...prev, electricityBill: e.target.files?.[0] || null }))
                        }
                      />
                      <label htmlFor="electricityBill" className="cursor-pointer">
                        <p className="font-medium">
                          {kycForm.electricityBill ? kycForm.electricityBill.name : "Choose Files"}
                        </p>
                        <p className="text-sm text-gray-600">Drag and Drop files here</p>
                        <p className="text-xs text-gray-500 mt-2">Upload your (e.g. Electricity Bill)</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bank Statement</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        className="hidden"
                        id="bankStatement"
                        onChange={(e) =>
                          setKycForm((prev) => ({ ...prev, bankStatement: e.target.files?.[0] || null }))
                        }
                      />
                      <label htmlFor="bankStatement" className="cursor-pointer">
                        <p className="font-medium">
                          {kycForm.bankStatement ? kycForm.bankStatement.name : "Choose Files"}
                        </p>
                        <p className="text-sm text-gray-600">Drag and Drop files here</p>
                        <p className="text-xs text-gray-500 mt-2">Upload your Bank Statement</p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Educational Qualifications</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "gcse", label: "High School Diploma/GCSE" },
                      { id: "alevels", label: "A-Levels" },
                      { id: "bachelor", label: "Bachelor's Degree" },
                      { id: "master", label: "Master's Degree" },
                      { id: "professional", label: "Professional Diploma" },
                      { id: "trade", label: "Trade Certification" },
                      { id: "other", label: "Other" },
                    ].map((qual) => (
                      <div key={qual.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={qual.id}
                          checked={kycForm.educationalQualifications.includes(qual.label)}
                          onCheckedChange={(checked) =>
                            handleEducationalQualificationChange(qual.label, checked as boolean)
                          }
                        />
                        <Label htmlFor={qual.id}>{qual.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Educational Certificates (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      className="hidden"
                      id="educationalCerts"
                      onChange={(e) =>
                        setKycForm((prev) => ({ ...prev, educationalCertificates: e.target.files?.[0] || null }))
                      }
                    />
                    <label htmlFor="educationalCerts" className="cursor-pointer">
                      <p className="font-medium text-lg">
                        {kycForm.educationalCertificates ? kycForm.educationalCertificates.name : "Choose Files"}
                      </p>
                      <p className="text-gray-600">Drag and Drop files here</p>
                      <p className="text-sm text-gray-500 mt-2">Upload your Educational Certificates and Diploma</p>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline">Back</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleKycSubmit}>
                    Verify
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}

      {/* GCSE Results Tab */}
      {activeTab === "gcse" && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">Your GCSE Results</CardTitle>
            <p className="text-gray-600">Add your GCSE result with details</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subjectName">Subject Name</Label>
                <Input
                  id="subjectName"
                  placeholder="Enter your subject"
                  value={gcseForm.subject}
                  onChange={(e) => setGcseForm((prev) => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marks">Marks</Label>
                <Input
                  id="marks"
                  placeholder="Enter your marks"
                  value={gcseForm.marks}
                  onChange={(e) => setGcseForm((prev) => ({ ...prev, marks: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  placeholder="Enter your grade"
                  value={gcseForm.grade}
                  onChange={(e) => setGcseForm((prev) => ({ ...prev, grade: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline">Back</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGcseSubmit}>
                Save
              </Button>
            </div>

            {/* Display existing GCSE results */}
            {profileData?.gsceResult && profileData.gsceResult.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Your GCSE Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profileData.gsceResult.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <h4 className="font-semibold text-lg">{result.subject}</h4>
                      <p className="text-gray-600">
                        Grade: <span className="font-medium">{result.grade}</span>
                      </p>
                      <p className="text-gray-600">
                        Marks: <span className="font-medium">{result.marks}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
