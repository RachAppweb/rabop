import React, { useCallback, useEffect, useState } from 'react'
import './MyManager.scss'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,   
  } from 'mdb-react-ui-kit';
import useAxiosPrivate from '../../FetchTypes/useAxiosPrivate';
import Loading from '../../Compononets/Loading/Loading';
import Navbar from '../../Compononets/Navbar/Navbar';
import Fotter from '../../Compononets/Fotter/Fotter'
import userpic from '../../Compononets/Assets/user.jpg'
import useAuth from '../../Authentication_Component/useAuth/useAuth';
export default function MyManager() {
    const axiosPrivateInstance=useAxiosPrivate()
    const[loading,setLoading]=useState(false) 
    const[man,setMan]=useState([])
    const{user,setUser}=useAuth()
    const[authenticated,setAuthenticated]=useState(false)
    const  getResident= useCallback(async ()=>{
        setLoading(true)
        console.clear()
        try{
          const {data} =await axiosPrivateInstance.get('signup/residents/')        
          setUser(data)        
          setLoading(false)        
        }catch(error){
         setLoading(false)
         console.clear()
        } 
      },[axiosPrivateInstance,setUser])
       useEffect(()=>{    
      getResident()
    },[getResident])
    useEffect(()=>{
        setAuthenticated(user[0]? true:false)
      },[user])
    const getManagerInfo = useCallback(async ()=>{
        setLoading(true)
      //   console.clear()
        try{
          const {data}=await axiosPrivateInstance.get('get_my_mang/')
          setMan(data)
         
          setLoading(false)
          // console.clear()
        }catch(error){
          // console.clear()
          setLoading(false)
        }
      },[axiosPrivateInstance] )
      useEffect(()=>{
        getManagerInfo()
      },[getManagerInfo])
  return (
    <>
    <Navbar/>
        
<div>
         {loading?<div className="load" id='loade'>
         <Loading /> 
         </div>:<></>}
  
         <section style={{ backgroundColor: '#eee' }}>
         
       <MDBContainer className="py-5"> 
         <MDBRow>
           <MDBCol lg="4">
             <MDBCard className="mb-4">
               <MDBCardBody className="text-center">
               {man?.more?.manimg?
              <img className="img-fluid rounded-circle" alt="avatar" src={`https://rabop-backend.onrender.com${man?.more?.manimg}`} style={{ width: '150px' }}/>:
              <img className="img-fluid rounded-circle" alt="avatar" src={userpic} style={{ width: '150px' }}/>  
              }                 
                 <p className="text-muted mb-1"></p>
                 <p className="text-muted mb-4">  </p>
                
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
                     <MDBCardText className="text-muted">{man?.my_manager?.first_name}  {man?.my_manager?.last_name} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>ألبريد الإلكتروني</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {man?.my_manager?.email} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>رقم الهاتف</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {man?.my_manager?.phone_number} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>الجماعة الترابية</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {man?.my_manager?.territorial} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
                 <hr />
                 <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>الدوار</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                     <MDBCardText className="text-muted"> {man?.my_manager?.territorial} </MDBCardText>
                   </MDBCol>
                 </MDBRow>
               </MDBCardBody>
             </MDBCard>
            
           
           </MDBCol>
         </MDBRow>
      

       </MDBContainer>
      
      
     </section>
 
       </div>

    <Fotter/>
    </>
  )
}
