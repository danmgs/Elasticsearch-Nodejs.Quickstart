const elasticsearch = require('elasticsearch');

const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});

module.exports = esclient;
