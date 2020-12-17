require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();

const subjectController = require('./controllers/subjectController');
const examsController = require('./controllers/examsController');

app.use(cors());
app.use(express.json());

app.get('/api/v1/subjects', subjectController.getSubjects);
app.post('/api/v1/subjects/professor', subjectController.getProfessorFromSubject);
app.get('/api/v1/professors', subjectController.getProfessors);

app.post('/api/v1/exams', examsController.sendExam);
app.get('/api/v1/exams/subject:subject', examsController.getExamsBySubject);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;