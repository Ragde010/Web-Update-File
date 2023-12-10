import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import logoPath from '../assets/images/BCR3.png'


function Update() {
  const {id} = useParams()
  const [courseCode, setCourseCode] = useState("")
  const [courseName, setCourseName] = useState("")
  const [courseStart, setCourseStart] = useState("")
  const [courseEnds, setCourseEnds] = useState("")
  const [dropCourse, setDropCourse] = useState("");
  const [withdrawal, setWithdrawal] = useState("");
  const [instructor, setInstructor] = useState("");
  const [fees, setFees] = useState("")
  const [description, setDescription] = useState("")
  const [deliveryMode, setDeliveryMode] = useState("");
  const [credits, setCredits] = useState("");
  const [campus, setCampus] = useState("");
  const navigate = useNavigate();

  useEffect(()=> {
    axios.get("http://localhost:3001/getcourse/"+id)
    .then(result => {

      console.log(result);
      const data = result.data;
    
      setCourseCode(data.courseCode)
      setCourseName(data.courseName)
      setCourseStart(data.courseStart)
      setCourseEnds(data.courseEnds)
      setDropCourse(data.dropCourse)
      setWithdrawal(data.withdrawal)
      setInstructor(data.instructor)
      setFees(data.fees)
      setDescription(data.description)
      setDeliveryMode(data.deliveryMode)
      setCredits(data.credits)
      setCampus(data.campus)
    })
    .catch(err => console.log(err))
  }, [id])

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updatecourse/'+id, {courseCode,courseName,courseStart,courseEnds,dropCourse,withdrawal,instructor,fees,description,deliveryMode,credits,campus,})
    .then(result => console.log(result))
        navigate('/admin-page')
    .catch(err=> console.log(err))

  }

  return (
    <div className="container mt-5" >
    <div className="w-50 bg-gray p-4 rounded shadow-lg mx-auto ">
      <h2 className="text-center mb-4" style={{ color: 'darkblue', fontWeight: 700}}>UPDATE COURSE</h2>
      <img src={logoPath} alt="Logo" style={{ position: 'absolute', top: '10px', right: '10px', maxWidth: '200px' }} />
      <form onSubmit={handleUpdate}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="courseCode" style={{ fontWeight: 'bold' }}>Course Code</label>
            <select
              type="text"
              value={courseCode}
              placeholder="Enter course code"
              className="form-control"
              onChange={(e) => setCourseCode(e.target.value)}
            >
              <option value="">Select coursecode</option>
               <option value="PR111">PR111</option>
               <option value="C++111">C++111</option>
               <option value="COMP111">COMP111</option>
               <option value="IS111">IS111</option>
               <option value="NET222">NET222</option>
               <option value="WEB222">WEB222</option>
               <option value="PRO222">PRO222</option>
               <option value="PRO333">PRO333</option>
               <option value="C++333">C++333</option>
               <option value="IS333">IS333</option>
               <option value="NET444">NET444</option>
               <option value="WEB444">WEB444</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="courseName" style={{ fontWeight: 'bold' }}>Course Name</label>
            <select
              type="text"
              value={courseName}
              placeholder="Enter course name"
              className="form-control"
              onChange={(e) => setCourseName(e.target.value)}
            >
              <option value="">Select coursename</option>
               <option value="Project Management1">Project Management1</option>
               <option value="C++ Programming Fundamentals">C++ Programming Fundamentals</option>
               <option value="Computer Maintenance">Computer Maintenance</option>
               <option value="Information Security1">Information Security1</option>
               <option value="Networking">Networking</option>
               <option value="Web Technology">Web Technology</option>
               <option value="Project Management">Project Management</option>
               <option value="Advanced Project Management1">Advanced Project Management1</option>
               <option value="Advanced C++ Programming Fundamentals">Advanced C++ Programming Fundamentals</option>
               <option value="Advanced Computer Maintenance">Advanced Computer Maintenance</option>
               <option value="Advanced Information Security1">Advanced Information Security1</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
      <div className='col-md-6'>
        <label htmlFor="courseStart" style={{ fontWeight: 'bold' }}>Course Start</label>
        <input
          type="date"
          value={courseStart}
          placeholder="Enter course start date"
          className='form-control'
          onChange={(e) => setCourseStart(e.target.value)}
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor="courseEnd" style={{ fontWeight: 'bold' }}>Course End</label>
        <input
          type="date"
          value={courseEnds}
          placeholder="Enter course end date"
          className='form-control'
          onChange={(e) => setCourseEnds(e.target.value)}
        />
      </div>
      </div>
      <div className="row mb-3">
      <div className='col-md-6'>
        <label htmlFor="dropCourse" style={{ fontWeight: 'bold' }}>Drop Date</label>
        <input
          type="date"
         value={dropCourse}
          placeholder="Enter course end date"
          className='form-control'
          onChange={(e) => setDropCourse(e.target.value)}
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor="courseEnd" style={{ fontWeight: 'bold' }}>Withdrawal Date</label>
        <input
          type="date"
          value={withdrawal}
          placeholder="Enter course end date"
          className='form-control'
          onChange={(e) => setWithdrawal(e.target.value)}
        />
      </div>
      </div>
      <div className="row mb-4">
        <label htmlFor="courseEnd" style={{ fontWeight: 'bold' }}>Instructor</label>
        <select
          type="text"
          value={instructor}
          placeholder="Enter course end date"
          className='form-control'
          onChange={(e) => setInstructor(e.target.value)}
        >
        <option value="">Select Instructor</option>
          <option value="Mary Cris Alegria">Mary Cris Alegria</option>
          <option value="Lady Rose Alarcon">Lady Rose Alarcon</option>
          <option value="Jovic Barozzo">Jovic Barozzo</option>
          <option value="Justine Cruz">Justine Cruz</option>
          <option value="Friedel Navarro">Friedel Navarro</option>
        </select>
        </div>
      <div className="row mb-3">
      <div className='col-md-6'>
        <label htmlFor="fees" style={{ fontWeight: 'bold' }}>Fees</label>
        <input
          type="text"
          value={fees}
          placeholder="Enter fees"
          className='form-control'
          onChange={(e) => setFees(e.target.value)}
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor="deliveryMode" style={{ fontWeight: 'bold' }}>Delivery Mode</label>
        <select
          value={deliveryMode}
          className='form-control'
          onChange={(e) => setDeliveryMode(e.target.value)}
        >
          <option value="">Select mode</option>
          <option value="in-class">In-class</option>
          <option value="online">Online</option>
        </select>
      </div>
      </div>
      <div className="row mb-3">
      <div className='col-md-6'>
        <label htmlFor="credits"style={{ fontWeight: 'bold' }}>Credits</label>
        <input
          type="text"
          value={credits}
          placeholder="Enter credits"
          className='form-control'
          onChange={(e) => setCredits(e.target.value)}
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor="campus" style={{ fontWeight: 'bold' }}>Campus</label>
        <select
          value={campus}
          className='form-control'
          onChange={(e) => setCampus(e.target.value)}
        >
          <option value="">Select Campus</option>
          <option value="north-campus">North Campus</option>
          <option value="south-campus">South Campus</option>
        </select>
      </div>
      </div>
      <div className='mb-6'>
        <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description</label>
        <textarea
         value={description}
          cols="30"
          rows="4"
          placeholder="Enter description"
          className='form-control'
          onChange={(e) => setDescription(e.target.value)}
        />
      
       
            <button type="submit" className='btn btn-primary w-100 mt-4' style={{ backgroundColor: 'darkblue' }}>Update Course</button>
            </div>
          </form>
          <div className="copyright d-flex justify-content-center align-items-center mt-4">
      <p>&copy; 2023 Bow Course Registration. All rights reserved.</p>
    </div>
        </div>
    </div>
  )
}

export default Update