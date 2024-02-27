import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
   MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import React, { useCallback, useEffect, useState } from 'react'
import './MDashboard.scss'

import Loading from '../../Compononets/Loading/Loading';
import useAuth from '../../Authentication_Component/useAuth/useAuth';
import useAxiosPrivate from '../../FetchTypes/useAxiosPrivate';
import Logout from '../../Authentication_Component/Logout/Logout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import userpic from '../../Compononets/Assets/user.jpg'
  // import { Link } from 'react-router-dom'
export default function MDashboard ( ){
  //  the user and the accesToken which has been set in the useAuth hook with axiosinstance and logout
    const {user,setUser,setAccessToken,setCSRFToken}=useAuth()
    const axiosPrivateInstance=useAxiosPrivate()
    const navigate=useNavigate()
    const logoute=Logout()
    const [itHas,setItHas]=useState(true)
    // authenticated and loading
    const[authenticated,setAuthenticated]=useState(false)
    const [loading,setLoading]=useState(false)
    // modal confugirations
     const [varyingState, setVaryingState] = useState('');
    const [varyingModal, setVaryingModal] = useState(false);
    const [varyingModalEdit, setVaryingModalEdit] = useState(false);
    const [varyingModaLogout, setVaryingModaLogout] = useState(false);
    const [varyingModaLNot, setVaryingModaLNot] = useState(false);
    const [varyingModalMessage, setVaryingModalMessage] = useState(false);
    // user update fields initialazing
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [username,setUsername]=useState();
    const [email,setEmail]=useState()
    const [territorial,setTerritorial]=useState()
    const [phone_number,setPhone_Number]=useState()
    // password update fields initialazing
    const [old_password,setOldPassword]=useState()
    const [new_password,setNewPassword]=useState()
    const [searchitem,setSearchItem]=useState('')
    const [messago,setMessage]=useState()
    const [errormessage,setErrorMessage]=useState()
    const [message,setNotification]=useState()
    const onNotificationChange=(event)=>{
      setNotification(event.target.value)
    }
    const onSearchItem=(event)=>{
      setSearchItem(event.target.value)
    }
    const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
    const onChangeLastName = (event) => {
      setLastName(event.target.value);
    };
    const onChangeUsername=(event)=>{
      setUsername(event.target.value)
    }
    const onChangeEmail=(event)=>{
      setEmail(event.target.value)
    }
    const onChangeTerritorial=(event)=>{
      setTerritorial(event.target.value)
    }
    const onChangePhoneNumber=(event)=>{
      setPhone_Number(event.target.value)
    }
    const onChangeOldPassword=(event)=>{
      setOldPassword(event.target.value)
    }
    const onChangeNewPassword=(event)=>{
      setNewPassword(event.target.value)
    }
    async function onLogout(){
      setAuthenticated(false)
      setLoading(true)
      await logoute()
      setAccessToken(null)
      setCSRFToken(null)
      setUser({})
      navigate('/') 
    }
    useEffect(()=>{
      setAuthenticated(user[0]? true:false)
    },[user])   
       
        const getManager = useCallback(async()=>{
           
          try{
            const {data}=await axiosPrivateInstance.get('signup/manager/')
            setItHas(user[1]?.ser?.is_has_dwar)
            setUser(data)
            // console.log(data)           
                setLoading(false) 
          }catch(error){
            console.log(error)
            setLoading(false)
          }
        },[axiosPrivateInstance,setUser])
        useEffect(()=>{
          getManager()
        },[getManager])
        async function onDeleteNotification(id){
          setLoading(true)
          setMessage(null)
          try{
            const data =await axiosPrivateInstance.delete(`mess_to_res/${id}`)
            setMessage(data?.data?.message)
            setLoading(false) 
            getManager() 
          }catch(error){
          setLoading(false)}
        }
        async function onDeleteAllNotification(){
          setLoading(true)
          setMessage(null)
          try{
            const data =await axiosPrivateInstance.delete(`mess_to_res/`)
            // setMessage(data?.data?.message)
            setLoading(false) 
            getManager() 
          }catch(error){
          setLoading(false)}
        }
        async function onSubmitNotification(event){
          event.preventDefault()
          setLoading(true)
          setMessage(null)
          
          try{
            const {data} =await axiosPrivateInstance.post(`mess_to_res/`,JSON.stringify({
              message
            }))
            setMessage(data?.message)
            setLoading(false) 
            
            getManager()
             
          }catch(error){
          setLoading(false)
        
        setErrorMessage(error?.response?.data?.error)
        }
        }
    async function onSubmitUpdateForm(event){
    event.preventDefault()
    setLoading(true)
    try{ 
      const {data}=await axiosPrivateInstance.put('signup/manager/',JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        phone_number,
        territorial
      }))
      setFirstName()
      setLastName()
      setUsername()
      setEmail()
      setPhone_Number()
      setTerritorial()
      setUser(data)
      setVaryingModal(!varyingModal)
      setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  async function onSubmitUpdatePassword(event){
    event.preventDefault()
    setLoading(true)
    try{
     const {data}= await axiosPrivateInstance.put('edi_password/',JSON.stringify({
        old_password,
        new_password
      }))
      setOldPassword()
      setNewPassword()
      setVaryingModalEdit(!varyingModalEdit)
      setLoading(false)
      console.log(data)
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
        {user[1]?.ser?.is_has_dwar?(<>
          <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">  
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {user[1]?.ser?.manimg?
              <img className="img-fluid rounded-circle" alt="avatar" src={`https://rabop-backend.onrender.com${user[1]?.ser?.manimg}`} style={{ width: '150px' }}/>:
              <img className="img-fluid rounded-circle" alt="avatar" src={userpic} style={{ width: '150px' }}/>  
              }
                <p className="text-muted mb-1">{user[0]?.first_name} {user[0]?.last_name}</p>
                <p className="text-muted mb-4">{user[0]?.territorial}</p>               
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">                 
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <i class="fa-solid fa-people-group"></i>
                    <MDBCardText>{user[0]?.res_counte}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">                  
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3"id='ebtn'>                  
                      <MDBCardText 
            onClick={() => {
              setVaryingState('@mdo');
              setVaryingModal(!varyingModal);             
            }}
            id='pointer'
          >
          تعديل الحساب 
            </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3"id='ebtn'>                  
                      <MDBCardText 
            onClick={() => {
              
              setVaryingModaLNot(!varyingModaLNot);             
            }}
            id='pointer'
          >
        إنشاء إشعار جماعي
            </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3"id='ebtn'>                  
                      <MDBCardText 
            onClick={() => {
              
              setVaryingModalMessage(!varyingModalMessage);             
            }}
            id='pointer'
          >
       إشعاراتي
            </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3"id='ebtn'>                 
                    <MDBCardText  onClick={() => {
              setVaryingState('@fo');
              setVaryingModalEdit(!varyingModalEdit); 
                         
            }}
            id='pointer'
            >تعديل كلمة السر</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">     
                      <div className='out'  onClick={() => setVaryingModaLogout(!varyingModaLogout)} > <i class="fa-solid fa-power-off"> </i></div>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody id='userinfo'>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>الإسم الكامل</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user[0]?.first_name} {user[0]?.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>ألبريد الإلكتروني</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user[0]?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>رقم الهاتف</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user[0]?.phone_number}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>الجماعة الترابية</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user[0]?.territorial}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>الدوار</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user[0]?.territorial}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow>              
              <MDBCol md="6">             
              <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody >                 
                    <MDBCardText className="mb-4" id='tit'><span className="text-primary font-italic me-1">الساكنة</span> المنتمون إلى قريتك</MDBCardText>
                    { user[0]?.real_residents?.length > 0?
                    <div>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>محرك البحث</MDBCardText>
                    <div className="serandbtn" >
                    <input type="search" name="ser" id="ser"className="rounded" placeholder='إبحث بالعداد المائي'onChange={onSearchItem} />
                    <button type="submit">إبحث</button>
                    </div>
                    <div  id='thebody'> 
                    {user[0]?.real_residents.filter((resident)=>{
                    if (searchitem ===""){                   
                    return resident}
                    else if(resident.number_of_water_meter.includes(searchitem)){
                    return resident
                    }
                    
                    }).map(resident=>{
                      return(<Link id='none' to={`/MyResident/${resident.user}`}>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3"id='resident'>
                      <MDBCardText>{resident.number_of_water_meter}</MDBCardText>
                      <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }} key={resident.id}>{resident.name}</MDBCardText>       
                    </MDBListGroupItem>
                      </Link>         
                      ) 
                    })}
                    </div>
                    </div>
                    :<h1>لا احد ينتمي الى مجموعتك</h1>}
                  </MDBCardBody>
                </MDBCard>  
              </MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody >
                    <MDBCardText className="mb-4" id='tit'><span className="text-primary font-italic me-1">الساكنة</span> الغير الموافق عليهم</MDBCardText>
                    {user[0]?.not_real_residents?.length > 0? 
                    <div>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>محرك البحث</MDBCardText>
                    <div className="serandbtn" >
                    <input type="search" name="ser" id="ser"className="rounded" placeholder='إبحث بالعداد المائي' />
                    <button type="submit">إبحث</button>
                    </div>
                    <div  id='thebody'> 
                    {user[0]?.not_real_residents.filter((resident)=>{
                    if (searchitem ===""){                   
                    return resident}
                    else if(resident.number_of_water_meter.includes(searchitem)){
                    return resident
                    }
                    }).map(resident=>{
                      return(
                        <Link id='none' to={`/MyResident/${resident.user}`}>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3"id='resident'>
                      <MDBCardText>{resident.number_of_water_meter}</MDBCardText>
                      <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}key={resident.id}>{resident.name}</MDBCardText>                     
                    </MDBListGroupItem>
                        </Link>                       
                      )                     
                    })}
                    </div>
                    </div>:<h1>هذه القائمة فارغة</h1>}
                  </MDBCardBody>                 
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal open={varyingModal} setOpen={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <form onSubmit={onSubmitUpdateForm}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle id='bld'>تعديل الحساب</MDBModalTitle>
              <div className='ripple ripple-surface ripple-surface-light btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></div>
            </MDBModalHeader>           
            <MDBModalBody>
              <div >
                <div className='mb-3'>
                  <>
                   <label className='col-form-label'>الإسم الأول</label>
                    <input type="text"defaultValue={user[0]?.first_name}
                    onChange={onChangeFirstName}
                    className='form-control'/>
                  </>
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <><label htmlFor="" className='col-form-label'>الإسم الثاني</label>
                    <input type="text" defaultValue={user[0]?.last_name}
                    onChange={onChangeLastName}className='form-control' />
                    </>
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <><label htmlFor="" className='col-form-label'>إسم المستخدم</label>
                    <input type="text" defaultValue={user[0]?.username}
                    onChange={onChangeUsername}className='form-control' />
                    </> 
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <><label htmlFor="" className='col-form-label'>البريد الإلكتروني</label>
                    <input type="text" defaultValue={user[0]?.email}
                    onChange={onChangeEmail}className='form-control' />
                    </> 
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <><label htmlFor="" className='col-form-label'>الجماعة الترابية</label>
                    <input type="text" defaultValue={user[0]?.territorial}
                    onChange={onChangeTerritorial}className='form-control' />
                    </> 
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <><label htmlFor="" className='col-form-label'>رقم الهاتف</label>
                    <input type="text" defaultValue={user[0]?.phone_number}
                    onChange={onChangePhoneNumber}className='form-control' />
                    </> 
                  )}
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModal(!varyingModal)}>
               إغلاق
              </div>
              <button className='ripple ripple-surface btn btn-primary' type='submit' id='add'>متابعة</button>
            </MDBModalFooter>
          </MDBModalContent>
          </form>
        </MDBModalDialog>
      </MDBModal>
