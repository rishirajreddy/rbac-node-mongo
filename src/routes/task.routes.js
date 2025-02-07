const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markTaskCompleted,
} = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
const Roles = require("../constants/userRoles");
const validateRequest = require("../middlewares/validateRequest");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/taskValidation");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.PRODUCER]),
  validateRequest(createTaskSchema),
  createTask
);
router.get("/", authMiddleware, getTasks);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.PRODUCER]),
  validateRequest(updateTaskSchema),
  updateTask
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([Roles.ADMIN]),
  deleteTask
);
router.patch(
  "/:id/complete",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.PRODUCER]),
  markTaskCompleted
);

module.exports = router;
