const esclient = require('../elastic_config');

module.exports = {
    /**
     * Get document by id.
     * @property {id} req.params.name - id of the document.
     * @returns {Hit}
     */
    get(req, res, next, index, type) {
        const { id } = req.params;

        esclient.get({
            index,
            type,
            id
        }).then((data) => {
            res.send(data);
        }).catch(next);
    }
};
