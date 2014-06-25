
"use strict";
var util = require('util');
function InvalidTokenDataError(tokenDataObj) {
   Error.call(this);
    Error.captureStackTrace(this, this.constructor);
 this.name = this.constructor.name; //set our function’s name as util name.
 this.message = [
        "userId type  :", typeof tokenDataObj.userId,
        "scope type  :", typeof tokenDataObj.scope,
        "token has been expired :", tokenDataObj.expiry
    ].join(" ");
}
util.inherits(InvalidTokenDataError, Error);
exports = module.exports = InvalidTokenDataError;
