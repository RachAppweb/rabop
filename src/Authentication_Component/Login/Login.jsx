import React, { Component } from 'react'
import './Login.scss'
import LoginForm from '../LoginForm/LoginForm'
import Navbar from '../../Compononets/Navbar/Navbar'
import Fotter from '../../Compononets/Fotter/Fotter'
export class Login extends Component {
  render() {
    return (
      <div>
      <Navbar/>
      <LoginForm/>
      <Fotter/>
      </div>
    )
  }
}

export default Login