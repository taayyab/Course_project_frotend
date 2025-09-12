"use client";
import { useState } from "react";
import { signup, signin } from "@/lib/auth.api";
import { useRouter } from "next/navigation";
import { Input } from "@/components/institute/ui/input";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/institute/ui/button";
import { Mail, Lock, Eye, User } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
type AuthFormProps = {
  role: string;
  type: "signup" | "signin";
};

export default function AuthForm({ role, type }: AuthFormProps) {
  const [fullName, setFullName] = useState(""); // <-- rename
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (type === "signup") {
        await signup(role, fullName, email, phone, password);
        router.push(`/${role}/dashboard`);
      } else {
        const data = await signin(email, password);
        login(data.data.payload.accessToken, data.data.payload.user);
        const userRole = data.data.payload.user?.role || role;
        router.push(`/${userRole}/dashboard`);
      }
    } catch (err: any) {
      // Error handling for wrong credentials or email already exists
      if (err?.response?.data?.message) {
        const msg = err.response.data.message.toLowerCase();
        if (msg.includes("invalid") || msg.includes("wrong") || msg.includes("credentials")) {
          setError("Incorrect email or password.");
        } else if (msg.includes("exists")) {
          setError("Email already exists. Please use a different email or sign in.");
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#f7f8ff]">
      <Card className="w-full max-w-xl shadow-sm rounded-2xl">
        <CardContent className="p-10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#1e242c]">TalentBridge</h1>
            <p className="text-[#696984] cursor-pointer">
              {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
              {type === "signup" ? "Sign Up" : "Sign In"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {type === "signup" && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <Input
                      className="pl-9 rounded-lg"
                      placeholder="John Doe"
                      value={fullName} // <-- use fullName
                      onChange={(e) => setFullName(e.target.value)} // <-- use setFullName
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">
                    Phone
                  </label>
                  <div className="relative">
                    <Input
                      type="tel"
                      className="pl-4 rounded-lg"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                <Input
                  type="email"
                  className="pl-9 rounded-lg"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#3f3f3f]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                <Input
                  type="password"
                  className="pl-9 pr-9 rounded-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 rounded-lg text-base flex items-center cursor-pointer justify-center ${
                type === "signup"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                type === "signup" ? "Sign Up" : "Sign In"
              )}
            </Button>

            <div className="text-center text-sm cursor-pointer">
              {type === "signup" ? (
                <>
                  Already have an account?{" "}
                  <Link href={`/${role}/login`} className="text-[#0a60ff] hover:underline">
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  New to TalentBridge?{" "}
                  <Link href={`/${role}/signup`} className="text-[#0a60ff] hover:underline">
                    Request Access
                  </Link>
                </>
              )}
            </div>

            <div className="text-center text-xs text-[#9e9e9e]">
              Demo: Use any email/password to continue
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}