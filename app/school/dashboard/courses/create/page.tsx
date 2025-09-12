"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/institute/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/institute/ui/card";
import { Button } from "@/components/institute/ui/button";
import { Input } from "@/components/institute/ui/input";
import { Textarea } from "@/components/institute/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/institute/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createCourse } from "@/lib/school.api";
import { useAuth } from "@/context/AuthContext";

export default function CreateCoursePage() {
  const router = useRouter();
  const { token } = useAuth();

  // Form state
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [instructorImage, setInstructorImage] = useState<File | null>(null); // NEW FIELD
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("en");
  const [type, setType] = useState("online");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [category, setCategory] = useState("");

  const handleObjectiveChange = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value;
    setObjectives(updated);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const handleSubmit = async () => {
    if (!title || !instructor || !duration || !price || !coverImage || !instructorImage) {
      alert("Please fill all required fields and upload images");
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", coverImage);
    formData.append("instructorImage", instructorImage); // NEW FIELD
    formData.append("title", title);
    formData.append("instructor", instructor);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("language", language);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("category", category);
    objectives.forEach((obj) => formData.append("objectives[]", obj));
    skills.forEach((skill) => formData.append("skills[]", skill));
    console.log("Token before createCourse:", token);

    const response = await createCourse(formData, token);
    console.log("Create course result:", response);
    if (response.success) {
      router.push("/school/dashboard/courses");
    } else {
      alert("Failed to create course");
    }
  };

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <button
          type="button"
          onClick={() => router.push("/school/dashboard/courses")}
          className="mb-4 flex items-center gap-2 text-[#0755E9] focus:outline-none decoration-none cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Courses</span>
        </button>

        <Card className="shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create New Course</CardTitle>
            <CardDescription>Fill in the details below to create a new course for your students.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Cover Image *</label>
              <Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
            </div>

            {/* Instructor Image Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Instructor Image *</label>
              <Input type="file" accept="image/*" onChange={(e) => setInstructorImage(e.target.files?.[0] || null)} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Title</label>
                <Input placeholder="e.g. Advanced Python for Data Science" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Instructor name</label>
                <Input placeholder="e.g. Dr. Sara Chen" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Duration</label>
                <Input placeholder="e.g. 8 Weeks" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Price</label>
                <Input placeholder="$ 199" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue placeholder="Select Course Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Description</label>
              <Textarea rows={6} placeholder="Full Course introduction and Summary" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {objectives.map((obj, i) => (
              <div key={i}>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Learning Objective {i + 1}</label>
                <Input value={obj} onChange={(e) => handleObjectiveChange(i, e.target.value)} placeholder="Add Learning Objective" />
              </div>
            ))}

            {skills.map((skill, i) => (
              <div key={i}>
                <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Skill {i + 1}</label>
                <Input value={skill} onChange={(e) => handleSkillChange(i, e.target.value)} placeholder="Add Skill" />
              </div>
            ))}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">Course Category</label>
              <Input placeholder="e.g. Data Science" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" className="rounded-full bg-[#f3f6ff] text-[#0a60ff]">Save Draft</Button>
              <Button className="rounded-full" onClick={handleSubmit}>Create Course</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
