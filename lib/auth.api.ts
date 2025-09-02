import axios from "axios"

export const API_BASE_URL = "https://talnet-bridge.vercel.app"

export const signup = async (role: string, fullName: string, email: string, phone: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/users/register`, {
      role,
      fullName,
      email,
      phone,
      password,
    })
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Signup failed")
  }
}

export const signin = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/users/login`, {
      email,
      password,
    })
    console.log("Response of the login api", res)
    return res
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Signin failed")
  }
}

export const logout = async (token: string) => {
  console.log("Logout function in auth.api.ts called");
  return axios.post(
    `${API_BASE_URL}/api/v1/users/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`, // <-- Pass the token here
        "Content-Type": "application/json",
      },
    }
  );
};
