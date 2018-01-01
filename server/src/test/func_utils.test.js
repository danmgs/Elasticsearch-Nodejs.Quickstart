const assert = require('assert');
const {
    squarefunc, multiplyfunc, sumfunc, minusfunc
} = require('../func_utils');

xdescribe('Testing func_utils', () => {
    it('should return a * a', (done) => {
        const res = squarefunc(2);
        assert(res === 4);
        done();
    });

    it('should return a * b', (done) => {
        const res = multiplyfunc(2, 5);
        assert(res === 10);
        done();
    });

    it('should return a + b', (done) => {
        const res = sumfunc(10, 3);
        assert(res === 13);
        done();
    });

    it('should return a - b', (done) => {
        const res = minusfunc(5, 4);
        assert(res === 1);
        done();
    });
});
