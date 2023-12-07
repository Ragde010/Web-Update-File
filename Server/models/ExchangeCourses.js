const mongoose = require('mongoose')

const ExchangeCourseSchema = new mongoose.Schema({
    courseCode: String,
    courseName: String, 
    courseStart: String,
    courseEnds: String,
    credits: String,
    deliveryMode: String,
    campus: String,
    description: String,
    dropCourse: String,
    withdrawal: String,
    instructor: String,
    fees: String,
    
})

// For creating a new Table "StudentInfo" to the database and store the data
const ExchangeCourseModel = mongoose.model("ExchangeCourse", ExchangeCourseSchema)
module.exports = ExchangeCourseModel