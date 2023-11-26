const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
})
// For creating a new Table "StudentInfo" to the database and store the data
const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel