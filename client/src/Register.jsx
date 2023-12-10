import React, {useState,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Signup.css";
import { Alert } from "react-bootstrap";
import { useUserAuth } from "./context/UserAuthContext";

function Register() {
    const [displayName, setdisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [department, setDepartment] = useState("");
    const [program, setProgram] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const {signUp} = useUserAuth();
    const navigate = useNavigate();

    // // Generate a random number for the student ID
    const [studentID, setstudentID] = useState("");
    useEffect(() => {
        setstudentID("BVC" + Math.floor(Math.random() * 10000));
    }, []);
    

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }
        try{
            await signUp(email, password, studentID, displayName,);
            navigate('/login-option');
        } catch (error){
            setError(error.message)
        }
    }
    return(
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="card shadow-lg">
                <div className="card-header">
                    <h1 className="mb-0" style={{ color: 'darkblue', fontWeight: 800 }}>Create an Account</h1>
                    {error && <Alert variant='danger'>{error}</Alert>}
                </div>
                <div className="card-body">
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="">
                                    <span style={{fontSize: "17px"}}>Student ID</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentID"
                                    value={studentID}
                                    readOnly
                                    className="form-control rounded-1"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="department">
                                    <span style={{fontSize: "17px"}}>Department</span>
                                    <span className="errmsg">*</span>
                                    <span className="text-muted ml-2">(Select your department)</span>
                                </label>
                                <select
                                    type="text"
                                    name="department"
                                    value={department}
                                    className="form-control rounded-1 shadow-sm"
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select a Department</option>
                                    <option value="School of Technology">School of Technology</option>
                                    <option value="Chiu School of Business Programs">Chiu School of Business Programs</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="displayName">
                                    <span style={{fontSize: "17px"}}>Full Name</span>
                                    <span className="errmsg">*</span>
                                    <span className="text-muted ml-2">(e.g., John Doe)</span>
                                </label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={displayName}
                                    className="form-control rounded-1 shadow-sm"
                                    onChange={(e) => setdisplayName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="program">
                                    <span style={{fontSize: "17px"}}>Program</span>
                                    <span className="errmsg">*</span>
                                </label>
                                <select
                                    type="text"
                                    name="program"
                                    value={program}
                                    className="form-control rounded-1 shadow-sm"
                                    onChange={(e) => setProgram(e.target.value)}
                                >
                                    <option value=""><span className="text-muted">Select a program</span></option>
                                    <option value="Software Development Diploma">Software Development Diploma</option>
                                    <option value="Software Development Diploma - Apprenticeship Style Diploma">Software Development Diploma - Apprenticeship Style Diploma</option>
                                    <option value="Information Technology Systems Diploma">Information Technology Systems Diploma</option>
                                    <option value="Business Administration Diploma - Accounting major">Business Administration Diploma - Accounting major</option>
                                    <option value="Business Administration Certificate">Business Administration Certificate</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="dateOfBirth">
                                    <span style={{fontSize: "17px"}}>Date of Birth</span>
                                    <span className="errmsg">*</span>
                                    <span className="text-muted ml-2">(Select your birthdate)</span>
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
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="password">
                                    <span style={{fontSize: "17px"}}>Password</span>
                                    <span className="errmsg">*</span>
                                    <span className="text-muted ml-2">(Min. 8 characters)</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        className="form-control rounded-1 shadow-sm"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </span>
                                </div>
                            </div>
                        </div>
                       
                        
                        <div className="col-lg-6 mb-1">
                            <div className="form-group">
                                <label htmlFor="email">
                                    <span style={{fontSize: "17px"}}>Email</span>
                                    <span className="errmsg">*</span>
                                    <span className="text-muted ml-2">(e.g., john.doe@example.com)</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    className="form-control rounded-1 shadow-sm"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="col-lg mb-1">
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                <span style={{fontSize: "17px"}}>Confirm Password</span>
                                <span className="errmsg">*</span>
                                <span className="text-muted ml-2">(Enter the same password)</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    className="form-control rounded-1 shadow-sm"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </span>
                            </div>
                        </div>
                    </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button type="submit" className="btn btn-primary w-50 mt-4 mx-auto border-black" style={{ backgroundColor: 'darkblue' }}>Register</button>
                        </div>
                        <div className="text-center mt-3">
                            <hr className="my-2" />
                        </div>
                        <div className='p-3 box text-muted mt-2 text-center'>
                            <p>
                                Already have an Account?{" "}
                                <Link to="/newlogin" className="text-decoration-none">
                                    <strong>Sign in</strong>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
   
  )
}

export default Register