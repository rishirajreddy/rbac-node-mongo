const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
}).min(1);

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
