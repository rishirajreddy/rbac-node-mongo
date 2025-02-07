const buildDevLogger = require("./devLogger");
const config = require("../config/dotenv");

let logger = null;
logger = buildDevLogger();

module.exports = logger;
