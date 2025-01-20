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

export const fetchSingleTask = async (id: string) => {
  try {
    const response = await api.get(`/task/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  title: string,
  description: string
) => {
  try {
    const response = await api.put(`/updateTask/${id}`, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
