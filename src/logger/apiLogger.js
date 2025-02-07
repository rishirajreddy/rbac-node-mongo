const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
const { timestamp, combine, errors, json } = format;
const path = require("path");

var transport = new transports.DailyRotateFile({
  dirname: path.join(__dirname, "../logs"),
  filename: "api-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "2m",
});

function buildApiLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [transport],
  });
}

module.exports = buildApiLogger;
