const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    courseCode: String,
    courseName: String,
    courseStart: String,
    courseEnds: String,
    fees: String,
    description: String
})

// For creating a new Table "StudentInfo" to the database and store the data
const CourseModel = mongoose.model("Courses", CourseSchema)
module.exports = CourseModel