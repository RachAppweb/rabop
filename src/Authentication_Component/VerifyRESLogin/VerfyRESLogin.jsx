import React, { useEffect,useState } from 'react'
import useRefreshToken from '../../FetchTypes/useRefreshToken'
import useAuth from '../useAuth/useAuth'
import useAxiosPrivate from '../../FetchTypes/useAxiosPrivate'
import { Outlet } from 'react-router-dom'
export default function VerfyRESLogin() {
  const refresh=useRefreshToken()
  const{accessToken,setUser}=useAuth()
  const axiosPrivate=useAxiosPrivate()
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let isMounted=true
    async function verifyResUser(){
        try{
            await refresh()
            const {data}=await axiosPrivate.get('signup/residents/')
            setUser(data)

        }catch(error){
            console.log(error?.response)
        }finally{
            isMounted && setLoading(false)
        }
    }
    !accessToken?verifyResUser():setLoading(false)
    return()=>{
        isMounted=false
    }
  },[])
  return (
    loading?'loading':<Outlet/>
  )
}
