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
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
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
  baseURL: API_BASE_URL,
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
  const res = await api.get("/api/v1/jobs/my/posts")
  return res.data.data.jobs
}

export default {
  getMyJobPosts,
}