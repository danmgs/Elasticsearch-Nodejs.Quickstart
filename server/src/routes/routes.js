const ShakespeareController = require('../controllers/shakespeare_controller');

module.exports = (app) => {
  // Elasticsearch API
  app.get('/api/shakespeare/plays/:name', ShakespeareController.getPlays);
  app.get('/api/shakespeare/:id', ShakespeareController.get);
};
