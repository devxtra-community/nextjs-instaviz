import axios from "axios";
//interceptor need to be added
const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API,
    withCredentials:true
})
axiosInstance.interceptors.request.use((config)=>{
    console.log("inside interceptor request");

    const accessToken = localStorage.getItem("accessToken")
    if(accessToken){
        console.log("inside if accesstoen");
        
        config.headers.Authorization = `bearer ${accessToken}`
    }
    return config
})

axiosInstance.interceptors.response.use((response)=>{

    console.log("inside response ",response);
    return response
},

    async(error)=>{
        console.log("inside error",error);
        const ogRequest = error.config;

        if(error.response.status===401 && !ogRequest.retry){
            ogRequest.retry=true
            try{
                console.log("inside tryt");
                const refreshToken = await axios.post(`${process.env.NEXT_PUBLIC_API}/user/newRefreshToken`,
                    {},
                    {withCredentials:true}
                );

                const newAccessToken = refreshToken.data.newAccessToken;
                localStorage.setItem("accessToken",newAccessToken)
                ogRequest.headers.Authorization = `bearer ${newAccessToken}`
                return axiosInstance(ogRequest)
                
            }catch(err){
                console.log("catch in interceptor worked");
                localStorage.clear();
                // window.location.href = "/login"
                

            }
        }
        return  Promise.reject(error)
        
    }
    
)

export default axiosInstance;