import axios from 'axios'
import React, {useEffect, useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

function ViewStudent() {
    const [studentlist, setStudentList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/getstudentList")
        .then(result =>  setStudentList(result.data))
        .catch((error) =>{console.log(error)})
    }, [])
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 '>
        <div className='w-100 bg-secondary rounded p-3'>
        <h2>View Studentlist Registred</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>StudentID</th>
                    <th>Term</th>
                    <th>Year</th>
                    <th>Selected Course</th>
                </tr>
            </thead>
            <tbody>
                {
                    studentlist.map((student) => {
                       return <tr>
                            <td>{student.studentId}</td>
                            <td>{student.term}</td>
                            <td>{student.year}</td>
                            <td>{student.selectedCourse}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
</div>
  )
}

export default ViewStudent