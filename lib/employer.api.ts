import axios from "axios";
import { API_BASE_URL } from "./auth.api";


export const createJobPost = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/jobs`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("Create Job API Error:", err);
    return { success: false, error: err.response?.data || err.message };
  }
};


export const saveEmployerProfile = async (token: string, data: {
  name: string;
  companySize: string;
  industry: string;
  websiteLink: string;
}) => {
  const res = await axios.post(`${API_BASE_URL}/api/v1/employers`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// ✅ Get AI-matched candidates
export const getMatchedCandidates = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_BASE_URL}/api/v1/employers/my-matched-candidates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data?.payload?.candidates || [];
  } catch (error) {
    console.error("Error fetching matched candidates:", error);
    return [];
  }
};


const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
})

// Attach token from localStorage before each request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

/**
 * Get employer's job posts
 */
export async function getMyJobPosts() {
  const res = await api.get("/jobs/my/posts")
  return res.data.payload.jobs
}


export interface Student {
  id: string
  name: string
  email: string
  profileImage?: string
  skills: string[]
  matchPercentage: number
  location?: string
  grade?: string
  institute?: string
  title?: string
  experience?: string
  bio?: string
  projects?: Array<{
    name: string
    description: string
    technologies: string[]
  }>
  education?: Array<{
    institution: string
    degree: string
    year: string
  }>
}

export interface PotentialStudentsResponse {
  status: number
  message: string
  payload: {
    students: Student[]
    pagination: {
      currentPage: number
      totalPages: number
      totalStudents: number
      limit: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
    filters: {
      minMatch: number
      maxMatch: number
      sortBy: string
      sortOrder: string
    }
    summary: {
      totalJobs: number
      studentsCount: number
      averageMatch: number
    }
  }
  success: boolean
  timestamp: string
}


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export async function getPotentialStudents(params?: {
  page?: number
  limit?: number
  minMatch?: number
  maxMatch?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}): Promise<PotentialStudentsResponse> {
  const response = await apiClient.get("/api/v1/employers/my-potential-students", {
    params,
  })
  return response.data
}

export async function getStudentDetails(studentId: string): Promise<{ student: Student }> {
  const response = await apiClient.get(`/api/v1/users/students/${studentId}/profile`)
  return response.data
}


const employerApi = {
  getPotentialStudents,
  getStudentDetails,
}

export { employerApi }
export default {employerApi,  getMyJobPosts}

export const sendContactEmail = async (params: {
  email: string;
  name: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const token = localStorage.getItem("token") || "";
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/email/contact`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};