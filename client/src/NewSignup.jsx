import React, { useState, useEffect } from 'react'
import Footer from "./components/Footer";
import Navigation from "./Navigation";
import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from './context/UserAuthContext';
import { Alert } from 'react-bootstrap';
import './CSS/NewSignup.css'

function NewSignup() {
    const currentYear = new Date().getFullYear();
    // const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    // const [displayName, setDisplayName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // const {signUp} = useUserAuth();

   // Generate a random number for the student ID
  const [studentId, setStudentId] = useState("");
  useEffect(() => {
    setStudentId("BVC" + Math.floor(Math.random() * 10000));
  }, []);

    const handleSubmit  = async(e) => {
        e.preventDefault();
        setError("")

            // Check if passwords match
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        try {
            // await signUp(email, password, displayName)
            // navigate('/newlogin');
        } catch (error) {
            setError(error.message)
        }

    }
  return (
    <div>
    <Navigation />
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Create an Account</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <form>
        <div className="mb-3">
          <label htmlFor="displayName">
              <strong>Full Name<span className='errmsg'>*</span></strong>
          </label>
          <input
              type="text"
              name="displayName"
              placeholder="Enter your name"
              className="form-control rounded-1 border border-secondary"
              // onChange={(e) => setDisplayName(e.target.value)}
          />
      </div>
      <div className='mb-3'>
        <label htmlFor="studentId">
              <strong>Student ID<span className='errmsg'>*</span></strong></label>
              <input
                      type="text"
                      name="studentId"
                      value={studentId}
                      readOnly
                      className="form-control rounded-1"
                    />
      </div>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Email<span className='errmsg'>*</span></strong> 
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Enter a email"
              className="form-control rounded-1 border border-secondary"
              // onChange={(e) => setEmail(e.target.value)}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password<span className='errmsg'>*</span></strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter a Password"
              className="form-control rounded-1 border border-secondary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Confirm Password<span className='errmsg'>*</span></strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Confirm password"
              className="form-control rounded-1 border border-secondary"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button type="Submit" className="btn btn-primary w-100">
            <strong>Submit</strong>
          </button>
          <div className="text-center mt-3">
            <hr className="my-2" />
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success w-100">Sign In with Phone Number</button>
          </div>
          <div className='p-3 box mt-2 text-center'>
              <p>
                Already have an Account?{" "}
                <Link to="/newlogin" className="text-decoration-none">
                  <strong>Login</strong>
                </Link>
              </p>
          </div>
        </form>
      </div>
    </div>

    <Footer currentYear={currentYear} />
  </div>
  )
}

export default NewSignup