import axios from "axios";
import { User } from "@/interface/user";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  token?: T;
}

const BASE_URL = "https://task-mgmt-backend-01.vercel.app";

export const registerUser = async (data: User): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.post<ApiResponse<User>>(
      `${BASE_URL}/auth/register`,
      data
    );
    if (response.data.token) {
      localStorage.setItem("T", response.data.token.toString());
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An unexpected error occurred" };
  }
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${BASE_URL}/auth/login`,
      data
    );
    if (response.data.token) {
      localStorage.setItem("T", response.data.token.toString());
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An unexpected error occurred" };
  }
};
