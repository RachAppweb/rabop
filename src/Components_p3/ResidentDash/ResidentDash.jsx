import React, { Component } from 'react'
import RDashboard from '../RDashboard/RDashboard'
import Navbar from '../../Compononets/Navbar/Navbar'
import Fotter from '../../Compononets/Fotter/Fotter'
export class ResidentDash extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <RDashboard/>
        <Fotter/>
      </div>
    )
  }
}

export default ResidentDash