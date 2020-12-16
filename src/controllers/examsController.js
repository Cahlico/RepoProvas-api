const examSchema = require('../schemas/examSchema');
const { insertExam } = require('../repositories/examRepository');

async function sendExam(req, res) {
    const examParams = req.body;

    const { error } = examSchema.validExam.validate(examParams);
    if(error) return res.status(422).send({ error: error.details[0].message });

    const response = await insertExam(examParams);
    if(response.error) res.send(response).sendStatus(500);

    res.sendStatus(200);
}

module.exports = {
    sendExam
};