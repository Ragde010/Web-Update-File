import React, { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiLogOut,FiLayout} from 'react-icons/fi';
import { FaUser, FaEnvelope, FaBookOpen, FaBook} from 'react-icons/fa';
import '../CSS/Dashstyle.css'

import { useUserAuth } from '../context/UserAuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import UpdateCourse from './ViewCourse';
import Messages from '../StudentDashboard/Messages'
import NewAddCourse from './NewAddCourse';




function StudentDashboard() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const {user, logOut} = useUserAuth();
    const navigate = useNavigate();

   
   
    console.log(user)
    const handleLogout = async() => {
      try {
        await logOut();
        navigate('/newlogin');
      } catch (error) {
        console.log(error.message);
      }
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
               <p className='text-bold'>{user && user.displayName}</p>
                <p>STUDENT</p>
            </div>
            <ul className="nav-menu">
               <li onClick={() => setActiveComponent('Dashboard')}><FiLayout style={{ fontSize: '24px', marginRight: '10px' }}/>Dashboard</li>
               <li onClick={() => setActiveComponent('newAddcourse')}><FaBook style={{ fontSize: '24px', marginRight: '10px' }}/>Add Course</li>
               <li onClick={() => setActiveComponent('Viewcourse')}><FaBookOpen style={{ fontSize: '24px', marginRight: '10px' }}/>View course</li>
               <li onClick={() => setActiveComponent('Email')}><FaEnvelope style={{ fontSize: '24px', marginRight: '10px' }}/>Email</li>
               <li onClick={() => setActiveComponent('AccountStatement')}><FaBookOpen style={{ fontSize: '24px', marginRight: '10px' }}/>Account Statement</li>
               
              
         
           </ul>
               <button onClick={handleLogout} className="logout-btn">Log out <FiLogOut/> </button>
      </div>

     <div className="col-8 main-content">
       <div className='header'>
       <div className="d-flex justify-content-between align-items-center mb-3 ">
           <h1 className='mt-5'style={{ color: 'darkblue', fontWeight: 900 }}>STUDENT COURSE MANAGEMENT</h1>
          <img src="src/assets/images/BCR3.png" alt="" style={{ position: 'absolute', top: '10px', right: '10px', maxWidth: '200px' }} />
       </div>
       </div>
     
       {activeComponent === 'Dashboard' && <DashboardComponent />}
       {activeComponent === 'newAddcourse' && <NewAddCourse />}
       {activeComponent === 'Viewcourse' && <ViewcourseComponent />}
       {activeComponent === 'Email' && <Messages />}
       {activeComponent === 'AccountStatement' && <AccountStatement />}
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
   color: 'blue',
 };
 const textOverlayStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%', 
   transform: 'translate(-50%, -50%)',
 };
 
return (
 <div style={containerStyle}>
     <img src="src/assets/images/FinalBackground.png" alt=""/>
     <div style={textOverlayStyle}>
       {/* Your Dashboard content */}
       <h1>Welcome to the Course Management Dashboard.</h1>
       <h2>Easily manage your courses, connect with instructors, and stay organized with your academic journey.</h2>
     </div>
   </div>
);
}


function ViewcourseComponent() {
return (
<UpdateCourse/>
);
}
function AccountStatement() {
return (
 <div>Account Statement</div>
);
}




export default StudentDashboard