import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
    console.log("insise axios req interceptor");
    
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    console.log("user has token");
    
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  

  async (error) => {
    console.log("inside axios ressponse");
    
    const ogRequest = error.config;
    const accessToken = localStorage.getItem("accessToken"); 


    if (error.response?.status === 401 && accessToken && !ogRequest.retry) {
        console.log("inside requesting for new newaccesstoken");
        
      ogRequest.retry = true;

      try {
        const refreshResp = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/newRefreshToken`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResp.data.newAccessToken;

        localStorage.setItem("accessToken", newAccessToken);
        ogRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(ogRequest);
      } catch (err) {
        console.log("inside axios error");
        
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
