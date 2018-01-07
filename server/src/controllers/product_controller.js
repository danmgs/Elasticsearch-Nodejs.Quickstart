const esclient = require('../elastic_config');
const baseCtrl = require('./base_controller');
const bodybuilder = require('bodybuilder');

const index = 'product';
const type = 'default';

const soldBarrierStatusRangeConfig = {
    min: 10,
    max: 300, // process.env.SOLD_BARRIER_MAX
};

const maxEditDistanceConfig = 4;
const maxFuzzyConfig = 'auto';

const enumSearchOptions = {
    isSearchNone: 'isSearchNone',
    isSearchFuzzy: 'isSearchFuzzy',
    isSearchExactMatch: 'isSearchExactMatch',
    isSearchProximity: 'isSearchProximity',
};

module.exports = {
    get(req, res, next) {
        baseCtrl.get(req, res, next, index, type);
    },

    /**
     * Get the configuration.
     */
    getConfig(req, res) {
        const data = {
            soldBarrierStatusRangeConfig,
            maxEditDistanceConfig,
            maxFuzzyConfig
        };

        res.send(data);
    },

    /**
     * Get product list by name.
     * @property {name} req.params.name - Name of the product.
     * @returns {Hits[]}
     */
    getProductByName(req, res, next) {
        const { name } = req.body;

        esclient.search({
            index,
            type,
            body: {
                query: {
                    match: {
                        name
                    }
                }
            }
        }).then((data) => {
            res.send(data.hits.hits);
        }).catch(next);
    },

    /**
     * Search products by criteria.
     * @property {body} req.body - Searching Criteria.
     * @returns {Hits[]}
     */
    search(req, res, next) {
        const { query } = req.body;
        console.log(JSON.stringify(query, undefined, 2));
        let body = bodybuilder();

        // if (query.searchText) {
        //     if (!query.options.isFuzzy) {
        //         body = body.query('match', 'name', query.searchText);
        //         body = body.orQuery('match', 'description', query.searchText);
        //         body = body.orQuery('match', 'tags', query.searchText);
        //     } else {
        //         body = body.query('match', 'name', { query: query.searchText, fuzziness: 'auto' });
        //         body = body.orQuery('match', 'description', { query: query.searchText, fuzziness: 'auto' });
        //         body = body.orQuery('match', 'tags', { query: query.searchText, fuzziness: 'auto' });
        //     }
        // }

        console.log('search options = ', query.options);

        let searchTextObj;
        if (query.searchText) {
            if (query.options === enumSearchOptions.isSearchExactMatch) {
                console.log('1');
                searchTextObj = query.searchText;
                body = body.query('match_phrase', 'name', searchTextObj);
                body = body.orQuery('match_phrase', 'description', searchTextObj);
                body = body.orQuery('match_phrase', 'tags', searchTextObj);
            } else if (query.options === enumSearchOptions.isSearchProximity) {
                console.log('2');
                searchTextObj = { query: query.searchText, slop: maxEditDistanceConfig };
                body = body.query('match_phrase', 'name', searchTextObj);
                body = body.orQuery('match_phrase', 'description', searchTextObj);
                body = body.orQuery('match_phrase', 'tags', searchTextObj);
            } else {
                if (query.options === enumSearchOptions.isSearchFuzzy) {
                    console.log('3');
                    searchTextObj = { query: query.searchText, fuzziness: maxFuzzyConfig };
                } else {
                    console.log('4');
                    searchTextObj = query.searchText;
                }

                body = body.query('match', 'name', searchTextObj);
                body = body.orQuery('match', 'description', searchTextObj);
                body = body.orQuery('match', 'tags', searchTextObj);
            }
        }

        body = body.rawOption('highlight', { pre_tags: ['<strong>'], post_tags: ['</strong>'], fields: { name: {} } });

        if (query.rangePrices) {
            const minPrice = query.rangePrices[0];
            const maxPrice = query.rangePrices[1];
            if (maxPrice || minPrice) {
                if (maxPrice && minPrice) {
                    body = body.query('range', 'price', { gte: minPrice, lte: maxPrice });
                } else if (maxPrice) {
                    body = body.query('range', 'price', { lte: maxPrice });
                } else {
                    body = body.query('range', 'price', { gte: minPrice });
                }
            }
        }

        if (query.isActive) {
            body = body.andQuery('match', 'is_active', query.isActive);
        }

        if (query.isInStock) {
            body = body.andQuery('range', 'in_stock', { gte: 0 });
        }

        if (query.isBestSeller) {
            body = body.andQuery('range', 'sold', { gte: soldBarrierStatusRangeConfig.max });
        }

        body = body.build();

        console.log('body', JSON.stringify(body, undefined, 2));

        esclient.search({
            index,
            type,
            body
        }).then((data) => {
            res.send(data.hits.hits);
        }).catch(next);
    }
};