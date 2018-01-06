const esclient = require('../elastic_config');
const baseCtrl = require('./base_controller');
const bodybuilder = require('bodybuilder');

const index = 'product';
const type = 'default';

const EnumSoldStatus = {
    BESTSELLER: 0,
    LOW: 1,
};

const soldBarrierStatusRange = {
    min: 10,
    max: 100
};

module.exports = {
    get(req, res, next) {
        baseCtrl.get(req, res, next, index, type);
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
        const itemProps = req.body;
        console.log(JSON.stringify(itemProps, undefined, 2));
        let body = bodybuilder();

        if (itemProps.text) {
            body = body.query('match', 'name', itemProps.name);
            body = body.orQuery('match', 'description', itemProps.name);
            body = body.orQuery('match', 'tags', itemProps.name);
        }

        if (itemProps.maxPrice || itemProps.minPrice) {
            if (itemProps.maxPrice && itemProps.minPrice) {
                body = body.query('range', 'price', { gte: itemProps.minPrice, lte: itemProps.maxPrice });
            } else if (itemProps.maxPrice) {
                body = body.query('range', 'price', { lte: itemProps.minPrice });
            } else {
                body = body.query('range', 'price', { gte: itemProps.maxPrice });
            }
        }

        if (itemProps.inStockStatus) {
            body = body.andQuery('range', 'in_stock', { gte: 0 });
        }

        if (itemProps.soldStatus) {
            if (itemProps.soldStatus === EnumSoldStatus.BESTSELLER) {
                body = body.andQuery('range', 'sold', { gte: soldBarrierStatusRange.max });
            } else if (itemProps.soldStatus === EnumSoldStatus.LOW) {
                body = body.andQuery('range', 'sold', { lte: soldBarrierStatusRange.min });
            } else {
                body = body.andQuery('range', 'sold', { gt: soldBarrierStatusRange.min, lt: soldBarrierStatusRange.max });
            }
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
