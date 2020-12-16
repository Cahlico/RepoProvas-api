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

module.exports = {
    insertExam
};