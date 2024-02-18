import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';
import './Loading.scss'
export default function Loading() {
  return (
    <>
      <MDBSpinner grow id='spin'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='mx-2' id='spin'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow id='spin'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='mx-2'id='spin' >
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow id='spin'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <MDBSpinner grow className='mx-2' id='spin'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      
    </>
  );
}