
import React, {ChangeEvent,  useCallback,  useEffect, useState } from 'react'
import './ActivateRes.scss'
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
import useAuth from '../../Authentication_Component/useAuth/useAuth';
import useAxiosPrivate from '../../FetchTypes/useAxiosPrivate';
import Loading from '../../Compononets/Loading/Loading';
import { axiosInstance } from '../../FetchTypes/FetchTypes';
import Logout from '../../Authentication_Component/Logout/Logout';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Compononets/Navbar/Navbar';
import Fotter from '../../Compononets/Fotter/Fotter'
import userpic from '../../Compononets/Assets/user.jpg'
export default function MyResident() {
    const[res,setRes]=useState([])
    const{user,setUser}=useAuth()
    const navigate=useNavigate()
    
    const axiosPrivateInstance=useAxiosPrivate()

    //  authenticated and loading
    const[authenticated,setAuthenticated]=useState(false)
    const[loading,setLoading]=useState(false) 
    //  modal confugirations 
    const [is_real,set_is_real]=useState(false)
    const [varyingState, setVaryingState] = useState('');
    const [varyingModal, setVaryingModal] = useState(false);
    const [price,setFatouraPrice]=useState()
    const [messsage,setMesssage]=useState()
    const [varyingModaLNot, setVaryingModaLNot] = useState(false);
    const [varyingModalMessage, setVaryingModalMessage] = useState(false);

    const [messago,setMessage]=useState()
    const [errormessage,setErrorMessage]=useState()
    const [message,setNotification]=useState()
    const onNotificationChange=(event)=>{
      setNotification(event.target.value)
    }
    function onPriceChange(event){
      setFatouraPrice(event.target.value)
    }
    const { id} = useParams()
    async function onSubmitNotification(event){
      event.preventDefault()
      setLoading(true)
      setMessage(null)
      
      try{
        const {data} =await axiosPrivateInstance.post(`mess_to_res/${id}/`,JSON.stringify({
          message
        }))
        setMessage(data?.message)
        setLoading(false)        
        getManagerResident()      
      }catch(error){
      setLoading(false)
    
    setErrorMessage(error?.response?.data?.error)
    }
    }
    useEffect(()=>{
      setAuthenticated(user[0]? true:false)
    },[user])
  
    async function onDeleteNotification(id){
      setLoading(true)
      setMessage(null)
      try{
        const data =await axiosPrivateInstance.delete(`mess_to_res/${id}/`)
        setMessage(data?.data?.message)       
        setLoading(false) 
       getManagerResident()              
      }catch(error){
      setLoading(false)}
    }

   

        const getManager = useCallback(async ()=>{
          setLoading(true)
        //   console.clear()
          try{
            const {data}=await axiosPrivateInstance.get('signup/manager/')
            setUser(data)
            setLoading(false)
            // console.clear()
          }catch(error){
            // console.clear()
            setLoading(false)
          }
        },[axiosPrivateInstance,setUser] )
        useEffect(()=>{
          getManager()
        },[getManager])
          // console.log(user[0]?.username)
    // },[axiosPrivateInstance,setUser])
    
      async function getManagerResident(){
        setLoading(true) 
        try{
          const myres =await axiosPrivateInstance.get(`get_res/${id}/`)        
          setRes(myres.data) 
          // console.log(myres.data)       
          setLoading(false)                              
        }catch(error){
         setLoading(false)
        //  console.clear()
        } 
      }
      useEffect(()=>{
        // setLoading(true)
      getManagerResident()
      setLoading(false)
      },[id])
   
      async function deletFatoura(){
        setLoading(true)
        // console.clear()
        try{
          const myres =await axiosPrivateInstance.delete(`resident/${id}/`)        
          console.log(myres.data)        
          setLoading(false) 
          getManagerResident()                             
        }catch(error){
         setLoading(false)
         console.log(error)
        } 
      }
      async function onSubmitActivation(){
        set_is_real(true)
        setLoading(true)
        try{
          const respoact=await axiosPrivateInstance.put(`resident/${id}/`,JSON.stringify({
          is_real}))
          setLoading(false)
          navigate('/Manager')
        }catch(error){
        setLoading(false)
        }
      }
      async function onSubmitFatora(event){
        event.preventDefault()
        setMesssage(null)
        setLoading(true)
        try{
          const response=await axiosPrivateInstance.post(`resident/${id}/`,JSON.stringify({
            price        
          }))
          setRes(response.data)
          setLoading(false)
          setVaryingModal(!varyingModal)
        }catch(error){
         
          setMesssage(error?.response?.data?.error)
          setLoading(false)
        }
      }
      return (     
   
    <>
    <Navbar/>
        
<div>
         {loading?<div className="load" id='loade'>
         <Loading /> 
         </div>:<></>}
         {res?.details?.first_name?(<></>):(<></>)}
  
         <section style={{ backgroundColor: '#eee' }}>
         
       <MDBContainer className="py-5"> 
       {res?.details?.first_name?(<>{!res?.details?.is_real?<>
        <MDBCard className="mb-4 mb-lg-0 sm-9" id="mb">
            <MDBCardBody className="p-0">
              <MDBListGroup flush className="rounded-3">
               
                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                <button className='btn' id='btnc' onClick={onSubmitActivation}>نعم</button>
                  <MDBCardText>هذا المستخدم لم يتم تأكيده بعد هل هو من قريتك ؟</MDBCardText>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
      </>:<></>}</>):(<></>)} 
      
       

         <MDBRow>
           <MDBCol lg="4">
             <MDBCard className="mb-4">
               <MDBCardBody className="text-center">
               {res?.resident?.resimg?
              <img className="img-fluid rounded-circle" alt="avatar" src={`https://rabop-backend.onrender.com${res?.resident?.resimg}`} style={{ width: '150px' }}/>:
              <img className="img-fluid rounded-circle" alt="avatar" src={userpic} style={{ width: '150px' }}/>  
              }
                 
                 <p className="text-muted mb-1">{res?.details?.first_name} {res?.details?.last_name}</p>
                 <p className="text-muted mb-4"> {res?.details?.territorial} </p>
                
               </MDBCardBody>
             </MDBCard>


             {res?.details?.first_name?(<>{res?.details?.is_real?<>
              <MDBCard className="mb-4 mb-lg-0" >
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3" id='add'>
                  
                      <MDBCardText 
            onClick={() => {
              setVaryingState('@mdo');
              setVaryingModal(!varyingModal);
              
            }}
          >
         إضافة فاتورة
            </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3" id='add'>
                  
                      <MDBCardText 
            onClick={() => {
              setVaryingModaLNot(!varyingModaLNot);
              
            }}
          >
       إرسال إشعار
            </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3" id='add'>
                  
                      <MDBCardText 
            onClick={() => {
              setVaryingModalMessage(!varyingModalMessage);
              
            }}
          >
      إشعارات
            </MDBCardText>
                  </MDBListGroupItem>
                  
                 
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
      </>:<></>}</>):(<></>)}

           </MDBCol>
           <MDBCol lg="8">
             <MDBCard className="mb-4">
               <MDBCardBody id='userinfo'>
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>الإسم الكامل</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {res?.details?.first_name} {res?.details?.last_name} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>ألبريد الإلكتروني</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {res?.details?.email} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>رقم الهاتف</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {res?.details?.phone_number} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>الجماعة الترابية</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {res?.details?.territorial} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>الدوار</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {res?.details?.territorial} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
               </MDBCardBody>
             </MDBCard>
             <MDBRow>
            <MDBCol md="12">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody >
                  <MDBCardText className="mb-4" id='tit'><span className="text-primary font-italic me-1">الفاتورات</span>  الغير المدفوعة </MDBCardText>
                 
                  <div  id='thebody'> 
                  
             {res?.resident?.fatoras.length>0? <>
             {res?.resident?.fatoras.map((fatora)=>{
              return(
                <MDBCard className="rounded-3" id='resident'>
                <MDBCardBody className="mx-1 my-2">
    
    
    
                <table class="table">
     
      <tbody>
        <tr>
          
          <th colSpan="2" id='fer'> رقم العداد </th>
          
          <td  id='fer'>{fatora.number_of_water_meter}</td>
        </tr>
        <tr>
          
          <th  colspan="2"> الإسم الكامل </th>
         
          <td>{fatora.name}</td>
        </tr>
        <tr>
          
          <th colspan="2"> التاريخ </th>
          <td>08/12/2023</td>
        </tr>
        <tr>
          
          <th colspan="2" id='fer'>الثمن</th>
          <td id='fer'>{fatora.price}</td>
        </tr>
      </tbody>
    </table>  
    <div className="d-flex justify-content-between align-items-center pb-1" id='del' onClick={()=>{deletFatoura()}}>
                    
 <button>حذف</button>
  </div>
                  
                </MDBCardBody>
              </MDBCard>
              )
             })}</>
             :<h1>لا توجد فواتير للدفع</h1>}
                 

        

        
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            
          </MDBRow>
           
           </MDBCol>
         </MDBRow>
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
      { res?.resident?.messages?.length > 0?<>
      {res?.resident?.messages.map((message)=>{
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
    <MDBModalFooter >
      <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModalMessage(!varyingModalMessage)}>
        إغلاق
      </div>
    </MDBModalFooter>
    
  </MDBModalContent> 
</MDBModalDialog>
</MDBModal>

       </MDBContainer>
       <MDBModal open={varyingModal} setOpen={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <form onSubmit={onSubmitFatora}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>أضف فاتورة</MDBModalTitle>
              <div className='ripple ripple-surface ripple-surface-light btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></div>
            </MDBModalHeader>
            
            <MDBModalBody>
              {messsage?<>
              <div id='m'>
                <p>{messsage}</p>
              </div>
              </>:<></>}
              <div >
                <div className='mb-3'>
                  <>
                   <label className='col-form-label'>تحديد ثمن</label>
                    <input type="text"
                    onChange={onPriceChange}
                    className='form-control'/>
                  </>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <div className='ripple ripple-surface btn btn-secondary' onClick={() => setVaryingModal(!varyingModal)}>
              إغلاق
              </div>
              <button className='ripple ripple-surface btn btn-primary' type='submit' id='add'>إضافة</button >
            </MDBModalFooter>
          </MDBModalContent>
          </form>
        </MDBModalDialog>
      </MDBModal>
      
     </section>
 
       </div>

    <Fotter/>
    </>
    
      )
    }
  
