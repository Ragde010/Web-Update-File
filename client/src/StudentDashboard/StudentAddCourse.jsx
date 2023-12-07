import React, {useEffect, useState} from 'react'
import axios from 'axios';
import '../CSS/StudentCourse.css'
import { useUserAuth } from '../context/UserAuthContext';

function StudentAddCourse() {
    const [term, setTerm] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [formData, setFormData] = useState({
        Course1: '',
        Course2: '',
        Course3: '',
        Course4: '',
        Course5: '',
    });

    const [courseOptions, setCourseOptions]= useState([]);
    const { user } = useUserAuth();

    useEffect(() => {
      axios.get('http://localhost:3001/getnew-courses')
      .then((response) => {
        setCourseOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, []);


    const handleDurationChange = (event) => {
        const duration = event.target.value;
        setSelectedDuration(duration);

        // Reset form data when the duration changes
        setFormData({
        Course1: '',
        Course2: '',
        Course3: '',
        Course4: '',
        Course5: '',
        });
    };
    const handleFieldChange = (index, value) => {
        setFormData({ ...formData, [`Course${index}`]: value });
      };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log({ term, selectedDuration, formData }); // Log the data
        axios.post('http://localhost:3001/student-course-save', {term,selectedDuration,formData})
        .then((result) => {
          alert("Successfully added course!");
          console.log(result)
        })
        .catch((error) => console.log(error))
        // console.log('Submitted data:', { selectedDuration, formData });
    };
    const handleCourseClick = (courseCode, courseName, index) => {
      // Update the form data with the selected course
      setFormData({ ...formData, [`Course${index}`]: `${courseCode} - ${courseName}` });
  
      // Update the course options by removing the selected course
      const updatedCourseOptions = courseOptions.filter((option) => option.courseCode !== courseCode);
      setCourseOptions(updatedCourseOptions);
  
      // Send a request to update the database with the selected course
      axios.post('http://localhost:3001/update-course', { userId: user.id, courseCode, courseName })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    };
  


    const getMaxCourses = (duration) => {
        // Define course registration limits based on program duration
        switch (duration) {
        case '2-years':
            return 5;
        case '1-year':
            return 5;
        case '6-months':
            return 3;
        default:
            return 0; // Default to 0 if duration is not recognized
        }
    };

    const maxCourses = getMaxCourses(selectedDuration);

  return (
    <div className='d-flex justify-content-center align-items-center vh-98'>
      <div className='bg-white p-3 rounded w-100 shadow '>
    <h2>Add Course</h2>
    <form onSubmit={handleFormSubmit}>
    <div className='mb-1'>
            <label className='mb-2' htmlFor=''>
              <strong>Full Name</strong>
            </label>
            <input
              type='text'
              className='form-control rounded-1'
              value={user?.displayName || ''} // Use user information from the context
              disabled
            />
          </div>
      <div className='mb-1'>
        <label className='mb-2' htmlFor=''>
          <strong>Department</strong>
        </label>
        <select type='text' 
                name="department" 
                className="form-control rounded-1"
                onChange = {(e) =>setDepartment(e.target.value)}>
                  <option value="" >Select Department...</option>
                  <option value="School of Technology" >School of Technology</option>
                  <option value="Chiu School of Business Programs" >Chiu School of Business Programs</option>
                </select>
      </div>
    <div className='mb-1'>
            <label className='mb-2' htmlFor='term'><strong>Select Term:</strong></label>
              <select className= 'form-control rounded-1'onChange={(e) => setTerm(e.target.value)}>
                  <option value="">Select Term</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
             </select>
        </div>
      <div className='mb-1'>
        <label className='mb-2'><strong>Select Program Duration:</strong></label>
        <select className= 'form-control rounded-1 'value={selectedDuration} onChange={handleDurationChange}>
          <option value="">Select Duration</option>
          <option value="2-years">2-Year Program</option>
          <option value="1-year">1-Year Program</option>
          <option value="6-months">6-Month Program</option>
        </select>
        {selectedDuration === '2-years' && (
              <p className="text-danger mt-2"><strong>Note:</strong> Select 3 to 5 courses to be fulltime student.</p>
            )}
        {selectedDuration === '1-year' && (
              <p className="text-danger mt-2"><strong>Note:</strong> Select 3 to 5 courses to be fulltime student.</p>
            )}
        {selectedDuration === '6-months' && (
              <p className="text-danger mt-2"><strong>Note:</strong> Select 3 courses to be fulltime student.</p>
            )}

      </div>

      {maxCourses > 0 && (
        <div>
          {[...Array(maxCourses)].map((_, index) => (
            <div key={index}>
              <label>{`Course${index + 1}:`}</label>
              <select
                className='form-control rounded-1 '
                value={formData[`Course${index + 1}`]}
                onChange={(e) => handleFieldChange(index + 1, e.target.value)}
              >
                <option value="">Select Course</option>
                {courseOptions.map((option) => (
                  <option key={option._id} 
                          value={option.courseCode && option.courseName}
                          onClick={() => handleCourseClick(option.courseCode, option.courseName, index + 1)}>
                    {option.courseCode} - {option.courseName}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <button className='btn btn-primary mt-3' type="submit">Submit</button>
    </form>
  </div>
  </div>
  )
}

export default StudentAddCourse