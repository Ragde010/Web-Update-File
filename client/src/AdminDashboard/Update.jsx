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
  const navigate = useNavigate();

  useEffect(()=> {
    axios.get("http://localhost:3001/getcourse/"+id)
    .then(result => {console.log(result)
      setCourseCode(result.data.courseCode)
      setCourseName(result.data.courseName)
      setCourseStart(result.data.courseStart)
      setCourseEnds(result.data.courseEnds)
      setFees(result.data.fees)
      setDescription(result.data.description)
    })
    .catch(err => console.log(err))
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updatecourse/'+id, {courseCode,courseName,courseStart,courseEnds,fees,description})
    .then(result => console.log(result))
        navigate('/admin-page')
    .catch(err=> console.log(err))

  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center py-5'>
        <div className='w-50 h-75 bg-white mt-5 rounded p-3 '>
          <form onSubmit={handleUpdate}>
            <h2>Update Course</h2>
            <div className='mb-2'>
              <label htmlFor="">Course Code</label>
              <input type="text" placeholder="Enter course code" className='form-control rounded-0'
              value={courseCode} onChange={(e) => setCourseCode(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Course Name</label>
              <input type="text" placeholder="Enter course name" className='form-control rounded-0'
              value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Course Starting</label>
              <input type="date" placeholder="Enter course start" className='form-control rounded-0'
              value={courseStart} onChange={(e) => setCourseStart(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Course Ends</label>
              <input type="date" placeholder="Enter course ends" className='form-control rounded-0'
              value={courseEnds} onChange={(e) => setCourseEnds(e.target.value)}/>
            </div>
            <div className=' mb-2'>
              <label htmlFor="">Fees</label>
              <input type="text" placeholder="Enter fees" className='form-control rounded-0 '  
              value={fees}onChange={(e) => setFees(e.target.value)}/>
              <div className='mt-3'>
              <label htmlFor="">Description</label>
              <textarea name="" id="" cols="30" rows="4" placeholder="Enter description" className='form-control rounded-0' value={description}onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <button type="submit" className='btn btn-success w-100 mt-4'>Update Course</button>

          </form>
        </div>
    </div>
  )
}

export default Update