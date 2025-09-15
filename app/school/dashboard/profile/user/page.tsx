"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/institute/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/institute/ui/card";
import { Button } from "@/components/admin/ui/button";
import { CourseCard } from "@/components/institute/course-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/institute/ui/avatar";
import { getSchoolProfile } from "@/lib/school.api";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    const response = await getSchoolProfile(token!);
    if (response.success) {
      setProfile(response.data.payload.profile);
    }
  };

  return (
    <AppShell>
      <div className="px-4 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-[#1e242c]">Profile</h1>
        <p className="mt-1 text-[#696984]">
          Facilitate industry partnerships and manage employer relationships
        </p>

        <Card className="mt-5 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={profile?.picture || "/placeholder.svg?height=48&width=48"}
                    alt={profile?.name || "School"}
                  />
                  <AvatarFallback>
                    {profile?.name ? profile.name.slice(0, 2).toUpperCase() : "SC"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-[#1e242c]">
                    {profile?.name || ""}
                  </div>
                  <div className="text-sm text-[#696984]">
                    Email Address: {profile?.email || ""}
                  </div>
                  <div className="text-sm text-[#696984]">
                    Contact: {profile?.phone || ""}
                  </div>
                </div>
              </div>
                <Link href="/school/dashboard/profile">

              <Button className="rounded-lg cursor-pointer">Edit</Button></Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1e242c]">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[#3f3f3f]">
            <p>{profile?.about || ""}</p>
            <p>
              <span className="font-medium">Established:</span>{" "}
              {profile?.established
                ? new Date(profile.established).getFullYear()
                : ""}
            </p>
            <p>
              <span className="font-medium">Location:</span>{" "}
              {profile?.location || ""}
            </p>
            <p>
              <span className="font-medium">Focus Areas:</span>{" "}
              {profile?.focusAreas?.length
                ? profile.focusAreas.join(", ")
                : ""}
            </p>
          </CardContent>
        </Card>

        {/* <div className="mt-6 flex items-center justify-between">
          <div className="font-semibold text-[#1e242c]">
            Explore best courses{" "}
            <span className="text-[#0a60ff]">{profile?.stats?.totalCourses || 0}</span>
          </div>
          <Button
            variant="secondary"
            className="rounded-full bg-[#f6f8ff] text-[#0755e9]"
          >
            View ALL
          </Button>
        </div> */}

        {/* <div className="mt-3 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {profile?.courses?.length
            ? profile.courses.map((course: any, i: number) => (
                <CourseCard key={i} course={course} />
              ))
            : [<CourseCard key="placeholder1" />, <CourseCard key="placeholder2" />]}
        </div> */}
      </div>
    </AppShell>
  );
}
