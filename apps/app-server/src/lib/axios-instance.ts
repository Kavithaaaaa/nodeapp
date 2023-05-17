import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.CORE_API_URL,
});

export default axiosInstance;
