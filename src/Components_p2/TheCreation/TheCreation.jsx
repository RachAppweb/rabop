import React, { useState,useEffect } from 'react'
import './TheCreation.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../FetchTypes/FetchTypes'
import useAxiosPrivate from '../../FetchTypes/useAxiosPrivate'
import Loading from '../../Compononets/Loading/Loading'
import { Navigate } from 'react-router-dom'
import useAuth from '../../Authentication_Component/useAuth/useAuth'
import Logout from '../../Authentication_Component/Logout/Logout'
function TheCreation() {
    const [village_name,setVillage_Name]=useState()
    const [territorial,setTerritorial]=useState()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const axiosPrivateInstance=useAxiosPrivate()

    function onChangeVillageName(event){
        setVillage_Name(event.target.value)
    }
    function onChangeTerritorial(event){
        setTerritorial(event.target.value)
    }
    const location = useLocation()
    // const[authenticated,setAuthenticated]=useState(false)
    const fromLocation = location?.state?.from?.pathname || '/'
    const{user,setUser,setAccessToken,setCSRFToken}=useAuth()
    const logoute=Logout()
    async function onLogout(){
      // setAuthenticated(false)
      setLoading(true)
      await logoute()
      setAccessToken(null)
      setCSRFToken(null)
      setUser({})
      navigate('/Login')
  
    }
    useEffect(()=>{     
        async function getManager(){
          setLoading(true)
          // console.clear()
          try{
            const {data}=await axiosPrivateInstance.get('signup/manager/')
           
                setUser(data)
                console.log(data)           
            setLoading(false)
              
            // console.clear()
          }catch(error){
            // console.clear()
            setLoading(false)
          }
        } 
        getManager()  // console.log(user[0]?.username)
    },[axiosPrivateInstance,setUser])
    async function onSubmitCreateDwar(event){
        event.preventDefault()
        setLoading(true)
        try{
            const respo=await axiosPrivateInstance.post('dwar/',JSON.stringify({
                village_name,
                territorial
            }))
            setLoading(false)
            console.log(respo)
            onLogout()
            navigate('/Login')
        }catch(error){
            console.log(error?.response?.data?.detail)
            setLoading(false)
            if(error?.response?.data?.detail ==="Authentication credentials were not provided.")
            { navigate(fromLocation, { replace: true })}

        }
    }
  return (
    <>
    {loading?<div className="load" id='loade'>
      <Loading /> 
      </div>:<></>}

    <div className='thecreation'>
    <h3 className="mb-5 text-uppercase fw-bold" id='titlesi'>إنشاء قرية</h3> 
        <div className="group">
            <form onSubmit={onSubmitCreateDwar}>
            <div className="input-group mb-3">
    <input type="text" className="form-control" onChange={onChangeVillageName} aria-label="Username" aria-describedby="basic-addon1"/>
    <span className="input-group-text" id="basic-addon2"> إسم القرية </span>

    </div>

    <div className="input-group mb-3">
    <input type="text" className="form-control" onChange={onChangeTerritorial} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
    <span className="input-group-text" id="basic-addon2">جماعة بوخشبة </span>
    </div>

    <div className="bn">
        <button className='btn'>متابعة</button>
    </div>
    </form>
    </div>
        </div>
    </>
   

  )
}

export default TheCreation