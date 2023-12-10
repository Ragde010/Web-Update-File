import React, { useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiLogOut,FiLayout} from 'react-icons/fi';
import { FaUser, FaEnvelope, FaBookOpen, FaBook} from 'react-icons/fa';
import '../CSS/Dashstyle.css'
import { useUserAuth } from '../context/UserAuthContext';
import {useNavigate} from 'react-router-dom';
import UpdateCourse from './ViewCourse';
import Messages from '../StudentDashboard/Messages'
import NewAddCourse from './NewAddCourse';




function StudentDashboard() {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const {user, logOut, studentDetails} = useUserAuth();
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
    
  
  return (
    <div className="container-fluid ">
    <div className="row">
       <div className="col-3 sidebar">
            <div className="user-profile">
            <FaUser className="user-icon"/>
               <h4 className='text-white'>{studentDetails?.studentID}</h4>
               <p className='text-white'>{studentDetails?.displayName}</p>
                
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
 
return (
  <div>
     <img src="src/assets/images/FinalBackground.png" alt=""/>
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