import useAuth from "../useAuth/useAuth";
import { Navigate,Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default  function MiddleWare() {
    const{accessToken}= useAuth()
    const location = useLocation();
  
  return  (accessToken?<Outlet/>:<Navigate to='/' state={{from:location}} replace/>)
}
