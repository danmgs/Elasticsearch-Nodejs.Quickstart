const routesShp = require('./routes_shakespeare');
const routesPrd = require('./routes_product');

module.exports = (app) => {
  // Elasticsearch API
  routesShp(app);
  routesPrd(app);
};
