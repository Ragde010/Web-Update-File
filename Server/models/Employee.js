const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employeeId: String,
    name: String,
    email: String,
    password: String,
    username: String,
})

// For creating a new Table "StudentInfo" to the database and store the data
const EmployeeModel = mongoose.model("EmployeeInfo", EmployeeSchema)
module.exports = EmployeeModel

