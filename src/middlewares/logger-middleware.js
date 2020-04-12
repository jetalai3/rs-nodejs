const { finished } = require('stream');
const { logger } = require('../common/logger');

module.exports = (req, res, next) => {
  const { url, method, query, body } = req;
  const start = Date.now();

  next();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;

    logger.info(
      `${method} ${url} params:${JSON.stringify(query)} body:${JSON.stringify(
        body
      )} ${statusCode} [${ms}ms]`
    );
  });
};
