const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    studentId: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    username: String,
    department: String,
    program: String,
    dateOfBirth: String,
})

// For creating a new Table "StudentInfo" to the database and store the data
const StudentModel = mongoose.model("StudentInfo", StudentSchema)
module.exports = StudentModel

