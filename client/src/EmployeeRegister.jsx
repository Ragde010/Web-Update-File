import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';
import './CSS/CssStyles.css'
import {useAdminAuth} from './context/AdminAuthContext'


function EmployeeRegister() {
    const { signUp } = useAdminAuth();
    const [displayName, setdisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

     // Generate a random number for the EmployeeID
    const [adminID, setadminID ] = useState('');
    useEffect(() => {
      setadminID('ADMIN' + Math.floor(Math.random() * 10000));
    }, []);

    // For eyeVisibility of the Password
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      }; 

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            return setError("Passwords do not match!");
        }
  
        try {
            await signUp(email, password, displayName, adminID);
            navigate('/employee-login');
           
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
        }
    };

  return (
    <div className='offset-lg-3 col-lg-6'>
      <form className='container my-5 p-4'onSubmit={handleSubmit}>
        <div className='card shadow-lg '>
          <div className='card-header'>
            <h1 className='mb-0'style={{ color: 'darkblue', fontWeight: 800 }}> Create an Account</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-lg-6 mb-1'>
                <div className='form-group mb-2'>
                  <label htmlFor="adminID">
                    <span className='text-bold '>Admin ID</span>
                  </label>
                  <input
                      type="text"
                      name="adminID"
                      value={adminID}
                      readOnly
                      className="form-control rounded-1"
                    />
                </div>
              </div>
              <div className="col-lg-6 mb-1">
                <div className="form-group mb-2">
                <label htmlFor="dateOfBirth">
                <span className='text-bold'>Date of Birth</span>
                </label>
                <input
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                className="form-control rounded-1 shadow-sm"
                onChange={(e) => setDateOfBirth(e.target.value)}
                />
                </div>
        </div> 

              <div className='col-lg-6 mb-1'>
                <div className='form-group mb-2'>
                  <label htmlFor="displayName">
                    <span className='text-bold'>Full Name</span>
                  </label>
                  <input
                      type="text"
                      name="displayName"
                      value={displayName}
                      className="form-control rounded-1"
                      placeholder='(e.g., John Doe)'
                      onChange={(e) => setdisplayName(e.target.value)}
                    />
                </div>
              </div>
              <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="password">
                      <span className="text-bold ">Password</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        className="form-control rounded-1"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              <div className='col-lg-6 mb-1'>
                <div className='form-group mb-2'>
                  <label htmlFor="email">
                    <span className='text-bold '>Email</span>
                  </label>
                  <input
                      type="email"
                      name="email"
                      value={email}
                      className="form-control rounded-1"
                      placeholder='(e.g., sample@gmail.com))'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
              </div>
              <div className="col-lg-6 mb-1">
                <div className="form-group mb-2">
                    <label htmlFor="confirmPassword">
                    <span className='text-bold '>Confirm Password</span>
                    </label>
                    <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        className="form-control rounded-1 shadow-sm "
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                    >
                        <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        />
                    </span>
                  </div>
                </div>
            </div> 
              
                <button type='submit' className='btn btn-primary w-100' style={{ backgroundColor: 'darkblue' }}><strong>Register</strong></button>
                <div className="text-center mt-3">
                            <hr className="my-2" />
                        </div>
                        <div className='p-3 box text-muted mt-2 text-center'>
                            <p>
                                Already have an Account?{" "}
                                <Link to="/newlogin" className="text-decoration-none">
                                <strong>Login</strong>
                                </Link>
                            </p>
                        </div>
                        
            </div>
          
          </div>
          <div className="copyright d-flex justify-content-center align-items-center">
      <p>&copy; 2023 Bow Course Registration. All rights reserved.</p>
      </div>
        </div>
        
      </form>
    </div>

  )
}

export default EmployeeRegister