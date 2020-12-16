const joi = require('joi');

const validSubject = joi.object({
    name: joi.string().min(3).max(30).required(),
});

module.exports = {
    validSubject
};