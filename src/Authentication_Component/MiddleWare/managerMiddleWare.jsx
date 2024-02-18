
import useAuth from '../useAuth/useAuth'
import { Navigate,Outlet, useLocation } from "react-router-dom";
export default function ManagerMiddleWare() {
    const{user,accessToken}=useAuth()
    const location = useLocation();
  return ( accessToken && user[0]?.is_manager ? <Navigate to={'/Manager'} />:<Navigate to={'/'} state={{from:location}} replace/>)
}
