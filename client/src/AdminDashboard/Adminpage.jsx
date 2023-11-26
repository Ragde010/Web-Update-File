import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Adminpage.css'


function Adminpage() {
  const [courses, setCourse] = useState([])

  useEffect(()=> {
    axios.get("http://localhost:3001/admin-page")
    .then(result => setCourse(result.data))
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deletecourse/'+id)
    .then(res => {console.log(res)
        window.location.reload();
  })
    .catch(err => console.log(err))

  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center '>
      <div className='w-75 bg-white rounded p-3'>
        <Link to="/create-course" className='btn btn-success btn-with-padding'> <strong>+</strong> Add Course</Link>
        <Link to="/viewstudentList" className='btn btn-warning btn-with-padding'> Student List</Link>
        <Link to= "/" className='btn btn-primary btn-with-padding'>View Student Form</Link>
          <table className='table'>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Start</th>
                <th>Course End</th>
                <th>Fees</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead> 
            <tbody>
              {
                courses.map((course) => {
                  return <tr>
                    <td className='text-bold'>{course.courseCode}</td>
                    <td>{course.courseName}</td>
                    <td>{course.courseStart}</td>
                    <td>{course.courseEnds}</td>
                    <td className='text-bold'>{course.fees}</td>
                    <td>{course.description}</td>
                    <td>
                      <Link to={`/update-course/${course._id}`} className='btn btn-primary'>Update</Link>
                      <button className= 'btn btn-danger' onClick={(e) => handleDelete(course._id)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default Adminpage