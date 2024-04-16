const { Router } = require('express');
const allureNotifyRouter = Router();

const allureNotifyController = require('../controllers/allure-notify.controller');

allureNotifyRouter.post('/allure-capture', allureNotifyController.allureNotify);

module.exports = allureNotifyRouter;