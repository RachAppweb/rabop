import useAuth from "../useAuth/useAuth"
import useAxiosPrivate from "../../FetchTypes/useAxiosPrivate"
export default function useUserResident() {
    const {setUser}=useAuth()
    const axiosPrivate=useAxiosPrivate()
     async function getUser(){
        try{
          const {data}= await axiosPrivate.get('signup/residents/')
           setUser(data)
        }catch(error){
            console.log('this error is from useUserRes',error.response)
        }
     }

  return (
    getUser()
  )
}
