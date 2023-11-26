import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Signup.css";
import Navigation from "./Navigation";

const Signup = () => {
  const currentYear = new Date().getFullYear();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Generate a random number for the student ID
  const [studentId, setStudentId] = useState("");
  useEffect(() => {
    setStudentId("BVC" + Math.floor(Math.random() * 10000));
  }, []);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        studentId,
        firstName,
        lastName,
        email,
        username,
        password,
        department,
        program,
        dateOfBirth,
      })
      .then((result) => {
        console.log(result);
        navigate("/login")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navigation />
      <div className="offset-lg-3 col-lg-6">
        <form className="container my-5 p-4 " onSubmit={handleSubmit}>
          <div className="card shadow-lg">
            <div className="card-header">
              <h1 className="mb-0">Create an Account</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="studentId">
                      <span className="text-bold">Student ID</span>
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={studentId}
                      readOnly
                      className="form-control rounded-1"
                    />
                  </div>
                </div>
                
                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      <span className="text-bold">First Name</span>
                      <span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      className="form-control rounded-1"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="department">
                      <span className="text-bold">Department</span>
                      <span className="errmsg">*</span>
                    </label>
                    <select
                      name="department"
                      value={department}
                      className="form-control rounded-1 "
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select a department</option>
                      <option value="School of Technology">
                        School of Technology
                      </option>
                      <option value="Chiu School of Business Programs">
                        Chiu School of Business Programs
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="lastName">
                      <span className="text-bold">Last Name</span>
                      <span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      className="form-control rounded-1"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="program">
                      <span className="text-bold">Program</span>
                      <span className="errmsg">*</span>
                    </label>
                    <select
                      name="program"
                      className="form-control rounded-1 "
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                    >
                      <option value="">Select a Program</option>
                      <option value="">MSC</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="text-bold">Email</span>{" "}
                      <span className="errmsg">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      className="form-control rounded-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="username">
                      <span className="text-bold">Username</span>
                      <span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      className="form-control rounded-1"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">
                      <span className="text-bold">Date of Birth</span>
                      <span className="errmsg">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      className="form-control rounded-0"
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6 mb-1">
                  <div className="form-group">
                    <label htmlFor="password">
                      <span className="text-bold">Password</span>
                      <span className="errmsg">*</span>
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
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  <strong>Register</strong>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default Signup;
