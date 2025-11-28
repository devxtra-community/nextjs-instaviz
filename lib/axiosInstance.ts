import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

let isRefreshing = false;
let waitingQueue: Array<(token: string | null) => void> = [];

function addToQueue(cb: (token: string | null) => void) {
  waitingQueue.push(cb);
}

function runQueue(newToken: string | null) {
  waitingQueue.forEach((ele) => ele(newToken));
  waitingQueue = [];
}

axiosInstance.interceptors.request.use((config) => {
  console.log("insise axios req interceptor");

  const accessToken = localStorage.getItem("accessToken");
  const sessionId = localStorage.getItem("sessionId")

  if (accessToken) {
    console.log("user has token");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (sessionId) {
    config.headers["x-session-id"] = sessionId;
  }
  
  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("inside axios ressponse");

    const ogRequest = error.config;

   
    if (ogRequest?.url?.includes("/auth/newRefreshToken")) {
      return Promise.reject(error);
    }

    const accessToken = localStorage.getItem("accessToken");
 
    if (error.response?.status === 401 && !ogRequest.retry) {
      console.log("detected 401, attempting refresh");

      if (isRefreshing) {
        console.log("one req is already refreshing");

        return new Promise((resolve) => {
          addToQueue((newToken) => {
            if (!newToken) {
              resolve(Promise.reject(error));
              return;
            }
            ogRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(ogRequest));
          });
        });
      }

      ogRequest.retry = true;
      isRefreshing = true;

      try {
        console.log("getting new refresh token...");

        const refreshResp = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/newRefreshToken`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResp.data.newAccessToken;

        localStorage.setItem("accessToken", newAccessToken);
        runQueue(newAccessToken);
        isRefreshing = false;
        ogRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(ogRequest);
      } catch (err) {
        console.log("refresh token failed, logging out...");
        runQueue(null);
        isRefreshing = false;
        const error = err as AxiosError;
        const status = error?.response?.status;
        if (status == 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    }

    return Promise.reject(error);
  }
  )

export default axiosInstance;
