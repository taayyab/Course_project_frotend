// Student API service for handling all student-related API calls
import { API_BASE_URL } from "./auth.api";
import axios from "axios"


// Get auth token from localStorage or wherever you store it
const getAuthToken = () => {
  return localStorage.getItem("token") || ""
}

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}

const apiCallWithFile = async (endpoint: string, formData: FormData) => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}
//  Dashboard Related apis
export const getDashboardStats = async (token: string) => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/students/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.payload;
};

export const getCurrentlyEnrolledCourses = async (token: string) => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/students/currently-enrolled`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.payload;
};

export const getCourses = async (token: string) => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.payload.courses;
};

export const studentApiData = {
  // Get student profile data
  getMyProfile: () => apiCall("/api/v1/students/my"),

  // Update personal information
  updatePersonalInfo: (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    bio: string
    location: string
    website: string
  }) => apiCall("/api/v1/students", { method: "POST", body: JSON.stringify(data) }),

  // Skills management
  updateSkills: (skills: string[]) => apiCall("/api/v1/students/skills", { method: "POST", body: JSON.stringify({ skills }) }),

  deleteSkill: (skill: string) => apiCall(`/api/v1/students/skills/${encodeURIComponent(skill)}`, { method: "DELETE" }),

  // Certifications
  addCertification: (formData: FormData) => apiCallWithFile("/api/v1/students/certifications", formData),

  // Work experience
  addExperience: (data: {
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }) => apiCall("/api/v1/students/experiences", { method: "POST", body: JSON.stringify(data) }),

  // KYC verification
  submitKyc: (formData: FormData) => apiCallWithFile("/api/v1/kyc/initial", formData),

  // GCSE results
  updateGcseResults: (data: {
    gsceResult: Array<{
      subject: string
      marks: string
      grade: string
    }>
  }) => apiCall("/api/v1/students/gsce-result", { method: "POST", body: JSON.stringify(data) }),
}

/////////////////////////////////////////////////////////////////////////////////////////////////////



// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://talnet-bridge.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Types for API responses
export interface School {
  _id: string
  name: string
  email: string
  phone: string
  picture: string
  about: string
  established: string
  focusAreas: string[]
  location: string
  status: string
  courses: any[]
  stats: {
    totalStudents: number
    totalCourses: number
    completionRate: number
  }
}

export interface Course {
  _id: string
  coverImage?: string
  title: string
  instructor: string
  duration: string
  price: number
  language: string
  type: string
  objectives: string[]
  description: string
  skills: string[]
  trainingProvider: string
  category: string
  status: string
  maxEnrollments: number
  currentEnrollments: number
  createdAt: string
  updatedAt: string
}

export interface SchoolsResponse {
  status: number
  message: string
  payload: {
    schools: School[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasMore: boolean
    }
  }
  success: boolean
  timestamp: string
}

export interface CoursesResponse {
  success: boolean
  statusCode: number
  payload: {
    courses: Course[]
    pagination: {
      pages: number
      limit: number
      total: number
      totalPages: number
      hasMore: boolean
      nextCursor?: string
    }
    providerId: string
  }
  message: string
}

export interface CourseDetailsResponse {
  status: number
  message: string
  payload: {
    course: Course
  }
  success: boolean
  timestamp: string
}

export interface AllCoursesResponse {
  status: number
  message: string
  payload: {
    courses: Course[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
  success: boolean
  timestamp: string
}

// API functions
export const studentApi = {
  // Get all schools with pagination and filters
  getSchools: async (
    params: {
      page?: number
      limit?: number
      search?: string
      location?: string
      category?: string
    } = {},
  ) => {
    const response = await api.get<SchoolsResponse>("/api/v1/schools", { params })
    return response.data
  },

  // Get courses by provider ID
  getCoursesByProvider: async (
    providerId: string,
    params: {
      page?: number
      limit?: number
      search?: string
      category?: string
      skill?: string
      priceType?: "free" | "paid"
      duration?: string
    } = {},
  ) => {
    const response = await api.get<CoursesResponse>(`/api/v1/courses/provider/${providerId}`, { params })
    return response.data
  },

  // Get course details by ID
  getCourseDetails: async (courseId: string) => {
    const response = await api.get<CourseDetailsResponse>(`/api/v1/courses/${courseId}`)
    return response.data
  },

  getAllCourses: async (
    params: {
      page?: number
      limit?: number
      search?: string
      category?: string
      skill?: string
      priceType?: "free" | "paid"
      duration?: string
    } = {},
  ) => {
    const response = await api.get<AllCoursesResponse>("/api/v1/courses", { params })
    return response.data
  },

  // Enroll in a course
  enrollInCourse: async (courseId: string) => {
    const response = await api.post(`/api/v1/enrollments`, { courseId })
    return response.data
  },
}

