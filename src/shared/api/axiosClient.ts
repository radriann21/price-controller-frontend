import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://url.com',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

export default axiosClient;