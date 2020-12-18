const { findAllSubjects, 
    findProfessorFromSubject, 
    findAllProfessors,
    getExamsByProfessor,
    sendNewSubject,
    sendNewProfessor,
    addNewConectionTable,
    addNewProfessor,
    getExamsBySubject
} = require('../repositories/subjectRepository');

const subjectSchema = require('../schemas/subjectSchemas');

async function getSubjects(req, res) {
    const response = await findAllSubjects();
    if(!response.rows) return res.send(response).sendStatus(500);

    let body = [];
    for(let i = 0; i < response.rows.length; i++) {
        const { name, id, period } = response.rows[i];

        const resp = await getExamsBySubject(id);
        const count = resp.rows[0];
        body.push({ name, id, count, period });
    }

    res.send(body);
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

    let body = [];
    for(let i = 0; i < response.rows.length; i++) {
        const name = response.rows[i].name;
        const resp = await getExamsByProfessor(name);
        const count = resp.rows[0];
        body.push({ name, count });
    }

    res.send(body);
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