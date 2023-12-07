import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Create() {
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

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createcourse', {courseCode,courseName,courseStart,courseEnds,dropCourse,withdrawal,instructor,fees,description,deliveryMode,credits,campus,})
    .then(result => console.log(result))
        navigate('/admin-page')
    .catch(err=> console.log(err))
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center py-5'>
    <div className='w-50 h-100 bg-white mt-5 rounded p-3'>
      <form onSubmit={handleCreate}>
        <h2>Add Course</h2>
        <div className='mb-2'>
          <label htmlFor="courseCode">Course Code</label>
          <input
            type="text"
            id="courseCode"
            placeholder="Enter course code"
            className='form-control rounded-0'
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            placeholder="Enter course name"
            className='form-control rounded-0'
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseStart">Course Start</label>
          <input
            type="date"
            id="courseStart"
            placeholder="Enter course start date"
            className='form-control rounded-0'
            onChange={(e) => setCourseStart(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseEnd">Course End</label>
          <input
            type="date"
            id="courseEnd"
            placeholder="Enter course end date"
            className='form-control rounded-0'
            onChange={(e) => setCourseEnds(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseEnd">Drop Date</label>
          <input
            type="date"
            id="dropCourse"
            placeholder="Enter course end date"
            className='form-control rounded-0'
            onChange={(e) => setDropCourse(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseEnd">Withdarawal Date</label>
          <input
            type="date"
            id="withdrawal"
            placeholder="Enter course end date"
            className='form-control rounded-0'
            onChange={(e) => setWithdrawal(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseEnd">Instructor</label>
          <select
            type="text"
            id="instructor"
            placeholder="Enter course end date"
            className='form-control rounded-0'
            onChange={(e) => setInstructor(e.target.value)}
          >
          <option value="">Select Instructor</option>
            <option value="Mary Cris Alegria">Mary Cris Alegria</option>
            <option value="Lady Rose Alarcon">Lady Rose Alarcon</option>
            <option value="Jovic Barozzo">Jovic Barozzo</option>
          </select>
        </div>
        <div className='mb-2'>
          <label htmlFor="fees">Fees</label>
          <input
            type="text"
            id="fees"
            placeholder="Enter fees"
            className='form-control rounded-0'
            onChange={(e) => setFees(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="deliveryMode">Delivery Mode</label>
          <select
            id="deliveryMode"
            className='form-control rounded-0'
            onChange={(e) => setDeliveryMode(e.target.value)}
          >
            <option value="">Select mode</option>
            <option value="in-class">In-class</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div className='mb-2'>
          <label htmlFor="credits">Credits</label>
          <input
            type="text"
            id="credits"
            placeholder="Enter credits"
            className='form-control rounded-0'
            onChange={(e) => setCredits(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="campus">Campus</label>
          <select
            id="campus"
            className='form-control rounded-0'
            onChange={(e) => setCampus(e.target.value)}
          >
            <option value=""></option>
            <option value="north-campus">North Campus</option>
            <option value="south-campus">South Campus</option>
          </select>
        </div>
        <div className='mt-3'>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            cols="30"
            rows="4"
            placeholder="Enter description"
            className='form-control rounded-0'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-success w-100 mt-4'>Create Course</button>
      </form>
    </div>
  </div>
  )
}

export default Create