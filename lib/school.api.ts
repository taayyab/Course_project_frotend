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
