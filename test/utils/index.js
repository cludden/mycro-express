'use strict';

module.exports = {
    log
};

function log(...args) {
    args.shift();
    console.log.apply(console, args);
}
