const examSchema = require('../schemas/examSchema');
const { insertExam, 
    findExamsBySubject,
    findExamsByProfessor 
} = require('../repositories/examRepository');

async function sendExam(req, res) {
    const examParams = req.body;

    const { error } = examSchema.validExam.validate(examParams);
    if(error) return res.status(422).send({ error: error.details[0].message });

    const response = await insertExam(examParams);
    if(response.error) res.send(response).sendStatus(500);

    res.sendStatus(201);
}

async function getExamsBySubject(req, res) {
    const params = req.params.subject;
    const subject = params.slice(1);
    
    const response = await findExamsBySubject(subject);
    if(response.error) res.send(response).sendStatus(500);

    res.send(response.rows);
}

async function getExamsByProfessor(req, res) {
    const params = req.params.id.slice(1);
    const id = parseInt(params);

    const response = await findExamsByProfessor(id);
    if(response.error) res.send(response).sendStatus(500);

    res.send(response.rows);
}

module.exports = {
    sendExam,
    getExamsBySubject,
    getExamsByProfessor
};