import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

const axiosRefresh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});


axiosAdmin.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    const endpoint = originalRequest.url || "";

    if (
      endpoint.includes("/admin/login") ||
      endpoint.endsWith("admin/login") ||
      endpoint === "admin/login"
    ) {
      return Promise.reject(error);
    }
    if (
      endpoint.includes("/admin/refresh") ||
      endpoint.endsWith("admin/refresh") ||
      endpoint === "admin/refresh"
    ) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosRefresh.post("/admin/refresh");

        const newToken = res.data.newAccessToken;

        localStorage.setItem("adminAccessToken", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return axiosAdmin(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/admin/login";
        return; 
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;
