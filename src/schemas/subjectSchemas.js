const joi = require('joi');

const validSubject = joi.object({
    name: joi.string().min(3).max(30).required()
});

const validParams = joi.object({
    name: joi.string().min(3).max(30).required(),
    period: joi.number().required().required(),
    professorName: joi.string().min(3).max(30).required()
})

module.exports = {
    validSubject,
    validParams
};