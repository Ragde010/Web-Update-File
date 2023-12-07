import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./CSS/CssStyles.css";
import Footer from "./components/Footer";
import { toast } from "react-toastify";

function Login() {
  const currentYear = new Date().getFullYear();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          toast.success("Login SuccesFully!");
          navigate("/student-course");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Credentials");
      });
  };
  return (
    <div>
      <Navigation />
      <div className="page-re d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">
                <strong>Username</strong> 
              </label>
              <input
                type="text"
                name="username"
                autoComplete="off"
                placeholder="Enter a username"
                className="form-control rounded-0"
                onChange={(e) => setUsername(e.target.value)}
              />
              {emailError && <span className='text-danger'>{emailError}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter a Password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* {passwordError && <span className='text-danger'>{passwordError}</span>} */}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              <strong>Login</strong>
            </button>
            <div className="text-center mt-3">
              <hr className="my-2" />
            </div>
            <div className="text-center mt-3">
              <Link to = '/onetime-password' className="btn btn-success w-100">Sign In with Phone Number</Link>
            </div>
            <p className="mt-2">
              Don't have an Account?{" "}
              <Link to="/register" className="text-decoration-none">
                <strong>Sign Up Here</strong>
              </Link>
            </p>
            {/* <p>Dont have an Account? </p>
            <Link
              to="/register"
              className="btn btn-primary w-100 text-decoration-none"
            >
              <strong>Register</strong>
            </Link> */}
            
          </form>
        </div>
      </div>

      <Footer currentYear={currentYear} />
    </div>
  );
}

export default Login;
