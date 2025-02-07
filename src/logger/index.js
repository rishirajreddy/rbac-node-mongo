const buildDevLogger = require("./devLogger");
const buildProdLogger = require("./prodLogger");
const config = require("../config/dotenv");

let logger = null;
if (config.app_mode === "production") {
  logger = buildProdLogger();
} else {
  logger = buildDevLogger();
}

module.exports = logger;
