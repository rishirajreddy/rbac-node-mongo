const Joi = require("joi");
const Roles = require("../constants/userRoles");
const rolesList = Object.values(Roles);

const registerUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
