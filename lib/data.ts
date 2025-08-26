import type { LucideIcon } from "lucide-react"
import { BookOpen, MessageSquare } from 'lucide-react'

export type Candidate = {
  id: string
  name: string
  title: string
  institute: string
  experience: string
  location: string
  grade: string
  match: number
  skills: string[]
}
export const candidates: Candidate[] = [
  {
    id: "alex-1",
    name: "Alex Rodriguez",
    title: "Full Stack Development",
    institute: "CodeCraft Academy",
    experience: "6 months internship",
    location: "San Francisco, CA",
    grade: "A+",
    match: 95,
    skills: ["React", "Node.js", "Python", "MongoDB", "Docker"],
  },
  {
    id: "sara-2",
    name: "Sara Patel",
    title: "Frontend Development",
    institute: "TechBridge",
    experience: "2-5 years",
    location: "Remote",
    grade: "A",
    match: 91,
    skills: ["React", "TypeScript", "Next.js", "Tailwind"],
  },
  {
    id: "li-3",
    name: "Li Wei",
    title: "Backend Development",
    institute: "ByteWorks",
    experience: "1-2 years",
    location: "Austin, TX",
    grade: "B+",
    match: 88,
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "maria-4",
    name: "Maria Gomez",
    title: "Data Science",
    institute: "DataLab Institute",
    experience: "0-1 year",
    location: "New York, NY",
    grade: "A",
    match: 86,
    skills: ["Python", "Pandas", "Scikit-learn", "SQL"],
  },
  {
    id: "john-5",
    name: "John Carter",
    title: "DevOps",
    institute: "CloudHub",
    experience: "5+ years",
    location: "Seattle, WA",
    grade: "A+",
    match: 92,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "nina-6",
    name: "Nina Park",
    title: "Mobile Development",
    institute: "AppForge",
    experience: "2-5 years",
    location: "San Jose, CA",
    grade: "A",
    match: 90,
    skills: ["React Native", "TypeScript", "iOS", "Android"],
  },
]

export type JobPost = {
  id: string
  title: string
  status: "Active" | "Paused"
  dept: string
  location: string
  type: "Full-time" | "Part-time" | "Contract"
  range: string
  applications: number
  posted: string
  remote?: boolean
}
export const jobPosts: JobPost[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    status: "Active",
    dept: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    range: "$80,000 - $100,000",
    applications: 23,
    posted: "2024-01-10",
  },
  {
    id: "2",
    title: "Data Scientist",
    status: "Active",
    dept: "Analytics",
    location: "Remote",
    type: "Full-time",
    range: "$90,000 - $120,000",
    applications: 23,
    posted: "2024-01-10",
    remote: true,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    status: "Paused",
    dept: "Infrastructure",
    location: "Austin, TX",
    type: "Full-time",
    range: "$85,000 - $110,000",
    applications: 31,
    posted: "2024-01-08",
  },
]

export type Notification = {
  id: string
  title: string
  body: string
  type: "module" | "message"
  read: boolean
  timeAgo: string
  icon: LucideIcon
}
export const notifications: Notification[] = [
  {
    id: "n1",
    title: "New module available",
    body: "Module 9: Advanced Hooks is now available in your React course",
    type: "module",
    read: false,
    timeAgo: "2 hours ago",
    icon: BookOpen,
  },
  {
    id: "n2",
    title: "New message from School",
    body: "Module 9: Advanced Hooks is now available in your React course",
    type: "message",
    read: false,
    timeAgo: "2 hours ago",
    icon: MessageSquare,
  },
  {
    id: "n3",
    title: "New module available",
    body: "Module 9: Advanced Hooks is now available in your React course",
    type: "module",
    read: true,
    timeAgo: "2 hours ago",
    icon: BookOpen,
  },
  {
    id: "n4",
    title: "New message from School",
    body: "Module 9: Advanced Hooks is now available in your React course",
    type: "message",
    read: false,
    timeAgo: "2 hours ago",
    icon: MessageSquare,
  },
]

export type Conversation = {
  id: string
  name: string
  subtitle: string
}
export const conversations: Conversation[] = [
  { id: "c1", name: "Jone Deo", subtitle: "Harvard University" },
  { id: "c2", name: "Alex Rodriguez", subtitle: "CodeCraft Academy" },
  { id: "c3", name: "Sarah Chen", subtitle: "TechBridge" },
]
export type ChatMessage = { id: string; side: "left" | "right"; text: string; time: string }
export const chatThread: ChatMessage[] = [
  { id: "m1", side: "left", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
  { id: "m2", side: "right", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
  { id: "m3", side: "left", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
  { id: "m4", side: "right", text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", time: "8:00 PM" },
]
