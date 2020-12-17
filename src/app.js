require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();

const subjectController = require('./controllers/subjectController');
const examsController = require('./controllers/examsController');

app.use(cors());
app.use(express.json());

//---------------------------- subject and professor ---------------------------//
app.get('/api/v1/subjects', subjectController.getSubjects);
app.post('/api/v1/subjects', subjectController.addSubject);
app.post('/api/v1/subjects/professor', subjectController.getProfessorFromSubject);
app.get('/api/v1/professors', subjectController.getProfessors);
app.post('/api/v1/subject/new-professor', subjectController.addProfessor)

//--------------------------------- exams ---------------------------------------//
app.post('/api/v1/exams', examsController.sendExam);
app.get('/api/v1/exams/subject:subject', examsController.getExamsBySubject);
app.get('/api/v1/exams/professor:id', examsController.getExamsByProfessor);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;