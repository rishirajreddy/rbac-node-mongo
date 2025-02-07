const buildDevLogger = require("./devLogger");
const buildProdLogger = require("./prodLogger");
const config = require("../config/dotenv");

let logger = null;
logger = buildDevLogger();

module.exports = logger;
