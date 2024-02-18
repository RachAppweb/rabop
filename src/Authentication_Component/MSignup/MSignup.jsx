import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance ,axiosInstanceSignup} from '../../FetchTypes/FetchTypes';
import {
    MDBContainer,
    MDBCard,
    MDBRow,
    MDBCol,
    MDBInput, 
  }
  from 'mdb-react-ui-kit';
import './MSignup.scss'
import Loading from '../../Compononets/Loading/Loading';
export default function MSignup () {
    const navigate=useNavigate()
    const [loadin,setLoading]=useState(false)
    const [first_name,setFirstName]=useState()
    const  [last_name,setLastName]=useState()
    const  [username,setUsername]=useState()
    const  [email,setEmail]=useState()
    const  [territorial,setTerritorial]=useState()
    const  [village_name,setVillageName]=useState()
    const  [phone_number,setPhoneNumber]=useState()
    const  [password,setPassword]=useState()
    const  [password2,setPassswordConfirmiton]=useState()
    const [manimg,setManImg]=useState()
    const [message,setMessage]=useState() 
   function onFirst_Name(event){
    setFirstName(event.target.value)
   }
   function onLast_Name(event){
    setLastName(event.target.value)
   }
   function onUserName(event){
    setUsername(event.target.value)
   }
   function onEmail(event){
    setEmail(event.target.value)
   }
   function onTerritorial(event){
    setTerritorial(event.target.value)
   }
   function onVillage_Name(event){
    setVillageName(event.target.value)
   }
   function onPhone_Number(event){
    setPhoneNumber(event.target.value)
   }
   function onPassword(event){
    setPassword(event.target.value)
   }
   function onPassword_Conformition(event){
    setPassswordConfirmiton(event.target.value)
   }
   function onManImgChange(event){
    setManImg(event.target.files[0])
   }
   const formData=new FormData()
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone_number', phone_number);
    formData.append('territorial', territorial);
    formData.append('village_name', village_name);
    formData.append('manimg',manimg)
    formData.append('password', password);
    formData.append('password2', password2);   
   async function onSubmitForm(event){
    event.preventDefault()
    setLoading(true)
    try{
      const response=await axiosInstanceSignup.post('signup/manager/',formData)
      setFirstName()
      setLastName()
      setUsername()
      setEmail()
      setTerritorial()
      setVillageName()
      setPhoneNumber()
      setPassword()
      setPassswordConfirmiton()
      setLoading(false)
      navigate('/Login')
      console.log(response)
    }catch(error){
      setLoading(false)
      console.log(error)
      {error?.message =="Request failed with status code 400" && setMessage("عذرا لقد نسيت حقل ما")}
    {message && console.log(message)}
    } 
   }
    return (
      <>
      {loadin?<div className="load" id='loade'>
        <Loading /> 
        </div>:<></>}
 <div id='many'>
        <MDBContainer fluid className=''>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>
          <MDBCard className='my-4' id='reg'>
            <MDBRow className='g-0'>             
              <MDBCol >
                <form className='card-body text-black d-flex flex-column justify-content-center' onSubmit={onSubmitForm}>
                  <h3 className="mb-5 text-uppercase fw-bold" id='titlesi'>إنشاء حساب المسؤول</h3>
                  <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor="">الإسم الأول</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form1' type='text' onChange={onFirst_Name} required />                    
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor="">الإسم الثاني</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form2'onChange={onLast_Name} required  type='text'/>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor=""> البريد الإلكتروني  </label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form1'onChange={onEmail} required  type='email'/>                  
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor=""> إسم القرية أو الحي</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form2'onChange={onVillage_Name} required type='text'/>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                <MDBCol md='6'>
                    <label htmlFor="">الصورة الشخصية</label>
                <MDBInput wrapperClass='mb-4'  size='lg' id='form2'onChange={onManImgChange} required type='file'/>
                </MDBCol>
                </MDBRow>
                    <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor="">الجماعة</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form1' onChange={onTerritorial} required  type='text'/>                  
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor="">رقم الهاتف</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form2' onChange={onPhone_Number} required  type='text'/>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                   <MDBCol md='6'>
                        <label htmlFor="">إسم المستخدم</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form1' onChange={onUserName} required  type='text'/>                   
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor=""> كلمة السر</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form2' onChange={onPassword} required  type='password'/>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='6'>
                            <label htmlFor="">إعادة كلمة السر</label>
                        <MDBInput wrapperClass='mb-4'  size='lg' id='form1' onChange={onPassword_Conformition} required  type='password'/>                      
                        </MDBCol>
                        </MDBRow>
                  <div className="d-flex justify-content-end pt-3"id='right'>
                   <button className='ms-2' size='lg' type='submit'disabled={loadin}>إنشاء الحساب</button>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      </div>
      </>
    )
  }


