// const esclient = require('../elastic_config');

import esclient from '../elastic_config';

module.exports = {

    /**
     * Get play list.
     * @property {number} req.params.name - Name of the play.
     * @returns {Hits[]}
     */
    getPlays(req, res, next) {
        const { name } = req.params;

        esclient.search({
            index: 'shakespeare',
            type: 'default',
            body: {
                query: {
                    match: {
                        play_name: name
                    }
                }
            }
        }).then((data) => {
            res.send(data.hits.hits);
        })
        .catch(next);
    },

    get(req, res, next) {
        const { id } = req.params;

        esclient.get({
            index: 'shakespeare',
            type: 'default',
            id
        }).then((data) => {
            res.send(data);
        })
        .catch(next);
    }
};