<MDBModal open={varyingModalEdit} setOpen={setVaryingModalEdit} tabIndex='-1'>
<MDBModalDialog>
  <form onSubmit={onSubmitUpdatePassword}>
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle id='bld'>تعديل كلمة السر </MDBModalTitle>
      <div className='ripple ripple-surface btn-close' color='none' onClick={() => setVaryingModalEdit(!varyingModalEdit)}></div>
    </MDBModalHeader>    
    <MDBModalBody>
      <div >
        <div className='mb-3'>
          <>
           <label className='col-form-label'>كلمة السر القديمة</label>
            <input type="text"
            onChange={onChangeOldPassword}
            className='form-control'/>
          </>
        </div>
        <div className='mb-3'>
          {varyingModalEdit && (
            <><label htmlFor="" className='col-form-label'>كلمة السر الجديدة</label>
            <input type="password" 
            onChange={onChangeNewPassword}className='form-control' />
            </>
          )}
        </div>
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModalEdit(!varyingModalEdit)}>
        إغلاق
      </div>
      <button className='ripple ripple-surface btn btn-primary' type='submit' id='add'>متابعة</button>
    </MDBModalFooter>
  </MDBModalContent>
  </form>
</MDBModalDialog>
</MDBModal>
    </section>
          </>):(<><MDBCol md="12" id='cen'>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody >
                    <MDBCardText className="mb-4" id='tit'> لا توجد بينات إلى حد الآن </MDBCardText>
                    <h1> المرجو الإنتضار قليلا أو إعادة المحاولة مرة أخرى </h1>
                  </MDBCardBody>
                  
                </MDBCard>
              </MDBCol></>)}       
              <MDBModal open={varyingModaLogout} setOpen={setVaryingModaLogout} tabIndex='-1'>
