import axios from "axios";

const api = axios.create({
  baseURL: "https://task-mgmt-backend-01.vercel.app",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("T");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
