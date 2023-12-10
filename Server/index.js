const express = require ("express")
const mongoose = require("mongoose")
const cors = require("cors")
// const ObjectId = mongoose.Types.ObjectId;
const StudentModel = require('./models/Student.js')
const EmployeeModel = require('./models/Employee.js')
const CourseModel = require('./models/Course.js')
const StudentRegisterModel = require('./models/StudentRegister.js')
const StudentRegistrationModel = require('./models/Student-Register.js')
const StudentCourseRegisterModel = require('./models/StudentCourseRegister.js')
const MessageModel = require('./models/Message.js')
const CourseRegisteredModel = require('./models/CourseRegistered.js')
const ExchangeCourseModel = require("./models/ExchangeCourses.js")
const NewExchangeCourseModel = require('./models/NewExchangeCourse.js')

const app = express()
app.use(express.json()) 
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/BowStudentRegistrationDB");

app.post("/login", (req, res ) =>{
    const {username, password} = req.body;
    StudentModel.findOne({username: username})
    .then(student => {
        if(student){
                if (student.password === password) {
                    res.json("success");
                } else {
                    res.json("incorrect");
                }
            } else{
                res.json("No record existed!")
            }
    })
})

app.post("/employeelogin", (req, res ) =>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(employee => {
        if(employee){
                if (employee.password === password) {
                    res.json("success");
                } else {
                    res.json("incorrect");
                }
            } else{
                res.json("No record existed!")
            }
    })
})
app.post('/register', (req, res) => {
    StudentModel.create(req.body)
    .then(StudentInfo => res.json(StudentInfo))
    .catch(err => res.json(err))
    
    });
app.post('/add-student-course', (req, res) => {
    StudentRegisterModel.create(req.body)
    .then(StudentRegister => res.json(StudentRegister))
    .catch(err => res.json(err))
    
    });
app.post('/employee-register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(EmployeeInfo => res.json(EmployeeInfo))
    .catch(err => res.json(err))
    
    });
// a route for course registration and delete courses in the data
app.post('/register-course', async (req, res) => {
    try {
      const combinedCourseData = req.body.combinedCourseData;
      console.log('Received data:', combinedCourseData); 
      // Check if displayName and studentID are present
    console.log('DisplayName:', combinedCourseData.displayName);
    console.log('StudentID:', combinedCourseData.studentID);
      const newCourse = new CourseRegisteredModel(combinedCourseData);
      const savedCourse = await newCourse.save();

      // Remove the registered course from the list of available courses
    //   console.log('Deleting course with ID:', combinedCourseData._id);
    const updatedCourseData = await CourseModel.findByIdAndUpdate({ _id: combinedCourseData._id });
    // console.log('Course deleted:', updatedCourseData);
        
      res.json({ message: 'Course registered successfully', course: savedCourse, updatedCourseData });
    } catch (error) {
      res.status(500).json({ error: 'Error registering course', details: error.message });
    }
  });
  // endpoint for exchange  the new courses to old courses 
app.post('/remove-exchange-course', async (req, res) => {
    try {
      const combinedCourseData = req.body.combinedCourseData;
      const newCourse = new NewExchangeCourseModel(combinedCourseData);
      const savedCourse = await newCourse.save();

      // Remove the registered course from the list of available courses
      console.log('Deleting course with ID:', combinedCourseData._id);
    const removedCourse = await ExchangeCourseModel.findOneAndDelete({ _id: combinedCourseData._id  });
    console.log('Course deleted:', removedCourse);
        
      res.json({ message: 'Course registered successfully', course: savedCourse.toObject(), removedCourse });
    } catch (error) {
      res.status(500).json({ error: 'Error registering course', details: error.message });
    }
  });
// a route for course removal in the viewcourse 
app.post('/remove-course', async (req, res) => {
    try {
      const combinedCourseData = req.body.combinedCourseData;
      const newCourse = new ExchangeCourseModel(combinedCourseData);
      const savedCourse = await newCourse.save();
  
      res.json({ message: 'Course remove successfully', course: savedCourse });
    } catch (error) {
      res.status(500).json({ error: 'Error registering course', details: error.message });
    }
  });


    
// Student Registration
app.post('/student-register', (req, res) => {
    StudentRegistrationModel.create(req.body)
    .then(StudentRegistration => res.json(StudentRegistration))
    .catch(err => res.json(err))
})

