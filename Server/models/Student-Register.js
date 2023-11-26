const mongoose = require('mongoose');

const StudentRegisterSchema = new mongoose.Schema ({
    studentId: String,
    firstname:String,
    lastname:String,
    email:String,
    username:String,
    password:String,
    dateOfBirth:String,
    department:String,
    program:String,
    confirmPassword:String,

})

// For creating a new Table "StudentInfo" to the database and store the data
const StudentRegistrationModel = mongoose.model("StudentRegistration", StudentRegisterSchema)
module.exports = StudentRegistrationModel