<MDBModalDialog> 
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle id='bld'>تسجيل الخروج</MDBModalTitle>
      <div className='ripple ripple-surface btn-close' color='none' onClick={() => setVaryingModaLogout(!varyingModaLogout)}></div>
    </MDBModalHeader>    
    <MDBModalBody id='qcen'>
     <b>هل أنت متأكد</b>
    </MDBModalBody>
    <MDBModalFooter>
      <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModaLogout(!varyingModaLogout)}>
        إغلاق
      </div>
      <button className='ripple ripple-surface btn btn-primary' type='submit' id='logout' onClick={()=>onLogout()}>متابعة</button>
    </MDBModalFooter>
  </MDBModalContent>  
</MDBModalDialog>
</MDBModal>

<MDBModal open={varyingModaLNot} setOpen={setVaryingModaLNot} tabIndex='-1'>
<MDBModalDialog> 
  <form onSubmit={onSubmitNotification}>
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle id='bld'>إنشاء إشعار</MDBModalTitle>
      <div className='ripple ripple-surface btn-close' color='none' onClick={() => setVaryingModaLNot(!varyingModaLNot)}></div>
    </MDBModalHeader>    
    <MDBModalBody id='qcen'>
      {messago && <><div id='mg'>
        <p>{messago}</p>
        </div> </>}
        {errormessage && <><div id='mr'>
        <p>{errormessage}</p>
        </div> </>}
     <div>
     <div className='mb-3'>
          <>
           <label className='col-form-label'>الإشعار</label>
            
            <textarea name="" id="not" cols="30" rows="10" onChange={onNotificationChange} className='form-control'></textarea>
          </>
        </div>
     </div>
    </MDBModalBody>
    <MDBModalFooter>
      <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModaLNot(!varyingModaLNot)}>
        إغلاق
      </div>
      <button className='ripple ripple-surface btn btn-primary' type='submit' id='add' >متابعة</button>
    </MDBModalFooter>
  </MDBModalContent>
  </form>  
