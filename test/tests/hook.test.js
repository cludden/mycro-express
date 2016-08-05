'use strict';

const hook = require('../../lib');
const td = require('testdouble');
const test = require('tape-catch');
const utils = require('../utils');

function Mycro(config) {
    this.log = utils.log;
    this.config = config;
}

test('should create an express application and mount it at "mycro.app"', function(t) {
    const mycro = new Mycro();
    hook.call(mycro, function(err) {
        t.error(err, 'should not error');
        t.equal(typeof mycro.app, 'function', 'should create an express application');
        t.end();
    });
});

test('should allow the app to be configured in "/config/express.js"', function(t) {
    const config = td.function();
    td.when(config(td.matchers.isA(Function))).thenCallback(null);
    const mycro = new Mycro({
        express: config
    });
    hook.call(mycro, function(err) {
        t.error(err, 'should not error');
        t.error(td.verify(config(mycro.app, td.matchers.isA(Function))), 'should call the configuration method');
        t.end();
    });
});

test('should not error if no logger present on mycro', function(t) {
    const mycro = new Mycro();
    delete mycro.log;
    hook.call(mycro, function(err) {
        t.error(err, 'should not error');
        t.end();
    });
});
