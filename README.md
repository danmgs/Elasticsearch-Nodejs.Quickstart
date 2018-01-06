# Elasticsearch.QuickStart (2018)

A Simple Quickstart for Elasticsearch with nodejs, leveraging microservices exposed as web api.

![alt capture1](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot1.JPG)


1. Setup:
Start elasticsearch cluster first.

2. Activate the trace for elasticsearch client in **elastic_config.js** :

```
const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

