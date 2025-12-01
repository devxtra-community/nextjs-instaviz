import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

let isRefreshing = false;
let waitingQueue: Array<(token: string | null) => void> = [];

// Queue helpers
const addToQueue = (cb: (token: string | null) => void) => {
  waitingQueue.push(cb);
};

const runQueue = (newToken: string | null) => {
  waitingQueue.forEach((cb) => cb(newToken));
  waitingQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const sessionId = localStorage.getItem("sessionId");
  const sessionToken = localStorage.getItem("session_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (sessionId) {
    config.headers["x-session-id"] = sessionId;
  }

  if (!accessToken && sessionToken) {
    config.headers["x-session-token"] = sessionToken;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalReq = error.config;

    if (!error.response) return Promise.reject(error);

    const status = error.response.status;
     if (originalReq.url.includes("/auth/login")) {
    return Promise.reject(error);
  }
    if (status === 401) {
      // Avoid infinite loop
      if (originalReq._retry) {
        return Promise.reject(error);
      }
      originalReq._retry = true;

      const accessToken = localStorage.getItem("accessToken");

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addToQueue((newToken) => {
            if (!newToken) {
              reject(error);
              return;
            }

            originalReq.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalReq));
          });
        });
      }
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/newRefreshToken`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes.data.newAccessToken;
        console.log("New access token got", newToken);
        localStorage.setItem("accessToken", newToken);

        runQueue(newToken);
        console.log("Retrying original request with new token:");
        isRefreshing = false;

        // Retry failed request
        originalReq.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalReq);
      } catch (refreshError) {
        console.error("REFRESH FAILED:", refreshError);

        runQueue(null);
        isRefreshing = false;

        // Refresh token expired → logout user
        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;