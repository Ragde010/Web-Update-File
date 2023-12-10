import React, {useEffect, useState} from 'react'
import { Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';


function NewAddCourse() {
    const [courseData, setCourseData] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const { studentDetails} = useUserAuth();
    const [term, setTerm] = useState("");

  
   
    useEffect(() => {
        // Fetch course data from the database
        axios.get('http://localhost:3001/get-course-data')
          .then(response => {
            setCourseData(response.data);
          })
          .catch(error => {
            console.error('Error fetching course data:', error);
          });
      }, []);

      const handleRegistration = (selectedCourse) => {
        const combinedCourseData = {
            _id: selectedCourse._id,  // this line to include the _id
            courseCode: selectedCourse.courseCode,
            courseName: selectedCourse.courseName,
            courseStart: selectedCourse.courseStart,
            courseEnds: selectedCourse.courseEnds,
            credits: selectedCourse.credits,
            deliveryMode: selectedCourse.deliveryMode,
            campus: selectedCourse.campus,
            description: selectedCourseDetails.description,
            dropCourse: selectedCourseDetails.dropCourse,
            withdrawal: selectedCourseDetails.withdrawal,
            instructor: selectedCourseDetails.instructor,
            fees: selectedCourse.fees,  
            term: term,
            displayName: studentDetails.studentID, // Use studentDetails.displayName
           studentID: studentDetails.displayName, // Use studentDetails.studentID
 
            
          };
        //   console.log('Deleting course with ID:', combinedCourseData._id)
        axios.post('http://localhost:3001/register-course', { combinedCourseData })
          .then(response => {
            // Handle success response if needed
            console.log('Course registered successfully:', response.data);
                // Update the local state to remove the registered course
            const updatedCourseData = courseData.filter(course => course._id !== selectedCourse._id);
            setCourseData(updatedCourseData);
          })
          .catch(error => {
            // Handle errors if the request fails
            console.error('Error registering course:', error);
          });
      };

      const handleOpenDetailsModal = (course) => {
        setSelectedCourseDetails(course);
        setShowDetailsModal(true);
      };
    
      const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
      };
      // Filter courses based on search query
    const filteredCourses = courseData.filter(course => {
        const searchString = searchQuery.toLowerCase();
        return (
        course.courseName.toLowerCase().includes(searchString) ||
        course.courseCode.toLowerCase().includes(searchString) ||
        course.campus.toLowerCase().includes(searchString)
        
        );
    });

      
  return (
    <div className=" border-3 shadow-lg"style={{ maxWidth: '100%', maxHeight: '600px', overflowY: 'auto' }}>
    <div className='card p-4 shadow position-relative'>
      <h2 className='text-center mb-4'style={{ color: 'darkblue', fontWeight: 600 }}>Available Courses</h2>
      <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3 border-1 shawdow-md rounded "
          style={{ padding: '5px' }}
        />
        <div className='row mb-2'>
          <div className='col md-3'>
            <label htmlFor="" className='text-bold'>Name:
              <input type="text" 
                     value={studentDetails?.studentID}
                     className='form-control rounded-1 border-1 shadow-lg '
                     disabled/>
            </label>
            <label htmlFor="" className='text-bold'>StudentID:
              <input type="text" 
                     value={studentDetails?.displayName}
                     className='form-control rounded-1 border-1 shadow-lg'
                     disabled/>
            </label>
            <label htmlFor="term" className='text-bold'>Term
             <select type= "text" name="term" className='form-control rounded-1  border-2  shadow-lg mb-2'onChange={(e) => setTerm(e.target.value)}> 
              <option value="">Select Term</option>
              <option value="Term1 (September1–December20)">Term1 (September1–December20)</option>
              <option value="Term2 (Jan5–May2)">Term2 (Jan5–May2)</option>
              <option value="Term3 (Sept1-December20)">Term3 (Sept1-December20)</option>
              <option value="Term4 (Jan5–May2)">Term4 (Jan5–May2)</option>
             </select>
            </label>
          </div>
        </div>
      <div className='row w-100'>
        {filteredCourses.map((course, index) => (
          <div key={index} className='mb-3'>
            <div className='card h-100 w-100 position-relative shadow-lg'style={{ paddingLeft: '20px' }}>
              <div className='card-body'>
                <button className='btn btn-primary position-absolute top-0 end-0 border-dark ' style={{ backgroundColor: 'darkblue' }}  onClick={() => handleOpenDetailsModal(course)}>Course Details</button>
                <h3 className='card-title' style={{ color: 'darkblue', fontWeight: 700}}>{course.courseName}</h3>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Course Code:</span> {course.courseCode}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Start Date:</span> {course.courseStart}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>End Date:</span> {course.courseEnds}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Credits:</span> {course.credits}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Campus:</span> {course.campus}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Delivery Mode:</span> {course.deliveryMode}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Fees:</span> {course.fees}</p>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-primary border-dark ' style={{ backgroundColor: 'darkblue' }}  onClick={() => handleRegistration(course)}>Register</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

        {/* Course Details Modal */}
        <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
            <Modal.Title style={{ color: 'darkblue', fontWeight: 650  }}>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4 style={{ color: 'darkblue', fontWeight: 700 }}>{selectedCourseDetails.courseName}</h4>
            <p style={{fontFamily: 'Roboto Mono'}}>{selectedCourseDetails.description}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Start Date:</span> {selectedCourseDetails.courseStart}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>End Date:</span> {selectedCourseDetails.courseEnds}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Drop Date:</span> {selectedCourseDetails.dropCourse}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Withdrawal Date:</span> {selectedCourseDetails.withdrawal}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Credits:</span> {selectedCourseDetails.credits}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Campus:</span> {selectedCourseDetails.campus}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Delivery Mode:</span> {selectedCourseDetails.deliveryMode}</p>
            <p style={{ margin: 0, marginLeft: '5px' }}><span className='text-bold'>Instructor:</span> {selectedCourseDetails.instructor}</p>
            {/* Add more details as needed */}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
        </div>

  )
}

export default NewAddCourse