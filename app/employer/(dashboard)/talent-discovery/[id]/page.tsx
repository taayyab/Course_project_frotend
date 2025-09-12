"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star } from "lucide-react"
import axios from "axios"
import { API_BASE_URL } from "@/lib/auth.api";


export default function CandidateDetailsPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchStudent() {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await axios.get(`${API_BASE_URL}/api/v1/students/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setStudent(res.data?.payload?.student);
      } catch (err) {
        setStudent(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-6 text-center">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/employer/talent-discovery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Candidates
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Loading student details…</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="pt-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/employer/talent-discovery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Candidates
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Student not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fullName = student?.firstName && student?.lastName ? `${student.firstName} ${student.lastName}` : "Student";
  return (
    <div className="pt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/employer/talent-discovery">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Candidates
          </Link>
        </Button>
      </div>
  <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main Content */}
  <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6 flex-col sm:flex-row">
                <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage src={student.profilePicture || `/placeholder.svg?height=80&width=80`} alt={fullName} />
<AvatarFallback student={{ name: fullName }} />                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold">{fullName}</h1>
                  {student.location && <p className="text-sm text-muted-foreground">{student.location}</p>}
                  {student.bio && (
                    <div className="mt-2">
                      <p className="text-sm leading-relaxed">{student.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Skills */}
          {student.skills && student.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="rounded-full">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {/* GCSE Results */}
          {student.gsceResult && student.gsceResult.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>GCSE Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {student.gsceResult.map((result: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <span className="font-medium">{result.subject}</span>
                      <span className="text-muted-foreground">Marks: {result.marks}</span>
                      <Badge variant="outline">Grade: {result.grade}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {/* Certifications */}
          {student.certifications && student.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {student.certifications.map((cert: any) => (
                    <div key={cert._id} className="border rounded-lg p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <img src={cert.certificateFile} alt={cert.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <div className="font-semibold text-sm">{cert.name}</div>
                          <div className="text-xs text-muted-foreground">Issued by: {cert.issuedBy}</div>
                          <div className="text-xs text-muted-foreground">Date: {new Date(cert.issueDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <a href={cert.certificateFile} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">View Certificate</a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {/* Created/Updated At */}
          {/* No createdAt/updatedAt in API response, so omit Meta Info card */}
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Contact with School</Button>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
