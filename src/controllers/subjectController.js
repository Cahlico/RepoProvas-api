const { findAllSubjects, 
    findProfessorFromSubject, 
    findAllProfessors 
} = require('../repositories/subjectRepository');

const subjectSchema = require('../schemas/subjectSchemas');

async function getSubjects(req, res) {
    const response = await findAllSubjects();
    if(!response.rows) return res.send(response).sendStatus(500);

    res.send(response.rows);
}

async function getProfessorFromSubject(req, res) {
    const subjectParams = req.body;

    const { error } = subjectSchema.validSubject.validate(subjectParams);
    if(error) return res.status(422).send({ error: error.details[0].message });

    const response = await findProfessorFromSubject(subjectParams.name);
    if(!response.rows) return res.send(response).sendStatus(500);

    res.send(response.rows);
}

async function getProfessors(req, res) {
    const response = await findAllProfessors();
    if(!response.rows) return res.send(response).sendStatus(500);

    res.send(response.rows);
}

module.exports = {
    getSubjects,
    getProfessorFromSubject,
    getProfessors
};