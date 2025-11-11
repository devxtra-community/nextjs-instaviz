import axios from "axios";
//interceptor need to be added
const axiosInstance = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

export default axiosInstance;