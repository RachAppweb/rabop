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
import React, { useEffect, useState } from 'react'
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
    const [varyingModaLogout, setVaryingModaLogout] = useState(false);
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
    useEffect(()=>{     
        async function getManager(){
          setLoading(true)
          try{
            const {data}=await axiosPrivateInstance.get('signup/manager/')
            setItHas(user[1]?.ser?.is_has_dwar)
            setUser(data)
            console.log(data)           
                setLoading(false)
              // console.log(user[1]?.ser?.manimg)
          }catch(error){
            console.log(error)
            setLoading(false)
          }
        } 
        getManager()
    },[axiosPrivateInstance,setUser])  
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
              <img className="img-fluid rounded-circle" alt="avatar" src={`http://127.0.0.1:8000${user[1]?.ser?.manimg}`} style={{ width: '150px' }}/>:
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
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">                  
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
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">                 
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
      </div>
    )
  }
