import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';
import './CSS/CssStyles.css'

function EmployeeRegister() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

     // Generate a random number for the EmployeeID
    const [employeeId, setEmployeeId ] = useState('');
    useEffect(() => {
        setEmployeeId('EMP' + Math.floor(Math.random() * 10000));
    }, []);

    // For eyeVisibility of the Password
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      }; 

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        if(password !== confirmPassword){
          return setError("Passwords do not match!");
        }
        try {
         const mongoDBResponse = await axios.post('http://localhost:3001/employee-register', {
          employeeId, 
          name, 
          email,
          dateOfBirth, 
          password,
          confirmPassword
        });
        console.log("User registered successfully:", mongoDBResponse.data);
        navigate('/login')
        } catch (error) {
          setError(error.message)
          
        }
          
}
  return (
    <div className='offset-lg-3 col-lg-6'>
      <form className='container my-5 p-4'onSubmit={handleSubmit}>
        <div className='card shadow-lg '>
          <div className='card-header'>
            <h1 className='mb-0'> Create an Account</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-lg-6 mb-1'>
                <div className='form-group mb-2'>
                  <label htmlFor="employeeId">
                    <span className='text-bold '>Employee ID</span>
                  </label>
                  <input
                      type="text"
                      name="employeeId"
                      value={employeeId}
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
                  <label htmlFor="name">
                    <span className='text-bold'>Full Name</span>
                  </label>
                  <input
                      type="text"
                      name="name"
                      value={name}
                      className="form-control rounded-1"
                      placeholder='(e.g., John Doe)'
                      onChange={(e) => setName(e.target.value)}
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
              
                <button type='submit' className='btn btn-primary w-100'><strong>Register</strong></button>
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