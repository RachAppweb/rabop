import useAuth from "../Authentication_Component/useAuth/useAuth";
import { axiosInstance } from "./FetchTypes";

export default function useRefreshToken() {
    const {setAccessToken,setCSRFToken}=useAuth()
    const refresh =async()=>{
      try{
        const response= await axiosInstance.post('refresh-token/')       
        setAccessToken(response?.data.access)
        setCSRFToken(response?.headers['x-csrftoken'])
        console.clear()
        return {accessToken:response?.data.access,csrftoken:response?.headers['x-csrftoken']}
      
      }catch(error){
        // console.log('in the refresh token',error)
        console.clear()
      }
        
    }
  return refresh
}
 