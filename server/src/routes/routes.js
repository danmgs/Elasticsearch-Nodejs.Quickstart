const routesShp = require('./routes_shakespeare');
const routesPrd = require('./routes_product');
const routesMon = require('./routes_monitoring');

module.exports = (app) => {
  // Elasticsearch API
  routesShp(app);
  routesPrd(app);
  routesMon(app);
};
