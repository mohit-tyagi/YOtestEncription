
"use strict";
var util = require('util');

function InvalidTokenError() {

     Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = [
        "Error  :", "Tampered token or invalid key."
    ].join(" ");
}
util.inherits(InvalidTokenError, Error);
exports = module.exports = InvalidTokenError;
