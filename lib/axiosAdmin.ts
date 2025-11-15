import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, 
});

axiosAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminAccessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("ADMIN AXIOS ERROR:", error);

  
    if (error?.response?.status === 401) {
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;
