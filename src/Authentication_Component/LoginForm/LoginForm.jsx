import React, { useState } from 'react'
import './LoginForm.scss'
import {
    MDBContainer,
    MDBCard,
    MDBRow,
    MDBCol,
    MDBInput,
  }from 'mdb-react-ui-kit';
  import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../useAuth/useAuth';
import { axiosInstance } from '../../FetchTypes/FetchTypes';
import Loading from '../../Compononets/Loading/Loading';
export default function LoginForm(){
    const{setAccessToken,setCSRFToken,setRefreshToken}=useAuth()
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const [username,setUserName]=useState()
    const[password,setPassword]=useState()
    
    const [errormessage,setErrorMessage]=useState()
    const location=useLocation()
    const fromLocation=location?.state?.from?.pathname || '/'
    function onUserName(event){
      setUserName(event.target.value)
    }
    function onPassword(event){
      setPassword(event.target.value)
    }
    async function onSubmitForm(event){
      event.preventDefault()
      setLoading(true)
      setErrorMessage(null)
      console.clear()
      try{
        const respo=await axiosInstance.post('login/',JSON.stringify({
          username,
          password
        }))
        
        if(respo?.data?.is_manager && respo?.data?.is_has_dwar){
          setAccessToken(respo.data.access_token)
          setRefreshToken(respo.data.refresh_token)
          setCSRFToken(respo.headers['x-csrftoken'])
          setUserName()
          setPassword()
          setLoading(false)
          navigate('/Manager')
        }
        if(respo?.data?.is_manager && !respo?.data?.is_has_dwar){
          setAccessToken(respo.data.access_token)
          setRefreshToken(respo.data.refresh_token)
          setCSRFToken(respo.headers['x-csrftoken'])
          setUserName()
          setPassword()
          setLoading(false)
          navigate('/DwarCreate')
        }
        
        if(!respo?.data?.is_manager && respo?.data?.real){
          setAccessToken(respo.data.access_token)
          setRefreshToken(respo.data.refresh_token)
          setCSRFToken(respo.headers['x-csrftoken'])
          setUserName()
          setPassword()
          setLoading(false)
          navigate('/Resident')
        }
        console.clear()
        // respo?.data?.is_manager===true?navigate('/Manager'): navigate('/Resident')  
      }catch(error){
        console.log(error?.response)
        // console.clear()
        setErrorMessage(error?.response?.data?.error)

        setLoading(false)
      }
    }
    return (
      <div>
        {loading?<div className="load" id='loade'>
        <Loading /> 
        </div>:<></>}
         <div id='many'>       
        <MDBContainer fluid className=''>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>
          <MDBCard className='my-4' id='reg'>
            <MDBRow className='g-0'>
              <MDBCol >
                <form className='card-body text-black d-flex flex-column justify-content-center'onSubmit={onSubmitForm}>
                  <h3 className="mb-5 text-uppercase fw-bold" id='titlesi'>تسجيل الدخول</h3> 
                  {errormessage?<p className="mb-5 text cor " id='titlesi'>{errormessage}</p>:<></>}                  
                    <MDBRow>
                    <MDBCol md='12'>
                        <label htmlFor="">إسم المستخدم</label>
                        
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form1' type='text'onChange={onUserName}/>                    
                    </MDBCol>
                    <MDBCol md='12'>
                        <label htmlFor=""> كلمة السر</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form2' type='password'onChange={onPassword}/>
                    </MDBCol>
                    </MDBRow>
                  <div className="d-flex justify-content-end pt-3"id='resright'>
                    <button className='ms-2' size='lg' type='submit'disabled={loading}>تسجيل الدخول</button>
                    <p> <Link id='MS' to={'/ResetPassword'}> هل نسيت كلمة السر ؟ </Link> </p>
                    <Link to={'/Resident_Signup'} id='MS'>إنشاء حساب </Link>
                  </div>
                  </form>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      </div>
      </div>
    )
  }


