const mongoose = require('mongoose');   

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    rollno: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    password: { type: String, required: true }
  });
  
module.exports = mongoose.model('student', studentSchema);    