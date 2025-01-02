const express = require('express');
require('./db/config.js');
const cors = require('cors');
const app = express();
const student = require('./db/student.js');
const admin = require('./db/admin.js');
const test = require('./db/test.js');
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

// Find students from a specific country
app.get('/studentsfrom/:country', async (req, res) => {
    const countryName = req.params.country; // Dynamic country name
    const studentsFromCountry = await student.aggregate([
        { $match: { country: countryName } }
    ]);

    if (studentsFromCountry.length > 0) {
        res.send(studentsFromCountry);
    } else {
        res.status(404).send({ message: `No students found from ${countryName}` });
    }
});
// Add a new test
app.post('/addnewtest', async (req, resp) => {
    try {
        let newTest = new test(req.body);  // Use 'test' model
        let result = await newTest.save();
        resp.send(result);
    } catch (error) {
        console.error('Error adding new test:', error);
        resp.status(500).send('Internal Server Error');
    }
});

// Get a test by subject code
app.get('/gettest/:subjectCode', async (req, res) => {
    try {
        const subjectCode = req.params.subjectCode;
        const testData = await test.findOne({ subjectCode: subjectCode });
        if (testData) {
            res.status(200).send(testData);
        } else {
            res.status(404).send({ message: 'Test not found' });
        }
    } catch (error) {
        console.error('Error retrieving test:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update a test by subject code
app.put('/updatetest/:subjectCode', async (req, res) => {
    try {
        const subjectCode = req.params.subjectCode;
        const updates = req.body;

        // Find the test by subject code and update its information
        const updatedTest = await test.findOneAndUpdate(
            { subjectCode: subjectCode },  // Filter by subject code
            { $set: updates },             // Apply updates
            { new: true }                  // Return the updated document
        );

        if (updatedTest) {
            res.status(200).send(updatedTest);
        } else {
            res.status(404).send({ message: 'Test not found' });
        }
    } catch (error) {
        console.error('Error updating test:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a test by subject code
app.delete('/deletetest/:subjectCode', async (req, res) => {
    try {
        const subjectCode = req.params.subjectCode;

        const deletedTest = await test.findOneAndDelete({ subjectCode: subjectCode });
        if (deletedTest) {
            res.status(200).send({ message: 'Test deleted successfully' });
        } else {
            res.status(404).send({ message: 'Test not found' });
        }
    } catch (error) {
        console.error('Error deleting test:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Fetch all tests
app.get('/alltests', async (req, res) => {
    try {
        // Fetch all tests from the database
        const tests = await test.find();

        // Return the tests as a JSON response
        res.status(200).send(tests);
    } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(5000);