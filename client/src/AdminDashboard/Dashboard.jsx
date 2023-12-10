import React, { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiLogOut,FiLayout, FiSearch} from 'react-icons/fi';
import { FaUser, FaEnvelope, FaBookOpen, FaBook, FaList} from 'react-icons/fa';
import '../CSS/Dashstyle.css'
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
// import StudentAddCourse from '../StudentDashboard/StudentAddCourse';
import { useAdminAuth } from '../context/AdminAuthContext';
import Adminpage from './Adminpage';
import Update from './Update';
import '../CSS/Adminpage.css'


function Dashboard() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const { adminUser, logOut, adminDetails } = useAdminAuth();
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);
   
   
    console.log(adminUser)
    const handleLogout = async() => {
      try {
        await logOut();
        navigate('/employee-login');
      } catch (error) {
        console.log(error.message);
      }
    }
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredCourses = allData.filter((course) => 
      course.courseCode.toLowerCase().includes(searchTerm) ||
      course.courseName.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredCourses);
      
    }
    useEffect(() => {
         axios.get('http://localhost:3001/getsearch-course')
         .then(response => {
          console.log(response.data)
          setAllData(response.data);
          setFilteredData(response.data);

         })
         .catch(error => {
          console.log('Error getting fake data: ' + error);
    })
    }, []);
    
    
  return (
    <div className="container-fluid ">
     <div className="row">
        <div className="col-3 sidebar">
             <div className="user-profile">
             <FaUser className="user-icon"/>
                <h3 className='text-white'>{adminDetails?.displayName}</h3>
                <p className='text-bold'>{adminDetails?.adminID}</p>
               
             </div>
             <ul className="nav-menu">
                <li onClick={() => setActiveComponent('Dashboard')}><FiLayout style={{ fontSize: '24px', marginRight: '10px' }}/>Dashboard</li>
                <li onClick={() => setActiveComponent('Addcourse')}><FaBook style={{ fontSize: '24px', marginRight: '10px' }}/>Add Course</li>
                <li onClick={() => setActiveComponent('Updatecourse')}><FaBookOpen style={{ fontSize: '24px', marginRight: '10px' }}/>View course</li>
                <li onClick={() => setActiveComponent('StudentList')}><FaList style={{ fontSize: '24px', marginRight: '10px' }}/>Student List</li>
                <li onClick={() => setActiveComponent('AdminPage')}><FaEnvelope style={{ fontSize: '24px', marginRight: '10px' }}/>AdminPage</li>
                <li onClick={() => setActiveComponent('Search')}><FiSearch style={{ fontSize: '24px', marginRight: '10px' }}/>Search</li>
               
          
            </ul>
                <button onClick={handleLogout} className="logout-btn">Log out <FiLogOut/> </button>
       </div>

      <div className="col-8">
        <div className='header'>
        <div className="d-flex justify-content-between align-items-center mb-3 ">
            <h1 className='text-bold mt-5 '>ADMIN COURSE MANAGEMENT</h1>
           <img src="src/assets/images/BCR3.png" alt="" style={{ position: 'absolute', top: '10px', right: '10px', maxWidth: '200px' }} />
        </div>
        </div>
      
        {activeComponent === 'Dashboard' && <DashboardComponent />}
        {activeComponent === 'Addcourse' && <AddcourseComponent />}
        {activeComponent === 'Updatecourse' && <UpdatecourseComponent />}
        {activeComponent === 'StudentList' && <StudentListComponent />}
        {activeComponent === 'AdminPage' && <AdminPageComponent />}
        {activeComponent === 'Search' && <SearchComponent handleSearch={handleSearch} filteredData={filteredData}/>}
      </div>
    </div>
      <div className="copyright d-flex justify-content-center align-items-center">
      <p>&copy; 2023 Bow Course Registration. All rights reserved.</p>
      </div>
  </div>
  
);
}

function DashboardComponent() {
  const containerStyle = {
    position: 'relative',
    textAlign: 'center',
    color: 'blue', // Text color
  };


  const textOverlayStyle = {
    position: 'absolute',
    top: '50%', // Adjust as needed
    left: '50%', // Adjust as needed
    transform: 'translate(-50%, -50%)',
  };
  
return (
  <div style={containerStyle}>
      <img src="src/assets/images/FinalBackground.png" alt=""/>
      <div style={textOverlayStyle}>
        {/* Your Dashboard content */}
        <h1>Welcome to the Course Management Dashboard.</h1>
        <h2>Easily manage courses, connect with instructors, and stay organized with your academic journey.</h2>
      </div>
    </div>
);
}

function AddcourseComponent() {
return (
  <Adminpage/>
  // <StudentAddCourse />
);
}
function UpdatecourseComponent() {
return (
  <Update />
);
}
function StudentListComponent(){
  return (
    <div>Student List</div>
  )

}
function AdminPageComponent(){
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
    <div className='d-flex vh-100  justify-content-center align-items-center '>
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

function SearchComponent({ handleSearch, filteredData }){
  return(
    <div>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search courses..'
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <div style={{ padding: 10}}>
        {filteredData.map((value) => {
          return (
            <div key={value._id} style={{ marginBottom: 10, border: '1px solid #ddd', padding: 10, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',}}>
              {value.courseCode} - {value.courseName} - {value.fees}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Dashboard