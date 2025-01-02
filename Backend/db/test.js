const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    subjectCode: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    passingCriteria: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [
                { type: String, required: true },
                { type: String, required: true },
                { type: String, required: true },
                { type: String, required: true },
            ],
            correctAnswer: { type: String, required: true },
            marks: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model('Test', testSchema);
