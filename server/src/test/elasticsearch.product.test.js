const { expect, assert } = require('chai');
const esclient = require('../elastic_config');

describe('TESTING ELASTICSEARCH SETUP : product Index', () => {
    it('List the indices to find product', () => {
        return esclient.cat.indices({})
            .then((res) => {
                expect(res.includes('product')).to.be.true;
            });
    });

    it('Get /product/default/_search', () => {
        return esclient.search({
            index: 'product',
            type: 'default',
            body: {
                query: {
                    match: {
                        name: 'pasta'
                    }
                }
            }
        }).then((res) => {
            const { total } = res.hits;
            // console.log('total', total);
            expect(total > 0).to.be.true;
        }, (error) => {
            console.trace(error);
            assert.fail();
        });
    });

    it('Get /product/default/_search with fuzziness option', () => {
        return esclient.search({
            index: 'product',
            type: 'default',
            body: {
                query: {
                    match: {
                        name: {
                            query: 'paste',
                            fuzziness: 1
                        }
                    }
                }
            }
        }).then((res) => {
            const { total } = res.hits;
            expect(total > 0).to.be.true;
        }, (error) => {
            console.trace(error);
            assert.fail();
        });
    });
});
