import React, {useState} from 'react'
import Footer from './components/Footer';
import Navigation from './Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {sendPasswordResetEmail} from 'firebase/auth'
import { Alert } from 'react-bootstrap';
import './CSS/NewLogin.css'
import './CSS/Adminpage.css'

function ForgotPassword() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
            // Validation check for empty email
        if (!email) {
            setError("Email cannot be empty");
            return;
        }
        try {
          sendPasswordResetEmail(auth,email);
          alert('Password reset email sent. Check your inbox.');
          navigate('/newlogin');
        } catch (error) {
          setError(`Error: ${error.message}`);
        }
      };
  return (
    <div>
    <Navigation />
    <div className="background-image d-flex justify-content-center align-items-center vh-100">
      <div className="bg-light p-3 rounded w-25 border-2 shadow-lg">
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            {error && <Alert variant="danger">{error}</Alert>}
            <label className='form-label text-bold'>Email</label>
            <input type="email" className='form-control rounded-1 border-2' placeholder='Enter an email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className='btn btn-success mt-3 px-3 btn-with-padding'>Reset Password</button>
            <Link to="/newlogin" className='btn btn-danger mt-3'>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
    <Footer currentYear={currentYear} />
  </div>
  );
}

export default ForgotPassword