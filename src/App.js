import "./App.css";
import Home from "./Compononets/Home/Home";
import DwarCreate from "./Components_p2/DwarCreate/DwarCreate";
import Manager from "./Components_p3/ManagerDash/Manager";
import ResidentDash from "./Components_p3/ResidentDash/ResidentDash";
import ResidentSignup from "./Authentication_Component/Resident_Signup/ResidentSignup";
import ManagerSignup from "./Authentication_Component/Manager_Signup/ManagerSignup";
import Login from "./Authentication_Component/Login/Login";
import VerfyRESLogin from "./Authentication_Component/VerifyRESLogin/VerfyRESLogin";
import MiddleWare from "./Authentication_Component/MiddleWare/MiddleWare";
// import ManagerMiddleWare from "./Authentication_Component/MiddleWare/managerMiddleWare";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import ResetPassword from "./Authentication_Component/ResetPassword/ResetPassword";
import SettingPassword from "./Authentication_Component/SettingPassword/SettingPassword";
import MyResident from "./Components_p3/MDashboard/MyResident";
import HowToCommponent from "./Components_p2/HowToCommponent/HowToCommponent";
import React from "react";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<MiddleWare />}> */}
          {/* <Route path="/" element={<ManagerMiddleWare />}> */}
          <Route path="/DwarCreate" element={<DwarCreate />} />
          <Route path="/Manager" element={<Manager />} />
          {/* </Route> */}
          <Route path="/Resident" element={<ResidentDash />} />
          {/* </Route> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Resident_Signup" element={<ResidentSignup />} />
          <Route path="/Manager_Signup" element={<ManagerSignup />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/SettingPassword/:uidb64/:token"
            element={<SettingPassword />}
          />
          <Route path="/MyResident/:id" element={<MyResident />} />
          <Route path="/HowTo" element={<HowToCommponent />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
