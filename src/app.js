const express = require('express');
const app = express();

const allureCaptureRouter = require('./routers/allure-notify.router');

const errorsMiddleware = require('./middlewares/errors');

app.use(express.json());

app.use(allureCaptureRouter);

app.use(errorsMiddleware.errorHandler);

module.exports = app;