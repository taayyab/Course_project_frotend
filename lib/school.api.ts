import axios from "axios";
import { API_BASE_URL } from "./auth.api";

// course Creation API
export const createCourse = async (formData: FormData, token: string) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/courses`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data };
  } catch (error: any) {
    console.error("Course creation failed:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

//School Profile API

export const createSchoolProfile = async (formData: FormData, token: string) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/schools/profile`, // <-- Use backend URL
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data };
  } catch (error: any) {
    console.error("Profile update failed:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};


export const getSchoolProfile = async (token: string) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/schools/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("Get School Profile Error:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};

// student directory API
export interface Student {
  studentId: string
  name: string
  email: string
  phone: string
   enrolledCourses: { courseId: string; courseName: string }[] 
  status: "enrolled" | "in-progress" | "completed" | "withdrawn" | "suspended"
}

export interface StudentsResponse {
  status: number
  message: string
 
    payload: {
      students: Student[]
      pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
      }
    }
  
  success: boolean
  timestamp: string
}

const schoolApiMethods = {
  // Get students directory
  getStudentsDirectory: async (token: string, page = 1, limit = 20): Promise<StudentsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/schools/students-directory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    })
    return response.data
  },

  // Update student enrollment status
  updateStudentStatus: async (token: string, enrollmentId: string, status: Student["status"]): Promise<any> => {
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/enrollments/${enrollmentId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
    return response.data
  },
}

// Export the API object
export const schoolApi = schoolApiMethods




let authToken: string | null = null

// Use API_BASE_URL for axios instance
const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  // Always get the latest token from localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token: string) => {
  authToken = token
}

export const clearAuthToken = () => {
  authToken = null
}

export type Employer = {
  _id: string
  userId: string
  name: string
  description: string
  industry: string
  size: number
  website: string
  location :string
  company: string
  establishedYear: number
  verified: boolean
  totalEmployees: number
  userDetails: {
    name: string
    email: string
    phone: string
    profilePicture: string
  }
  createdAt: string
  updatedAt: string
}

export type EmployersResponse = {
  success: boolean
  employers: Employer[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type Job = {
  _id: string
  jobTitle: string
  department: string
  location: string
  employmentType: string
  salary?: {
    min: number
    max: number
    currency: string
  }
  jobDescription?: string
  skillsRequired?: Array<{
    skill: string
    proficiency: string
  }>
  benefits?: string
  category: string
  applicationDeadline?: string
  status?: string
  createdAt: string
  updatedAt: string
  postedBy: {
    _id: string
    name: string
    industry: string
    userInfo: {
      _id: string
      fullName: string
      email: string
      role: string
    }
  }
}

export type JobsResponse = {
  success: boolean
  statusCode: number
  data: {
    jobs: Job[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasMore: boolean
      nextCursor: string
    }
  }
  message: string
}

export const getEmployersDirectory = async (params?: {
  page?: number
  limit?: number
  search?: string
  industry?: string
  website?: string
  size?: number
  location?: string
}) => {
  const response = await api.get("/schools/employers-directory", { params });
  const payload = response.data.payload ?? {};
  return {
    employers: payload.employers ?? [],
    pagination: payload.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 }
  };
}

export const getTalentRequests = async (params?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  location?: string
}) => {
  const response = await api.get("/jobs", { params });
  const payload = response.data.payload ?? {};
  return {
    jobs: payload.jobs ?? [],
    pagination: payload.pagination ?? { 
      page: 1, 
      limit: 20, 
      total: 0, 
      totalPages: payload.pagination?.pages || 1,
      hasMore: false,
      nextCursor: ""
    }
  };
};




// get the schools courses
export const getCoursesByProvider = async (providerId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_BASE_URL}/api/v1/courses/provider/${providerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data?.payload?.courses || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}
//  get school dashbaord analytics 

// Get dashboard analytics
export const getDashboardAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_BASE_URL}/api/v1/schools/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.payload || null;
  } catch (error) {
    console.error("Error fetching dashboard analytics:", error);
    return null;
  }
};


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