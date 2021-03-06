const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli(), format.timestamp()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'request.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = {
  logger
};
