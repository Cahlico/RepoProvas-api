const connection = require('../database');

function insertExam(examParams) {
    const data = [
        examParams.link,
        examParams.examType,
        examParams.subjectId
    ];

    try {
        return connection.query('INSERT INTO exams (link, "examType", "subjectId") VALUES ($1, $2, $3)', data);
    } catch(e) {
        return e;
    }
}

async function findExamsBySubject(subject) {
    try {
        return connection.query(`SELECT name, "examType", link FROM subjects
        JOIN subjects_exams AS se ON se."examId" = subjects.id
        JOIN exams AS e ON e."subjectId" = se."examId"
        WHERE subjects.name = $1
        ORDER BY "examType"`, [subject]);
    } catch(e) {
        return e;
    }
}

async function findExamsByProfessor(id) {
    try {
        return connection.query(`SELECT s.name, "examType", link FROM professors AS p
        JOIN professor_subject AS ps ON ps."subjectId" = p."subjectId"
        JOIN subjects AS s ON s.id = ps."subjectId"
        JOIN subjects_exams AS se ON se."examId" = s.id
        JOIN exams AS e ON e."subjectId" = se."examId"
        WHERE p."subjectId" = $1
        ORDER BY "examType"`, [id]);
    } catch(e) {
        return e;
    }
}

module.exports = {
    insertExam,
    findExamsBySubject,
    findExamsByProfessor
};