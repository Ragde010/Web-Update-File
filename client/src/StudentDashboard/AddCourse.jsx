import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function AddCourse() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([])
    const [studentId, setStudentId] = useState("")
    const [term, setTerm] = useState("")
    const [year, setYear] = useState("")
    const navigate = useNavigate("");
    // Store the selected course details separately
    const [viewSelectedCourse, setviewSelectedCourse] = useState([]);
    useEffect(() => {
      setStudentId('BVC' + Math.floor(Math.random() * 10000));
  }, []);

    useEffect(() => {
      axios.get('http://localhost:3001/getnewcourse')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
    }, []); 

    useEffect(() => {
      axios.get('http://localhost:3001/getSelectedcourse')
      .then((response) => {
        setviewSelectedCourse(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
    }, []); 
    useEffect (() => {
      axios.get('http://localhost:3001/getSelectedcourse')
      .then((response) => {
        const selectCourseCodes = response.data.map(course => course.courseCode);
        setSelectedCourses(selectCourseCodes);
      })
      .catch((error) => {
        console.error('Error data fetching', error);
      });
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!selectedCourses.includes(selectedCourse)) {
      axios.post("http://localhost:3001/add-student-course", {selectedCourse,studentId,term,year})
      .then(res=> {
        // Assuming the response from the server includes the selected course details
      const selectedCourseDetails = {
        studentId,
        term,
        year,
        selectedCourse,
      };
      setviewSelectedCourse(selectedCourseDetails);
      console.log(res)
        // navigate('/student-page')
      })
      .catch(err=>console.log(err))
    }
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='bg-success p-3 rounded w-75 shadow'>
        <h2>Add Course</h2>
        <form onSubmit={handleSubmit}>
        <div className='mb-1'>
            <label htmlFor='studentId'><strong>Student ID:</strong></label>
            <input type='text' name='studentId'value={studentId}readOnly className='form-control rounded-1'/> 
        </div>
        <div className='mb-1'>
            <label htmlFor=''><strong>Select Term:</strong></label>
              <select className= 'form-control rounded-1'onChange={(e) => setTerm(e.target.value)}>
                  <option value="">Select Term</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
             </select>
        </div>
        <div className='mb-1'>
            <label htmlFor=''><strong>Select Year:</strong></label>
              <select className= 'form-control rounded-1'onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select Year</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Post-Diploma">Post-diploma</option>
                  <option value="Certificate">Certificate</option>
                  
             </select>
        </div>
          <div className='mb-1'>
            <label htmlFor=''><strong>Select a course:</strong></label>
              <select className='form-control rounded-1'value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select a course</option>
                    {courses.map((course) => (
                <option key={course._id} 
                        value={course.courseCode}
                        disabled={selectedCourses.includes(course.courseCode)}
                        style={{textDecoration: selectedCourses.includes(course.courseCode) ? "line-through " : 'none'}}>
                        
                    {course.courseCode} - {course.courseName}
               </option>
               ))}
            </select> 
              <button type='submit' className='btn btn-primary mt-4 w-100'>Submit</button>
        </div>
      </form>
  
  
<div className='mb-5'></div>
    <div className='d-flex justify-content-center align-items-center'>
    <form>
    <div className='bg-secondary p-4 rounded-1 w-100 shadow'>
          <h3>Selected Course Details:</h3>
          <div>
            <label>StudentID</label>
            <input className='form-control rounded-1'type="text" value={viewSelectedCourse.studentId || ''} readOnly />
          </div>
          <div>
            <label>Term:</label>
            <input className='form-control rounded-1'type="text" value={viewSelectedCourse.term || ''} readOnly />
          </div>
          <div>
            <label>Year:</label>
            <input className='form-control rounded-1'type="text" value={viewSelectedCourse.year || ''} readOnly />
          </div>
          <div>
            <label>Courses:</label>
            <input className='form-control rounded-1'type="text" value={viewSelectedCourse.selectedCourse || ''} readOnly />
          </div>
          <button className='btn btn-primary mt-3'>Drop Exchange</button>
         </div>
        </form>  
    </div>
    </div> 
</div>

    
  )
}

export default AddCourse