const ProductController = require('../controllers/product_controller');

module.exports = (app) => {
  app.get('/api/product/:id', ProductController.get);
  app.post('/api/product/name', ProductController.getProductByName);
  app.post('/api/product/search', ProductController.search);
  // app.post('/api/product/anothername/:name', ProductController.getProductByAnotherName);
  // app.get('/api/product/test', ProductController.test);
  // app.post('/api/product/anothertest', ProductController.anothertest);
};
