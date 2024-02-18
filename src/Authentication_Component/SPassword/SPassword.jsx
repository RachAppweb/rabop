import React, { useState } from 'react'
import {   
    MDBContainer,
    MDBCard,    
    MDBRow,
    MDBCol,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import Loading from '../../Compononets/Loading/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../FetchTypes/FetchTypes';

export default function SPassword() {
    // Now, uidb64 and token contain the values from the URL parameters
const { uidb64, token } = useParams();
const navigate=useNavigate()
const [password,setPassword]=useState()
const [confirm_password,setConfirmPassword]=useState()
const [loading,setLoading]=useState(false)
function onPasswordChange(event){
  setPassword(event.target.value)
}
function onConfirmPassword(event){
  setConfirmPassword(event.target.value)
}


// Now, uidb64 and token contain the values from the URL parameters

async function onSubmitSettingPassword(event){
  event.preventDefault()
  setLoading(true)
  try{
    const response=await axiosInstance.patch(`confirm_password_reset/${uidb64}/${token}/`,JSON.stringify({
      password,
      confirm_password
    }))
    console.log(response)
    setLoading(false)
    navigate('/Login')
  }catch(error){
    console.log(error)
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
    
              <form className='card-body text-black d-flex flex-column justify-content-center' onSubmit={onSubmitSettingPassword}>
                  <h3 className="mb-5 text-uppercase fw-bold" id='titlesi'> تعيين كلمة السر جديدة</h3>
    
                  <MDBRow>
    
                    <MDBCol md='12'>
                        <label htmlFor="">كلمة السر الجديدة</label>
                      <MDBInput wrapperClass='mb-4' onChange={onPasswordChange} size='lg' id='form1' type='password' />
                      
                    </MDBCol>
                    <MDBCol md='12'>
                        <label htmlFor=""> تأكيد كلمة السر الجديدة</label>
                      <MDBInput wrapperClass='mb-4' onChange={onConfirmPassword} size='lg' id='form1' type='password' />
                      
                    </MDBCol>
                  </MDBRow>
                  <div className="d-flex justify-content-end pt-3"id='resright'>
    
                    <button className='ms-2' size='lg' type='submit'> متابعة</button>
                    <Link to={'/Login'} id='MS'>تذكرت كلمة السر ؟</Link>
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
