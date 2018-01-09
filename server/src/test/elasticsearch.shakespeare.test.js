const assert = require('assert');
const esclient = require('../elastic_config');

xdescribe('TESTING ELASTICSEARCH SETUP : shakespeare Index', () => {
    it('Ping cluster', (done) => {
        esclient.ping({
            requestTimeout: 30000,
        }, (error) => {
            if (error) {
                assert.fail('elasticsearch cluster is down!');
            } else {
                // console.log('All is well');
                assert.ok(1);
                done();
            }
        });
    });

    it('Check cluster health', (done) => {
        esclient.cat.health(
            {},
            (error, res) => {
                // console.log(res);
                if (error) {
                    done(error);
                } else {
                    assert(!res.includes('red'));
                    done();
                }
            }
        );
    });

    it('List the indices to find shakespeare', () => {
        return esclient.cat.indices({})
            .then((res) => {
                // console.log('test', res);
                assert(res.includes('shakespeare'));
            });
    });

    it('Get /shakespeare/default/_search', () => {
        return esclient.search({
            index: 'shakespeare',
            type: 'default',
            body: {
                query: {
                    match: {
                        play_name: 'henry'
                    }
                }
            }
        }).then((res) => {
            const { total } = res.hits;
            // const hits = JSON.stringify(res.hits.hits, undefined, 2);
            // console.log(`Hits: ${hits}, Total documents found: ${total}`);
            assert(total > 0);
        }, (error) => {
            console.trace(error);
            assert.fail();
        });
    });

    it('Get a document with a given id', (done) => {
        const id = 0;
        esclient.get({
            index: 'shakespeare',
            type: 'default',
            id
        }).then((res) => {
            // console.log(`found document with id=${id}`, res);
            assert(res._id === '0');
            done();
        }, (error) => {
            assert.fail(`Operation failed with error : ${error}`);
        });
    });

    it('Update a document with a given id', (done) => {
        const id = 0;
        let oldversion = null;

        esclient.get({
            index: 'shakespeare',
            type: 'default',
            id
        }).then((resGet) => {
            oldversion = resGet._version;
            console.log(resGet);

            esclient.update({
                index: 'shakespeare',
                type: 'default',
                id,
                body: {
                    // put the partial document under the `doc` key
                    doc: {
                        play_name: 'new title'
                    }
                }
            }).then((resUpd) => {
                assert(resUpd._version === oldversion + 1);
                assert(resUpd.result === 'updated');
                done();
            }, (error) => {
                assert.fail(`Operation failed with error : ${error}`);
            });
            // done();
        }, (error) => {
            assert.fail(`Operation failed with error : ${error}`);
        });
    });

    it('Search for documents by a given playname', () => {
        const strNameToSearch = 'henry';
        return esclient.search({
            index: 'shakespeare',
            type: 'default',
            body: {
                query: {
                    match: {
                        play_name: strNameToSearch
                    }
                }
            }
        }).then((res) => {
            const { total } = res.hits;
            assert(total > 0);
        }, (err) => {
            console.trace(err);
            assert.fail();
        });
    });
});
