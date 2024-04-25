const { Router } = require('express');
const healthzRouter = Router();

const healthzController = require('../controllers/healthz.controller');

healthzRouter.get('/healthz', healthzController.healthz);

module.exports = healthzRouter;