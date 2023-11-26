const mongoose = require('mongoose')

const StudentCourseRegisterSchema = new mongoose.Schema({
    term: String,
    selectedDuration: String,
    formData: {
        Course1: String,
        Course2: String,
        Course3: String,
        Course4: String,
        Course5: String,
    }
})

// For creating a new Table "StudentInfo" to the database and store the data
const StudentCourseRegisterModel = mongoose.model("StudentCourseRegistered", StudentCourseRegisterSchema)
module.exports = StudentCourseRegisterModel