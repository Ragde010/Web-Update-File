import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Adminpage.css'
import { useAdminAuth } from '../context/AdminAuthContext';

function Adminpage() {
  const [courses, setCourse] = useState([])
  const navigate = useNavigate();
  const { adminUser, logOut, adminDetails } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');

  console.log(adminUser)
  const handleLogout = async() => {
    try {
      await logOut();
      navigate('/employee-login');
    } catch (error) {
      console.log(error.message);
    }
  }

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
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => {
    const searchString = searchQuery.toLowerCase();
    return (
    course.courseName.toLowerCase().includes(searchString) ||
    course.courseCode.toLowerCase().includes(searchString) ||
    course.campus.toLowerCase().includes(searchString)
    
    );
});
  // const username = 'yourUsername';
  const logoPath = 'src/assets/images/BCR3.png';
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center  '>
      <div className='w-100 h-100 bg-light  rounded p-3 '>
      <img src={logoPath} alt="Logo" style={{ position: 'absolute', top: '10px', right: '10px', maxWidth: '200px' }}/>
        <p style={{ color: 'darkblue', fontWeight: 600, margin: 0 }}>LOGIN User:{adminDetails?.displayName}</p>
        <p style={{ color: 'darkblue', fontWeight: 600, margin: 0}}>{adminDetails?.adminID}</p>
        <button className='btn btn-primary' style={{ backgroundColor: 'darkblue' }} onClick={handleLogout}>Logout</button>
      <h1 className='mt-5 d-flex justify-content-center align-items-center'style={{ color: 'darkblue', fontWeight: 900 }}>ADMIN COURSE MANAGEMENT</h1>
      
        <Link to="/create-course" className='btn btn-primary btn-with-padding' style={{ backgroundColor: 'darkblue' }}> Add Course</Link>
        <Link to="/viewstudentList" className='btn btn-primary btn-with-padding' style={{ backgroundColor: 'darkblue' }}> Students Registered</Link>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3 border-primary shawdow-md rounded-2 form-control mt-3 "
          style={{  paddingRight: '40px'}}
        />
        <div className='table-container' style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className='table table-striped '>
            <thead>
              <tr>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>CourseCode</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>CourseName</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Start</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>End</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>DropDate</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>WithdrawalDate</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Instructor</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Campus</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Credits</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>DeliveryMode</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Fees</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Description</th>
                <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Action</th>
              </tr>
            </thead> 
            <tbody>
              {
                filteredCourses.map((course) => {
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
    </div>
  )
}

export default Adminpage