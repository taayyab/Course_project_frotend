"use client"

import { useEffect, useState } from "react"
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/admin/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Search, Eye } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import {
  fetchStudents, fetchEmployers, fetchInstitutes,
  updateUserStatus, fetchStudentById, fetchEmployerById, fetchInstituteById
} from "@/lib/admin.api"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"

export default function UserManagement() {
  const [students, setStudents] = useState<any[]>([])
  const [employers, setEmployers] = useState<any[]>([])
  const [institutes, setInstitutes] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Modal state
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<"student" | "employer" | "institute" | null>(null)


  // Utility functions
  const filterData = (data: any[]) => {
    if (statusFilter === "all" && !searchTerm) return data
    return data.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesSearch = !searchTerm || (item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || item.email?.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesStatus && matchesSearch
    })
  }

  const handleStatusChange = async (id: string, status: string) => {
    await updateUserStatus(id, status)
    // Optionally refresh data
  }

  const handleView = async (id: string, type: "student" | "employer" | "institute") => {
    try {
      let userData
      if (type === "student") {
        userData = await fetchStudentById(id)
      } else if (type === "employer") {
        userData = await fetchEmployerById(id)
      } else {
        userData = await fetchInstituteById(id)
      }
      setSelectedUser(userData)
      setRole(type)
      setOpen(true)
    } catch (err) {
      console.error("Failed to fetch user details:", err)
    }
  }

  // Data loading effect
  useEffect(() => {
    setLoading(true)
    Promise.all([fetchStudents(), fetchEmployers(), fetchInstitutes()])
      .then(([studentsData, employersData, institutesData]) => {
        setStudents(studentsData)
        setEmployers(employersData)
        setInstitutes(institutesData)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <main className="p-4 sm:p-6 max-w-full">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
        <div className="relative w-full sm:w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue="student" className="w-full">
    <TabsList className="mb-4 flex flex-wrap gap-2 w-full justify-start sm:justify-center">
          <TabsTrigger value="student">Students</TabsTrigger>
          <TabsTrigger value="recruiter">Employers</TabsTrigger>
          <TabsTrigger value="institute">Institutes</TabsTrigger>
        </TabsList>
        {/* Students Table */}
        <TabsContent value="student">
          <Card>
            <CardHeader><CardTitle>Students</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y">
                <thead>
                  <tr>
                    <th className="text-left px-2 py-2 text-sm">Name</th>
                    <th className="text-left px-2 py-2 text-sm">Email</th>
                    <th className="text-left px-2 py-2 text-sm">Phone</th>
                    <th className="text-left px-2 py-2 text-sm">Status</th>
                    <th className="text-left px-2 py-2 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(students).map((student) => (
                    <tr key={student._id} className="hover:bg-muted transition-colors">
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{student.fullName}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{student.email}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{student.phone}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">
                        <Select
                          value={student.status}
                          onValueChange={(val) => handleStatusChange(student._id, val)}
                        >
                          <SelectTrigger className="w-28 sm:w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">
                        <Button variant="outline" size="sm"
                          onClick={() => handleView(student._id, "student")}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Employers Table */}
        <TabsContent value="recruiter">
          <Card>
            <CardHeader><CardTitle>Employers</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y">
                <thead>
                  <tr>
                    <th className="text-left px-2 py-2 text-sm">Name</th>
                    <th className="text-left px-2 py-2 text-sm">Email</th>
                    <th className="text-left px-2 py-2 text-sm">Phone</th>
                    <th className="text-left px-2 py-2 text-sm">Status</th>
                    <th className="text-left px-2 py-2 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(employers).map((emp) => (
                    <tr key={emp._id} className="hover:bg-muted transition-colors">
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{emp.fullName}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{emp.email}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{emp.phone}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">
                        <Select
                          value={emp.status}
                          onValueChange={(val) => handleStatusChange(emp._id, val)}
                        >
                          <SelectTrigger className="w-28 sm:w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">
                        <Button variant="outline" size="sm"
                          onClick={() => handleView(emp._id, "employer")}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Institutes Table */}
        <TabsContent value="institute">
          <Card>
            <CardHeader><CardTitle>Institutes</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y">
                <thead>
                  <tr>
                    <th className="text-left px-2 py-2 text-sm">Name</th>
                    <th className="text-left px-2 py-2 text-sm">Email</th>
                    <th className="text-left px-2 py-2 text-sm">Phone</th>
                    <th className="text-left px-2 py-2 text-sm">Status</th>
                    <th className="text-left px-2 py-2 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData(institutes).map((inst) => (
                    <tr key={inst._id} className="hover:bg-muted transition-colors">
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{inst.fullName}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{inst.email}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">{inst.phone}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">
                        <Select
                          value={inst.status}
                          onValueChange={(val) => handleStatusChange(inst._id, val)}
                        >
                          <SelectTrigger className="w-28 sm:w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm">
                        <Button variant="outline" size="sm"
                          onClick={() => handleView(inst._id, "institute")}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Modal with KYC Details for Student */}
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="w-full   p-2 sm:p-4 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {role === "student" && "Student Profile"}
              {role === "employer" && "Employer Profile"}
              {role === "institute" && "Institute Profile"}
            </DialogTitle>
            <DialogDescription>Details fetched from API</DialogDescription>
          </DialogHeader>
          {selectedUser ? (
            <div className="space-y-6">
              {/* Basic Info */}
              {role === "student" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="break-words"><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
                    <p className="break-words"><b>Email:</b> {selectedUser.email}</p>
                    <p className="break-words"><b>Phone:</b> {selectedUser.phone}</p>
                    <p className="break-words"><b>Location:</b> {selectedUser.location}</p>
                    <p className="break-words"><b>Website:</b> {selectedUser.website}</p>
                  </div>
                  {/* KYC Details */}
                  {selectedUser.kycVerification && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>KYC Verification Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-1">Full Legal Name</h4>
                              <p className="text-muted-foreground break-words">{selectedUser.kycVerification.fullLegalName}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-1">Date of Birth</h4>
                              <p className="text-muted-foreground break-words">{selectedUser.kycVerification.dateOfBirth ? new Date(selectedUser.kycVerification.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-1">National Insurance Number</h4>
                              <p className="text-muted-foreground break-words">{selectedUser.kycVerification.nationalInsuranceNumber}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-1">Verification Status</h4>
                              <Badge variant={selectedUser.kycVerification.status === 'approved' ? 'default' : 'outline'}>
                                {selectedUser.kycVerification.status}
                              </Badge>
                            </div>
                          </div>
                          {/* Educational Qualifications */}
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-2">Educational Qualifications</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedUser.kycVerification.educationalQualifications?.map((qual: string, idx: number) => (
                                <Badge key={idx} variant="secondary">{qual}</Badge>
                              ))}
                            </div>
                          </div>
                          {/* Documents */}
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-4">Verification Documents</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {selectedUser.kycVerification.documents?.map((doc: any, idx: number) => (
                                <div key={idx} className="border rounded-lg p-4">
                                  <div className="aspect-video relative mb-2">
                                    <img
                                      src={doc.docUrl}
                                      alt={doc.docType}
                                      className="object-cover rounded-md w-full h-full max-h-40"
                                    />
                                  </div>
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div>
                                      <p className="text-sm font-medium capitalize break-words">{doc.docType.replace(/([A-Z])/g, ' $1').trim()}</p>
                                      <p className="text-xs text-muted-foreground break-words">{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => window.open(doc.docUrl, '_blank')}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Timestamps */}
                          <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-2">
                            <div>
                              <p>Created: {new Date(selectedUser.kycVerification.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                              <p>Last Updated: {new Date(selectedUser.kycVerification.updatedAt).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
              {role === "employer" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p className="break-words"><b>Name:</b> {selectedUser.name}</p>
                  <p className="break-words"><b>Industry:</b> {selectedUser.industry}</p>
                  <p className="break-words"><b>Size:</b> {selectedUser.companySize}</p>
                  <p className="break-words"><b>Website:</b> {selectedUser.websiteLink}</p>
                  <p className="break-words"><b>Description:</b> {selectedUser.description}</p>
                </div>
              )}
              {role === "institute" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p className="break-words"><b>Name:</b> {selectedUser.name}</p>
                  <p className="break-words"><b>About:</b> {selectedUser.about}</p>
                  <p className="break-words"><b>Location:</b> {selectedUser.location}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center p-4">Loading details...</p>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}



