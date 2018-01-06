const routesShp = require('./routes_shakespeare');
const routesPrd = require('./routes_product');

module.exports = (app) => {
  // Elasticsearch API
  routesShp(app);
  routesPrd(app);
};


// const ProductController = require('../controllers/product_controller');

// module.exports = (app) => {
//   // Elasticsearch API
//   app.post('/api/product/name', ProductController.getProductByName);
//   app.post('/api/product/anothername/:name', ProductController.getProductByAnotherName);
//   app.get('/api/product/:id', ProductController.get);
//   app.get('/api/product/test', ProductController.test);
//   app.post('/api/product/anothertest', ProductController.anothertest);
// };

