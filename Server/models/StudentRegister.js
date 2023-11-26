const mongoose = require('mongoose')

const StudentRegisterSchema = new mongoose.Schema({
    studentId: String,
    term: String,
    year: String,
    selectedCourse: String,
    
})

// For creating a new Table "StudentInfo" to the database and store the data
const StudentRegisterModel = mongoose.model("StudentRegister", StudentRegisterSchema)
module.exports = StudentRegisterModel