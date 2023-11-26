const express = require ("express")
const mongoose = require("mongoose")
const cors = require("cors")
const StudentModel = require('./models/Student.js')
const EmployeeModel = require('./models/Employee.js')
const CourseModel = require('./models/Course.js')
const StudentRegisterModel = require('./models/StudentRegister.js')
const StudentRegistrationModel = require('./models/Student-Register.js')
const StudentCourseRegisterModel = require('./models/StudentCourseRegister.js')
const MessageModel = require('./models/Message.js')

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
    const {username, password} = req.body;
    EmployeeModel.findOne({username: username})
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
app.get('/get-student-course-data', (req, res) => {
    StudentCourseRegisterModel.find({})
    .then(StudentCourseRegistered => res.json(StudentCourseRegistered))
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
    StudentRegisterModel.find({})
    .then(StudentRegister => res.json(StudentRegister))
    .catch(err => res.json(err))
})
app.get('/getsearch-course', (req, res) => {
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

app.put('/updatecourse/:id', (req, res) => {
    const id = req.params.id;
    CourseModel.findByIdAndUpdate({_id:id}, {
        courseCode: req.body.courseCode, 
        courseName: req.body.courseName, 
        courseStart: req.body.courseStart, 
        courseEnds: req.body.courseEnds,
        fees: req.body.fees,
        description: req.body.description
    }) 
    .then(Courses => res.json(Courses))
    .catch(err => res.json(err))
})
app.delete('/deletecourse/:id', (req, res) => {
    const id = req.params.id;
    CourseModel.findByIdAndDelete({ _id : id })
    .then(()=>res.json(res))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log('Server is running')
})