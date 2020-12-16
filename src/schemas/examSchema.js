const joi = require('joi');

const validExam = joi.object({
    link: joi.string().uri().required(),
    examType: joi.string().min(2).max(2).required(),
    subjectId: joi.number().required()
});

module.exports = {
    validExam
};