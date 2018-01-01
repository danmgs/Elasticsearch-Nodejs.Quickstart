const assert = require('assert');
const esclient = require('../elastic_config');

describe('PARENT - Testing Elasticsearch Setup', () => {
    const strIndexName = 'my_custom_indice';

    it(`Create new index ${strIndexName} with mapping for my_custom_type`, (done) => {
        esclient.indices.create({
            index: strIndexName,
            body: {
                'mappings': {
                    'my_custom_type': {
                        'properties': {
                            'aProp1': { 'type': 'text' },
                            'aProp2': { 'type': 'text' },
                            'aProp3': { 'type': 'text' },
                            'aProp4': { 'type': 'text' }
                        }
                    }
                }
            }
        }, (error, resp, respcode) => {
            // console.log(err, resp, respcode);
            if (error) {
                done(error);
            } else {
                assert(resp.acknowledged === true);
                assert(respcode === 200);
                done();
            }
        });
    });

    describe('NESTED CHILDREN - Testing Elasticsearch', () => {
        it(`Delete existing indice ${strIndexName}`, () => {
            return esclient.indices.delete({
                index: strIndexName,
                ignore: [404]
            }).then((res) => {
                // since we told the client to ignore 404 errors, the
                // promise is resolved even if the index does not exist
                // console.log('index was deleted or never existed', res);
                assert.ok(1, res);
            }, (error) => {
                assert.fail(`Operation failed with error : ${error}`);
            });
        });
    });
});
