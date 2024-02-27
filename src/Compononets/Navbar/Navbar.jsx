import {useEffect, useState} from 'react'
import './Navbar.scss'
// import {Link} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logout from '../../Authentication_Component/Logout/Logout';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Authentication_Component/useAuth/useAuth';
import Loading from '../Loading/Loading';
import{
MDBModal,
MDBModalDialog,
MDBModalContent,
MDBModalHeader,
MDBModalTitle,
MDBModalBody,
MDBModalFooter,

} from 'mdb-react-ui-kit';
export default function Navbar() {
  const{setUser,setAccessToken,setCSRFToken,user}=useAuth()
  const[loading,setLoading]=useState(false)
  const logoute=Logout()
  const navigate=useNavigate()
  const[authenticated,setAuthenticated]=useState(false)
  const [varyingModaLogout, setVaryingModaLogout] = useState(false);
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
  const [status,statusFunc]=useState(false)
  
  const convertToC=()=>{
    
      statusFunc(false)
  }
  const convertToO=()=>{
    statusFunc(true)
}
function goToBootom(){
  
    // const element = document.getElementById('contact');
    window.scrollTo(0, document.body.scrollHeight);

}


  return (
    <>
     {loading?<div className="load" id='loade'>
        <Loading /> 
        </div>:<></>}
    <div id='thenav'>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"} id='nb'>RaBoP</Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      {status ? (<span className="btn-close" data-bs-dismiss="collapse" aria-label="Close" id='closee' onClick={convertToC}></span>):
      <span className="navbar-toggler-icon" onClick={convertToO}></span>
      }
      
    </button>

    {status?
    (
    <div className="collapse navbar-collapse fix" id="navbarSupportedContent">
   
      {status?
      (<div id="fixed">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='navitems'>
        
        <li className="nav-item" id='item'>
          <Link className="nav-link active" aria-current="page" to={"/"}>القائمة</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to={"/HowTo"} >الكيفية</Link>
        </li>
        {authenticated?(<> {user[0]?.is_manager?(<> {user[1]?.ser?.is_has_dwar? <><li className="nav-item">
          <Link className="nav-link "  to={"/Manager"}>ملفي</Link> 
        </li> </>:<> </> }</>):(<li className="nav-item">
          <Link className="nav-link "  to={"/Resident"}>ملفي</Link> 
        </li>)} </>):(<></>)}
        
        <li className="nav-item">
            {/*   */}
            <div className="nav-link "onClick={goToBootom} id='poi' >الإتصال</div>
          </li>
      </ul>
      <form className="d-flex" role="search">
        
      {authenticated? (<> {user[0]?.is_manager?(<>{user[1]?.ser?.is_has_dwar?<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>:<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>}</>):(<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>)} </>) :
        
        (<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>)}
        
        
      </form>
      </div>):
     ( < >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='navitems'>
        
        <li className="nav-item" id='item'>
          <Link className="nav-link active" aria-current="page" to={"/"}>القائمة</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/HowTo"}>الكيفية</Link>
        </li>
        
        {authenticated?(<> {user[0]?.is_manager?(<> {user[1]?.ser?.is_has_dwar? <><li className="nav-item">
          <Link className="nav-link "  to={"/Manager"}>ملفي</Link> 
        </li> </>:<> </> }</>):(<li className="nav-item">
          <Link className="nav-link "  to={"/Resident"}>ملفي</Link> 
        </li>)} </>):(<></>)}
        <li className="nav-item">
            {/* <Link className="nav-link "to={"#contact"}  >الإتصال</Link> */}
            <div className="nav-link "onClick={goToBootom} id='poi' >الإتصال</div>
          </li>
      </ul>
      <form className="d-flex" role="search">
      {authenticated? (<> {user[0]?.is_manager?(<>{user[1]?.ser?.is_has_dwar?<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>:<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>}</>):(<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>)} </>) :
        
        (<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>)}
      </form>
      </>)}
    
    </div>):
    (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
        {status?
        (<div id="fixed">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='navitems'>
          
          <li className="nav-item" id='item'>
            <Link className="nav-link active" aria-current="page" to={"/"}>القائمة</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to={"/HowTo"}>الكيفية</Link>
          </li>
          
          {authenticated?(<> {user[0]?.is_manager?(<> {user[1]?.ser?.is_has_dwar? <><li className="nav-item">
          <Link className="nav-link "  to={"/Manager"}>ملفي</Link> 
        </li> </>:<> </> }</>):(<li className="nav-item">
          <Link className="nav-link "  to={"/Resident"}>ملفي</Link> 
        </li>)} </>):(<></>)}
          <li className="nav-item">
            {/* <Link className="nav-link "to={"#contact"}  >الإتصال</Link> */}
            <div className="nav-link "onClick={goToBootom} id='poi' >الإتصال</div>
          </li>
        </ul>
        <form className="d-flex" role="search">
        {authenticated? (<> {user[0]?.is_manager?(<>{user[1]?.ser?.is_has_dwar?<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>:<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>}</>):(<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>)} </>) :
        
        (<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>)}
        </form>
        </div>):
       ( < >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='navitems'>
          
          <li className="nav-item" id='item'>
            <Link className="nav-link active" aria-current="page" to={"/"}>القائمة</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to={"/HowTo"}>الكيفية</Link>
          </li>
          
          {authenticated?(<> {user[0]?.is_manager?(<> {user[1]?.ser?.is_has_dwar? <><li className="nav-item">
          <Link className="nav-link "  to={"/Manager"}>ملفي</Link> 
        </li> </>:<> </> }</>):(<li className="nav-item">
          <Link className="nav-link "  to={"/Resident"}>ملفي</Link> 
        </li>)} </>):(<></>)}
          <li className="nav-item">
            {/* <Link className="nav-link "to={"#contact"}  >الإتصال</Link> */}
            <div className="nav-link "onClick={goToBootom} id='poi' >الإتصال</div>
            
          </li>
        </ul>
        <form className="d-flex" role="search">
        {authenticated? (<> {user[0]?.is_manager?(<>{user[1]?.ser?.is_has_dwar?<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>:<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>}</>):(<><div className="btn"  id='logout' onClick={() => setVaryingModaLogout(!varyingModaLogout)} >تسجيل الخروج</div></>)} </>) :
        
        (<>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Resident_Signup'}> إنشاء حساب </Link>
        <Link className="btn btn-primary" id='auth' type="submit" to={'/Login'}>تسجيل الدخول</Link></>)}
        </form>
        </>)}
      
      </div>)
    }
    
  </div>
</nav>
</div>
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
    </>
  )
}

