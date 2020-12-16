const { getAllSubjects } = require('../repositories/subjectRepository');

async function getSubjects(req, res) {
    const response = await getAllSubjects();
    if(!response.rows) return res.send(response).sendStatus(500);

    res.send(response.rows);
}

module.exports = {
    getSubjects
};