const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const validateRequest = require("../middlewares/validateRequest");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../validations/userValidation");

const router = express.Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login", validateRequest(loginUserSchema), loginUser);

module.exports = router;
