import React, {useState, useEffect} from 'react'
import { Modal, Button} from 'react-bootstrap';
import axios from 'axios';


function ExchangeCourse() {
    const [courseData, setCourseData] = useState([]);
    const [courseDataForExchange, setcourseDataForExchange] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch course data from the database
        axios.get('http://localhost:3001/getcoursedata-toexchange')
          .then(response => {
            setcourseDataForExchange(response.data);
          })
          .catch(error => {
            console.error('Error fetching course data:', error);
          });
        axios.get('http://localhost:3001/getcoursedata')
          .then(response => {
            setCourseData(response.data);
          })
          .catch(error => {
            console.error('Error fetching course data:', error);
          });
      }, []);
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
    const handleExchange = (selectedCourse) => {
        const combinedCourseData = {
            _id: selectedCourse._id,
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
      
        axios
          .post('http://localhost:3001/remove-exchange-course', { combinedCourseData })
          .then((response) => {
            // Handle success response if needed
            console.log('Course exchanged successfully:', response.data);
      
            // Update the local state to remove the exchanged course from the main list
            const updatedCourseData = courseData.filter((course) => course._id !== selectedCourse._id);
            setCourseData(updatedCourseData);
      
            // Update the list of courses for exchange to include the new course
            const updatedCourseDataForExchange = [response.data.course, ...courseDataForExchange];
            setcourseDataForExchange(updatedCourseDataForExchange);

          })
          .catch((error) => {
            // Handle errors if the request fails
            console.error('Error exchanging course:', error);
          });
      };
      
    
  return (
    <div className=" border-3 shadow-lg w-100 h-100">
    <div className='card p-4 shadow' >
      <h2 className='text-center mb-4'style={{ color: 'darkblue', fontWeight: 600 }}>Exchange Course</h2>
      <div className='row w-100 h-100'>
        {courseDataForExchange.map((course, index) => (
          <div key={index} className='mb-3'>
            <div className='card h-100 w-100 shadow-lg'style={{ borderColor: 'green', borderWidth: '5px', borderStyle: 'solid' }}>
              <div className='card-body'>
                <h3 className='card-title' style={{ color: 'darkblue', fontWeight: 700}}>{course.courseName}</h3>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Course Code:</span> {course.courseCode}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Start Date:</span> {course.courseStart}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>End Date:</span> {course.courseEnds}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Credits:</span> {course.credits}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Campus:</span> {course.campus}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Delivery Mode:</span> {course.deliveryMode}</p>
                <p className='card-text'style={{ margin: 0, marginLeft: '10px' }}><span className='text-bold'>Fees:</span> {course.fees}</p>
            </div>
          </div>
        </div>
      ))}
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
                  <button className='btn btn-success' onClick={() => handleExchange(course)}>Exchange</button>
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

    </div>
  </div>
  </div>
  )
}

export default ExchangeCourse