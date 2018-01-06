const ShakespeareController = require('../controllers/shakespeare_controller');

module.exports = (app) => {
  app.get('/api/shakespeare/:id', ShakespeareController.get);
  app.get('/api/shakespeare/plays/:name', ShakespeareController.getPlaysByName);
  app.post('/api/shakespeare', ShakespeareController.create);
};
