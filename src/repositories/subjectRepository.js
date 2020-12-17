const connection = require('../database');

async function findAllSubjects() {
    try {
        return connection.query('SELECT * FROM subjects ORDER BY period');
    } catch (e) {
        return e;
    }
}

async function findProfessorFromSubject(subjectName) {
    try {
        return connection.query(`SELECT p.name FROM subjects AS s
        JOIN professor_subject AS ps ON ps."subjectId" = s.id
        JOIN professors AS p ON p."subjectId" = ps."subjectId"
        WHERE s.name = $1`, [subjectName]);
    } catch (e) {
        return e;
    }
}

async function findAllProfessors() {
    try {
        return connection.query('SELECT * FROM professors');
    } catch (e) {
        return e;
    }
}

module.exports = { 
    findAllSubjects,
    findProfessorFromSubject,
    findAllProfessors
};