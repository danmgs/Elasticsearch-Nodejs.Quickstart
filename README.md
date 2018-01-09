# Elasticsearch.Nodejs.QuickStart (2018)

An application that exposes microservices under web api, by leveraging the greatness of Elasticsearch with nodejs.

![alt capture1](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot1.PNG)

<br />

![alt capture2](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot2.PNG)


1. Setup:
Start elasticsearch cluster first.


2. data file in **server\datasamples** directory. 

Command to bulk insert products from file **products-bulk.json** :
```
POST /product/default/_bulk
[put here file content]
```


3. Activate the trace for elasticsearch client in **elastic_config.js** :

```
const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

4. For each directories **public** and **server**, install packages using this following command:
```
npm install
```

5. In the root directory, open 2 separate terminals and type following commands in the order :

5.1. To start ElasticSearch Cluster on server-side:
```
npm run start:server:es
```

5.2. "Then, to start client and server:
```
npm start
```

Green ligh means server is up.
![alt capture3](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot3.PNG)

Red ligh means server is down because of elasticsearch cluster down and need to be started. Check step **5.1**.
![alt capture4](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot4.PNG)

6. To launch unit tests (server must be shutdown), make sure elasticsearch cluster is started.
```
npm test:server (or npm run test:noverbose for minimal logs.)
```

7. Useful links
https://marcobonzanini.com/2015/02/09/phrase-match-and-proximity-search-in-elasticsearch/

