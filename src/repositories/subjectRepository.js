const connection = require('../database');

async function getAllSubjects() {
    try {
        return connection.query('SELECT * FROM subjects');
    } catch (e) {
        return e;
    }
}

module.exports = { 
    getAllSubjects
};