import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function ViewCourse() {
    const [courseData, setCourseData] = useState([]);
    const [showDropModal, setShowDropModal] = useState(false); 
    const [showModal, setShowModal] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [selectedCoursesToDrop, setSelectedCoursesToDrop] = useState([]);
    const [selectedExchangeCourse, setSelectedExchangeCourse] = useState('');
    const [selectedCoursesToExchange] = useState([]);
    
    
    useEffect(() => {
        axios.get('http://localhost:3001/get-student-course-data')
        .then(response => {
            setCourseData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    const handleDropdownChangeExchange = (event) => {
        setSelectedExchangeCourse(event.target.value);
      };

    const handleDeleteCourse = (index) => {
        const updatedCourseData = [...courseData];
        const selectedCourses = Object.values(updatedCourseData[index].formData).filter(Boolean);
        setSelectedCoursesToDrop(selectedCourses);
        setShowDropModal(true);
        setSelectedRowIndex(index);
    };
    const handleCheckboxChange = (course) => {
        const updatedSelectedCourses = selectedCoursesToDrop.includes(course)
            ? selectedCoursesToDrop.filter((c) => c !== course)
            : [...selectedCoursesToDrop, course];
        setSelectedCoursesToDrop(updatedSelectedCourses);
    };
    

    const handleOpenExchangeModal = (index) => {
        setShowDropModal(true); 
        setShowModal(true);
        setSelectedRowIndex(index);
    };

    const handleCloseModal = () => {
        setShowDropModal(false); 
        setShowModal(false);
        setSelectedRowIndex(null);
        setSelectedCoursesToDrop([]);
    };

    const handleExchangeCourse = () => {
        const updatedCourseData = [...courseData];
        updatedCourseData[selectedRowIndex].formData.Course1 = ''; // Update with your exchange logic
        setCourseData(updatedCourseData);
        handleCloseModal();
    };

    const handleDropCourses = () => {
        // Implement logic to drop selectedCoursesToDrop
        // You can make an API request to update the server data
        console.log('Dropping courses:', selectedCoursesToDrop);
    
        // After successfully dropping courses, update the local state
        const updatedCourseData = [...courseData];
        updatedCourseData[selectedRowIndex].formData.Course1 = ''; // Update with your logic
        setCourseData(updatedCourseData);
    
        handleCloseModal();
      };

  return (
    <div className='container mt-5'>
            <div className='card p-4 shadow'>
                <h2 className='text-center mb-4'>Registered Courses</h2>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Term</th>
                                <th>Program Duration</th>
                                <th>Course 1</th>
                                <th>Course 2</th>
                                <th>Course 3</th>
                                <th>Course 4</th>
                                <th>Course 5</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.term}</td>
                                    <td>{course.selectedDuration}</td>
                                    <td>{course.formData.Course1}</td>
                                    <td>{course.formData.Course2}</td>
                                    <td>{course.formData.Course3}</td>
                                    <td>{course.formData.Course4}</td>
                                    <td>{course.formData.Course5}</td>
                                    <td>
                                    <button
                                            className='btn btn-danger mr-2'
                                            onClick={() => handleDeleteCourse(index, 1)}
                                        >
                                            Drop
                                        </button>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleOpenExchangeModal(index)}
                                        >
                                            Exchange
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Drop Courses Modal */}
      <Modal show={showDropModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Drop Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form elements for selecting the courses to drop */}
            {selectedCoursesToDrop.map((course, i) => (
              <Form.Check
                key={i}
                type="checkbox"
                label={course}
                checked={selectedCoursesToDrop.includes(course)}
                onChange={() => handleCheckboxChange(course)}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDropCourses}>
            Drop Courses
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Exchange Course</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      {/* Add dropdown for selecting the course to exchange */}
      <Form.Group controlId="exchangeCourseSelect">
        <Form.Label>Select Course to Exchange:</Form.Label>
        <Form.Control
          as="select"
          value={selectedExchangeCourse}
          onChange={handleDropdownChangeExchange}
        >
          <option value="">Select Course</option>
          {selectedCoursesToExchange.map((course, i) => (
            <option key={i} value={course}>
              {course}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleExchangeCourse}>
      Exchange
    </Button>
  </Modal.Footer>
</Modal>

            {/* --------------Exchange Modal -------------------------*/}
            {/* <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Exchange Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    Are you sure you want to exchange Course?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleExchangeCourse}>
                        Exchange
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
  )
}

export default ViewCourse