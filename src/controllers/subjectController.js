const { findAllSubjects, 
    findProfessorFromSubject, 
    findAllProfessors,
    sendNewSubject,
    sendNewProfessor,
    addNewConectionTable,
    addNewProfessor
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

async function addSubject(req, res) {
    const postParams = req.body;

    const { error } = subjectSchema.validParams.validate(postParams);
    if(error) return res.status(422).send({ error: error.details[0].message });

    const subjectRes = await sendNewSubject(postParams);
    if(!subjectRes.rows) return res.send(subjectRes).sendStatus(500);

    const response = await addNewConectionTable(postParams);
    if(!response.rows) return res.send(response).sendStatus(500);

    const professorRes = await sendNewProfessor(postParams);
    if(!professorRes.rows) return res.send(professorRes).sendStatus(500);

    res.sendStatus(201);
}

async function addProfessor(req, res) {
    const postParams = req.body;

    const { error } = subjectSchema.professorParams.validate(postParams);
    if(error) return res.status(422).send({ error: error.details[0].message });

    const response = await addNewProfessor(postParams);
    if(!response.rows) return res.send(response).sendStatus(500);

    res.sendStatus(201);
}

module.exports = {
    getSubjects,
    getProfessorFromSubject,
    getProfessors,
    addSubject,
    addProfessor
};