import React ,{useState}from 'react'
import './RPassword.scss'
import {   
    MDBContainer,
    MDBCard,    
    MDBRow,
    MDBCol,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
  import { axiosInstance } from '../../FetchTypes/FetchTypes';
  import { Link } from 'react-router-dom';
  import Loading from '../../Compononets/Loading/Loading';
export default function RPassword() {
  const[loading,setLoading]=useState(false)
  const [email,setEmail]=useState()
  const [message,setMessage]=useState()
  const [errormessage,setErrorMessage]=useState()
  function onEmailChange(event){
  setEmail(event.target.value)
  }
  async function onSubmitEmail(event){
  event.preventDefault()
  setLoading(true)
  setMessage(null)
  setErrorMessage(null)
  try{
    const response=await axiosInstance.post('resetnewpassword/',JSON.stringify({
      email
    }))
    console.log(response)
    setMessage(response?.data[0]?.details)
    setLoading(false)
  }catch(error){
    // console.log(error)
    setErrorMessage(error?.response?.data[0]?.error)
    setLoading(false)
  }

  }
  // console.log(errormessage)
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

              <form className='card-body text-black d-flex flex-column justify-content-center' onSubmit={(onSubmitEmail)}>
                  <h3 className="mb-5 text-uppercase fw-bold" id='titlesi'>إعادة تعيين كلمة السر</h3>
                 {message?<p className="mb-5 text cog " id='titlesi'>{message}</p>:<></>}
                 {errormessage?<p className="mb-5 text cor " id='titlesi'>{errormessage}</p>:<></>}
                  

                  <MDBRow>

                    <MDBCol md='12'>
                        <label htmlFor="">بريدك الإلكتروني</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form1' type='email' onChange={onEmailChange}/>
                      
                      
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
