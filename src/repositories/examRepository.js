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
        WHERE subjects.name = $1`, [subject]);
    } catch(e) {
        return e;
    }
}

module.exports = {
    insertExam,
    findExamsBySubject
};