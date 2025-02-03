const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "server.log" }) // Logs are stored in "server.log"
  ]
});

module.exports = logger;
