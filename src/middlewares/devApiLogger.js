const buildDevLogger = require("../logger/apiLogger");
const ApiLogger = buildDevLogger();
module.exports = (req, res, next) => {
  const { method, url, params, body, rawHeaders, baseUrl, ip, query } = req;

  const requestLog = {
    method,
    url,
    params,
    body,
    rawHeaders,
    baseUrl,
    ip,
    query,
  };
  const originalSend = res.send;

  res.send = function (data) {
    let responseBody = data;

    if (Buffer.isBuffer(data)) {
      responseBody = data.toString();
    }

    try {
      responseBody = JSON.parse(responseBody);
    } catch (error) {}

    ApiLogger.info("Dev API", {
      request: requestLog,
      response: { body: responseBody, statusCode: res.statusCode },
    });

    return originalSend.apply(res, arguments);
  };

  next();
};
