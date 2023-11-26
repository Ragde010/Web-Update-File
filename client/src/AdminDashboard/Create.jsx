import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [courseCode, setCourseCode] = useState("")
  const [courseName, setCourseName] = useState("")
  const [courseStart, setCourseStart] = useState("")
  const [courseEnds, setCourseEnds] = useState("")
  const [fees, setFees] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createcourse', {courseCode,courseName,courseStart,courseEnds,fees,description})
    .then(result => console.log(result))
        navigate('/admin-page')
    .catch(err=> console.log(err))
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center py-5'>
        <div className='w-50 h-75 bg-white mt-5 rounded p-3 '>
          <form onSubmit={handleCreate}>
            <h2>Add Course</h2>
            <div className='mb-2'>
              <label htmlFor="">Course Code</label>
              <input type="text" placeholder="Enter course code" className='form-control rounded-0'
              onChange={(e) => setCourseCode(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Course Name</label>
              <input type="text" placeholder="Enter coursename" className='form-control rounded-0'
               onChange={(e) => setCourseName(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Course Start</label>
              <input type="date" placeholder="Enter course c" className='form-control rounded-0'
              onChange={(e) => setCourseStart(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Course End</label>
              <input type="date" placeholder="Enter course code" className='form-control rounded-0'
              onChange={(e) => setCourseEnds(e.target.value)}/>
            </div>
            <div className=' mb-2'>
              <label htmlFor="">Fees</label>
              
              <input type="text" placeholder="Enter fees" className='form-control rounded-0 '  
              onChange={(e) => setFees(e.target.value)}/>
              <div className='mt-3'>
              <label htmlFor="">Description</label>
              <textarea name="" id="" cols="30" rows="4" placeholder="Enter description" className='form-control rounded-0' onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <button type="submit" className='btn btn-success w-100 mt-4'>Create Course</button>

          </form>
        </div>
    </div>
  )
}

export default Create