'use strict';

const Express = require('express');
const _ = require('lodash');

module.exports = function express(done) {
    const mycro = this;
    const log = getLogger(mycro);

    const app = Express();
    mycro.express = Express;
    mycro.app = app;

    // if no configuration function is found, return here
    const config = _.get(mycro, 'config.express');
    if (typeof config !== 'function') {
        log('info', `No configuration function found`);
        return process.nextTick(done);
    }

    config(app, done);
};

function getLogger(mycro) {
    return function _log(level, msg) {
        if (typeof mycro.log !== 'function') {
            return;
        }
        mycro.log(level, `[mycro-express] ${msg}`);
    };
}
