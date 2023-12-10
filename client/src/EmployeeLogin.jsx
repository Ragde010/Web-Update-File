import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';
import { useAdminAuth } from './context/AdminAuthContext';
import Navigation from './Navigation';
import './CSS/CssStyles.css'
import Footer from './components/Footer';

function EmployeeLogin() {
  const {logIn} = useAdminAuth();
  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate() 
  const currentYear = new Date().getFullYear();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleLogin = async(e) => {
      e.preventDefault();
      setError('');
      try {
        await logIn(email, password);
        navigate('/admin-page');
      } catch (error) {
        console.error('Login error:', error);
        setError(error.message);
      }
            
    }
    
  return (
    <div>
      <Navigation />
      <div className="offset-lg-3 col-lg-6">
      <form className="container my-5 p-4" onSubmit={handleLogin}>
        <div className="card shadow-lg">
          <div className="card-header">
            <h1 className="mb-0">Admin Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <div className="card-body">
            {/* Similar to the registration form, add input fields for email and password */}
            <div className="form-group mb-2">
              <label htmlFor="email">
                <span className="text-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control rounded-1"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="password">
                <span className="text-bold">Password</span>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  className="form-control rounded-1"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              <strong>Login</strong>
            </button>
            <div className="text-center mt-3">
              <hr className="my-2" />
            </div>
            <div className="p-3 box text-muted mt-2 text-center">
              <p>
                Don't have an account?{' '}
                <Link to="/employee-register" className="text-decoration-none">
                  <strong>Register</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
 <Footer currentYear={currentYear} />
</div>

  )
}

export default EmployeeLogin