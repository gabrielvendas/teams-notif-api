const { Router } = require('express');
const allureNotifRouter = Router();

const allureNotifController = require('../controllers/allure-notif.controller');

allureNotifRouter.post('/allure-notif', allureNotifController.allureNotif);

module.exports = allureNotifRouter;