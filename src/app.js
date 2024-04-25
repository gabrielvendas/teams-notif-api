const express = require('express');
const app = express();

const allureNotifRouter = require('./routers/allure-notif.router');
const gitlabCiNotifRouter = require('./routers/gitlab-ci-notif.router');

const errorsMiddleware = require('./middlewares/errors');

app.use(express.json());

app.use(allureNotifRouter, gitlabCiNotifRouter);

app.use(errorsMiddleware.errorHandler);

module.exports = app;