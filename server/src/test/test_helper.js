const esclient = require('../elastic_config');
const assert = require('assert');
const path = require('path');
const env = require('node-env-file');
const fs = require('fs');

env(path.join(__dirname, '.env'));

const datafile = path.join(__dirname, '/../../', 'datasamples', process.env.TEST_DATAFILE);

before((done) => {
  // ----------- DELETE INDICES
  esclient.indices.delete({
    index: 'my_custom_indice',
    ignore: [404]
  }).then((body) => {
    // since we told the client to ignore 404 errors, the
    // promise is resolved even if the index does not exist
    console.log('index was deleted or never existed', body);
    // done();
  }, (error) => {
    console.log(`Operation failed with error : ${error}`);
  });

  esclient.indices.delete({
    index: 'shakespeare',
    ignore: [404]
  }).then((body) => {
    // since we told the client to ignore 404 errors, the
    // promise is resolved even if the index does not exist
    console.log('index was deleted or never existed', body);

    // ----------- BULK INSERTION OF SAMPLE DATA
    // https://gist.github.com/nicholasblexrud/f9e033afb348afac2ac6

    console.log('START BULK INSERT OF SAMPLE DATA ...');
    const datadocuments = JSON.parse(fs.readFileSync(datafile)); // name of my first file to parse

    // "refresh: true" ensures indexing in elasticsearch cluster being effective immediately
    // (elasticsearch is "near real-time"),
    // so that we can ensure running test cases with cluster filled with data.
    esclient.bulk({
      refresh: true,
      index: 'shakespeare',
      type: 'default',
      body:
        datadocuments
    }, (err, resp) => {
      if (err) {
        console.log(' => with failures ', err);
      } else {
        // console.log(JSON.stringify(resp.items, undefined, 2));
        assert(resp.errors === false);
        console.log(` => with success : resp.errors = ${resp.errors}, resp.items.length=${resp.items.length}`);
      }

      console.log('END BULK INSERT OF SAMPLE DATA');
      done();
    });
  }, (error) => {
    console.log(`Operation failed with error : ${error}`);
  });
});

// beforeEach(done => {
//   // to implement if required.
// });
