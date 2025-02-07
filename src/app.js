const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const logger = require("./logger");
const devApiLogger = require("./middlewares/devApiLogger");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
const app = express();

db.on("open", () => logger.info("Database connected"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", [devApiLogger], userRoutes);
app.use("/api/tasks", [devApiLogger], taskRoutes);

module.exports = app;
