const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, errors } = format;

function buildDevLogger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${level}: ${stack || message}`;
  });

  return createLogger({
    level: "debug",
    format: combine(format.colorize(), errors({ stack: true }), logFormat),
    transports: [new transports.Console()],
  });
}

module.exports = buildDevLogger;
