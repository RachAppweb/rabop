import useAuth from "../useAuth/useAuth"
import useAxiosPrivate from "../../FetchTypes/useAxiosPrivate"
export default function useUserManager() {
    const {setUser}=useAuth()
    const axiosPrivateInstance=useAxiosPrivate()
    async function getUser(){
        try{
            const {data}=await axiosPrivateInstance.get('signup/manager/')
            setUser(data)
        }catch(error){
          console.log('error accure in the useUserManager',error.response)
        }
    }
  return getUser
}
