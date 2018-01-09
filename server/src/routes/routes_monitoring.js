const MonitoringController = require('../controllers/monitoring_controller');

module.exports = (app) => {
  app.get('/api/monitoring/_healthcheck', MonitoringController.get);
};