// Student Course Save to the DB
app.post('/student-course-save', (req, res) => {
    StudentCourseRegisterModel.create({
        term: req.body.term,
        selectedDuration: req.body.selectedDuration,
        formData: req.body.formData,
})
    .then(StudentCourseRegistered => res.json(StudentCourseRegistered))
    .catch(error => res.json(error))
})
app.post('/createcourse', (req, res) => {
    CourseModel.create(req.body)
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
app.post('/message', (req, res) => {
    MessageModel.create(req.body)
    .then(Message => res.json(Message))
    .catch(err => res.json(err))

})

app.get('/admin-page', (req, res) => {
    CourseModel.find({})
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
// endpoint for get coursedata to view courses
app.get('/get-student-course-data', (req, res) => {
    CourseRegisteredModel.find({})
    .then(CourseRegistered => res.json(CourseRegistered))
    .catch(err => res.json(err))
})
app.get('/getnewcourse', (req, res) => {
    CourseModel.find({})
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
app.get('/getnew-courses', (req, res) => {
    CourseModel.find({})
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
app.get('/getSelectedcourse', (req, res) => {
    StudentRegisterModel.find({})
    .then(StudentRegister => res.json(StudentRegister))
    .catch(err => res.json(err))
})

app.get('/getcourse/:id', (req, res) => {
    const id = req.params.id;
    CourseModel.findById({_id:id})
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
app.get('/getstudentList', (req, res) => {
  CourseRegisteredModel.find({})
    .then(CourseRegistered => res.json(CourseRegistered))
    .catch(err => res.json(err))
})
app.get('/getsearch-course', (req, res) => {
    CourseModel.find({})
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
// endpoint for get courses to put in exchange course
app.get('/getcoursedata', (req, res) => {
    CourseModel.find({})
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
// GET the use firstname and lastname
app.get('/getuserdata/:id', (req, res) => {
    const id = req.params.id;
    StudentRegistrationModel.findById({_id:id})
    .then(StudentRegistration => res.json(StudentRegistration))
    .catch(err => res.json(err))
})

// To get new courses for student 
app.get('/get-course-data', (req, res) => {
    CourseModel.find({})
    .then(Courses =>{
        // console.log('Courses:', Courses); // Log the courses
        res.json(Courses);
    }) 
    .catch(err => res.json(err))
})
// To get exchange courses for student 
app.get('/getcoursedata-toexchange', (req, res) => {
    ExchangeCourseModel.find({})
    .then(ExchangeCourse =>{
        // console.log('Courses:', Courses); // Log the courses
        res.json(ExchangeCourse);
    }) 
    .catch(err => res.json(err))
})

// to Update the courses added by the Admin
app.put('/updatecourse/:id', (req, res) => {
    const id = req.params.id;
    CourseModel.findByIdAndUpdate({_id:id}, {
        courseCode: req.body.courseCode, 
        courseName: req.body.courseName, 
        courseStart: req.body.courseStart, 
        courseEnds: req.body.courseEnds, 
        dropCourse: req.body.drpCourse,
        withdrawal: req.body.withdrawal,
        instructor: req.body.instructor,
        deliveryMode: req.body.deliveryMode,
        credits: req.body.credits,
        campus: req.body.campus,
        fees: req.body.fees,
        description: req.body.description
    }) 
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
// To update to the exchange registred courses in the student dashboard
app.put('/update-courses-registered/:id', async(req, res) =>{
    const courseId = req.params.id;

  try {
    // Find the course by ID
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update each course field based on the request body
    for (let key in req.body) {
      course[key] = req.body[key];
    }

    // Save the updated course
    const updatedCourse = await course.save();

    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Endpoint to handle dropping courses
app.put('/drop-courses/:id', async (req, res) => {
    console.log('Drop courses route triggered'); // Add this line
    const id = req.params.id;
    const { coursesToDrop } = req.body;
  
    try {
        console.log('Dropping courses:', coursesToDrop); // Add this line
      const student = await StudentCourseRegisterModel.findById({_id : id});
      console.log('Before update:', student.formData);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      coursesToDrop.forEach((course) => {
        student.formData[`Course${course}`] = '';
      });
  
      // Save the updated student data
      await student.save();
      console.log('After update:', student.formData);
  
      res.json({
        message: 'Courses dropped successfully',
        updatedFormData: student.formData, // Send back the updated form data
      });
    } catch (error) {
      console.error('Error dropping courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
app.delete('/deletecourse/:id', (req, res) => {
    const id = req.params.id;
    CourseModel.findByIdAndDelete({ _id : id })
    .then(()=>res.json(res))
    .catch(err => res.json(err))
})
// Endpoint for deleting registered courses
app.delete('/delete-course/:id', async (req, res) => {
    const courseId = req.params.id;
  
    try {
      // Perform the deletion in your database based on the courseId
      await CourseRegisteredModel.findByIdAndDelete(courseId);
  
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting course', details: error.message });
    }
  });
  


app.listen(3001, () => {
    console.log('Server is running')
})