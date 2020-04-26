const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const logger = require('./middlewares/logger-middleware');
const errorHandler = require('./middlewares/error-handler-middleware');
const jwt = require('./middlewares/jwt-middleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logger);
app.use('/login', loginRouter);
app.use('/users', jwt, userRouter);
app.use('/boards', jwt, boardRouter);
app.use('/boards', jwt, taskRouter);
app.use(errorHandler);

module.exports = app;
