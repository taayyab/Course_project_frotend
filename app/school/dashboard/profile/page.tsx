"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/institute/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/institute/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/institute/ui/avatar";
import { Input } from "@/components/institute/ui/input";
import { Textarea } from "@/components/institute/ui/textarea";
import { createSchoolProfile } from "@/lib/school.api";
import { useAuth } from "@/context/AuthContext"; 

export default function ProfilePage() {
  const router = useRouter();
  const { token } = useAuth();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [established, setEstablished] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([""]);
  const [location, setLocation] = useState("");

  const handleFocusAreaChange = (index: number, value: string) => {
    const updated = [...focusAreas];
    updated[index] = value;
    setFocusAreas(updated);
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("Unauthorized! Please login again.");
      return;
    }
    if (!name || !email || !phone || !about || !profileImage) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("about", about);
    formData.append("established", established);
    formData.append("location", location);
    focusAreas.forEach((area) => formData.append("focusAreas[]", area));

    const response = await createSchoolProfile(formData, token);
    if (response.success) {
      router.push("/school/dashboard/profile/user");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Profile</h1>
        <p className="mt-1 text-[#696984]">Facilitate industry partnerships and manage employer relationships</p>

        <Card className="mt-5 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profileImage ? URL.createObjectURL(profileImage) : ""} alt={name || "Profile"} />
                  <AvatarFallback>{name ? name[0]?.toUpperCase() : "N/A"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
                  <Input placeholder="Institute Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input placeholder="Contact Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <Button className="rounded-lg" onClick={handleSubmit}>Save Profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#3f3f3f]">
            <Textarea placeholder="About your institute" value={about} onChange={(e) => setAbout(e.target.value)} />
            <Input placeholder="Established Date (YYYY-MM-DD)" value={established} onChange={(e) => setEstablished(e.target.value)} />
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            {focusAreas.map((area, i) => (
              <Input
                key={i}
                placeholder={`Focus Area ${i + 1}`}
                value={area}
                onChange={(e) => handleFocusAreaChange(i, e.target.value)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
