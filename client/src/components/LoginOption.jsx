import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
import Footer from './Footer'
import '../CSS/NewLogin.css'


function LoginOption() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
    <Navigation />
  
    <div className='background-image d-flex justify-content-center align-items-center vh-100'>
      <div className='bg-light p-3 rounded w-25 border-2 shadow-lg'>
        <h2 className="text-center mb-4">Choose for Login</h2>
        <div className='mb-3'>
          <Link to="/newlogin" className="btn btn-primary btn-lg w-100 text-uppercase fw-bold">Student</Link>
        </div>

        <div className='mb-3'>
          <Link to="/employee-login" className="btn btn-primary btn-lg w-100 text-uppercase fw-bold">Employee</Link>
        </div>
      </div>
    </div>

    <Footer currentYear={currentYear} />
  </div> 
);
}

export default LoginOption