const express = require('express');
require('./db/config.js');
const cors = require('cors');
const app = express();
const student = require('./db/student.js');
const admin = require('./db/admin.js');
app.use(express.json());
app.use(cors());
//add a new student
app.post('/addnewstudent', async (req, resp) => {
    try {
        let newstudent = new student(req.body);
        let result = await newstudent.save();
        resp.send(result);
    } catch (error) {
        console.error('Error adding new student:', error);
        resp.status(500).send('Internal Server Error');
    }
});
//  get a student by rollno
app.get('/getstudent/:rollno', async (req, res) => {
    try {
        const rollno = req.params.rollno;
        const studentData = await student.findOne({ rollno: rollno });
        if (studentData) {
            res.status(200).send(studentData);
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).send('Internal Server Error');
    }
});

//  update a student by rollno
app.put('/updatestudent/:rollno', async (req, res) => {
    try {
        const rollno = req.params.rollno;
        const updates = req.body;

        // Find the student by roll number and update their information
        const updatedStudent = await student.findOneAndUpdate(
            { rollno: rollno }, // Filter by roll number
            { $set: updates },   // Apply updates
            { new: true }        // Return the updated document
        );

        if (updatedStudent) {
            res.status(200).send(updatedStudent);
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/deletestudent/:rollno', async (req, res) => {
    try {
        const rollno = req.params.rollno;

        const deletedStudent = await student.findOneAndDelete({  rollno: rollno  });
        if (deletedStudent) {
            res.status(200).send({ message: 'Student deleted successfully' });
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Internal Server Error');
    }
});

//add a new student
app.post('/addnewstudent', async (req, resp) => {
    try {
        let newstudent = new student(req.body);
        let result = await newstudent.save();
        resp.send(result);
    } catch (error) {
        console.error('Error adding new student:', error);
        resp.status(500).send('Internal Server Error');
    }
});
//addnewadmin
// Add a new admin
app.post('/addnewadmin', async (req, resp) => {
    try {
        // Assuming you have an 'admin' model similar to your 'student' model
        let newAdmin = new admin(req.body);  // Use 'admin' model instead of 'student'
        let result = await newAdmin.save();
        resp.send(result);
    } catch (error) {
        console.error('Error adding new admin:', error);
        resp.status(500).send('Internal Server Error');
    }
});


app.listen(5000);