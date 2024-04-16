const express = require('express');
const app = express();

const allureNotifyRouter = require('./routers/allure-notify.router');

const errorsMiddleware = require('./middlewares/errors');

app.use(express.json());

app.use(allureNotifyRouter);

app.use(errorsMiddleware.errorHandler);

module.exports = app;