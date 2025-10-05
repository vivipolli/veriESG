import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 30000, // Increased to 30 seconds
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API error", error.response.data);
    }
    return Promise.reject(error);
  },
);

export default apiClient;

