// src/api/admin.api.ts
import axios from "axios"
import { API_BASE_URL } from "./auth.api";



// Students
export const fetchStudents = async () => {
  const token = localStorage.getItem("token") || "";
  const res = await axios.get(`${API_BASE_URL}/api/v1/users/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.payload // array of students
}
export const fetchStudentById = async (id: string) => {
  const res = await API.get(`${API_BASE_URL}/api/v1/users/students/${id}/profile`)
  return res.data.payload
}

// Employers
export const fetchEmployers = async () => {
  const token = localStorage.getItem("token") || "";
  const res = await axios.get(`${API_BASE_URL}/api/v1/users/employers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.payload // array of employers
}
export const fetchEmployerById = async (id: string) => {
  const res = await API.get(`${API_BASE_URL}/api/v1/users/company/${id}`)
  return res.data.payload
}

// Institutes
export const fetchInstitutes = async () => {
  const token = localStorage.getItem("token") || "";
  const res = await axios.get(`${API_BASE_URL}/api/v1/users/schools`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.payload // array of schools
}
export const fetchInstituteById = async (id: string) => {
  const res = await API.get(`${API_BASE_URL}/api/v1/users/schools/${id}/profile`)
  return res.data.payload.profile
}

// --- UPDATE USER STATUS ---
export const updateUserStatus = async (id: string, status: string) => {
  const token = localStorage.getItem("token") || "";
  const { data } = await axios.patch(
  `${API_BASE_URL}/api/v1/users/${id}/status`,
  { status },
  { headers: { Authorization: `Bearer ${token}` } }

  );
  return data;
}

const API = axios.create({
  baseURL: API_BASE_URL, // set in .env
});


// Add token for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // adjust if token is stored elsewhere
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Endpoints ---
export const getAdminAnalytics = async () => {
  const res = await API.get("/api/v1/users/admin-analytics");
  return res.data.payload;
};

export const getPlatformUsage = async () => {
  const res = await API.get("/api/v1/users/platform-usage");
  return res.data.payload;
};

export const getStudentsByRegion = async () => {
  const res = await API.get("/api/v1/users/students-by-region");
  return res.data.payload;
};















