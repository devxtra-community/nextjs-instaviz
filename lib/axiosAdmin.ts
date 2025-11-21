import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
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
  (response) => response,

  async (error) => {
    console.log("ADMIN AXIOS ERROR:", error);

    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Calling refresh token endpoint…");

        const res = await axiosAdmin.post("/admin/refresh");

        const newToken = res.data.newAccessToken;

        localStorage.setItem("adminAccessToken", newToken);

       originalRequest.headers["Authorization"] = `Bearer ${newToken}`;


        console.log("Retrying original request…");
        return axiosAdmin(originalRequest);
      } catch (err) {
        console.log("Refresh failed → logging out admin");
        localStorage.clear();
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;
