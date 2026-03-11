import axios from "axios";
import { useAuthStore } from "@/shared/stores/AuthStore";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error?.config?.url !== '/auth/me') {
      const { logout } = useAuthStore();
      logout();
    }
    return Promise.reject(error);
  }
)

export default axiosClient;