</MDBModalDialog>
</MDBModal>

<MDBModal open={varyingModalMessage} setOpen={setVaryingModalMessage} tabIndex='-1'>
<MDBModalDialog> 
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle id='bld'>الإشعارات</MDBModalTitle>
      
      <div className='ripple ripple-surface btn-close' color='none' onClick={() => setVaryingModalMessage(!varyingModalMessage)}></div>
    </MDBModalHeader>    
    <MDBModalBody id='qcn'>
    {messago ? <><div id='mg'>
        <p >{messago}</p>
        </div> </>:<></>} 
      {user[0]?.man_messages?.length > 0?<>
      {user[0]?.man_messages.map((message)=>{
        function formateDate(date) {
          const dato=new Date(date)
          const rightFormate=dato.toISOString().split("T")[0]
          return rightFormate
        }
        const rightDate=formateDate(message.created_at)
        return (
          <MDBContainer
       style={{
         width: "auto",
         position: "relative",
         top: "10px",
         right: "10px",
         zIndex: 9999
       }}
     >
      {message.is_global?<>
        <div class="toast fade show zro9" role="alert" id='tb' aria-live="assertive" aria-atomic="true" data-autohide="false">
         <div class="toast-header">
           <svg class="rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
             <rect fill="#007aff" width="100%" height="100%"></rect></svg>
           <strong class="mr-auto">{message.name_of_manager}</strong>
           <div id='bet'></div>
           <small class="text-muted">{rightDate}</small>
           <button type="button" id='cls' class="ml-2 mb-1 close" data-dismiss="toast" onClick={()=>onDeleteNotification(message.id)} aria-label="Close">
             <span aria-hidden="true">×</span>
           </button>
         </div>
         <div class="toast-body">
          {message.message}
         </div>
       </div>
      </>:<>
      <div class="toast fade show" role="alert" id='tb' aria-live="assertive" aria-atomic="true" data-autohide="false">
         <div class="toast-header">
           <svg class="rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
             <rect fill="#007aff" width="100%" height="100%"></rect></svg>
           <strong class="mr-auto">{message.name_of_manager}</strong>
           <div id='bet'></div>
           <small class="text-muted">{rightDate}</small>
           <button type="button" id='cls' class="ml-2 mb-1 close" data-dismiss="toast" onClick={()=>onDeleteNotification(message.id)} aria-label="Close">
             <span aria-hidden="true">×</span>
           </button>
         </div>
         <div class="toast-body">
          {message.message}
         </div>
       </div>
      </>}
       
       
     </MDBContainer> 
        )
      
      })}
      </>:<>
      
      <b>لا توجد إشعارات</b>
      </>}
    
    </MDBModalBody>
    {user[0]?.man_messages?.length > 0?<>
      <MDBModalFooter id='betw'>
      <button className='ripple ripple-surface btn btn-primary' id='logout' onClick={()=>{onDeleteAllNotification()}}>مسح الكل</button>
      <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModalMessage(!varyingModalMessage)}>
        إغلاق
      </div>
    </MDBModalFooter>
    </>:<>
    <MDBModalFooter >
      <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModalMessage(!varyingModalMessage)}>
        إغلاق
      </div>
    </MDBModalFooter>
    </>}
    
  </MDBModalContent> 
</MDBModalDialog>
</MDBModal>
      </div>
    )
  }
