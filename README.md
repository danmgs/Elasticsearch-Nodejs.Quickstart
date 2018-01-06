# Elasticsearch.QuickStart (2018)

A Simple Quickstart for Elasticsearch with nodejs, leveraging microservices exposed as web api.

Setup:
Start elasticsearch cluster first.

Activate the trace for elasticsearch client :

```
const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

