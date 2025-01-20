import api from "./Interceptor";

export const fetchTasks = async () => {
  try {
    const response = await api.get("/userTask");

    if (!response.data || response.data.length === 0) {
      console.log("No tasks found.");
      return [];
    }

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log("No tasks found (404).");
      return [];
    }

    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (title: string, description: string) => {
  try {
    const response = await api.post(`/addTask`, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/deleteTask/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
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
