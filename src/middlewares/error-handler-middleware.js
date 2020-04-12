const { logger } = require('../common/logger');

module.exports = (err, _, res, next) => {
  const { message, statusCode } = err;
  logger.error(`Status: ${statusCode || 500} - ${message || err.message}`);

  if (statusCode) {
    res.status(statusCode).json(message);
  } else {
    res.status(500).json(err.message);
  }
};
