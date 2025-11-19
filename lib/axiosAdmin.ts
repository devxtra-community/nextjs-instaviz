import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

axiosAdmin.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("adminAccessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosAdmin.interceptors.response.use(

  (response) => {
    console.log("inside axios instance")
    return response;
  },
  async (error) => {
    console.log("ADMIN AXIOS ERROR:", error);

    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest.retry) {
      console.log("try for new refresh")
      originalRequest.retry = true;
      try {
        const refreshToken = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/admin/refresh`,
          {},
          { withCredentials: true }
        );
        console.log("fetching new access token")
        const newAccessToken = refreshToken.data.newAccessToken;
        localStorage.setItem("adminAccessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAdmin(originalRequest);

      } catch (err) {
        console.log("catch in interceptor worked");
        localStorage.clear();
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;
