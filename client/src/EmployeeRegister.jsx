import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './CSS/CssStyles.css'

function EmployeeRegister() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUserName] = useState()
    
  
    const [showPassword, setShowPassword] = useState(false); 

     // Generate a random number for the student ID
    const [employeeId, setEmployeeId ] = useState('');
    useEffect(() => {
        setEmployeeId('EMP' + Math.floor(Math.random() * 10000));
    }, []);
   
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      }; 


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/employee-register', {employeeId, name, email, username, password})
        .then(result => console.log(result))
            navigate('/employee-login')
        .catch(err=> console.log(err))
    
}
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-75'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>

         <div className='mb-1'>
            <label htmlFor='employeeId'><strong>Employee ID:</strong></label>
            <input type='text' name='employeeId'value={employeeId}readOnly className='form-control rounded-0'/>
            
          </div>
        <div className='mb-1'>
                <label htmlFor='name'><strong>Fullname:</strong></label>
                <input type="text" name= 'name' placeholder='Enter a name'className='form-control rounded-0'
                onChange={(e) => setName(e.target.value)}/>
                
            </div>
            
            <div className='mb-1'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type="email" name= 'email' autoComplete= "off" placeholder='Enter a email'  className='form-control rounded-0' 
                onChange={(e) => setEmail(e.target.value)}/>
               
            </div>
            <div className='mb-1'>
                <label htmlFor='username'><strong>Username:</strong></label>
                <input type="text" name= 'username' placeholder='Enter a username'className='form-control rounded-0'
                onChange={(e) => setUserName(e.target.value)}/>
                
            </div>
            <div className='mb-1'>
                <label htmlFor='password'><strong>Password:</strong></label>
                <div className='input-group'>
                <input type={showPassword ? 'text' : 'password'} name= 'password' placeholder='Enter a name'className='form-control rounded-0'
                onChange={(e) => setPassword(e.target.value)}/>
                <span className='input-group-text' onClick={togglePasswordVisibility} style={{cursor: 'pointer'}} >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
                </div>
            </div>
         
            <button type='submit' className='btn btn-primary w-100'><strong>Register</strong></button>
            
            </form>  
      </div>
</div>
  )
}

export default EmployeeRegister