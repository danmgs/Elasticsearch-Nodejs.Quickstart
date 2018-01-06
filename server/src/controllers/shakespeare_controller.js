const esclient = require('../elastic_config');
const baseCtrl = require('./base_controller');

const index = 'shakespeare';
const type = 'default';

module.exports = {
    get(req, res, next) {
        baseCtrl.get(req, res, next, index, type);
    },

    /**
     * Get play list by name.
     * @property {name} req.params.name - Name of the play.
     * @returns {Hits[]}
     */
    getPlaysByName(req, res, next) {
        const { name } = req.params;

        esclient.search({
            index,
            type,
            body: {
                query: {
                    match: {
                        play_name: name
                    }
                }
            }
        }).then((data) => {
            res.send(data.hits.hits);
        }).catch(next);
    },

    /**
     * Index a new play.
     * @property {body} req.body - information data of the play.
     * @returns {Result of indexing}
     */
    create(req, res, next) {
        // const itemProps = req.body;

        esclient.create({
            index,
            type,
            id: `_id_${Date.now()}`,
            body: {
                type: 'line',
                line_id: 4,
                play_name: 'Henry IV',
                speech_number: 1,
                line_number: '1.1.1',
                speaker: 'KING HENRY IV',
                text_entry: 'Halleluia my fellows !'
            }
        }).then((data) => {
            res.send(data);
        }).catch(next);
    },
};
