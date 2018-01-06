const ProductController = require('../controllers/product_controller');

module.exports = (app) => {
  app.get('/api/product/:id(\\d+)/', ProductController.get);
  app.get('/api/product/config/', ProductController.getConfig);
  app.post('/api/product/name', ProductController.getProductByName);
  app.post('/api/product/search', ProductController.search);
};
