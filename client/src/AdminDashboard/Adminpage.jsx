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
      <div className='w-100 h-100 bg-white rounded p-3'>
        <Link to="/create-course" className='btn btn-primary btn-with-padding' style={{ backgroundColor: 'darkblue' }}> <strong>+</strong> Add Course</Link>
        <Link to="/viewstudentList" className='btn btn-primary btn-with-padding' style={{ backgroundColor: 'darkblue' }}> Student List</Link>
          <table className='table'>
            <thead>
              <tr>
                <th>CourseCode</th>
                <th>CourseName</th>
                <th>Start</th>
                <th>End</th>
                <th>DropDate</th>
                <th>WithdrawalDate</th>
                <th>Instructor</th>
                <th>Campus</th>
                <th>Credits</th>
                <th>DeliveryMode</th>
                <th>Fees</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead> 
            <tbody>
              {
                courses.map((course) => {
                  return <tr key= {course._id}>
                    <td className='text-bold'>{course.courseCode}</td>
                    <td>{course.courseName}</td>
                    <td>{course.courseStart}</td>
                    <td>{course.courseEnds}</td>
                    <td>{course.dropCourse}</td>
                    <td>{course.withdrawal}</td>
                    <td>{course.instructor}</td>
                    <td>{course.campus}</td>
                    <td>{course.credits}</td>
                    <td>{course.deliveryMode}</td>
                    <td className='text-bold'>{course.fees}</td>
                    <td>{course.description}</td>
                    <td>
                      <Link to={`/update-course/${course._id}`} className='btn btn-primary'style={{ backgroundColor: 'darkblue' }}>Update</Link>
                      <button className= 'btn btn-primary' style={{ backgroundColor: 'darkblue' }}onClick={(e) => handleDelete(course._id)}>Delete</button>
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