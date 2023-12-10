import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

// import 'bootstrap/dist/css/bootstrap.min.css'

function ViewStudent() {
    const [studentlist, setStudentList] = useState([])
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        axios.get("http://localhost:3001/getstudentList")
        .then(result =>  setStudentList(result.data))
        .catch((error) =>{console.log(error)})
    }, [])
    // Filter courses based on search query
  const filteredStudents = studentlist.filter(student => {
    const searchString = searchQuery.toLowerCase();
    return (
        student.displayName.toLowerCase().includes(searchString) ||
        student.studentID.toLowerCase().includes(searchString) 
    );
});
    const logoPath = 'src/assets/images/BCR3.png';
  return (
    <div className='d-flex justify-content-center align-items-center vh-50 '>
        <div className='w-100 bg-light rounded p-3'>
        <img src={logoPath} alt="Logo" style={{ position: 'absolute', top: '10px', right: '10px', maxWidth: '200px' }}/>
        <Link to="/admin-page" className='btn btn-primary btn-with-padding' style={{ backgroundColor: 'darkblue' }}>Back</Link>
        <h1 className='mt-5 mb-3 d-flex justify-content-center align-items-center'style={{ color: 'darkblue', fontWeight: 900 }}>STUDENT REGISTERED</h1>
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3 border-primary shawdow-md rounded-2 form-control mt-3 "
          style={{  paddingRight: '40px'}}
        />

        <div className='table-container' style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>StudentID</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Name</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>CourseCode</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>CourseName</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>CourseStart</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>CourseEnds</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Credits</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>DeliveryMode</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Campus</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>DropDate</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>WithdrawalDate</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Instructor</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Tuition</th>
                    <th className='sticky-top' style={{ top: '0', backgroundColor: 'white', zIndex: '1' }}>Term</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    filteredStudents.map((student) => {
                       return <tr>
                            <td className='text-bold'>{student.studentID}</td>
                            <td>{student.displayName}</td>
                            <td>{student.courseCode}</td>
                            <td>{student.courseName}</td>
                            <td>{student.courseStart}</td>
                            <td>{student.courseEnds}</td>
                            <td>{student.credits}</td>
                            <td>{student.deliveryMode}</td>
                            <td>{student.campus}</td>
                            <td>{student.dropCourse}</td>
                            <td>{student.withdrawal}</td>
                            <td>{student.instructor}</td>
                            <td>{student.fees}</td>
                            <td>{student.term}</td>
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

export default ViewStudent