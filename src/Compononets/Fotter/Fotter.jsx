import React from 'react'
import './Fotter.scss'
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBCol,
    MDBRow,
    MDBBtn
  } from 'mdb-react-ui-kit';
  import { Link } from 'react-router-dom';
function Fotter() {
  return (
    <>
  <MDBFooter className='text-center' color='white' id='fotter' > 
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/rachidmayene?igsh=aXE1a3Q4NWhrOTRt' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/in/mouine-rachid-a51b13241' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/RachAppweb' role='button'>
            <MDBIcon fab icon='github' /> 
          </MDBBtn>
        </section>
        

        <section className=''>
          <MDBRow id='ce'>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>الصفحات</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <Link to='/' className='text-white' id='tdn'>
                    القائمة
                  </Link>
                </li>
                <li>
                  <Link to={'/HowTo'} className='text-white' id='tdn'>
                    كيفية الإستعمال
                  </Link>
                </li>
                <li>
                  <Link to={'/Manager_Signup'} className='text-white' id='tdn'>
                   إنشاء حساب كمسؤول
                  </Link>
                </li>
                
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase' id='contact'> للتواصل </h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://www.facebook.com/profile.php?id=100036547980205' className='text-white' id='tdn'>
                   عل فيسبوك
                  </a>
                </li>
                <li>
                  <a href='https://www.instagram.com/rachidmayene?igsh=aXE1a3Q4NWhrOTRt' className='text-white' id='tdn'>
                    عل إنستغرام
                  </a>
                </li>
                <li>
                  <a href='https://wa.me/064015158' className='text-white' id='tdn'>
                   على واتساب
                  </a>
                </li>
                <li>
                  <a href='https://github.com/RachAppweb' className='text-white' id='tdn'>
                    مشاريعنا
                  </a>
                </li>
                
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright:
        <b className='text-white' >
          rachidmayene@gmail.com
        </b>
      </div>
    </MDBFooter>

    </>
  )
}

export default Fotter