// import React, {useState} from 'react'
import Footer from "./components/Footer";
import { useState } from "react";
import Navigation from "./Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from './context/UserAuthContext';
import { Alert } from 'react-bootstrap';
import './CSS/NewLogin.css'

function NewLogin() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {logIn} = useUserAuth();

    const handleSubmit  = async(e) => {
        e.preventDefault();
        setError("")
        try {
            await logIn(email, password)
            navigate('/student-dashboard');
        } catch (error) {
            setError(error.message)
        }

    }
  return (
    <div>
    <Navigation />
    <div className="background-image d-flex justify-content-center align-items-center vh-100">
      <div className="bg-light p-3 rounded w-25 border-2 shadow-lg">
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Enter a email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter a Password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <strong>Login</strong>
          </button>
          <Link to='/forgot-password' className="d-block mt-2 text-center">Forgot Password?</Link>
          <hr className="my-2" />
          <div className="text-center mt-3">
            <Link to='/' className="btn btn-success w-100">Sign In with Phone Number</Link>
          </div>
          <p className="mt-2 text-center">
            Don't have an Account?{" "}
            <Link to="/newregistration" className="text-decoration-none">
              <strong>Sign Up </strong>
            </Link>
          </p>
        </form>
      </div>
    </div>

    <Footer currentYear={currentYear} />
  </div>
);
}

export default NewLogin