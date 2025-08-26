"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/employer/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/employer/ui/card";
import { Input } from "@/components/employer/ui/input";
import { Textarea } from "@/components/employer/ui/textarea";
import { Label } from "@/components/employer/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/employer/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createJobPost } from "@/lib/employer.api";

export default function CreateJobPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    employment: "Full-time",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    perks: "",
    category: "",
    deadline: "",
    skills: [{ skill: "", proficiency: "" }],
  });

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updatedSkills = [...form.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setForm({ ...form, skills: updatedSkills });
  };

  const addSkillField = () => {
    setForm({ ...form, skills: [...form.skills, { skill: "", proficiency: "" }] });
  };

  async function submit() {
    if (!form.title || !form.location || !form.salaryMin || !form.description || !form.requirements) {
      toast({ title: "Please complete required fields", variant: "destructive" as any });
      return;
    }

    const payload = {
      jobTitle: form.title,
      department: form.department,
      location: form.location,
      employmentType: form.employment,
      salary: { min: Number(form.salaryMin), max: Number(form.salaryMax) },
      jobDescription: form.description,
      skillsRequired: form.skills.filter(s => s.skill),
      benefits: form.perks,
      category: form.category,
      applicationDeadline: form.deadline,
    };

    const token = localStorage.getItem("token");
    const response = await createJobPost(payload, token!);

    if (response.success) {
      toast({ title: "Job post published successfully" });
      router.push("/employer/job-posts");
    } else {
      toast({ title: "Failed to publish job", variant: "destructive" as any });
    }
  }

  return (
    <div className="pt-6">
      <button onClick={() => router.push("/employer/job-posts")} className="inline-flex items-center gap-2 text-[#3f3f3f]">
        <ArrowLeft className="h-4 w-4" /> Back to Job Posts
      </button>

      <Card className="mt-4 bg-white/80 border-[#e6e7ef]">
        <CardHeader>
          <CardTitle>Create New Job Post</CardTitle>
          <CardDescription>Fill out the details for your new job posting</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Job Title *">
              <Input placeholder="e.g. Senior Frontend Developer" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Department *">
              <Input placeholder="e.g. Engineering" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
            </Field>

            <Field label="Location *">
              <Input placeholder="e.g. San Francisco, CA or Remote" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </Field>
            <Field label="Employment Type *">
              <Select value={form.employment} onValueChange={v => setForm({ ...form, employment: v })}>
                <SelectTrigger><SelectValue placeholder="Full-time" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Salary Range (Min) *">
              <Input placeholder="65000" value={form.salaryMin} onChange={e => setForm({ ...form, salaryMin: e.target.value })} />
            </Field>
            <Field label="Salary Range (Max)">
              <Input placeholder="150000" value={form.salaryMax} onChange={e => setForm({ ...form, salaryMax: e.target.value })} />
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Job Description *">
              <Textarea placeholder="Describe the role…" className="min-h-[140px]" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </Field>
            <Field label="Requirements *">
              <Textarea placeholder="List required skills…" className="min-h-[140px]" value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
            </Field>
          </div>

          <Field label="Benefits & Perks">
            <Textarea placeholder="Health insurance, 401k…" value={form.perks} onChange={e => setForm({ ...form, perks: e.target.value })} />
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Category">
              <Input placeholder="e.g. Technology" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            </Field>
            <Field label="Application Deadline">
              <Input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
            </Field>
          </div>

          <div className="space-y-4">
            <Label>Skills Required</Label>
            {form.skills.map((skill, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Skill e.g. React" value={skill.skill} onChange={e => handleSkillChange(idx, "skill", e.target.value)} />
                <Input placeholder="Proficiency e.g. Advanced" value={skill.proficiency} onChange={e => handleSkillChange(idx, "proficiency", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" onClick={addSkillField}>+ Add Skill</Button>
          </div>

          <div className="flex gap-3">
            <Button onClick={submit} className="bg-[#0f5ff2] hover:bg-[#0d4fe0]">Publish Job Post</Button>
            <Button variant="outline" className="border-[#e6e7ef]" onClick={() => router.push("/employer/job-posts")}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
