import React, { Component } from 'react'
import Navbar from '../../Compononets/Navbar/Navbar'
import Fotter from '../../Compononets/Fotter/Fotter'
import RSignup from '../RSignup/RSignup'
import './Resident_Signup.scss'
export class ResidentSignup extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <RSignup/>
        <Fotter/>
      </div>
    )
  }
}

export default ResidentSignup