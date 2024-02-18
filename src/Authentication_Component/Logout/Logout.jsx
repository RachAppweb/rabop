import { useState } from "react";
import { axiosPrivateInstance } from "../../FetchTypes/FetchTypes";



export default function Logout() {
    
    const [loading,setLoading]=useState()
    
    const logoute=async()=>{
        console.clear()
        try{
            setLoading(true)
            await axiosPrivateInstance.post('logout/') 
            setLoading(false)
            console.clear()
        }catch(error){
            console.clear()
            setLoading(false)
        }
    }
    
        
    
  return logoute
}
