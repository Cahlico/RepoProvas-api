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

async function sendNewSubject(params) {
    const { name, period } = params;

    try {
        return connection.query('INSERT INTO subjects (name, period) VALUES ($1, $2)', [name, period]);
    } catch(e) {
        return e;
    }
}

async function addNewConectionTable(params) {
    const { name } = params;

    try {
        const response = await connection.query('SELECT id FROM subjects WHERE name = $1', [name]);
        const { id } = response.rows[0];

        await connection.query('INSERT INTO professor_subject ("subjectId") VALUES ($1)', [id]);
        return connection.query('INSERT INTO subjects_exams ("examId") VALUES ($1)', [id]);
    } catch(e) {
        return e;
    }
}

async function sendNewProfessor(params) {
    const { name, professorName } = params;

    try {
        const response = await connection.query('SELECT id FROM subjects WHERE name = $1', [name]);
        const { id } = response.rows[0];

        return connection.query('INSERT INTO professors (name, "subjectId") VALUES ($1, $2)', [professorName, id]);
    } catch(e) {
        return e;
    }
}

module.exports = { 
    findAllSubjects,
    findProfessorFromSubject,
    findAllProfessors,
    sendNewSubject,
    sendNewProfessor,
    addNewConectionTable
};