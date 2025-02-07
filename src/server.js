const app = require("./app");
const dotenv = require("./config/dotenv");
const PORT = dotenv.port || 4500;
const logger = require("./logger");

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
