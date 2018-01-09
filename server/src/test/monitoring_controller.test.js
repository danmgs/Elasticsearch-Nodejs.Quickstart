const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Monitoring controller', () => {
    it('Get /api/monitoring/_healthcheck check the health status', (done) => {
        request(app)
        .get('/api/monitoring/_healthcheck')
        .end((err, res) => {
            console.log(JSON.stringify(res.body, undefined, 2));
            expect(res.statusCode).is.equal(200);
            expect(err).to.be.null;
            done();
        });
    });
});
