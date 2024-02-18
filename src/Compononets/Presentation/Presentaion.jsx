import React from 'react'
import './Presentation.scss'
import backpick from '../Assets/water_meter_website_background2.png'
import {Link} from 'react-router-dom'
function Presentaion() {
  return (
    <div>
        <div className="background"> 
        <div className="ktba">
          <h2>السلام عليكم ومرحبا بالجميع في رابوب</h2>
          <div className="sign">
            <Link className='btn' id='button' to={'/HowTo'} >معرفة أكثر</Link>
          </div>
        </div>
            <img src={backpick} alt="" /> 
        </div>
    </div>
  ) 
}

export default Presentaion