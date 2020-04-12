const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', error => {
  logger.error(
    `[Error inside 'uncaughtException' event] ${error.stack}` || error.message
  );
});

process.on('unhandledRejection', error => {
  logger.error(
    `[Error inside 'unhandledRejection' event] ${error.stack}` || error.message
  );
});
