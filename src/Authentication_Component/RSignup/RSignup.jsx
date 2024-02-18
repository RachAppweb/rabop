import React ,{useState,useEffect}from 'react'
import './RSignup.scss'
import { 
    MDBContainer,
    MDBCard,  
    MDBRow,
    MDBCol,
    MDBInput,   
  }
  from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { axiosInstance ,axiosInstanceSignup} from '../../FetchTypes/FetchTypes';
import Loading from '../../Compononets/Loading/Loading';
export default function RSignup() {
   const navigate=useNavigate()
   const [loadin,setLoading]=useState(false)
   const [first_name,setFirstName]=useState()
   const[last_name,setLastName]=useState()
   const[email,setEmail]=useState()
   const[username,setUserName]=useState()
   const[territorial,setTerritorial]=useState()
   const[number_of_water_meter,setNumber_Of_Water_Meter]=useState()
   const [choicees,setChoices]=useState([]);
   const [selected_village_name,setSelectedOption]=useState('')
   const[phone_number,setPhoneNumber]=useState()
   const[password,setPassword]=useState()
   const[password2,setPassswordConfirmation]=useState()
   const [resimg,setResPic]=useState()
   const [message,setMessage]=useState()
   function onFirst_Name(event){
    setFirstName(event.target.value)
   }
   function onLast_Name(event){
    setLastName(event.target.value)
   }
   function onEmail(event){
    setEmail(event.target.value)
   }
   function onUserName(event){
    setUserName(event.target.value)
   }
   function onTerritorial(event){
    setTerritorial(event.target.value)
   }
   function onNumberOfWater(event){
    setNumber_Of_Water_Meter(event.target.value)
   }
   function onPhone_Number(event){
    setPhoneNumber(event.target.value)
   }
   function onPassword(event){
    setPassword(event.target.value)
   }
   function onPassword_Conformation(event){
    setPassswordConfirmation(event.target.value)
   }
   function onSelectedVillageChange(event){
    setSelectedOption(event.target.value)
  }
  function onSetPic(event){
    setResPic(event.target.files[0])
  }
  const formData=new FormData()
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('username', username);
  formData.append('email', email);
  formData.append('phone_number', phone_number);
  formData.append('territorial', territorial);
  formData.append('selected_village_name', selected_village_name);
  formData.append('number_of_water_meter', number_of_water_meter);
  formData.append('resimg', resimg);
  formData.append('password', password);
  formData.append('password2', password2);
  async function onFormSubmit(event){
    event.preventDefault()
    setMessage(null)
    setLoading(true)
    try{
    const response=await axiosInstanceSignup.post('signup/residents/',formData)
    setFirstName()
    setLastName()
    setEmail()
    setTerritorial()
    setUserName()
    setSelectedOption()
    setPhoneNumber()
    setPassword()
    setPassswordConfirmation()
    setNumber_Of_Water_Meter()
    setLoading(false)
    navigate('/Login')
    console.log(response)

  }catch(error){
    setLoading(false)
    // console.log(error?.message)
    {error?.message =="Request failed with status code 400" && setMessage("عذرا لقد نسيت حقل ما")}
    
  }
}
   useEffect(()=>{
   async function getDwawer(){
    try{
      const theRes=await axiosInstance.get('dwar/')
      const respo=theRes.data
      setChoices( respo)
      
    }catch(error){
      console.log(error)
    }
      
   }
   getDwawer()
  },[])
  
  
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
              <form className='card-body text-black d-flex flex-column justify-content-center' onSubmit={onFormSubmit}>
                  <h3 className="mb-5 text-uppercase fw-bold" id='titlesi'>إنشاء حساب </h3>
                  {message && <div id='m'><p>{message}</p></div>}
                  <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor="">الإسم الأول</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form1' required type='text'onChange={onFirst_Name}/>                    
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor="">الإسم الثاني</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form2' required type='text'onChange={onLast_Name}/>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
            <MDBCol md='6'>
                <label htmlFor="">الصورة الشخصية </label>
              <MDBInput wrapperClass='mb-4'  size='lg' id='form1'required  type='file'onChange={onSetPic}/>             
            </MDBCol>
            </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor=""> البريد الإلكتروني  </label>
                    <MDBInput wrapperClass='mb-4'  size='lg' id='form1' required type='email'onChange={onEmail}/>                   
                    </MDBCol>
                    <MDBCol md='6'>
                      <div id='select-wrapper-222548' className=" mb-4">
                      <select
                      required
                        className='form-control form-control-lg  mb-4'
                        size='lg'
                        value={selected_village_name}
                        onChange={onSelectedVillageChange}>
                          <option className='opt' value="" disabled>الدوار</option>
                          {choicees.map(option=>{
                            return(
                              <option className='opt' key={option.village_name} value={option.village_name}>{option.village_name}</option>
                            )
                          })}
                        </select> 
                        </div>
                    </MDBCol>
                    </MDBRow>                 
                    <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor="">الجماعة</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' required id='form1' type='text' onChange={onTerritorial}/>                  
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor="">رقم الهاتف</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' required id='form2' type='text'onChange={onPhone_Number}/>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor="">رقم العداد</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' required id='form1' type='text'onChange={onNumberOfWater}/>                   
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol md='6'>
                        <label htmlFor="">إسم المستخدم</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' required id='form1' type='text'onChange={onUserName}/>                   
                    </MDBCol>
                    <MDBCol md='6'>
                        <label htmlFor=""> كلمة السر</label>
                    <MDBInput wrapperClass='mb-4'  size='lg' required id='form2' type='text'onChange={onPassword}/>
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='6'>
                            <label htmlFor="">إعادة كلمة السر</label>
                        <MDBInput wrapperClass='mb-4'  size='lg' required id='form1' type='text'onChange={onPassword_Conformation}/>                       
                        </MDBCol>
                        </MDBRow>
                  <div className="d-flex justify-content-end pt-3"id='resright'>
                   <button className='ms-2' size='lg' type='submit'disabled={loadin}>إنشاء الحساب</button>
                    <Link to={'/Manager_Signup'} id='MS'>إنشاء حساب كمسؤول</Link>
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

