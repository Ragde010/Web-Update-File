import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function ViewCourse() {
  const [courseData, setCourseData] = useState([]);
  const [courseDataForExchange, setcourseDataForExchange] = useState([])
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
  const navigate = useNavigate();
  
    
    useEffect(() => {
    // Fetch student course data
    axios.get('http://localhost:3001/get-student-course-data')
      .then(response => {
        setCourseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);
    const handleOpenDetailsModal = (course) => {
      setSelectedCourseDetails(course);
      setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
      setShowDetailsModal(false);
    };

    const handleDrop = (selectedCourse) => {
      // Perform API call to delete the course on the server side
      axios.delete(`http://localhost:3001/delete-course/${selectedCourse._id}`)
        .then(response => {
          // After successful deletion on the server, update the local state to remove the course from the UI
          const updatedCourseData = courseData.filter(course => course._id !== selectedCourse._id);
          setCourseData(updatedCourseData);
        })
        .catch(error => {
          // Handle errors if the request fails
          console.error('Error deleting course:', error);
        });
    };
    const handleExchange = (selectedCourse) => {
      const combinedCourseData = {
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
      };
    
    axios.post('http://localhost:3001/remove-course', { combinedCourseData })
      .then(response => {
        // Handle success response if needed
        console.log('Course registered successfully:', response.data);
            // Update the local state to remove the registered course
            const updatedCourseData = courseData.map((course) =>
            course._id === selectedCourse._id ? response.data.course : course
          );
          setCourseData(updatedCourseData);
          const updatedCourseDataForExchange = [response.data.updatedCourseData, ...courseDataForExchange];
          setcourseDataForExchange(updatedCourseDataForExchange);
          navigate('/exchangecourse')

        // Close the details modal
        handleCloseDetailsModal();
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error('Error registering course:', error);
      });
  };
    

  

  return (
    <div className=" border-3 shadow-lg"style={{ maxWidth: '100%', maxHeight: '600px', overflowY: 'auto' }}>
    <div className='card p-4 shadow position-relative'>
      <h2 className='text-center mb-4'style={{ color: 'darkblue', fontWeight: 600 }}>Registered Courses</h2>
      <div className='row w-100'>
        {courseData.map((course, index) => (
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
                  <button className='btn btn-primary border-dark ' style={{ backgroundColor: 'darkblue' }} onClick={() => handleDrop(course)}>Drop</button>
                  <button className='btn btn-primary border-dark ' style={{ backgroundColor: 'darkblue' }} onClick={() => handleExchange(course)}>Exchange</button>
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

export default ViewCourse