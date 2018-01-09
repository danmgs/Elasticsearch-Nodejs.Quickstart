# Elasticsearch.Nodejs.QuickStart (2018)

An application that exposes microservices under web api, by leveraging the greatness of Elasticsearch with nodejs.

![alt capture1](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot1.PNG)

<br />

![alt capture2](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot2.PNG)


## Folders Organisation
### Overview
```
| -- /public
     | -- packages.json
     | -- /src 
          | -- /app  
                | -- /services 
                | -- /Shared               -> contains all models
                | -- /views
| -- /server
     | -- packages.json                    
     | -- /datasamples 
     | -- /src 
          | -- /controllers  
          | -- /routes 
          | -- /shared                     -> contains all models
          | -- /test                       -> tests driven development using Mocha
| -- packages.json                         -> contains global npm commands for public + server's packages.json files.
``` 

## Prerequisites and setup
### Seed ElastictSearch cluster with data.

1. Start elasticsearch cluster first.

2. In order to create the **product** index, the data file is available in **server\datasamples** directory. 

Command to bulk insert products from file **products-bulk.json** :
```
POST /product/default/_bulk
[put here file content]
```
3. Activate/Deactivate the server-side trace of elasticsearch client in **elastic_config.js** :

```
const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

### Install npm packages 

1. For each directories **public** and **server**, install packages using this following command:
```
npm install
```

## Launch server and client programs :

1. In the root directory, open 2 separate terminals and type following commands in the order :

1.1. To start ElasticSearch Cluster on server-side:
```
npm run start:server:es
```

2.2. Then, to start client and server:
```
npm start
```

3. Launch web client on a browser using url:\

http://localhost:4200/

Green light means server is up.

![alt capture3](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot3.PNG)

Red light means server is down.\
Reason is elasticsearch cluster down and need to be started. Check step **1.1**.

![alt capture4](https://github.com/danmgs/Elasticsearch-Nodejs.Quickstart/blob/master/public/img/screenshot4.PNG)

## Launch unit tests for server-side :

1. To launch unit tests (server must be shutdown), make sure elasticsearch cluster is started.
```
npm run test:server
```

2. To launch tests with minimal logs:
```
npm run test:server:noverbose
```

## Useful links
https://marcobonzanini.com/2015/02/09/phrase-match-and-proximity-search-in-elasticsearch/

