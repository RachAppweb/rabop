import React, { Component } from 'react'
import MDashboard from '../MDashboard/MDashboard'
import Navbar from '../../Compononets/Navbar/Navbar'
import Fotter from '../../Compononets/Fotter/Fotter'
import './Manager.scss'
export class Manager extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <MDashboard/>
        <Fotter/>
      </>
    )
  }
}

export default Manager