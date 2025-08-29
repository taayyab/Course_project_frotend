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