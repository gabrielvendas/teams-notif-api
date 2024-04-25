const { Router } = require('express');
const gitlabCiNotifRouter = Router();

const gitlabCiNotifController = require('../controllers/gitlab-ci-notif.controller');

gitlabCiNotifRouter.post('/gitlab-ci-notif', gitlabCiNotifController.gitlabCiNotif);

module.exports = gitlabCiNotifRouter;