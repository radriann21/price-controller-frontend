import axiosClient from "@/shared/api/axiosClient";
import type { LoginDto } from "../dto/login.dto";

export const authApi = {
  async login(data: LoginDto) {
    const response = await axiosClient.post('/auth/login', data);
    return response.data;
  },
  
  async logout() {
    const response = await axiosClient.post('/auth/logout');
    return response.data;
  },

  async getMe() {
    const response = await axiosClient.get('/auth/me');
    return response.data;
  }
}
