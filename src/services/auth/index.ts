import { api } from "../../api";

export const login = async (email: string, password: string) => {
  try {
    const data = { email, password };
    const response = await api.post(`/login/`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Failed to log in" };
  }
};
