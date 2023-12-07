import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'


function Update() {
  const {id} = useParams()
  const [courseCode, setCourseCode] = useState("")
  const [courseName, setCourseName] = useState("")
  const [courseStart, setCourseStart] = useState("")
  const [courseEnds, setCourseEnds] = useState("")
  const [fees, setFees] = useState("")
  const [description, setDescription] = useState("")
  const [deliveryMode, setDeliveryMode] = useState("");
  const [credits, setCredits] = useState("");
  const [campus, setCampus] = useState("");
  const navigate = useNavigate();

  useEffect(()=> {
    axios.get("http://localhost:3001/getcourse/"+id)
    .then(result => {console.log(result)
      setCourseCode(result.data.courseCode)
      setCourseName(result.data.courseName)
      setCourseStart(result.data.courseStart)
      setCourseEnds(result.data.courseEnds)
      setDeliveryMode(result.data.deliveryMode)
      setCredits(result.data.credits)
      setCampus(result.data.campus)
      setFees(result.data.fees)
      setDescription(result.data.description)
    })
    .catch(err => console.log(err))
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updatecourse/'+id, {courseCode,courseName,courseStart,courseEnds,fees,description, deliveryMode,credits,campus})
    .then(result => console.log(result))
        navigate('/admin-page')
    .catch(err=> console.log(err))

  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center py-5'>
        <div className='h-100 w-50 bg-white mt-5 rounded p-3 '>
          <form onSubmit={handleUpdate}>
            <h2>Update Course</h2>
            <div className='mb-2'>
          <label htmlFor="courseCode">Course Code</label>
          <input
            type="text"
            value={courseCode}
            placeholder="Enter course code"
            className='form-control rounded-0'
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            value={courseName}
            placeholder="Enter course name"
            className='form-control rounded-0'
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseStart">Course Start</label>
          <input
            type="date"
            value={courseStart}
            placeholder="Enter course start date"
            className='form-control rounded-0'
            onChange={(e) => setCourseStart(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="courseEnd">Course End</label>
          <input
            type="date"
            value={courseEnds}
            placeholder="Enter course end date"
            className='form-control rounded-0'
            onChange={(e) => setCourseEnds(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="fees">Fees</label>
          <input
            type="text"
            value={fees}
            placeholder="Enter fees"
            className='form-control rounded-0'
            onChange={(e) => setFees(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="deliveryMode">Delivery Mode</label>
          <select
            value={deliveryMode}
            className='form-control rounded-0'
            onChange={(e) => setDeliveryMode(e.target.value)}
          >
            <option value="">Select mode</option>
            <option value="in-class">In-class</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div className='mb-2'>
          <label htmlFor="credits">Credits</label>
          <input
            type="text"
            value={credits}
            placeholder="Enter credits"
            className='form-control rounded-0'
            onChange={(e) => setCredits(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="campus">Campus</label>
          <select
            value={campus}
            className='form-control rounded-0'
            onChange={(e) => setCampus(e.target.value)}
          >
            <option value="">Select Campus</option>
            <option value="north-campus">North Campus</option>
            <option value="south-campus">South Campus</option>
          </select>
        </div>
        <div className='mt-3'>
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            cols="30"
            rows="4"
            placeholder="Enter description"
            className='form-control rounded-0'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
            <button type="submit" className='btn btn-success w-100 mt-4'>Update Course</button>

          </form>
        </div>
    </div>
  )
}

export default Update