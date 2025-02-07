const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
const { timestamp, combine, errors, json } = format;

var transport = new transports.DailyRotateFile({
  dirname: "./logs",
  filename: "prod-api-%DATE%.log",
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
