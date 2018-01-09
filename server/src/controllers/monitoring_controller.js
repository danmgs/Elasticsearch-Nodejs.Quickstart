const esclient = require('../elastic_config');

module.exports = {

    get(req, res, next) {
        esclient.ping({
            requestTimeout: 30000,
        }).then((data) => {
            res.send(data);
        }).catch(next);
    },
};
