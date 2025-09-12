"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/employer/ui/card";
import { Button } from "@/components/employer/ui/button";
import { Input } from "@/components/employer/ui/input";
import { Label } from "@/components/employer/ui/label";
import { cn } from "@/lib/utils";
import { saveEmployerProfile } from "@/lib/employer.api";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const pathname = usePathname();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    companySize: "",
    industry: "",
    websiteLink: "",

  });
  const [userDetails, setUserDetails] = useState<{ fullName: string; email: string; phone: string; profilePicture?: string } | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL || "https://talnet-bridge.vercel.app"}/api/v1/employers/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.payload;
        setForm({
          name: data.name || "",
          companySize: data.companySize || "",
          industry: data.industry || "",
          websiteLink: data.websiteLink || "",

        });
        setUserDetails(data.userDetails || null);
      } catch (err) {
        toast({ title: "Failed to fetch profile", variant: "destructive" });
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveEmployerProfile(token, form);
      toast({ title: "Profile updated successfully" });
    } catch (err) {
      toast({ title: "Failed to update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-[#696984] mt-1">Manage your account and platform preferences</p>

      <div className="mt-4 flex gap-2">
        <Tab href="/employer/settings" active={pathname === "/settings"}>Company Profile</Tab>
        <Tab href="/employer/settings/notifications" active={pathname === "/settings/notifications"}>Notifications</Tab>
      </div>

      <Card className="mt-5 bg-white border-[#e6e7ef]">
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Company Name">
              <Input
                placeholder="TechCorp Inc."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Company Size">
              <Input
                placeholder="100-500 employees"
                value={form.companySize}
                onChange={(e) => setForm({ ...form, companySize: e.target.value })}
              />
            </Field>
            <Field label="Industry">
              <Input
                placeholder="Technology"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
              />
            </Field>
            <Field label="Website">
              <Input
                placeholder="https://techcorp.com"
                value={form.websiteLink}
                onChange={(e) => setForm({ ...form, websiteLink: e.target.value })}
              />
            </Field>
          
          </div>
          {userDetails && (
            <div className="mt-4 p-4 rounded bg-gray-50 border flex items-center gap-4">
              {userDetails.profilePicture && (
                <img src={userDetails.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              )}
              <div>
                <div className="font-semibold">{userDetails.fullName}</div>
                <div className="text-sm text-gray-600">{userDetails.email}</div>
                <div className="text-sm text-gray-600">{userDetails.phone}</div>
              </div>
            </div>
          )}
          <Button
            className="w-fit bg-[#0f5ff2] hover:bg-[#0d4fe0]"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm",
        active ? "bg-[#0f5ff2] text-white" : "bg-[#e9eefb] text-[#0f5ff2]"
      )}
    >
      {children}
    </Link>
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
