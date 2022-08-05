import {Express} from 'express';
import authController from './controllers/auth.controller';
import historyController from './controllers/history.controller';
import reportsController from './controllers/reports.controller';
import requestTopicsController from './controllers/request-topics.controller';
import topicsController from './controllers/topics.controller';
import usersController from './controllers/users.controller';
import authMiddleware from './middleware/auth.middleware';
import quotaController from './controllers/quota.controller';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.send(`API server is running (${new Date()})`);
  });

  app
    .route('/user')
    .get(authMiddleware.authMiddleware, usersController.getUserProfile);

  app.route('/auth').post(authController.login);

  app
    .route('/topics')
    .get(authMiddleware.authMiddleware, topicsController.getTopics);

  app
    .route('/reports')
    .get(authMiddleware.authAdminMiddleware, reportsController.getReports);

  app
    .route('/reports/:id')
    .get(authMiddleware.authAdminMiddleware, reportsController.getReportById);

  app
    .route('/reports')
    .post(authMiddleware.authMiddleware, reportsController.createReport);

  app
    .route('/request-topics')
    .get(
      authMiddleware.authAdminMiddleware,
      requestTopicsController.getRequestTopics
    );

  app
    .route('/request-topics')
    .post(
      authMiddleware.authMiddleware,
      requestTopicsController.createRequestTopics
    );

  app
    .route('/request-topics/:id')
    .get(
      authMiddleware.authAdminMiddleware,
      requestTopicsController.getRequestTopic
    );

  app
    .route('/request-topics/:id')
    .put(
      authMiddleware.authAdminMiddleware,
      requestTopicsController.updateStatusRequestTopics
    );

  app.route('/history/:user_id').get(historyController.getAllHistoryChat);

  app
    .route('/history/:user_id/:chat_id')
    .get(historyController.getOneHistoryChat);
};

export default routes;
