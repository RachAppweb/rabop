import React, { Component } from 'react'
import Navbar from '../../Compononets/Navbar/Navbar'
import MSignup from '../MSignup/MSignup'
import Fotter from '../../Compononets/Fotter/Fotter'
import './Manager_Signup.scss'
export class ManagerSignup extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <MSignup/>
      <Fotter/>

      </>
    )
  }
}

export default ManagerSignup



