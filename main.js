var tokens = require("./modules/token.js");
var err = require('./util/InvalidTokenDataError.js');

var InvalidTokenDataError = tokens.InvalidTokenDataError;
var   InvalidTokenError = tokens.InvalidTokenError;

//Define keys
var cryptoSecret = "822180f014c3ebf76160765162959adf74162bc72c4cc50eb55be397da36b37542a561346e2c35e6b1bad4fc18c1a07c38399398fbe97f7c8f12b95a9484aed1";
var hmacSecret = "a846328b28a2148d1bee236c16e97596e6f9fc572bb84de684ff82c9a6561c011fdcc8e640309534210542fb6f2962b01da4bb85d991d046c39e21cbc90a8028";

var data = {
    userId: "1001",
    scope: ["read", "write", "admin"],
    expiry: +new Date() + 30000
};

var token = tokens.generateToken(data, cryptoSecret, hmacSecret);
if( token instanceof err) throw new Error(token);
console.log("token:- "+token);
var decodedData = tokens.parseToken(token, cryptoSecret, hmacSecret);

console.log("Decoded:- "+decodedData);

