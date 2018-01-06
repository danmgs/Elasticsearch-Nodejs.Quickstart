const esclient = require('../elastic_config');
const baseCtrl = require('./base_controller');
const bodybuilder = require('bodybuilder');

const index = 'product';
const type = 'default';

const soldBarrierStatusRange = {
    min: 10,
    max: 300, // process.env.SOLD_BARRIER_MAX
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
            soldBarrierStatusRange
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

        if (query.searchText) {
            if (!query.options.isFuzzy) {
                body = body.query('match', 'name', query.searchText);
                body = body.orQuery('match', 'description', query.searchText);
                body = body.orQuery('match', 'tags', query.searchText);
            } else {
                body = body.query('match', 'name', { query: query.searchText, fuzziness: 'auto' });
                body = body.orQuery('match', 'description', query.searchText);
                body = body.orQuery('match', 'tags', query.searchText);
            }
        }

        /*
        "highlight": {
            "pre_tags": ["<strong>"],
            "post_tags": ["</strong>"],
            "fields": {
              "name": {}
            }*/

        // body = body.rawOption('highlight', { fields: { name: {} } });

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
            body = body.andQuery('range', 'sold', { gte: soldBarrierStatusRange.max });
        }

        body = body.build();

        // console.log('body', JSON.stringify(body, undefined, 2));

        esclient.search({
            index,
            type,
            body
        }).then((data) => {
            res.send(data.hits.hits);
        }).catch(next);
    }
};
