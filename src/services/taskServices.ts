import api from "./Interceptor";

export const fetchTasks = async () => {
  try {
    const response = await api.get("/userTask");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
